"use client";

import Image from "next/image";
import { useLanguage } from "@/contexts/LanguageContext";

/**
 * Footer component - Site-wide footer with links and company info
 */
export default function Footer() {
  const currentYear = new Date().getFullYear();
  const { language, t } = useLanguage();

  // Smooth scroll handler
  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const element = document.querySelector(href);
    if (element) {
      const offsetTop = element.getBoundingClientRect().top + window.pageYOffset - 64; // 64px for navbar height
      window.scrollTo({
        top: offsetTop,
        behavior: "smooth",
      });
    }
  };

  const links = [
    { href: "#home", label: t("nav.home") },
    { href: "#who-we-are", label: t("nav.about") },
    { href: "#what-we-supply", label: t("nav.whatWeSupply") },
    { href: "#contact", label: t("nav.contact") },
  ];

  return (
    <footer className="bg-gray-900 dark:bg-gray-950 text-white transition-colors duration-300">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Company Info */}
          <div>
            <div className="mb-4">
              <Image
                src="/logo,without-background_dark.png"
                alt="Fuel East Logo"
                width={150}
                height={40}
                className="h-10 w-auto"
              />
            </div>
            <p className="text-gray-400 dark:text-gray-500 mb-4">
              {language === "en"
                ? "Your partner in scientific equipment and chemicals. Providing advanced laboratory equipment and technical solutions across Saudi Arabia."
                : "شريكك في المعدات والمواد الكيميائية العلمية. نوفر معدات مختبرية متقدمة وحلول تقنية في جميع أنحاء المملكة العربية السعودية."}
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-4">
              {language === "en" ? "Quick Links" : "روابط سريعة"}
            </h4>
            <ul className="space-y-2">
              {links.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    onClick={(e) => handleClick(e, link.href)}
                    className="text-gray-400 dark:text-gray-500 hover:text-primary-400 dark:hover:text-primary-300 transition-colors cursor-pointer"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-lg font-semibold mb-4">
              {language === "en" ? "Contact Us" : "اتصل بنا"}
            </h4>
            <ul className="space-y-2 text-gray-400 dark:text-gray-500">
              <li>
                {language === "en" ? "Email:" : "البريد الإلكتروني:"} Info@fueleastsa.com
              </li>
              <li>
                {language === "en" ? "Phone:" : "الهاتف:"} +96 659 586 4433
              </li>
              <li>
                {language === "en" ? "Jeddah, Saudi Arabia" : "جدة، المملكة العربية السعودية"}
              </li>
            </ul>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-gray-800 dark:border-gray-700 mt-8 pt-8 text-center text-gray-400 dark:text-gray-500">
          <p>
            &copy; {currentYear} Fuel East.{" "}
            {language === "en" ? "All rights reserved." : "جميع الحقوق محفوظة."}
          </p>
        </div>
      </div>
    </footer>
  );
}
