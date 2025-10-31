"use client";

import { useState, useEffect, useRef } from "react";
import SmoothWaveBackground from "@/components/SmoothWaveBackground";
import ScrollReveal from "@/components/ScrollReveal";
import { useLanguage } from "@/contexts/LanguageContext";

/**
 * Counter component with animated number
 */
function AnimatedCounter({
  end,
  duration = 2000,
  label,
  icon
}: {
  end: number;
  duration?: number;
  label: string;
  icon: React.ReactNode;
}) {
  const [count, setCount] = useState(0);
  const [hasAnimated, setHasAnimated] = useState(false);
  const counterRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !hasAnimated) {
          setHasAnimated(true);

          const startTime = Date.now();
          const startValue = 0;
          const endValue = end;

          const animate = () => {
            const now = Date.now();
            const progress = Math.min((now - startTime) / duration, 1);

            // Easing function (ease-out)
            const easeOut = 1 - Math.pow(1 - progress, 3);
            const currentCount = Math.floor(easeOut * (endValue - startValue) + startValue);

            setCount(currentCount);

            if (progress < 1) {
              requestAnimationFrame(animate);
            } else {
              setCount(endValue);
            }
          };

          requestAnimationFrame(animate);
        }
      },
      { threshold: 0.5 }
    );

    if (counterRef.current) {
      observer.observe(counterRef.current);
    }

    return () => {
      if (counterRef.current) {
        observer.unobserve(counterRef.current);
      }
    };
  }, [end, duration, hasAnimated]);

  return (
    <div
      ref={counterRef}
      className={`bg-white dark:bg-gray-900 rounded-xl p-8 shadow-lg hover:shadow-xl transition-all duration-500 border border-gray-100 dark:border-gray-700 ${
        hasAnimated ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
      }`}
    >
      <div className={`w-16 h-16 bg-primary-100 dark:bg-primary-900 rounded-full flex items-center justify-center mb-4 transition-transform duration-500 ${
        hasAnimated ? 'scale-100 rotate-0' : 'scale-0 -rotate-180'
      }`}>
        <div className="text-primary-600 dark:text-primary-400">
          {icon}
        </div>
      </div>
      <div className={`text-4xl md:text-5xl font-medium text-gray-900 dark:text-white mb-2 transition-all duration-300 font-dm-mono ${
        hasAnimated ? 'scale-100' : 'scale-95'
      }`}>
        {count}+
      </div>
      <div className="text-base md:text-lg text-gray-600 dark:text-gray-400 font-medium">
        {label}
      </div>
    </div>
  );
}

/**
 * One-Page Scroll Website for Fuel East
 * All sections combined with smooth scrolling navigation
 */
export default function Home() {
  const { language, t } = useLanguage();

  // Contact form state
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">(
    "idle"
  );
  const [errorMessage, setErrorMessage] = useState("");

  // Smooth scroll handler
  const handleScrollClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const element = document.querySelector(href);
    if (element) {
      const offsetTop = element.getBoundingClientRect().top + window.pageYOffset - 64;
      window.scrollTo({
        top: offsetTop,
        behavior: "smooth",
      });
    }
  };

  // Handle form input changes
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");
    setErrorMessage("");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error("Failed to submit form");
      }

      setStatus("success");
      setFormData({ name: "", email: "", message: "" });
    } catch (error) {
      setStatus("error");
      setErrorMessage("Something went wrong. Please try again later.");
    }
  };

  // Products data
  const products = [
    {
      title: t("whatWeSupply.labEquipment.title"),
      description: t("whatWeSupply.labEquipment.description"),
      features: [
        t("whatWeSupply.labEquipment.feature1"),
        t("whatWeSupply.labEquipment.feature2"),
        t("whatWeSupply.labEquipment.feature3"),
        t("whatWeSupply.labEquipment.feature4"),
      ],
      icon: (
        <svg
          className="w-8 h-8"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z"
          />
        </svg>
      ),
    },
    {
      title: t("whatWeSupply.labConsumables.title"),
      description: t("whatWeSupply.labConsumables.description"),
      features: [
        t("whatWeSupply.labConsumables.feature1"),
        t("whatWeSupply.labConsumables.feature2"),
        t("whatWeSupply.labConsumables.feature3"),
        t("whatWeSupply.labConsumables.feature4"),
      ],
      icon: (
        <svg
          className="w-8 h-8"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"
          />
        </svg>
      ),
    },
    {
      title: t("whatWeSupply.teachingEquipment.title"),
      description: t("whatWeSupply.teachingEquipment.description"),
      features: [
        t("whatWeSupply.teachingEquipment.feature1"),
        t("whatWeSupply.teachingEquipment.feature2"),
        t("whatWeSupply.teachingEquipment.feature3"),
        t("whatWeSupply.teachingEquipment.feature4"),
      ],
      icon: (
        <svg
          className="w-8 h-8"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
          />
        </svg>
      ),
    },
  ];

  return (
    <div>
      {/* HERO SECTION */}
      <section id="home" className="relative overflow-hidden text-gray-900 min-h-screen -mt-20 pt-20 flex items-center">
        {/* Smooth Wave Background - extends behind navbar */}
        <SmoothWaveBackground />

        {/* Content */}
        <div className="relative z-10 w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center animate-fadeIn">
            <h1 className={`text-5xl md:text-7xl font-bold mb-6 px-4 ${
              language === "ar"
                ? "text-gray-900 dark:text-white leading-relaxed py-2"
                : "leading-tight bg-gradient-to-r from-gray-900 via-gray-700 to-gray-900 bg-clip-text text-transparent"
            }`}>
              {t("hero.title")}
            </h1>
            <p className="text-sm md:text-base text-gray-500 max-w-3xl mx-auto leading-relaxed px-4">
              {t("hero.subtitle")}
            </p>
          </div>
        </div>
      </section>

      {/* TRUSTED BY SECTION */}
      <ScrollReveal animation="fade-up">
        <section className="py-8 md:py-12 bg-gray-50 dark:bg-gray-800 transition-colors duration-300">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-6">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white dark:text-white">
              {t("trustedBy.title")}
            </h2>
          </div>

          {/* Logo Carousel with Fade Effect */}
          <div className="relative overflow-hidden">
            {/* Left Fade Gradient */}
            <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-gray-50 dark:from-gray-800 to-transparent z-10 pointer-events-none"></div>

            {/* Right Fade Gradient */}
            <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-gray-50 dark:from-gray-800 to-transparent z-10 pointer-events-none"></div>

            {/* Scrolling Logos Container */}
            <div className="flex animate-scroll gap-16">
              {/* First set of logos */}
              <div className="flex items-center gap-16 min-w-max">
                <div className="flex items-center justify-center h-16 w-32">
                  <img src="/haj.png" alt="HAJ" className="h-12 w-auto opacity-70 hover:opacity-100 transition-opacity" />
                </div>
                <div className="flex items-center justify-center h-16 w-32">
                  <img src="/nws2.png" alt="NWC" className="h-10 w-auto opacity-70 hover:opacity-100 transition-opacity" />
                </div>
              </div>
              {/* Second set */}
              <div className="flex items-center gap-16 min-w-max">
                <div className="flex items-center justify-center h-16 w-32">
                  <img src="/haj.png" alt="HAJ" className="h-12 w-auto opacity-70 hover:opacity-100 transition-opacity" />
                </div>
                <div className="flex items-center justify-center h-16 w-32">
                  <img src="/nws2.png" alt="NWC" className="h-10 w-auto opacity-70 hover:opacity-100 transition-opacity" />
                </div>
              </div>
              {/* Third set */}
              <div className="flex items-center gap-16 min-w-max">
                <div className="flex items-center justify-center h-16 w-32">
                  <img src="/haj.png" alt="HAJ" className="h-12 w-auto opacity-70 hover:opacity-100 transition-opacity" />
                </div>
                <div className="flex items-center justify-center h-16 w-32">
                  <img src="/nws2.png" alt="NWC" className="h-10 w-auto opacity-70 hover:opacity-100 transition-opacity" />
                </div>
              </div>
              {/* Fourth set */}
              <div className="flex items-center gap-16 min-w-max">
                <div className="flex items-center justify-center h-16 w-32">
                  <img src="/haj.png" alt="HAJ" className="h-12 w-auto opacity-70 hover:opacity-100 transition-opacity" />
                </div>
                <div className="flex items-center justify-center h-16 w-32">
                  <img src="/nws2.png" alt="NWC" className="h-10 w-auto opacity-70 hover:opacity-100 transition-opacity" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      </ScrollReveal>

      {/* STATISTICS SECTION */}
      <ScrollReveal animation="fade-up">
      <section className="py-16 md:py-24 bg-gray-50 dark:bg-gray-800 transition-colors duration-300">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <AnimatedCounter
              end={99}
              label={t("stats.productsProducing")}
              icon={
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                </svg>
              }
            />
            <AnimatedCounter
              end={56}
              label={t("stats.happyClients")}
              icon={
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              }
            />
            <AnimatedCounter
              end={26}
              label={t("stats.achievementsReceived")}
              icon={
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                </svg>
              }
            />
            <AnimatedCounter
              end={30}
              label={t("stats.ourDealers")}
              icon={
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                </svg>
              }
            />
          </div>
        </div>
      </section>
      </ScrollReveal>

      {/* WHY CHOOSE US SECTION */}
      <ScrollReveal animation="fade-up">
      <section className="py-16 md:py-24 bg-white dark:bg-gray-900 transition-colors duration-300">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              {t("whyChooseUs.title")}
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300 dark:text-gray-300 max-w-2xl mx-auto">
              {t("whyChooseUs.subtitle")}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-6 shadow-md hover:shadow-xl transition-all">
              <div className="w-12 h-12 bg-primary-100 dark:bg-primary-900 rounded-lg flex items-center justify-center mb-4">
                <svg
                  className="w-6 h-6 text-primary-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                {t("whyChooseUs.innovative.title")}
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                {t("whyChooseUs.innovative.description")}
              </p>
            </div>

            <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-6 shadow-md hover:shadow-xl transition-all">
              <div className="w-12 h-12 bg-primary-100 dark:bg-primary-900 rounded-lg flex items-center justify-center mb-4">
                <svg
                  className="w-6 h-6 text-primary-600 dark:text-primary-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                {t("whyChooseUs.quality.title")}
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                {t("whyChooseUs.quality.description")}
              </p>
            </div>

            <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-6 shadow-md hover:shadow-xl transition-all">
              <div className="w-12 h-12 bg-primary-100 dark:bg-primary-900 rounded-lg flex items-center justify-center mb-4">
                <svg
                  className="w-6 h-6 text-primary-600 dark:text-primary-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                {t("whyChooseUs.reliability.title")}
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                {t("whyChooseUs.reliability.description")}
              </p>
            </div>
          </div>
        </div>
      </section>
      </ScrollReveal>

      {/* WHO ARE WE SECTION */}
      <ScrollReveal animation="fade-up">
      <section id="who-we-are" className="py-16 md:py-24 bg-gray-50 dark:bg-gray-800 transition-colors duration-300">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              {t("whoWeAre.title")}
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 dark:text-gray-300 max-w-2xl mx-auto">
              {t("whoWeAre.subtitle")}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <h3 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-6">
                {t("whoWeAre.missionTitle")}
              </h3>
              <p className="text-lg text-gray-600 dark:text-gray-300 dark:text-gray-300 mb-4">
                {t("whoWeAre.mission1")}
              </p>
              <p className="text-lg text-gray-600 dark:text-gray-300 dark:text-gray-300 mb-4">
                {t("whoWeAre.mission2")}
              </p>
              <p className="text-lg text-gray-600 dark:text-gray-300">
                {t("whoWeAre.mission3")}
              </p>
            </div>
            <div className="bg-white dark:bg-gray-800 rounded-lg p-8 shadow-lg transition-colors duration-300">
              <h4 className="text-2xl font-bold text-gray-900 dark:text-white dark:text-white mb-6">
                {t("whoWeAre.coreValuesTitle")}
              </h4>
              <ul className="space-y-4">
                <li className="flex items-start">
                  <svg
                    className="w-6 h-6 text-primary-600 mr-3 mt-1 flex-shrink-0"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                  <div>
                    <strong className="text-gray-900">{t("whoWeAre.quality")}</strong>
                    <span className="text-gray-600">
                      {" "}
                      {t("whoWeAre.qualityDesc")}
                    </span>
                  </div>
                </li>
                <li className="flex items-start">
                  <svg
                    className="w-6 h-6 text-primary-600 mr-3 mt-1 flex-shrink-0"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                  <div>
                    <strong className="text-gray-900">{t("whoWeAre.innovation")}</strong>
                    <span className="text-gray-600">
                      {" "}
                      {t("whoWeAre.innovationDesc")}
                    </span>
                  </div>
                </li>
                <li className="flex items-start">
                  <svg
                    className="w-6 h-6 text-primary-600 mr-3 mt-1 flex-shrink-0"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                  <div>
                    <strong className="text-gray-900">{t("whoWeAre.reliability")}</strong>
                    <span className="text-gray-600">
                      {" "}
                      {t("whoWeAre.reliabilityDesc")}
                    </span>
                  </div>
                </li>
                <li className="flex items-start">
                  <svg
                    className="w-6 h-6 text-primary-600 mr-3 mt-1 flex-shrink-0"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                  <div>
                    <strong className="text-gray-900">{t("whoWeAre.excellence")}</strong>
                    <span className="text-gray-600">
                      {" "}
                      {t("whoWeAre.excellenceDesc")}
                    </span>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>
      </ScrollReveal>

      {/* WHAT WE SUPPLY SECTION */}
      <ScrollReveal animation="fade-up">
      <section id="what-we-supply" className="py-16 md:py-24 bg-white dark:bg-gray-900 transition-colors duration-300">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              {t("whatWeSupply.title")}
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              {t("whatWeSupply.subtitle")}
            </p>
          </div>

          <div className="space-y-16">
            {products.map((product, index) => (
              <div
                key={index}
                className={`flex flex-col ${
                  index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
                } gap-8 items-center`}
              >
                <div className="flex-1">
                  <div className="flex items-center mb-4">
                    <div className="w-16 h-16 bg-primary-100 rounded-lg flex items-center justify-center text-primary-600 mr-4">
                      {product.icon}
                    </div>
                    <h3 className="text-3xl font-bold text-gray-900 dark:text-white">
                      {product.title}
                    </h3>
                  </div>
                  <p className="text-lg text-gray-600 dark:text-gray-300 mb-6">
                    {product.description}
                  </p>
                  <ul className="space-y-3">
                    {product.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-start">
                        <svg
                          className="w-6 h-6 text-primary-600 mr-3 mt-0.5 flex-shrink-0"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                          />
                        </svg>
                        <span className="text-gray-700">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="flex-1">
                  <div className="bg-gradient-to-br from-primary-50 to-primary-100 rounded-lg p-12 shadow-lg">
                    <div className="text-primary-600 flex items-center justify-center">
                      <div className="w-full h-48 flex items-center justify-center">
                        <div className="text-8xl opacity-20">{product.icon}</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Products CTA */}
          <div className="text-center mt-16">
            <h3 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              {t("whatWeSupply.ctaTitle")}
            </h3>
            <p className="text-lg text-gray-600 dark:text-gray-300 mb-8 max-w-2xl mx-auto">
              {t("whatWeSupply.ctaSubtitle")}
            </p>
            <a
              href="#contact"
              onClick={(e) => handleScrollClick(e, "#contact")}
              className="inline-block bg-primary-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-primary-700 transition-colors shadow-lg cursor-pointer"
            >
              {t("whatWeSupply.ctaButton")}
            </a>
          </div>
        </div>
      </section>
      </ScrollReveal>

      {/* CONTACT SECTION */}
      <ScrollReveal animation="fade-up">
      <section id="contact" className="py-16 md:py-24 bg-gray-50 dark:bg-gray-800 transition-colors duration-300">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              {t("contact.title")}
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              {t("contact.subtitle")}
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Information */}
            <div>
              <h3 className="text-3xl font-bold text-gray-900 dark:text-white dark:text-white mb-6">
                {t("contact.getInTouch")}
              </h3>
              <p className="text-lg text-gray-600 dark:text-gray-300 mb-8">
                {t("contact.description")}
              </p>

              <div className="space-y-6">
                <div className="flex items-start">
                  <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center text-primary-600 mr-4 flex-shrink-0">
                    <svg
                      className="w-6 h-6"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                      />
                    </svg>
                  </div>
                  <div>
                    <h4 className="text-lg font-semibold text-gray-900 mb-1">
                      {t("contact.email")}
                    </h4>
                    <p className="text-gray-600">Info@fueleastsa.com</p>
                    <p className="text-gray-600">boa@fueleastsa.com</p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className={`w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center text-primary-600 ${language === "ar" ? "ml-4" : "mr-4"} flex-shrink-0`}>
                    <svg
                      className="w-6 h-6"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                      />
                    </svg>
                  </div>
                  <div>
                    <h4 className="text-lg font-semibold text-gray-900 mb-1">
                      {t("contact.phoneNumber")}
                    </h4>
                    <p className="text-gray-600">+96 659 586 4433</p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className={`w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center text-primary-600 ${language === "ar" ? "ml-4" : "mr-4"} flex-shrink-0`}>
                    <svg
                      className="w-6 h-6"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                      />
                    </svg>
                  </div>
                  <div>
                    <h4 className="text-lg font-semibold text-gray-900 mb-1">
                      {t("contact.officeLocation")}
                    </h4>
                    <p className="text-gray-600" style={{ whiteSpace: "pre-line" }}>
                      {t("contact.address")}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div className="bg-white dark:bg-gray-800 rounded-lg p-8 shadow-lg transition-colors duration-300">
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white dark:text-white mb-6">
                {t("contact.sendMessage")}
              </h3>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label
                    htmlFor="name"
                    className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
                  >
                    {t("contact.yourName")} *
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none transition-colors"
                    placeholder={language === "en" ? "John Doe" : "أحمد محمد"}
                  />
                </div>

                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
                  >
                    {t("contact.yourEmail")} *
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none transition-colors"
                    placeholder={language === "en" ? "john@example.com" : "ahmed@example.com"}
                  />
                </div>

                <div>
                  <label
                    htmlFor="message"
                    className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
                  >
                    {t("contact.yourMessage")} *
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={6}
                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none transition-colors resize-none"
                    placeholder={t("contact.messagePlaceholder")}
                  />
                </div>

                <button
                  type="submit"
                  disabled={status === "loading"}
                  className="w-full bg-primary-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-primary-700 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed shadow-lg"
                >
                  {status === "loading" ? t("contact.sending") : t("contact.sendButton")}
                </button>

                {status === "success" && (
                  <div className="bg-green-50 border border-green-200 text-green-800 px-4 py-3 rounded-lg">
                    {t("contact.successMessage")}
                  </div>
                )}

                {status === "error" && (
                  <div className="bg-red-50 border border-red-200 text-red-800 px-4 py-3 rounded-lg">
                    {t("contact.errorMessage")}
                  </div>
                )}
              </form>
            </div>
          </div>
        </div>
      </section>
      </ScrollReveal>
    </div>
  );
}
