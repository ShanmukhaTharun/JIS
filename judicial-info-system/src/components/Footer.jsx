import React from "react";
import { Scale, Twitter, Linkedin, Mail } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-[#111] text-gray-300 py-10 px-6">
      <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-8">
        {/* Left */}
        <div>
          <div className="flex items-center space-x-2 text-white mb-3">
            <Scale className="w-6 h-6" />
            <span className="font-serif font-bold text-lg">Judicial Information System</span>
          </div>
          <p className="text-sm text-gray-400">
            Empowering transparency and efficiency in the justice system.
          </p>
        </div>

        {/* Links */}
        <div>
          <h3 className="font-semibold mb-3 text-white">Quick Links</h3>
          <ul className="space-y-2">
            {["Home", "About", "Contact", "Legal Policies"].map((link, i) => (
              <li key={i} className="hover:text-white hover:underline underline-offset-4 decoration-judicialRed cursor-pointer">
                {link}
              </li>
            ))}
          </ul>
        </div>

        {/* Social */}
        <div>
          <h3 className="font-semibold mb-3 text-white">Connect</h3>
          <div className="flex space-x-4">
            <Twitter className="w-6 h-6 hover:text-white cursor-pointer" />
            <Linkedin className="w-6 h-6 hover:text-white cursor-pointer" />
            <Mail className="w-6 h-6 hover:text-white cursor-pointer" />
          </div>
        </div>
      </div>

      <div className="text-center text-sm text-gray-500 mt-8 border-t border-gray-700 pt-4">
        © 2025 Judicial Information System. All rights reserved.
      </div>
    </footer>
  );
}
