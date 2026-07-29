import { useState } from "react";
import { motion } from "framer-motion";
import { ChevronRight } from "lucide-react";

type Segment = "students" | "freelancers" | "creators" | "smbs" | "educators" | null;

interface SegmentSelectorProps {
  onSelect: (segment: Segment) => void;
  isOpen: boolean;
}

const segments = [
  {
    id: "students" as Segment,
    label: "📚 Student",
    description: "Need help with assignments, research, coding",
    icon: "🎓",
  },
  {
    id: "freelancers" as Segment,
    label: "💼 Freelancer",
    description: "Work on Upwork/Fiverr, need productivity boost",
    icon: "🚀",
  },
  {
    id: "creators" as Segment,
    label: "🎬 Content Creator",
    description: "Make videos, designs, or written content",
    icon: "✨",
  },
  {
    id: "smbs" as Segment,
    label: "🏢 Business Owner",
    description: "Running my own small business",
    icon: "💰",
  },
  {
    id: "educators" as Segment,
    label: "👨‍🏫 Teacher/Educator",
    description: "Teaching or creating online courses",
    icon: "📖",
  },
];

export function SegmentSelector({ onSelect, isOpen }: SegmentSelectorProps) {
  const [selected, setSelected] = useState<Segment>(null);

  const handleSelect = (segment: Segment) => {
    setSelected(segment);
    setTimeout(() => onSelect(segment), 300);
  };

  if (!isOpen) return null;

  return (
    <motion.div
      className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <motion.div
        className="bg-gradient-to-b from-slate-900 to-slate-800 rounded-2xl p-8 max-w-2xl w-full border border-slate-700"
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
      >
        <h2 className="text-3xl font-bold text-white mb-2 text-center">
          Which describes you best?
        </h2>
        <p className="text-gray-400 text-center mb-8">
          We'll show you tools tailored to your needs
        </p>

        <div className="space-y-3">
          {segments.map((segment, index) => (
            <motion.button
              key={segment.id}
              onClick={() => handleSelect(segment.id)}
              className={`w-full p-4 rounded-lg border-2 transition-all text-left ${
                selected === segment.id
                  ? "border-amber-500 bg-amber-500/10"
                  : "border-slate-600 bg-slate-800/50 hover:border-amber-400"
              }`}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-xl font-semibold text-white">
                    {segment.icon} {segment.label}
                  </div>
                  <div className="text-sm text-gray-400 mt-1">
                    {segment.description}
                  </div>
                </div>
                <ChevronRight
                  className={`w-6 h-6 transition-all ${
                    selected === segment.id
                      ? "text-amber-500 translate-x-1"
                      : "text-gray-500"
                  }`}
                />
              </div>
            </motion.button>
          ))}
        </div>

        <div className="mt-8 pt-6 border-t border-slate-700">
          <p className="text-xs text-gray-500 text-center">
            Not sure? <button className="text-amber-500 hover:underline">Take our quiz</button>
          </p>
        </div>
      </motion.div>
    </motion.div>
  );
}
