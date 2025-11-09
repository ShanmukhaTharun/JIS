import React from "react";
import { Scale, Twitter, Linkedin, Mail } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-[#111] text-gray-300 pt-12 pb-8 relative overflow-hidden">
      {/* subtle backdrop accent */}
      <div className="pointer-events-none absolute inset-0 opacity-[0.07] bg-[radial-gradient(circle_at_30%_40%,#b30000,transparent_70%)]" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10 relative">
        <div className="grid gap-10 lg:gap-16 md:grid-cols-12">
          {/* Brand / Mission */}
          <div className="flex flex-col items-center md:items-start text-center md:text-left md:col-span-5 lg:col-span-5">
            <div className="flex items-center space-x-2 text-white mb-4">
              <Scale className="w-7 h-7" />
              <span className="font-serif font-bold text-xl tracking-wide leading-none">
                Judicial Information System
              </span>
            </div>
            <p className="text-sm leading-relaxed text-gray-400 max-w-sm">
              Empowering transparency and efficiency in the justice system.
            </p>
          </div>

            {/* Quick Links */}
          <div className="flex flex-col items-center md:items-start text-center md:text-left md:col-span-4 lg:col-span-4">
            <h3 className="font-semibold mb-4 text-white tracking-wide text-[0.85rem] uppercase">Quick Links</h3>
            <ul className="grid gap-2 w-full">
              {[
                { label: 'Home', href: '/' },
                { label: 'About', href: '#about' },
                { label: 'Contact', href: '#contact' },
                { label: 'Legal Policies', href: '#policies' },
              ].map((l) => (
                <li key={l.label} className="flex justify-center md:justify-start">
                  <a
                    href={l.href}
                    className="group inline-flex items-center gap-1 text-sm text-gray-400 hover:text-white transition-colors leading-none"
                  >
                    <span>{l.label}</span>
                    <span className="block h-[2px] w-0 group-hover:w-6 bg-judicialRed transition-all duration-300 rounded" />
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Social / Connect */}
          <div className="flex flex-col items-center md:items-start text-center md:text-left md:col-span-3 lg:col-span-3">
            <h3 className="font-semibold mb-4 text-white tracking-wide text-[0.85rem] uppercase">Connect</h3>
            <div className="flex gap-4">
              {[
                { Icon: Twitter, label: 'Twitter', href: '#' },
                { Icon: Linkedin, label: 'LinkedIn', href: '#' },
                { Icon: Mail, label: 'Email', href: '#' },
              ].map(({ Icon, label, href }) => (
                <a
                  key={label}
                  aria-label={label}
                  href={href}
                  className="p-2.5 rounded-full border border-gray-600 hover:border-judicialRed/80 text-gray-300 hover:text-white hover:bg-judicialRed/10 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-judicialRed/70"
                >
                  <Icon className="w-5 h-5" />
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="mt-12 h-px bg-gradient-to-r from-transparent via-gray-700 to-transparent" />

        <div className="mt-6 flex flex-col md:flex-row gap-3 items-center md:items-center justify-between text-xs sm:text-sm">
          <div className="text-gray-500 order-2 md:order-1 text-center md:text-left leading-none">
            © 2025 Judicial Information System. All rights reserved.
          </div>
          <div className="flex flex-wrap gap-x-6 gap-y-2 justify-center md:justify-end text-gray-400 order-1 md:order-2 leading-none">
            <span className="hover:text-gray-200 transition">Privacy</span>
            <span className="hover:text-gray-200 transition">Terms</span>
            <span className="hover:text-gray-200 transition">Accessibility</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
