"use client";

import { Link } from "@tanstack/react-router";
import { Github, Linkedin, Twitter, Mail } from "lucide-react";

const footerLinks = [
  { to: "/", label: "Home" },
  { to: "/about", label: "About" },
  { to: "/services", label: "Services" },
  { to: "/portfolio", label: "Portfolio" },
  { to: "/blog", label: "Blog" },
  { to: "/contact", label: "Contact" },
];

const socialLinks = [
  { icon: Github, href: "https://github.com/Ansh339412", label: "GitHub" },
  { icon: Linkedin, href: "https://www.linkedin.com/in/anshpreet-singh-57974b202/", label: "LinkedIn" },
  { icon: Twitter, href: "https://x.com/Anshpreetdev_09", label: "Twitter" },
  { icon: Mail, href: "mailto:anshpreetoneplus@gmail.com", label: "Email" },
];

export default function Footer() {
  return (
    <footer className="border-t border-border bg-background">
      <div className="mx-auto max-w-7xl px-6 py-16 lg:px-8">
        <div className="grid gap-12 md:grid-cols-3">
          {/* Brand */}
          <div>
            <Link to="/" className="text-3xl font-heading text-foreground">
              AS<span className="text-gold">.</span>
            </Link>
            <p className="mt-4 max-w-sm text-sm leading-relaxed text-muted-foreground">
              Building elegant, performant, and scalable web experiences for forward-thinking teams and businesses.
            </p>
            <div className="mt-6 flex items-center gap-3">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.label}
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-border text-muted-foreground transition-colors hover:border-gold hover:text-gold"
                >
                  <social.icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Links */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-widest text-foreground">
              Navigation
            </h3>
            <ul className="mt-6 space-y-3">
              {footerLinks.map((link) => (
                <li key={link.to}>
                  <Link
                    to={link.to}
                    className="text-sm text-muted-foreground transition-colors hover:text-gold"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-widest text-foreground">
              Get in Touch
            </h3>
            <div className="mt-6 space-y-3 text-sm text-muted-foreground">
              <p>anshpreetoneplus@gmail.com</p>
              <p>+91 7657872974</p>
              <p>Open to freelance </p>
            </div>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-border pt-8 md:flex-row">
          <p className="text-xs text-muted-foreground">
            &copy; {new Date().getFullYear()} Anshpreet Singh. All rights reserved.
          </p>
          <p className="text-xs text-muted-foreground">
            Crafted with precision & passion.
          </p>
        </div>
      </div>
    </footer>
  );
}
