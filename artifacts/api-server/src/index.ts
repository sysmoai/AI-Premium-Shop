import app from "./app";
import { logger } from "./lib/logger";
import { ensureBootstrapAdmin } from "./lib/admin-auth";
import { seedProductsFromJson } from "./lib/seed";

const rawPort = process.env["PORT"];

if (!rawPort) {
  throw new Error(
    "PORT environment variable is required but was not provided.",
  );
}

const port = Number(rawPort);

if (Number.isNaN(port) || port <= 0) {
  throw new Error(`Invalid PORT value: "${rawPort}"`);
}

async function bootstrap() {
  try {
    await ensureBootstrapAdmin();
  } catch (err) {
    logger.error({ err }, "failed bootstrapping admin");
  }
  try {
    await seedProductsFromJson();
  } catch (err) {
    logger.error({ err }, "failed seeding products");
  }
}

app.listen(port, (err) => {
  if (err) {
    logger.error({ err }, "Error listening on port");
    process.exit(1);
  }

  logger.info({ port }, "Server listening");
  void bootstrap();
});
