import { motion } from "framer-motion";
import { Database, Bot, CalendarCheck } from "lucide-react";
import { useLang } from "@/lib/i18n";

export default function HowItWorks() {
  const { t } = useLang();

  const steps = [
    {
      icon: <Database className="w-8 h-8 text-primary" />,
      title: t("how", "s1Title"),
      description: t("how", "s1Desc"),
      number: "01",
    },
    {
      icon: <Bot className="w-8 h-8 text-primary" />,
      title: t("how", "s2Title"),
      description: t("how", "s2Desc"),
      number: "02",
    },
    {
      icon: <CalendarCheck className="w-8 h-8 text-primary" />,
      title: t("how", "s3Title"),
      description: t("how", "s3Desc"),
      number: "03",
    },
  ];

  return (
    <section id="how-it-works" className="py-24 bg-surface border-y border-border">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-5xl font-bold text-white mb-4"
          >
            {t("how", "title")}
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-lg text-muted-foreground max-w-2xl mx-auto"
          >
            {t("how", "subtitle")}
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
          <div className="hidden md:block absolute top-1/4 left-[10%] right-[10%] h-[1px] bg-border z-0" />

          {steps.map((step, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
              className="relative z-10 flex flex-col items-center text-center group"
            >
              <div className="w-20 h-20 rounded-2xl bg-card border border-border flex items-center justify-center mb-6 relative group-hover:border-primary/50 group-hover:shadow-[0_0_20px_-5px_rgba(37,99,235,0.4)] transition-all duration-300">
                {step.icon}
                <div className="absolute -top-3 -right-3 w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center text-sm font-bold shadow-lg">
                  {step.number}
                </div>
              </div>
              <h3 className="text-xl font-bold text-white mb-3">{step.title}</h3>
              <p className="text-muted-foreground leading-relaxed">{step.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
