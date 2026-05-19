import { motion } from "framer-motion";
import { useLang } from "@/lib/i18n";

export default function ProcessTimeline() {
  const { t } = useLang();

  const steps = [
    { num: 1, title: t("process", "s1Title"), desc: t("process", "s1Desc") },
    { num: 2, title: t("process", "s2Title"), desc: t("process", "s2Desc") },
    { num: 3, title: t("process", "s3Title"), desc: t("process", "s3Desc") },
    { num: 4, title: t("process", "s4Title"), desc: t("process", "s4Desc") },
  ];

  return (
    <section id="process" className="py-24 bg-background">
      <div className="container mx-auto px-4 md:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-4">
            {t("process", "title")}
          </h2>
        </motion.div>

        <div className="relative max-w-5xl mx-auto">
          <div className="hidden md:block absolute top-[20px] left-[calc(12.5%+20px)] right-[calc(12.5%+20px)] border-t border-dashed border-border" />

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 md:gap-4">
            {steps.map((step, index) => (
              <motion.div
                key={step.num}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.12 }}
                className="flex flex-col items-center text-center px-4 md:px-6 relative"
              >
                <div
                  className="relative z-10 flex items-center justify-center rounded-full text-white font-medium mb-4 shrink-0"
                  style={{
                    width: 40,
                    height: 40,
                    background: "#2563eb",
                    fontSize: 16,
                  }}
                >
                  {step.num}
                </div>
                <p className="text-white font-medium mb-2" style={{ fontSize: 16 }}>
                  {step.title}
                </p>
                <p className="text-muted-foreground" style={{ fontSize: 14, lineHeight: 1.6 }}>
                  {step.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
