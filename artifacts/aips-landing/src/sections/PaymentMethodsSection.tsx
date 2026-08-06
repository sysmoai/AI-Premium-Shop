import { motion } from "framer-motion";

// Text-only labels, not logo marks — see docs/brand/payment-assets.md.
// These SVGs used to be hand-drawn imitations of the real bKash/Nagad/Rocket
// marks (a colored rectangle with a single bold letter approximating each
// brand's actual logo). No official asset file exists in this repo, and
// obtaining one needs a human downloading from each provider's own brand/
// merchant kit — an agent session can't legitimately source or approximate
// one. Per the master prompt's own explicit fallback: "If no authorized
// production-quality logo file is available: do not invent one, use a
// text-only payment label temporarily." This card's brand-colored badge is
// now plain text, not a redrawn mark — swap in a real <img> per
// docs/brand/payment-assets.md's instructions once one exists.
const paymentMethods = [
  {
    name: "bKash",
    badgeColor: "#E2136E",
    description: "Mobile money",
    speed: "5-30 min delivery",
    gradient: "from-pink-500 to-pink-600",
  },
  {
    name: "Nagad",
    badgeColor: "#F6921E",
    description: "SMS-based payment",
    speed: "5-30 min delivery",
    gradient: "from-orange-500 to-orange-600",
  },
  {
    name: "Rocket",
    badgeColor: "#8B2F97",
    description: "Digital wallet",
    speed: "5-30 min delivery",
    gradient: "from-purple-500 to-purple-600",
  },
  {
    name: "Bank Transfer",
    badgeColor: "#1A5276",
    description: "Direct deposit",
    speed: "Verified within 2 hours",
    gradient: "from-blue-600 to-blue-700",
  },
  // Binance (crypto) removed pending written Bangladesh legal/compliance
  // review of the exact transaction flow — Bangladesh Bank's 2022 circular
  // restricts virtual-asset transactions, and no such review is on file. See
  // docs/homepage/executive-audit.md F2. Do not re-add without that review.
];

export function PaymentMethodsSection() {
  return (
    <section className="py-20 px-4 bg-gradient-to-b from-slate-900/50 to-slate-800/50">
      <div className="max-w-6xl mx-auto">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl font-bold text-white mb-4">
            Pay Your Way
          </h2>
          <p className="text-gray-400 text-lg">
            Multiple local payment options. No international card needed.
          </p>
          <p className="text-amber-400 font-semibold mt-4">
            💰 Starting from just ৳299/month
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-12">
          {paymentMethods.map((method, idx) => (
            <motion.div
              key={method.name}
              className={`bg-gradient-to-br ${method.gradient} p-0.5 rounded-xl transition-all`}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              whileHover={{ scale: 1.05, y: -4 }}
            >
              <div className="bg-gradient-to-b from-slate-900 to-slate-950 rounded-[10px] p-6 text-center space-y-3 border border-slate-800">
                <div className="flex justify-center">
                  <span
                    aria-hidden="true"
                    className="block w-10 h-1.5 rounded-full"
                    style={{ backgroundColor: method.badgeColor }}
                  />
                </div>
                <h3 className="text-white font-bold text-lg">{method.name}</h3>
                <p className="text-gray-400 text-sm">{method.description}</p>
                <div className="pt-2 border-t border-slate-700">
                  <p className="text-amber-400 text-xs font-semibold">
                    ⚡ {method.speed}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          className="bg-slate-800/50 border border-slate-700 rounded-lg p-8 backdrop-blur"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          {/* "100% Safe" and "Money-Back Guarantee" both overstate the actual
              policy — 15 min refund window + 30-day replacement warranty, not
              a guarantee. The concierge is explicitly forbidden from making
              this claim; the site was contradicting its own assistant. */}
          <h3 className="text-xl font-bold text-white mb-6 text-center">
            Safe &amp; Secure Payment
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {[
              { icon: "🔒", text: "SSL Encrypted" },
              { icon: "✅", text: "Official Subscriptions" },
              { icon: "💳", text: "Secure Payment" },
              { icon: "🛡️", text: "30-Day Replacement Warranty" },
            ].map((item, idx) => (
              <motion.div
                key={item.text}
                className="flex flex-col items-center gap-3"
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
              >
                <div className="text-4xl">{item.icon}</div>
                <p className="text-gray-300 text-sm text-center font-semibold">
                  {item.text}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        <motion.div
          className="mt-12 bg-gradient-to-r from-amber-500/10 to-orange-500/10 border border-amber-500/30 rounded-lg p-8 text-center"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          <div className="space-y-4">
            <h3 className="text-2xl font-bold text-white">
              Perfect Plans for Every Budget
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
              <div className="space-y-1">
                <div className="text-amber-400 font-bold">Budget</div>
                <div className="text-gray-400">৳299-499</div>
              </div>
              <div className="space-y-1">
                <div className="text-amber-400 font-bold">Standard</div>
                <div className="text-gray-400">৳500-999</div>
              </div>
              <div className="space-y-1">
                <div className="text-amber-400 font-bold">Premium</div>
                <div className="text-gray-400">৳1000-2999</div>
              </div>
              <div className="space-y-1">
                <div className="text-amber-400 font-bold">Enterprise</div>
                <div className="text-gray-400">৳3000+</div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
