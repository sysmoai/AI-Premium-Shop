#!/usr/bin/env node
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const APP = path.join(path.dirname(fileURLToPath(import.meta.url)), "..");
const REPO = path.resolve(APP, "../..");
const offer = JSON.parse(fs.readFileSync(path.join(APP, "data/higgsfield-offer.json"), "utf8"));
const commercial = JSON.parse(fs.readFileSync(path.join(REPO, "ops/ssot/commercial.json"), "utf8"));

const errors = [];
const fail = (message) => errors.push(message);
const approved = commercial?.public_claim_policy?.payment?.approved_public_methods ?? [];
const configured = offer?.payment?.methods ?? [];

if (!Array.isArray(approved) || approved.length === 0) {
  fail("commercial SSOT has no approved public payment methods");
}
if (!Array.isArray(configured) || configured.length === 0) {
  fail("Higgsfield offer has no payment.methods array");
}
if (commercial?.public_claim_policy?.payment?.unlisted_payment_method_claim_allowed !== false) {
  fail("commercial SSOT must keep unlisted payment-method claims blocked");
}

const sameMethods = approved.length === configured.length && approved.every((method, index) => configured[index] === method);
if (!sameMethods) {
  fail(`Higgsfield payment.methods must exactly match commercial SSOT order/value: expected=[${approved.join(", ")}], got=[${configured.join(", ")}]`);
}

const paymentFaq = (offer.faq ?? []).find((item) => item.q === "How do I pay from Bangladesh?");
if (!paymentFaq?.a) {
  fail('Higgsfield FAQ must contain "How do I pay from Bangladesh?" with an answer');
} else {
  const answer = String(paymentFaq.a);
  for (const method of approved) {
    if (!answer.toLowerCase().includes(method.toLowerCase())) {
      fail(`Higgsfield payment FAQ is missing approved method "${method}"`);
    }
  }

  const explicitlyBlocked = ["Rocket", "Bank transfer", "bank transfer", "card payment", "credit card", "debit card", "USDT", "crypto"];
  for (const term of explicitlyBlocked) {
    if (answer.toLowerCase().includes(term.toLowerCase())) {
      fail(`Higgsfield payment FAQ mentions unapproved public payment method/reference "${term}"`);
    }
  }
}

const paymentSurface = JSON.stringify({ payment: offer.payment, faq: paymentFaq ?? null });
for (const term of ["Rocket", "Bank transfer", "bank transfer", "USDT", "crypto"]) {
  if (paymentSurface.toLowerCase().includes(term.toLowerCase())) {
    fail(`Higgsfield payment surface still contains unapproved public payment reference "${term}"`);
  }
}

if (errors.length) {
  console.error(`[higgsfield-payment-truth] FAIL (${errors.length})`);
  for (const error of errors) console.error(`- ${error}`);
  process.exit(1);
}

console.log(`[higgsfield-payment-truth] PASS: Higgsfield public payment methods and FAQ exactly follow ${commercial.policy_revision}: ${approved.join(" + ")}`);
