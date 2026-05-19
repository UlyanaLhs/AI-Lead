import { motion } from "framer-motion";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { useLang } from "@/lib/i18n";

export default function FAQ() {
  const { t } = useLang();

  const faqs = [
    { q: t("faq", "q1"), a: t("faq", "a1") },
    { q: t("faq", "q2"), a: t("faq", "a2") },
    { q: t("faq", "q3"), a: t("faq", "a3") },
    { q: t("faq", "q4"), a: t("faq", "a4") },
    { q: t("faq", "q5"), a: t("faq", "a5") },
    { q: t("faq", "q6"), a: t("faq", "a6") },
    { q: t("faq", "q7"), a: t("faq", "a7") },
    { q: t("faq", "q8"), a: t("faq", "a8") },
  ];

  return (
    <section id="faq" className="py-24 bg-background">
      <div className="container mx-auto px-4 md:px-6 max-w-3xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-4">
            {t("faq", "title")}
          </h2>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
        >
          <Accordion type="single" collapsible className="w-full">
            {faqs.map((faq, index) => (
              <AccordionItem key={index} value={`item-${index}`} className="border-border">
                <AccordionTrigger className="text-left text-lg font-medium text-white hover:text-primary hover:no-underline py-6">
                  {faq.q}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground text-base leading-relaxed pb-6">
                  {faq.a}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </motion.div>
      </div>
    </section>
  );
}
