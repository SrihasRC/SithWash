import React from 'react';
import Link from 'next/link';

export const Footer = () => {
  return (
    <footer className="border-t border-gray-800 bg-black/50 backdrop-blur-sm">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand Section */}
          <div className="md:col-span-1">
            <h3 className="text-red-400 text-lg font-bold mb-4">SithWash</h3>
            <p className="text-gray-400 text-sm mb-4">
              A Sith-themed anti-money laundering simulation platform for auditing the dark flow of transactions.
            </p>
            <p className="text-gray-500 text-xs">
              &ldquo;Your lack of compliance disturbs me.&rdquo;
            </p>
          </div>

          {/* Quick Links */}
          <div className="md:col-span-1">
            <h4 className="text-white text-sm font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/" className="text-gray-400 hover:text-red-400 transition-colors text-sm">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/dashboard" className="text-gray-400 hover:text-red-400 transition-colors text-sm">
                  Dashboard
                </Link>
              </li>
              <li>
                <Link href="/audit" className="text-gray-400 hover:text-red-400 transition-colors text-sm">
                  Audit
                </Link>
              </li>
              <li>
                <Link href="/network" className="text-gray-400 hover:text-red-400 transition-colors text-sm">
                  Network
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-gray-400 hover:text-red-400 transition-colors text-sm">
                  About
                </Link>
              </li>
            </ul>
          </div>

          {/* Features */}
          <div className="md:col-span-1">
            <h4 className="text-white text-sm font-semibold mb-4">Features</h4>
            <ul className="space-y-2">
              <li>
                <span className="text-gray-400 text-sm">ML-Powered Detection</span>
              </li>
              <li>
                <span className="text-gray-400 text-sm">Real-time Monitoring</span>
              </li>
              <li>
                <span className="text-gray-400 text-sm">Network Analysis</span>
              </li>
              <li>
                <span className="text-gray-400 text-sm">Risk Assessment</span>
              </li>
              <li>
                <span className="text-gray-400 text-sm">Compliance Reporting</span>
              </li>
            </ul>
          </div>

          {/* Support */}
          <div className="md:col-span-1">
            <h4 className="text-white text-sm font-semibold mb-4">Support</h4>
            <ul className="space-y-2">
              <li>
                <a href="mailto:support@sithwash.com" className="text-gray-400 hover:text-red-400 transition-colors text-sm">
                  Contact Support
                </a>
              </li>
              <li>
                <a href="https://github.com/SrihasRC/SithWash" className="text-gray-400 hover:text-red-400 transition-colors text-sm" target="_blank" rel="noopener noreferrer">
                  GitHub
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="mt-8 pt-6 border-t border-gray-800">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="text-center md:text-left">
              <p className="text-gray-400 text-sm">
                © 2025 SithWash. All rights reserved.
              </p>
            </div>
            
            <div className="flex space-x-6">
              <a href="#" className="text-gray-400 hover:text-red-400 transition-colors text-sm">
                Privacy Policy
              </a>
              <a href="#" className="text-gray-400 hover:text-red-400 transition-colors text-sm">
                Terms of Service
              </a>
              <a href="#" className="text-gray-400 hover:text-red-400 transition-colors text-sm">
                Cookie Policy
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};
