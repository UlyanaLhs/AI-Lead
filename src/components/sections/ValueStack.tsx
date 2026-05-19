import { motion } from "framer-motion";
import { Check } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { useLang } from "@/lib/i18n";

export default function ValueStack() {
  const { t } = useLang();

  const items = [
    { name: t("value", "i1"), value: "$2,000" },
    { name: t("value", "i2"), value: "$500" },
    { name: t("value", "i3"), value: "$800" },
    { name: t("value", "i4"), value: "$600" },
    { name: t("value", "i5"), value: "$1,200" },
    { name: t("value", "i6"), value: "$400" },
  ];

  return (
    <section className="py-24 bg-surface border-y border-border">
      <div className="container mx-auto px-4 md:px-6 max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <Card className="bg-card border-border overflow-hidden">
            <CardContent className="p-0">
              <div className="p-8 md:p-10">
                <h2 className="text-2xl md:text-3xl font-bold text-white mb-8 text-center">
                  {t("value", "title")}
                </h2>

                <div className="space-y-4 mb-8">
                  {items.map((item, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.1 }}
                      className="flex items-center justify-between gap-4 py-3 border-b border-border/50 last:border-0"
                    >
                      <div className="flex items-center gap-3 min-w-0">
                        <div className="h-6 w-6 rounded-full bg-primary/20 flex items-center justify-center text-primary flex-shrink-0">
                          <Check size={14} />
                        </div>
                        <span className="text-muted-foreground md:text-lg">{item.name}</span>
                      </div>
                      <span className="text-white font-mono shrink-0">{item.value}</span>
                    </motion.div>
                  ))}
                </div>

                <div className="mt-10 pt-8 border-t border-border">
                  <div className="flex justify-between items-center mb-4 gap-4">
                    <span className="text-xl text-muted-foreground font-medium">
                      {t("value", "totalLabel")}
                    </span>
                    <span className="text-xl text-muted-foreground line-through decoration-destructive decoration-2 font-mono">
                      $14,800
                    </span>
                  </div>
                  <div className="flex justify-between items-end gap-4">
                    <span className="text-2xl md:text-3xl font-bold text-white">
                      {t("value", "youPayLabel")}
                    </span>
                    <div className="text-right">
                      <span className="text-sm text-primary block mb-1 font-semibold uppercase tracking-wider">
                        {t("value", "fromLabel")}
                      </span>
                      <span className="text-4xl md:text-6xl font-extrabold text-primary tracking-tighter">
                        $2,997
                      </span>
                      <span className="text-sm text-muted-foreground block mt-1">
                        {t("value", "forPilot")}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </section>
  );
}
