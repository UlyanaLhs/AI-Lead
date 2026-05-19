import { useState, useEffect } from "react";
import { Link } from "wouter";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useLang } from "@/lib/i18n";

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { lang, setLang, t } = useLang();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const CTA_URL =
    "https://docs.google.com/forms/d/e/1FAIpQLScRZWbxH4rKyEFFhl7L42c0A2kP8mshC5RTVmgImFS6J9KeMA/viewform";

  const openCta = () => {
    window.open(CTA_URL, "_blank", "noopener,noreferrer");
  };

  const scrollTo = (id: string) => {
    setIsMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  const navLinks = [
    { name: t("nav", "howItWorks"), id: "how-it-works" },
    { name: t("nav", "whoItsFor"), id: "who-its-for" },
    { name: t("nav", "pricing"), id: "pricing" },
    { name: t("nav", "faq"), id: "faq" },
  ];

  const LangSwitcher = ({ size = "sm" }: { size?: "sm" | "lg" }) => (
    <div
      className={`inline-flex items-center rounded-full border border-border bg-card/60 backdrop-blur-sm overflow-hidden ${
        size === "lg" ? "text-base" : "text-xs"
      }`}
      role="group"
      aria-label="Language switcher"
    >
      <button
        type="button"
        onClick={() => setLang("en")}
        aria-pressed={lang === "en"}
        className={`px-3 py-1.5 transition-colors ${
          lang === "en"
            ? "bg-primary text-primary-foreground font-bold"
            : "text-muted-foreground hover:text-white"
        }`}
        data-testid="lang-en"
      >
        EN
      </button>
      <span className="text-border" aria-hidden>
        |
      </span>
      <button
        type="button"
        onClick={() => setLang("ru")}
        aria-pressed={lang === "ru"}
        className={`px-3 py-1.5 transition-colors ${
          lang === "ru"
            ? "bg-primary text-primary-foreground font-bold"
            : "text-muted-foreground hover:text-white"
        }`}
        data-testid="lang-ru"
      >
        RU
      </button>
    </div>
  );

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 border-b ${
        isScrolled
          ? "bg-background/80 backdrop-blur-md border-border"
          : "bg-transparent border-transparent"
      }`}
    >
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex items-center justify-between h-16 md:h-20">
          <div className="flex items-center gap-2">
            <Link href="/" className="flex flex-col">
              <span className="text-xl font-bold tracking-tight text-white">AI Lead Revival</span>
              <span className="text-[10px] uppercase tracking-widest text-primary font-semibold">Revenue System AI</span>
            </Link>
          </div>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-6">
            <ul className="flex items-center gap-6 text-sm font-medium text-muted-foreground">
              {navLinks.map((link) => (
                <li key={link.id}>
                  <button
                    onClick={() => scrollTo(link.id)}
                    className="hover:text-white transition-colors"
                  >
                    {link.name}
                  </button>
                </li>
              ))}
            </ul>
            <LangSwitcher />
            <Button onClick={openCta}>{t("nav", "bookCall")}</Button>
          </nav>

          {/* Mobile Controls */}
          <div className="md:hidden flex items-center gap-2">
            <LangSwitcher />
            <button
              className="p-2 text-white"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Nav Overlay */}
      {isMobileMenuOpen && (
        <div className="md:hidden absolute top-full left-0 right-0 bg-card border-b border-border shadow-xl p-4 flex flex-col gap-4 animate-in slide-in-from-top-2">
          <ul className="flex flex-col gap-4 text-center">
            {navLinks.map((link) => (
              <li key={link.id}>
                <button
                  onClick={() => scrollTo(link.id)}
                  className="text-lg font-medium text-muted-foreground hover:text-white w-full py-2"
                >
                  {link.name}
                </button>
              </li>
            ))}
          </ul>
          <Button onClick={openCta} className="w-full" size="lg">
            {t("nav", "bookCall")}
          </Button>
        </div>
      )}
    </header>
  );
}
