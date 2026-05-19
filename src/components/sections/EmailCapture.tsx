import { useState } from "react";
import { motion } from "framer-motion";
import { useLang } from "@/lib/i18n";

export default function EmailCapture() {
  const { t } = useLang();
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "success" | "error" | "validation">("idle");
  const [loading, setLoading] = useState(false);

  const validateEmail = (val: string) =>
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateEmail(email)) {
      setStatus("validation");
      return;
    }
    setLoading(true);
    try {
      const res = await fetch("https://formspree.io/f/YOURFORMID", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      if (res.ok) {
        setStatus("success");
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="lead-magnet" className="py-12 bg-background">
      <div className="container mx-auto px-4 md:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-3xl mx-auto rounded-xl px-8 py-8 md:px-10"
          style={{
            background: "#111111",
            borderLeft: "3px solid #2563eb",
            borderRadius: "12px",
          }}
        >
          {status === "success" ? (
            <p className="text-center text-base font-medium" style={{ color: "#10b981" }}>
              {t("emailCapture", "success")}
            </p>
          ) : (
            <>
              <p className="text-white font-medium mb-2" style={{ fontSize: "20px" }}>
                {t("emailCapture", "headline")}
              </p>
              <p className="mb-5" style={{ color: "#9ca3af", fontSize: "15px" }}>
                {t("emailCapture", "subtext")}
              </p>

              <form onSubmit={handleSubmit} noValidate>
                <div className="flex flex-col sm:flex-row gap-3">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value);
                      if (status === "validation") setStatus("idle");
                    }}
                    placeholder={t("emailCapture", "placeholder")}
                    className="flex-1 outline-none focus:ring-1 focus:ring-blue-600 transition-all"
                    style={{
                      background: "#1a1a1a",
                      border: "1px solid #2a2a2a",
                      color: "white",
                      padding: "12px 16px",
                      borderRadius: "8px",
                      fontSize: "15px",
                    }}
                  />
                  <button
                    type="submit"
                    disabled={loading}
                    style={{
                      background: "#2563eb",
                      color: "white",
                      padding: "12px 24px",
                      borderRadius: "8px",
                      border: "none",
                      cursor: loading ? "not-allowed" : "pointer",
                      fontSize: "15px",
                      whiteSpace: "nowrap",
                      opacity: loading ? 0.7 : 1,
                      transition: "background 0.2s",
                    }}
                    onMouseEnter={(e) => {
                      if (!loading) (e.currentTarget as HTMLButtonElement).style.background = "#1d4ed8";
                    }}
                    onMouseLeave={(e) => {
                      (e.currentTarget as HTMLButtonElement).style.background = "#2563eb";
                    }}
                  >
                    {loading ? "..." : t("emailCapture", "button")}
                  </button>
                </div>

                {status === "validation" && (
                  <p className="mt-2 text-sm" style={{ color: "#ef4444" }}>
                    {t("emailCapture", "validationError")}
                  </p>
                )}
                {status === "error" && (
                  <p className="mt-2 text-sm" style={{ color: "#ef4444" }}>
                    {t("emailCapture", "error")}
                  </p>
                )}
              </form>
            </>
          )}
        </motion.div>
      </div>
    </section>
  );
}
