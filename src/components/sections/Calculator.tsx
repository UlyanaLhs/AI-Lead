import { useState } from "react";
import { motion } from "framer-motion";
import { useLang } from "@/lib/i18n";

const CTA_URL =
  "https://docs.google.com/forms/d/e/1FAIpQLScRZWbxH4rKyEFFhl7L42c0A2kP8mshC5RTVmgImFS6J9KeMA/viewform";

export default function Calculator() {
  const { t } = useLang();
  const [leads, setLeads] = useState(500);
  const [clientValue, setClientValue] = useState(1000);

  const recoverable = Math.round(leads * 0.08);
  const revenue = Math.round(recoverable * clientValue);
  const roi = (revenue / 2997).toFixed(1);

  return (
    <section id="calculator" className="py-24 bg-surface border-y border-border">
      <div className="container mx-auto px-4 md:px-6 max-w-3xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-4">
            {t("calculator", "title")}
          </h2>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
        >
          <div className="rounded-xl border border-border bg-card p-8 md:p-10">
            <div className="space-y-8 mb-6">
              <div>
                <label className="block text-sm font-medium text-muted-foreground mb-3">
                  {t("calculator", "slider1Label")}{" "}
                  <span className="text-white font-bold">{leads.toLocaleString()}</span>
                </label>
                <input
                  type="range"
                  min={50}
                  max={10000}
                  step={50}
                  value={leads}
                  onChange={(e) => setLeads(Number(e.target.value))}
                  className="w-full h-1.5 rounded-full appearance-none cursor-pointer accent-blue-600"
                  style={{ background: `linear-gradient(to right, #2563eb ${(leads / 10000) * 100}%, #2a2a2a ${(leads / 10000) * 100}%)` }}
                />
                <div className="flex justify-between text-xs text-muted-foreground mt-1">
                  <span>50</span>
                  <span>10,000</span>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-muted-foreground mb-3">
                  {t("calculator", "slider2Label")}
                  <span className="text-white font-bold">{clientValue.toLocaleString()}</span>
                </label>
                <input
                  type="range"
                  min={100}
                  max={10000}
                  step={100}
                  value={clientValue}
                  onChange={(e) => setClientValue(Number(e.target.value))}
                  className="w-full h-1.5 rounded-full appearance-none cursor-pointer accent-blue-600"
                  style={{ background: `linear-gradient(to right, #2563eb ${(clientValue / 10000) * 100}%, #2a2a2a ${(clientValue / 10000) * 100}%)` }}
                />
                <div className="flex justify-between text-xs text-muted-foreground mt-1">
                  <span>$100</span>
                  <span>$10,000</span>
                </div>
              </div>
            </div>

            <div
              className="rounded-lg p-6 mt-6 space-y-4"
              style={{ background: "#0f1929", border: "1px solid #2563eb" }}
            >
              <div className="flex justify-between items-center">
                <span className="text-sm" style={{ color: "#9ca3af" }}>
                  {t("calculator", "recoverableLabel")}
                </span>
                <span className="text-white font-semibold text-base">{recoverable}</span>
              </div>

              <div className="flex justify-between items-center">
                <span className="text-sm" style={{ color: "#9ca3af" }}>
                  {t("calculator", "revenueLabel")}
                </span>
                <span className="text-white font-bold text-2xl md:text-3xl">
                  ${revenue.toLocaleString()}
                </span>
              </div>

              <div style={{ color: "#9ca3af", fontSize: "14px" }}>
                {t("calculator", "investmentLine")}
              </div>

              <div className="flex justify-between items-center pt-2 border-t border-border">
                <span className="text-sm" style={{ color: "#9ca3af" }}>
                  {t("calculator", "roiLabel")}
                </span>
                <span className="font-bold text-xl" style={{ color: "#10b981" }}>
                  {roi}x
                </span>
              </div>
            </div>

            <div className="mt-5 text-center">
              <a
                href={CTA_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm font-medium hover:underline"
                style={{ color: "#2563eb", fontSize: "15px" }}
              >
                {t("calculator", "cta")}
              </a>
            </div>
            <p className="mt-3 text-center" style={{ color: "#6b7280", fontSize: "11px" }}>
              {t("calculator", "disclaimer")}
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
