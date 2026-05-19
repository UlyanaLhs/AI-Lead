import { motion } from "framer-motion";
import { ShieldCheck } from "lucide-react";
import { useLang } from "@/lib/i18n";

export default function Guarantee() {
  const { t } = useLang();

  return (
    <section className="py-16 bg-background relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-primary/10 via-background to-background -z-10" />

      <div className="container mx-auto px-4 md:px-6">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="max-w-3xl mx-auto relative"
        >
          <div className="absolute -inset-1 bg-gradient-to-r from-primary to-blue-600 rounded-2xl blur opacity-20" />
          <div className="relative bg-card rounded-2xl border-2 border-dashed border-primary/60 p-8 md:p-12 text-center shadow-xl">
            <div className="mx-auto w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mb-6 text-primary">
              <ShieldCheck size={32} />
            </div>
            <h2 style={{ color: "white", fontSize: "26px", fontWeight: 500, textAlign: "center", marginBottom: "24px" }}>
              {t("guarantee", "title")}
            </h2>
            <div
              style={{
                color: "#9ca3af",
                fontSize: "16px",
                lineHeight: "1.8",
                textAlign: "center",
                maxWidth: "640px",
                margin: "0 auto",
              }}
            >
              <p className="mb-4 font-medium" style={{ color: "#e5e7eb" }}>
                {t("guarantee", "body1")}
              </p>
              <p className="mb-4">
                {t("guarantee", "body2")}
              </p>
              <p className="mb-4">
                {t("guarantee", "body3")}
              </p>
              <p>
                {t("guarantee", "body4")}
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
