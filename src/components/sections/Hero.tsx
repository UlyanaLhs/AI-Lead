import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight, MessageSquare, Zap } from "lucide-react";
import { useLang } from "@/lib/i18n";

const CTA_URL =
  "https://docs.google.com/forms/d/e/1FAIpQLScRZWbxH4rKyEFFhl7L42c0A2kP8mshC5RTVmgImFS6J9KeMA/viewform";

function secondsUntilSunday() {
  const now = new Date();
  const nextSunday = new Date(now);
  const day = now.getDay();
  const daysToAdd = day === 0 ? 0 : 7 - day;
  nextSunday.setDate(now.getDate() + daysToAdd);
  nextSunday.setHours(23, 59, 59, 0);
  let diff = Math.floor((nextSunday.getTime() - now.getTime()) / 1000);
  if (diff <= 0) {
    nextSunday.setDate(nextSunday.getDate() + 7);
    diff = Math.floor((nextSunday.getTime() - now.getTime()) / 1000);
  }
  return diff;
}

function TimerUnit({ value, label }: { value: number; label: string }) {
  return (
    <div
      style={{
        background: "#1a1a1a",
        border: "1px solid #2a2a2a",
        borderRadius: "8px",
        padding: "8px 14px",
        textAlign: "center",
        minWidth: "56px",
      }}
    >
      <div style={{ color: "white", fontSize: "22px", fontWeight: 500, lineHeight: 1.2 }}>
        {String(value).padStart(2, "0")}
      </div>
      <div style={{ color: "#9ca3af", fontSize: "11px", marginTop: "2px" }}>{label}</div>
    </div>
  );
}

export default function Hero() {
  const { t } = useLang();
  const [secs, setSecs] = useState(() => secondsUntilSunday());

  useEffect(() => {
    const id = setInterval(() => setSecs(secondsUntilSunday()), 1000);
    return () => clearInterval(id);
  }, []);

  const days = Math.floor(secs / 86400);
  const hours = Math.floor((secs % 86400) / 3600);
  const minutes = Math.floor((secs % 3600) / 60);
  const seconds = secs % 60;

  return (
    <section className="relative pt-32 pb-20 md:pt-48 md:pb-32 overflow-hidden flex items-center min-h-[90vh]">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-primary/10 via-background to-background -z-10" />

      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-8">
          <div className="flex-1 text-center lg:text-left max-w-3xl mx-auto lg:mx-0">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <div className="inline-flex items-start rounded-full border border-primary/30 bg-primary/10 px-3 py-1 text-sm font-medium text-primary mb-6 text-left">
                <Zap className="mr-2 h-4 w-4 mt-0.5 shrink-0" />
                <span>{t("hero", "eyebrow")}</span>
              </div>
              <h1 className="text-4xl md:text-6xl lg:text-7xl font-extrabold tracking-tight text-white mb-6 leading-[1.1]">
                {t("hero", "headlineStart")} <br className="hidden md:block" />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-primary">
                  {t("hero", "headlineAccent")}
                </span>{" "}
                {t("hero", "headlineEnd")}
              </h1>
              <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-2xl mx-auto lg:mx-0 leading-relaxed">
                {t("hero", "subheadline")}
              </p>

              <div className="flex flex-col sm:flex-row items-center gap-4 justify-center lg:justify-start">
                <Button
                  size="lg"
                  className="w-full sm:w-auto text-lg h-14 px-8 rounded-full shadow-[0_0_40px_-10px_rgba(37,99,235,0.5)] hover:shadow-[0_0_60px_-10px_rgba(37,99,235,0.6)] transition-all"
                  onClick={() => window.open(CTA_URL, "_blank", "noopener,noreferrer")}
                >
                  {t("hero", "cta")} <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </div>
              <p className="mt-4 text-xs md:text-sm text-muted-foreground font-medium">
                {t("hero", "trust")}
              </p>

              <div className="mt-6">
                <p style={{ color: "#9ca3af", fontSize: "13px", textAlign: "center", marginBottom: "8px" }}
                   className="lg:text-left">
                  {t("urgencyTimer", "label")}
                </p>
                <div className="flex gap-2 justify-center lg:justify-start flex-wrap">
                  <TimerUnit value={days} label={t("urgencyTimer", "days")} />
                  <TimerUnit value={hours} label={t("urgencyTimer", "hrs")} />
                  <TimerUnit value={minutes} label={t("urgencyTimer", "min")} />
                  <TimerUnit value={seconds} label={t("urgencyTimer", "sec")} />
                </div>
              </div>
            </motion.div>
          </div>

          <motion.div
            className="flex-1 w-full max-w-md lg:max-w-none relative"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.2 }}
          >
            <div className="relative rounded-2xl border border-border bg-card/50 backdrop-blur-sm p-6 shadow-2xl">
              <div className="absolute -top-4 -right-4 h-24 w-24 bg-primary/30 blur-3xl rounded-full" />
              <div className="absolute -bottom-4 -left-4 h-32 w-32 bg-blue-600/20 blur-3xl rounded-full" />

              <div className="flex items-center gap-3 mb-6 pb-4 border-b border-border">
                <div className="h-10 w-10 rounded-full bg-primary/20 flex items-center justify-center text-primary">
                  <MessageSquare size={20} />
                </div>
                <div>
                  <div className="text-sm font-semibold text-white">{t("hero", "chatAgentName")}</div>
                  <div className="text-xs text-green-400 flex items-center gap-1">
                    <span className="relative flex h-2 w-2">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                    </span>
                    {t("hero", "chatStatus")}
                  </div>
                </div>
              </div>

              <div className="space-y-4 text-sm">
                <motion.div
                  initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.8 }}
                  className="bg-primary text-primary-foreground p-3 rounded-2xl rounded-tr-sm w-[85%] ml-auto shadow-sm"
                >
                  {t("hero", "chatMsg1")}
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 1.5 }}
                  className="bg-muted text-muted-foreground p-3 rounded-2xl rounded-tl-sm w-[80%] mr-auto"
                >
                  {t("hero", "chatMsg2")}
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 2.2 }}
                  className="bg-primary text-primary-foreground p-3 rounded-2xl rounded-tr-sm w-[85%] ml-auto shadow-sm"
                >
                  {t("hero", "chatMsg3")}
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 2.9 }}
                  className="bg-muted text-muted-foreground p-3 rounded-2xl rounded-tl-sm w-[60%] mr-auto"
                >
                  {t("hero", "chatMsg4")}
                </motion.div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
