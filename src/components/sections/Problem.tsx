import { motion } from "framer-motion";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { AlertCircle, Clock, TrendingDown } from "lucide-react";
import { useLang } from "@/lib/i18n";

export default function Problem() {
  const { t } = useLang();

  const problems = [
    { icon: <AlertCircle className="w-10 h-10 text-primary mb-4" />, title: t("problem", "p1") },
    { icon: <Clock className="w-10 h-10 text-primary mb-4" />, title: t("problem", "p2") },
    { icon: <TrendingDown className="w-10 h-10 text-primary mb-4" />, title: t("problem", "p3") },
  ];

  return (
    <section className="py-24 bg-background">
      <div className="container mx-auto px-4 md:px-6">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-3xl md:text-5xl font-bold text-white mb-12 text-center"
        >
          {t("problem", "title")}
        </motion.h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {problems.map((problem, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Card className="bg-surface border-border h-full hover:border-primary/50 transition-colors duration-300">
                <CardHeader>
                  {problem.icon}
                  <CardTitle className="text-xl leading-relaxed text-white font-medium">
                    "{problem.title}"
                  </CardTitle>
                </CardHeader>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
