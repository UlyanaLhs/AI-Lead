import { motion } from "framer-motion";
import { Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useLang } from "@/lib/i18n";

const CTA_URL =
  "https://docs.google.com/forms/d/e/1FAIpQLScRZWbxH4rKyEFFhl7L42c0A2kP8mshC5RTVmgImFS6J9KeMA/viewform";

export default function Pricing() {
  const { t } = useLang();

  const plans = [
    {
      name: t("pricing", "pilotName"),
      price: "$2,997",
      subDesc: t("pricing", "pilotSubDesc"),
      urgency: t("pricing", "pilotUrgency"),
      description: t("pricing", "pilotDesc"),
      features: [
        t("pricing", "pilotF1"),
        t("pricing", "pilotF2"),
        t("pricing", "pilotF3"),
        t("pricing", "pilotF4"),
        t("pricing", "pilotF5"),
      ],
      cta: t("pricing", "pilotCta"),
      popular: false,
    },
    {
      name: t("pricing", "fullName"),
      price: "$5,997",
      subDesc: t("pricing", "fullSubDesc"),
      urgency: t("pricing", "fullUrgency"),
      description: t("pricing", "fullDesc"),
      features: [
        t("pricing", "fullF1"),
        t("pricing", "fullF2"),
        t("pricing", "fullF3"),
        t("pricing", "fullF4"),
        t("pricing", "fullF5"),
        t("pricing", "fullF6"),
      ],
      cta: t("pricing", "fullCta"),
      popular: true,
    },
    {
      name: t("pricing", "retainerName"),
      price: t("pricing", "retainerPrice"),
      subDesc: t("pricing", "retainerSubDesc"),
      urgency: null,
      description: t("pricing", "retainerDesc"),
      features: [
        t("pricing", "retainerF1"),
        t("pricing", "retainerF2"),
        t("pricing", "retainerF3"),
        t("pricing", "retainerF4"),
      ],
      cta: t("pricing", "retainerCta"),
      popular: false,
    },
  ];

  return (
    <section id="pricing" className="py-24 bg-background">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-5xl font-bold text-white mb-4"
          >
            {t("pricing", "title")}
          </motion.h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start max-w-6xl mx-auto">
          {plans.map((plan, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className={plan.popular ? "relative z-10 lg:-mt-4 lg:mb-[-1rem]" : ""}
            >
              <Card
                className={`relative h-full flex flex-col ${
                  plan.popular
                    ? "bg-card border-primary shadow-[0_0_30px_-5px_rgba(37,99,235,0.3)] scale-105"
                    : "bg-surface border-border hover:border-border/80"
                }`}
              >
                {plan.popular && (
                  <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2">
                    <Badge variant="default" className="bg-primary text-white font-bold uppercase tracking-wider px-3 py-1">
                      {t("pricing", "mostPopular")}
                    </Badge>
                  </div>
                )}

                <CardHeader className="pt-8 pb-4">
                  <CardTitle className="text-lg font-bold tracking-wider text-muted-foreground mb-2">
                    {plan.name}
                  </CardTitle>
                  <div className="text-4xl font-extrabold text-white mb-1 tracking-tight">
                    {plan.price}
                  </div>
                  <p style={{ color: "#9ca3af", fontSize: "13px", marginBottom: "8px" }}>
                    {plan.subDesc}
                  </p>
                  <CardDescription className="text-sm text-muted-foreground min-h-10">
                    {plan.description}
                  </CardDescription>
                </CardHeader>

                <CardContent className="flex-1 pb-6 pt-4">
                  <ul className="space-y-4 text-sm">
                    {plan.features.map((feature, fIndex) => (
                      <li key={fIndex} className="flex items-start gap-3">
                        <Check className="h-5 w-5 text-primary shrink-0" />
                        <span className="text-gray-300">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>

                <CardFooter className="pb-8 flex flex-col gap-0">
                  {plan.urgency && (
                    <p style={{ color: "#ef4444", fontSize: "13px", textAlign: "center", marginBottom: "12px" }}>
                      {plan.urgency}
                    </p>
                  )}
                  <Button
                    className="w-full h-12 text-md font-semibold"
                    variant={plan.popular ? "default" : "secondary"}
                    onClick={() => window.open(CTA_URL, "_blank", "noopener,noreferrer")}
                  >
                    {plan.cta}
                  </Button>
                </CardFooter>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
