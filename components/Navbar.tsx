"use client";

import Image from "next/image";
import { useState, useEffect } from "react";
import { useTheme } from "@/contexts/ThemeContext";
import { useLanguage } from "@/contexts/LanguageContext";

/**
 * Navbar component - Responsive navigation bar with floating card design
 * Features:
 * - Floating card layout when at top
 * - Expands to full-width on scroll
 * - Dark/Light mode toggle
 * - Contact button with hover effect
 * - Smooth scroll to sections
 * - Mobile hamburger menu
 * - Sticky navigation
 */
export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const { theme, toggleTheme } = useTheme();
  const { language, toggleLanguage, t } = useLanguage();

  const links = [
    { href: "#home", label: t("nav.home") },
    { href: "#who-we-are", label: t("nav.about") },
    { href: "#what-we-supply", label: t("nav.whatWeSupply") },
  ];

  // Scroll detection
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Smooth scroll handler
  const handleClick = (e: React.MouseEvent<HTMLAnchorElement | HTMLButtonElement>, href: string) => {
    e.preventDefault();
    const element = document.querySelector(href);
    if (element) {
      const offsetTop = element.getBoundingClientRect().top + window.pageYOffset - 80;
      window.scrollTo({
        top: offsetTop,
        behavior: "smooth",
      });
      setIsOpen(false);
    }
  };

  return (
    <nav className="sticky top-0 z-50 transition-all duration-300 ease-in-out py-3">
      <div
        className={`mx-auto px-4 sm:px-6 lg:px-8 transition-all duration-300 ease-in-out ${
          isScrolled
            ? "max-w-6xl"
            : "max-w-4xl"
        }`}
      >
        <div className={`rounded-lg transition-all duration-300 ease-in-out ${
          isScrolled
            ? "bg-white/40 dark:bg-gray-800/40 backdrop-blur-xl shadow-lg"
            : "bg-transparent"
        }`}>
          <div className="flex justify-center items-center h-12 px-5 relative">
            {/* Logo - Positioned Absolutely */}
            <a
              href="#home"
              className={`absolute ${language === "ar" ? "right-6" : "left-6"} flex items-center`}
              onClick={(e) => handleClick(e, "#home")}
            >
              <Image
                src="/logo,without-background.png"
                alt="Fuel East Logo"
                width={120}
                height={32}
                className="h-8 w-auto"
                priority
              />
            </a>

            {/* Desktop Navigation - Centered */}
            <div className={`hidden md:flex items-center ${language === "ar" ? "space-x-reverse space-x-3" : "space-x-3"}`}>
              {links.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={(e) => handleClick(e, link.href)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 transform cursor-pointer border-2 ${
                    isScrolled
                      ? "text-gray-700 dark:text-gray-200 border-transparent hover:border-gray-100 hover:bg-gray-50 hover:scale-105 hover:shadow-lg"
                      : "text-gray-900 dark:text-white border-transparent hover:border-gray-100 hover:bg-gray-50/30 hover:scale-105 hover:shadow-xl"
                  }`}
                >
                  {link.label}
                </a>
              ))}
              {/* Language Switcher Button */}
              <button
                onClick={toggleLanguage}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 transform border-2 ${
                  isScrolled
                    ? "text-gray-700 dark:text-gray-200 border-transparent hover:border-gray-100 hover:bg-gray-50 hover:scale-105 hover:shadow-lg"
                    : "text-gray-900 dark:text-white border-transparent hover:border-gray-100 hover:bg-gray-50/30 hover:scale-105 hover:shadow-xl"
                }`}
                aria-label="Toggle language"
              >
                {language === "en" ? "العربية" : "English"}
              </button>
            </div>

            {/* Theme Toggle and Contact Button - Positioned Absolutely on Right */}
            <div className={`hidden md:flex absolute ${language === "ar" ? "left-6" : "right-6"} items-center ${language === "ar" ? "gap-4" : "space-x-3"}`}>
              {language === "ar" ? (
                <>
                  {/* Theme Toggle (first in Arabic) */}
                  <button
                    onClick={toggleTheme}
                    className={`p-2 rounded-lg border-2 transition-all duration-300 transform ${
                      isScrolled
                        ? "text-gray-700 dark:text-gray-200 border-transparent hover:border-gray-100 hover:bg-gray-50 hover:scale-105 hover:shadow-lg"
                        : "text-gray-900 dark:text-white border-transparent hover:border-gray-100 hover:bg-gray-50/30 hover:scale-105 hover:shadow-xl"
                    }`}
                    aria-label="Toggle theme"
                  >
                    {theme === "light" ? (
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                      </svg>
                    ) : (
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                      </svg>
                    )}
                  </button>
                  {/* Contact Button (second in Arabic) */}
                  <div
                    onClick={(e) => handleClick(e as any, "#contact")}
                    className="flex items-center gap-3 cursor-pointer group"
                  >
                    <span className={`text-sm font-medium transition-colors duration-300 ${
                      isScrolled
                        ? "text-gray-700 dark:text-gray-200"
                        : "text-gray-900 dark:text-white"
                    }`}>
                      {t("nav.contact")}
                    </span>
                    <button className="w-8 h-8 bg-primary-600 group-hover:bg-gray-900 dark:group-hover:bg-gray-800 rounded-full flex items-center justify-center flex-shrink-0 transition-colors duration-300 overflow-hidden relative">
                      <svg
                        className="w-4 h-4 text-white transition-all duration-200 group-hover:translate-x-2 group-hover:-translate-y-2 group-hover:opacity-0"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M7 17L17 7M17 7H7M17 7v10"
                        />
                      </svg>
                      <svg
                        className="w-4 h-4 text-white absolute transition-all duration-200 -translate-x-2 translate-y-2 opacity-0 group-hover:translate-x-0 group-hover:translate-y-0 group-hover:opacity-100"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M7 17L17 7M17 7H7M17 7v10"
                        />
                      </svg>
                    </button>
                  </div>
                </>
              ) : (
                <>
                  {/* Theme Toggle (first in English) */}
                  <button
                    onClick={toggleTheme}
                    className={`p-2 rounded-lg border-2 transition-all duration-300 transform ${
                      isScrolled
                        ? "text-gray-700 dark:text-gray-200 border-transparent hover:border-gray-100 hover:bg-gray-50 hover:scale-105 hover:shadow-lg"
                        : "text-gray-900 dark:text-white border-transparent hover:border-gray-100 hover:bg-gray-50/30 hover:scale-105 hover:shadow-xl"
                    }`}
                    aria-label="Toggle theme"
                  >
                    {theme === "light" ? (
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                      </svg>
                    ) : (
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                      </svg>
                    )}
                  </button>
                  {/* Contact Button (second in English) */}
                  <div
                    onClick={(e) => handleClick(e as any, "#contact")}
                    className="flex items-center gap-3 cursor-pointer group"
                  >
                    <span className={`text-sm font-medium transition-colors duration-300 ${
                      isScrolled
                        ? "text-gray-700 dark:text-gray-200"
                        : "text-gray-900 dark:text-white"
                    }`}>
                      {t("nav.contact")}
                    </span>
                    <button className="w-8 h-8 bg-primary-600 group-hover:bg-gray-900 dark:group-hover:bg-gray-800 rounded-full flex items-center justify-center flex-shrink-0 transition-colors duration-300 overflow-hidden relative">
                      <svg
                        className="w-4 h-4 text-white transition-all duration-200 group-hover:translate-x-2 group-hover:-translate-y-2 group-hover:opacity-0"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M7 17L17 7M17 7H7M17 7v10"
                        />
                      </svg>
                      <svg
                        className="w-4 h-4 text-white absolute transition-all duration-200 -translate-x-2 translate-y-2 opacity-0 group-hover:translate-x-0 group-hover:translate-y-0 group-hover:opacity-100"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M7 17L17 7M17 7H7M17 7v10"
                        />
                      </svg>
                    </button>
                  </div>
                </>
              )}
            </div>

            {/* Mobile menu button and theme toggle */}
            <div className={`md:hidden absolute ${language === "ar" ? "left-6" : "right-6"} flex items-center ${language === "ar" ? "space-x-reverse space-x-2" : "space-x-2"}`}>
              {/* Theme Toggle */}
              <button
                onClick={toggleTheme}
                className={`p-2 transition-colors ${
                  isScrolled
                    ? "text-gray-700 dark:text-gray-200 hover:text-primary-600 dark:hover:text-primary-400"
                    : "text-gray-900 dark:text-white hover:text-primary-600 dark:hover:text-primary-400"
                }`}
                aria-label="Toggle theme"
              >
                {theme === "light" ? (
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                  </svg>
                ) : (
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                  </svg>
                )}
              </button>
              <button
                onClick={() => setIsOpen(!isOpen)}
                className={`focus:outline-none transition-colors w-6 h-5 flex flex-col justify-between items-center relative ${
                  isScrolled
                    ? "text-gray-700 dark:text-gray-200 hover:text-primary-600 dark:hover:text-primary-400"
                    : "text-gray-900 dark:text-white hover:text-primary-600 dark:hover:text-primary-400"
                }`}
                aria-label="Toggle menu"
              >
                <span className="sr-only">Toggle menu</span>
                <span className={`block h-[3px] w-full bg-current transform transition-all duration-300 ease-in-out ${
                  isOpen ? "rotate-45 translate-y-[9px]" : ""
                }`} />
                <span className={`block h-[3px] w-full bg-current transform transition-all duration-300 ease-in-out ${
                  isOpen ? "opacity-0 scale-0" : "opacity-100 scale-100"
                }`} />
                <span className={`block h-[3px] w-full bg-current transform transition-all duration-300 ease-in-out ${
                  isOpen ? "-rotate-45 -translate-y-[9px]" : ""
                }`} />
              </button>
            </div>
          </div>

          {/* Mobile Navigation */}
          {isOpen && (
            <div className="md:hidden border-t border-white/20 dark:border-gray-700">
              <div className="px-4 pt-2 pb-3 space-y-1 bg-white/90 dark:bg-gray-800/90 backdrop-blur-md rounded-b-3xl">
                {links.map((link) => (
                  <a
                    key={link.href}
                    href={link.href}
                    onClick={(e) => handleClick(e, link.href)}
                    className={`${language === "ar" ? "text-right" : "text-left"} text-gray-700 dark:text-gray-200 hover:text-primary-600 dark:hover:text-primary-400 block px-3 py-2 rounded-md text-base font-medium transition-all duration-300 ${
                      language === "ar" ? "hover:border-r-4 hover:border-white hover:pr-4" : "hover:border-l-4 hover:border-white hover:pl-4"
                    } cursor-pointer`}
                  >
                    {link.label}
                  </a>
                ))}
                <button
                  onClick={toggleLanguage}
                  className={`w-full ${language === "ar" ? "text-right" : "text-left"} text-gray-700 dark:text-gray-200 hover:text-primary-600 dark:hover:text-primary-400 block px-3 py-2 rounded-md text-base font-medium transition-all duration-300 ${
                    language === "ar" ? "hover:border-r-4 hover:border-white hover:pr-4" : "hover:border-l-4 hover:border-white hover:pl-4"
                  } cursor-pointer`}
                >
                  {language === "en" ? "العربية" : "English"}
                </button>
                <button
                  onClick={(e) => handleClick(e, "#contact")}
                  className={`w-full ${language === "ar" ? "text-right" : "text-left"} text-gray-700 dark:text-gray-200 hover:text-primary-600 dark:hover:text-primary-400 block px-3 py-2 rounded-md text-base font-medium transition-all duration-300 ${
                    language === "ar" ? "hover:border-r-4 hover:border-white hover:pr-4" : "hover:border-l-4 hover:border-white hover:pl-4"
                  } cursor-pointer`}
                >
                  {t("nav.contact")}
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}
