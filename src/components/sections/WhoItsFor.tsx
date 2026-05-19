import { motion } from "framer-motion";
import { Stethoscope, Building2, Activity, Dumbbell, Globe, GraduationCap } from "lucide-react";
import { Card } from "@/components/ui/card";
import { useLang } from "@/lib/i18n";

export default function WhoItsFor() {
  const { t } = useLang();

  const niches = [
    { name: t("who", "n1"), icon: <Stethoscope className="w-6 h-6" /> },
    { name: t("who", "n2"), icon: <Building2 className="w-6 h-6" /> },
    { name: t("who", "n3"), icon: <Activity className="w-6 h-6" /> },
    { name: t("who", "n4"), icon: <Dumbbell className="w-6 h-6" /> },
    { name: t("who", "n5"), icon: <Globe className="w-6 h-6" /> },
    { name: t("who", "n6"), icon: <GraduationCap className="w-6 h-6" /> },
  ];

  return (
    <section id="who-its-for" className="py-24 bg-background">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-5xl font-bold text-white mb-4"
          >
            {t("who", "title")}
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-lg text-muted-foreground max-w-2xl mx-auto"
          >
            {t("who", "subtitle")}
          </motion.p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {niches.map((niche, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
            >
              <Card className="bg-surface border-border hover:bg-card transition-colors flex items-center p-6 gap-4">
                <div className="p-3 rounded-xl bg-primary/10 text-primary border border-primary/20">
                  {niche.icon}
                </div>
                <div className="font-semibold text-white">{niche.name}</div>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
