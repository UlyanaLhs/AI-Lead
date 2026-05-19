import { motion } from "framer-motion";
import { useLang } from "@/lib/i18n";

const bonuses = [
  { num: 1, titleKey: "b1Title", textKey: "b1Text", valueKey: "b1Value" },
  { num: 2, titleKey: "b2Title", textKey: "b2Text", valueKey: "b2Value" },
  { num: 3, titleKey: "b3Title", textKey: "b3Text", valueKey: "b3Value" },
  { num: 4, titleKey: "b4Title", textKey: "b4Text", valueKey: "b4Value" },
] as const;

export default function BonusStack() {
  const { t } = useLang();

  return (
    <section id="bonuses" className="py-24 bg-background">
      <div className="container mx-auto px-4 md:px-6 max-w-5xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-4"
        >
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-4">
            {t("bonuses", "title")}
          </h2>
          <p style={{ color: "#9ca3af", fontSize: "16px", textAlign: "center", marginBottom: "40px" }}>
            {t("bonuses", "subtitle")}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {bonuses.map((b, i) => (
            <motion.div
              key={b.num}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.08 }}
              style={{
                background: "#1a1a1a",
                border: "1px solid #2a2a2a",
                borderRadius: "12px",
                padding: "24px",
              }}
            >
              <div className="flex items-start justify-between mb-3">
                <span
                  style={{
                    background: "#2563eb",
                    color: "white",
                    fontSize: "11px",
                    fontWeight: 500,
                    padding: "4px 10px",
                    borderRadius: "4px",
                    display: "inline-block",
                  }}
                >
                  BONUS {b.num}
                </span>
                <span style={{ color: "#10b981", fontSize: "13px" }}>
                  {t("bonuses", b.valueKey)}
                </span>
              </div>
              <h3 className="text-white font-semibold text-base mb-2">
                {t("bonuses", b.titleKey)}
              </h3>
              <p style={{ color: "#9ca3af", fontSize: "14px", lineHeight: "1.6" }}>
                {t("bonuses", b.textKey)}
              </p>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          style={{
            background: "#0f1929",
            border: "1px solid #2563eb",
            borderRadius: "8px",
            padding: "20px 24px",
            marginTop: "24px",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            flexWrap: "wrap",
            gap: "8px",
          }}
        >
          <span style={{ color: "#9ca3af", fontSize: "15px" }}>
            {t("bonuses", "totalLabel")}
          </span>
          <span style={{ color: "#10b981", fontSize: "24px", fontWeight: 500 }}>
            $1,388
          </span>
        </motion.div>
      </div>
    </section>
  );
}
