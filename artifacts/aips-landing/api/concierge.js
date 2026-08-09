// Temporary P0 commerce-compliance quarantine.
// The public concierge must not serve catalog, pricing, access-model or order
// guidance while current commercial truth is being reconciled against A1/A2.

export default function handler(_req, res) {
  res.setHeader("Cache-Control", "no-store");
  res.status(503).json({
    error: "availability_under_verification",
    message: "Product availability and commercial information are currently under verification. Please use the public support contact for current guidance."
  });
}
