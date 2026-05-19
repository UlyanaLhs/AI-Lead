import { motion } from "framer-motion";
import { Quote } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { useLang } from "@/lib/i18n";

export default function CaseStudies() {
  const { t } = useLang();

  const studies = [
    {
      business: t("cases", "c1Business"),
      result: t("cases", "c1Result"),
      context: t("cases", "c1Context"),
    },
    {
      business: t("cases", "c2Business"),
      result: t("cases", "c2Result"),
      context: t("cases", "c2Context"),
    },
  ];

  return (
    <section className="py-24 bg-surface border-y border-border">
      <div className="container mx-auto px-4 md:px-6">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-3xl md:text-5xl font-bold text-white mb-12 text-center"
        >
          {t("cases", "title")}
        </motion.h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {studies.map((study, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.2 }}
            >
              <Card className="bg-card border-border h-full relative overflow-hidden">
                <Quote className="absolute top-6 right-6 w-12 h-12 text-primary/10 rotate-180" />
                <CardContent className="p-8 pt-10">
                  <div className="text-sm font-bold text-muted-foreground uppercase tracking-wider mb-6">
                    {study.business}
                  </div>
                  <div className="text-3xl font-bold text-primary mb-2">{study.result}</div>
                  <div className="text-xl text-white">{study.context}</div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
