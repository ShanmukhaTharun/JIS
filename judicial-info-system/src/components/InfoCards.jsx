import React from "react";
import { Gavel, Landmark, FileText } from "lucide-react";
import { motion } from "framer-motion";

const cards = [
  {
    icon: <Gavel className="w-10 h-10 text-judicialRed" />,
    title: "Our Mission",
    desc: "To revolutionize the judicial process by integrating technology that ensures fairness, accessibility, and transparency.",
  },
  {
    icon: <Landmark className="w-10 h-10 text-judicialRed" />,
    title: "Our Services",
    desc: "Providing digital tools for case tracking, record management, and public access to legal information.",
  },
  {
    icon: <FileText className="w-10 h-10 text-judicialRed" />,
    title: "Our Vision",
    desc: "To create a unified platform that empowers citizens and judicial institutions with real-time legal insights.",
  },
];

export default function InfoCards() {
  return (
    <section className="py-16 px-6 bg-white">
      <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
        {cards.map((card, index) => (
          <motion.div
            key={index}
            className="shadow-lg rounded-2xl p-8 text-center hover:scale-105 transition bg-white"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.2 }}
          >
            <div className="flex justify-center mb-4">{card.icon}</div>
            <h3 className="text-xl font-serif font-bold mb-2">{card.title}</h3>
            <p className="text-gray-600">{card.desc}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
