import { motion } from "framer-motion";
import { CheckCircle } from "lucide-react";

const paymentMethods = [
  {
    name: "bKash",
    emoji: "💜",
    description: "Instant payment",
    speed: "5-30 min delivery",
    color: "from-pink-500 to-pink-600",
  },
  {
    name: "Nagad",
    emoji: "🟦",
    description: "Instant payment",
    speed: "5-30 min delivery",
    color: "from-blue-500 to-blue-600",
  },
  {
    name: "Rocket",
    emoji: "🟢",
    description: "Instant payment",
    speed: "5-30 min delivery",
    color: "from-green-500 to-green-600",
  },
  {
    name: "Bank Transfer",
    emoji: "🏦",
    description: "Safe transfer",
    speed: "Verified within 2 hours",
    color: "from-amber-500 to-amber-600",
  },
  {
    name: "Binance",
    emoji: "₿",
    description: "For crypto users",
    speed: "Instant confirmation",
    color: "from-yellow-500 to-yellow-600",
  },
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

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 mb-12">
          {paymentMethods.map((method, idx) => (
            <motion.div
              key={method.name}
              className={`bg-gradient-to-br ${method.color} p-0.5 rounded-lg transition-all`}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              whileHover={{ scale: 1.05 }}
            >
              <div className="bg-slate-900 rounded-lg p-6 text-center space-y-3">
                <div className="text-4xl">{method.emoji}</div>
                <h3 className="text-white font-bold text-lg">{method.name}</h3>
                <p className="text-gray-400 text-sm">{method.description}</p>
                <p className="text-amber-400 text-xs font-semibold">
                  ⚡ {method.speed}
                </p>
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
          <h3 className="text-xl font-bold text-white mb-6 text-center">
            100% Safe & Secure
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {[
              { icon: "🔒", text: "SSL Encrypted" },
              { icon: "✅", text: "Official Subscriptions" },
              { icon: "💳", text: "Secure Payment" },
              { icon: "🛡️", text: "Money-Back Guarantee" },
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
