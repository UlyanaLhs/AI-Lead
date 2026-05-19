import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { useLang } from "@/lib/i18n";

const CTA_URL =
  "https://docs.google.com/forms/d/e/1FAIpQLScRZWbxH4rKyEFFhl7L42c0A2kP8mshC5RTVmgImFS6J9KeMA/viewform";

export default function FinalCTA() {
  const { t } = useLang();

  return (
    <section id="cta" className="py-32 bg-background relative overflow-hidden">
      <div className="absolute inset-0 bg-primary/5 -z-10" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary/20 blur-[120px] rounded-full pointer-events-none -z-10" />

      <div className="container mx-auto px-4 md:px-6 text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="max-w-3xl mx-auto"
        >
          <h2 className="text-4xl md:text-6xl font-extrabold text-white mb-6 tracking-tight">
            {t("finalCta", "title")}
          </h2>
          <p className="text-xl md:text-2xl text-muted-foreground mb-10 leading-relaxed">
            {t("finalCta", "sub")}
          </p>

          <div className="flex flex-col items-center gap-4">
            <Button
              size="lg"
              className="text-lg h-16 px-10 rounded-full shadow-[0_0_40px_-10px_rgba(37,99,235,0.5)] hover:shadow-[0_0_60px_-10px_rgba(37,99,235,0.8)] transition-all"
              onClick={() => window.open(CTA_URL, "_blank", "noopener,noreferrer")}
            >
              {t("finalCta", "cta")} <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            <p className="text-sm font-medium text-muted-foreground">
              {t("finalCta", "small")}
            </p>
            <div
              className="flex flex-wrap items-center justify-center gap-6 mt-2"
              style={{ color: "#9ca3af", fontSize: "13px" }}
            >
              {(["trust1", "trust2", "trust3"] as const).map((key) => (
                <span key={key} className="flex items-center gap-1.5">
                  <span
                    style={{
                      width: "8px",
                      height: "8px",
                      background: "#10b981",
                      borderRadius: "50%",
                      display: "inline-block",
                      flexShrink: 0,
                    }}
                  />
                  {t("finalCta", key)}
                </span>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
