import { randomBytes } from "node:crypto";
import { db, adminUsersTable, adminSessionsTable } from "@workspace/db";
import { eq, and, gt } from "drizzle-orm";
import bcrypt from "bcryptjs";
import type { Request, Response, NextFunction } from "express";

export const ADMIN_COOKIE = "aips_admin";
export const SESSION_DURATION_MS = 1000 * 60 * 60 * 24 * 7;

export function newSessionToken(): string {
  return randomBytes(32).toString("hex");
}

export async function ensureBootstrapAdmin() {
  const existing = await db.select().from(adminUsersTable).limit(1);
  if (existing.length > 0) return;
  const email = process.env.ADMIN_EMAIL || "admin@aipremiumshop.com";
  const password = process.env.ADMIN_PASSWORD || "ChangeMe!2026";
  const hash = await bcrypt.hash(password, 10);
  await db.insert(adminUsersTable).values({
    email,
    passwordHash: hash,
    name: "Admin",
    role: "admin",
  });
}

export async function loginAdmin(email: string, password: string) {
  const [admin] = await db
    .select()
    .from(adminUsersTable)
    .where(eq(adminUsersTable.email, email.toLowerCase()))
    .limit(1);
  if (!admin) return null;
  const ok = await bcrypt.compare(password, admin.passwordHash);
  if (!ok) return null;
  const token = newSessionToken();
  const expiresAt = new Date(Date.now() + SESSION_DURATION_MS);
  await db.insert(adminSessionsTable).values({
    token,
    adminId: admin.id,
    expiresAt,
  });
  return { admin, token, expiresAt };
}

export async function getAdminFromToken(token: string | undefined) {
  if (!token) return null;
  const [session] = await db
    .select()
    .from(adminSessionsTable)
    .where(
      and(
        eq(adminSessionsTable.token, token),
        gt(adminSessionsTable.expiresAt, new Date()),
      ),
    )
    .limit(1);
  if (!session) return null;
  const [admin] = await db
    .select()
    .from(adminUsersTable)
    .where(eq(adminUsersTable.id, session.adminId))
    .limit(1);
  return admin ?? null;
}

export async function logoutAdmin(token: string | undefined) {
  if (!token) return;
  await db.delete(adminSessionsTable).where(eq(adminSessionsTable.token, token));
}

export async function requireAdmin(
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> {
  const token = req.cookies?.[ADMIN_COOKIE];
  const admin = await getAdminFromToken(token);
  if (!admin) {
    res.status(401).json({ error: "Unauthorized" });
    return;
  }
  (req as Request & { admin: typeof admin }).admin = admin;
  next();
}
