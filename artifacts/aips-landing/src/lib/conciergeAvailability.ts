/**
 * Owner decision 2026-11-25: WhatsApp only. The model provider keys were
 * retired and production usage rights are unverified (issue #111), so the AI
 * assistant is not offered. Set to true only after a provider key is
 * configured and a live POST /api/concierge returns a real answer;
 * GET /api/concierge keyConfigured only proves that a secret exists.
 */
export const CONCIERGE_AI_ENABLED: boolean = false;
