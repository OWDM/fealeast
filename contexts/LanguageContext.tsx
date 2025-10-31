"use client";

import { createContext, useContext, useState, ReactNode, useEffect } from "react";

type Language = "en" | "ar";

interface LanguageContextType {
  language: Language;
  toggleLanguage: () => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(
  undefined
);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<Language>("en");

  // Update document direction when language changes
  useEffect(() => {
    document.documentElement.dir = language === "ar" ? "rtl" : "ltr";
    document.documentElement.lang = language;
  }, [language]);

  const toggleLanguage = () => {
    setLanguage((prev) => (prev === "en" ? "ar" : "en"));
  };

  const t = (key: string): string => {
    const keys = key.split(".");
    let value: any = translations[language];

    for (const k of keys) {
      if (value && typeof value === "object") {
        value = value[k];
      } else {
        return key;
      }
    }

    return typeof value === "string" ? value : key;
  };

  return (
    <LanguageContext.Provider value={{ language, toggleLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
}

// Translations
const translations = {
  en: {
    nav: {
      home: "Home",
      about: "About",
      whatWeSupply: "What We Supply",
      contact: "Contact",
    },
    hero: {
      title: "Advanced Scientific & Chemical Solutions",
      subtitle:
        "We deliver advanced lab equipment, chemical materials, and seamless support to help industries innovate with confidence.",
    },
    trustedBy: {
      title: "Trusted by",
    },
    stats: {
      productsProducing: "Products Producing",
      happyClients: "Happy Clients",
      achievementsReceived: "Achievements Received",
      ourDealers: "Our Dealers",
    },
    whyChooseUs: {
      title: "Why Choose Us?",
      subtitle:
        "Choose us for innovative solutions, exceptional quality, and unmatched reliability in laboratory equipment and chemical supplies.",
      innovative: {
        title: "Innovative Solutions",
        description:
          "We provide cutting-edge laboratory equipment and advanced technical solutions that keep you at the forefront of scientific research.",
      },
      quality: {
        title: "Exceptional Quality",
        description:
          "Only the highest quality scientific equipment and chemical materials from trusted brands, ensuring accuracy and reliability in your work.",
      },
      reliability: {
        title: "Unmatched Reliability",
        description:
          "Dependable service and support for governmental and private sectors. Count on us to deliver on time, every time.",
      },
    },
    whoWeAre: {
      title: "Who Are We",
      subtitle:
        "A Saudi company providing scientific and laboratory equipment to industries, with technical solutions in different fields.",
      missionTitle: "Our Mission",
      mission1:
        "Fuel East is a Saudi Company that provides scientific and laboratory equipment to industries and chemical raw materials used in analysis, along with technical solutions in different fields.",
      mission2:
        "We offer the most advanced chemical laboratories equipment and technical service solutions supporting the governmental and private sectors across the Kingdom of Saudi Arabia.",
      mission3:
        "Our commitment is to deliver high-quality products and exceptional service, ensuring that our clients have access to the best scientific equipment and materials available.",
      coreValuesTitle: "Our Core Values",
      quality: "Quality:",
      qualityDesc:
        "We provide only the highest quality scientific equipment and materials.",
      innovation: "Innovation:",
      innovationDesc:
        "We stay at the forefront of scientific and technological advancement.",
      reliability: "Reliability:",
      reliabilityDesc:
        "Our clients can count on us for dependable service and support.",
      excellence: "Excellence:",
      excellenceDesc:
        "We strive for excellence in every aspect of our business.",
    },
    whatWeSupply: {
      title: "What We Supply",
      subtitle:
        "High-quality scientific equipment, consumables, and teaching resources for laboratories and educational institutions.",
      labEquipment: {
        title: "Lab Equipment",
        description:
          "High-quality scientific instruments that improve efficiency and performance in the lab. We provide advanced equipment for precise measurements, analysis, and research applications.",
        feature1: "Advanced analytical instruments",
        feature2: "High-precision measurement tools",
        feature3: "Quality control equipment",
        feature4: "Research-grade laboratory devices",
      },
      labConsumables: {
        title: "Lab Consumables",
        description:
          "A wide selection of lab essentials and apparatus from the brands you know and trust. Our comprehensive range of consumables ensures your laboratory operations run smoothly.",
        feature1: "Chemical reagents and standards",
        feature2: "Glassware and plasticware",
        feature3: "Safety equipment and supplies",
        feature4: "Laboratory disposables",
      },
      teachingEquipment: {
        title: "Science Teaching Equipment",
        description:
          "Curriculum-relevant resources for teaching key science subjects: biology, chemistry, and physics, at all levels including university. Enhance educational outcomes with quality teaching tools.",
        feature1: "Educational lab kits and sets",
        feature2: "Demonstration equipment",
        feature3: "Student experiment supplies",
        feature4: "Teaching aids and models",
      },
      ctaTitle: "Need Quality Lab Equipment?",
      ctaSubtitle:
        "Contact us today to discuss your laboratory equipment and chemical supply needs. We're here to help you succeed.",
      ctaButton: "Contact Us Today",
    },
    contact: {
      title: "Contact Us",
      subtitle:
        "Get in touch with our team to discuss your laboratory equipment and chemical supply needs.",
      getInTouch: "Get In Touch",
      description:
        "Whether you have a question about our products, technical support, or anything else, our team is ready to answer all your questions.",
      email: "Email",
      phoneNumber: "Phone Number",
      officeLocation: "Office Location",
      address:
        "Building N. 2947, Alhamdania\nJeddah 7550, 72361, Unit No. 3\nKingdom of Saudi Arabia",
      sendMessage: "Send Us a Message",
      yourName: "Your Name",
      yourEmail: "Your Email",
      yourMessage: "Your Message",
      messagePlaceholder: "Tell us about your project or inquiry...",
      sendButton: "Send Message",
      sending: "Sending...",
      successMessage: "Thank you for your message! We'll get back to you soon.",
      errorMessage: "Something went wrong. Please try again later.",
    },
  },
  ar: {
    nav: {
      home: "الرئيسية",
      about: "من نحن",
      whatWeSupply: "ما نقدمه",
      contact: "اتصل بنا",
    },
    hero: {
      title: "حلول علمية وكيميائية متقدمة",
      subtitle:
        "نقدم معدات مختبرية متقدمة ومواد كيميائية ودعم متكامل لمساعدة الصناعات على الابتكار بثقة.",
    },
    trustedBy: {
      title: "شركاؤنا في النجاح",
    },
    stats: {
      productsProducing: "منتج يتم إنتاجه",
      happyClients: "عميل سعيد",
      achievementsReceived: "إنجاز تم تحقيقه",
      ourDealers: "وكيل لدينا",
    },
    whyChooseUs: {
      title: "لماذا تختارنا؟",
      subtitle:
        "اختارنا للحصول على حلول مبتكرة، جودة استثنائية، وموثوقية لا مثيل لها في معدات المختبرات والمواد الكيميائية.",
      innovative: {
        title: "حلول مبتكرة",
        description:
          "نوفر معدات مختبرية حديثة وحلول تقنية متقدمة تضعك في طليعة البحث العلمي.",
      },
      quality: {
        title: "جودة استثنائية",
        description:
          "فقط أعلى جودة من المعدات العلمية والمواد الكيميائية من العلامات التجارية الموثوقة، مما يضمن الدقة والموثوقية في عملك.",
      },
      reliability: {
        title: "موثوقية لا مثيل لها",
        description:
          "خدمة ودعم موثوق للقطاعين الحكومي والخاص. اعتمد علينا للتسليم في الوقت المحدد، في كل مرة.",
      },
    },
    whoWeAre: {
      title: "من نحن",
      subtitle:
        "شركة سعودية توفر المعدات العلمية والمختبرية للصناعات، مع حلول تقنية في مختلف المجالات.",
      missionTitle: "مهمتنا",
      mission1:
        "فيول إيست هي شركة سعودية توفر المعدات العلمية والمختبرية للصناعات والمواد الكيميائية الخام المستخدمة في التحليل، إلى جانب الحلول التقنية في مختلف المجالات.",
      mission2:
        "نقدم أحدث معدات المختبرات الكيميائية وحلول الخدمات التقنية الداعمة للقطاعين الحكومي والخاص في جميع أنحاء المملكة العربية السعودية.",
      mission3:
        "التزامنا هو تقديم منتجات عالية الجودة وخدمة استثنائية، لضمان حصول عملائنا على أفضل المعدات والمواد العلمية المتاحة.",
      coreValuesTitle: "قيمنا الأساسية",
      quality: "الجودة:",
      qualityDesc: "نوفر فقط أعلى جودة من المعدات والمواد العلمية.",
      innovation: "الابتكار:",
      innovationDesc: "نبقى في طليعة التقدم العلمي والتكنولوجي.",
      reliability: "الموثوقية:",
      reliabilityDesc: "يمكن لعملائنا الاعتماد علينا للحصول على خدمة ودعم موثوق.",
      excellence: "التميز:",
      excellenceDesc: "نسعى للتميز في كل جانب من جوانب أعمالنا.",
    },
    whatWeSupply: {
      title: "ما نقدمه",
      subtitle:
        "معدات علمية عالية الجودة، مستهلكات، وموارد تعليمية للمختبرات والمؤسسات التعليمية.",
      labEquipment: {
        title: "معدات المختبرات",
        description:
          "أدوات علمية عالية الجودة تحسن الكفاءة والأداء في المختبر. نوفر معدات متقدمة لقياسات دقيقة وتحليل وتطبيقات بحثية.",
        feature1: "أدوات تحليلية متقدمة",
        feature2: "أدوات قياس عالية الدقة",
        feature3: "معدات مراقبة الجودة",
        feature4: "أجهزة مختبرية بمستوى بحثي",
      },
      labConsumables: {
        title: "مستهلكات المختبرات",
        description:
          "مجموعة واسعة من أساسيات وأجهزة المختبر من العلامات التجارية التي تعرفها وتثق بها. مجموعتنا الشاملة من المستهلكات تضمن سير عمليات مختبرك بسلاسة.",
        feature1: "كواشف ومعايير كيميائية",
        feature2: "أدوات زجاجية وبلاستيكية",
        feature3: "معدات وإمدادات السلامة",
        feature4: "مستهلكات مختبرية",
      },
      teachingEquipment: {
        title: "معدات تدريس العلوم",
        description:
          "موارد ذات صلة بالمناهج الدراسية لتدريس مواد العلوم الرئيسية: الأحياء، الكيمياء، والفيزياء، على جميع المستويات بما في ذلك الجامعة. عزز النتائج التعليمية بأدوات تدريس عالية الجودة.",
        feature1: "مجموعات وأطقم مختبرات تعليمية",
        feature2: "معدات العرض التوضيحي",
        feature3: "مستلزمات تجارب الطلاب",
        feature4: "وسائل ونماذج تعليمية",
      },
      ctaTitle: "هل تحتاج معدات مختبر عالية الجودة؟",
      ctaSubtitle:
        "اتصل بنا اليوم لمناقشة احتياجاتك من معدات المختبرات والمواد الكيميائية. نحن هنا لمساعدتك على النجاح.",
      ctaButton: "اتصل بنا اليوم",
    },
    contact: {
      title: "اتصل بنا",
      subtitle:
        "تواصل مع فريقنا لمناقشة احتياجاتك من معدات المختبرات والمواد الكيميائية.",
      getInTouch: "تواصل معنا",
      description:
        "سواء كان لديك سؤال حول منتجاتنا أو الدعم الفني أو أي شيء آخر، فريقنا جاهز للإجابة على جميع أسئلتك.",
      email: "البريد الإلكتروني",
      phoneNumber: "رقم الهاتف",
      officeLocation: "موقع المكتب",
      address:
        "المبنى رقم 2947، الحمدانية\nجدة 7550، 72361، وحدة رقم 3\nالمملكة العربية السعودية",
      sendMessage: "أرسل لنا رسالة",
      yourName: "اسمك",
      yourEmail: "بريدك الإلكتروني",
      yourMessage: "رسالتك",
      messagePlaceholder: "أخبرنا عن مشروعك أو استفسارك...",
      sendButton: "إرسال الرسالة",
      sending: "جاري الإرسال...",
      successMessage: "شكرا لرسالتك! سنعاود الاتصال بك قريباً.",
      errorMessage: "حدث خطأ ما. يرجى المحاولة مرة أخرى لاحقاً.",
    },
  },
};
