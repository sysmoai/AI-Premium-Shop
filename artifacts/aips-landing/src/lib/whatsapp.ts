export const AIPS_WHATSAPP_NUMBER = "8801865385348";

export const AIPS_QUALIFIED_HELP_MESSAGE = [
  "Hi AI Premium Shop, I need help choosing the right AI subscription.",
  "Main goal: [study / research / coding / content / design / video / business]",
  "Budget: [BDT]",
  "Preferred access (if available): [Personal / Shared / Bundle / Setup]",
  "Please help me compare the current options and confirm the exact details before payment.",
].join("\n");

export const AIPS_QUALIFIED_HELP_HREF = `https://wa.me/${AIPS_WHATSAPP_NUMBER}?text=${encodeURIComponent(AIPS_QUALIFIED_HELP_MESSAGE)}`;
