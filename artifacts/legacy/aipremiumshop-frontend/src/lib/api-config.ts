import { setBaseUrl } from "@workspace/api-client-react";

let configured = false;

export function configureApi() {
  if (configured) return;
  configured = true;
  setBaseUrl(null);
}
