import React from "react";
import { motion } from "framer-motion";

export default function JudicialSection() {
  return (
    <section
      className="relative py-20 bg-fixed bg-center bg-cover text-white"
      style={{ backgroundImage: "url('/courtroom-bg.jpg')" }}
    >
      <div className="absolute inset-0 bg-black/60"></div>
      <motion.div
        className="relative z-10 text-center max-w-3xl mx-auto px-4"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        <h2 className="font-serif italic text-3xl md:text-4xl">
          “Justice, Equality, Transparency — The Pillars of Our System”
        </h2>
      </motion.div>
    </section>
  );
}
