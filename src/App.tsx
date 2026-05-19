import { Switch, Route, Router as WouterRouter } from "wouter";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/not-found";
import { LanguageProvider } from "@/lib/i18n";

import ScarcityBanner from "@/components/layout/ScarcityBanner";
import Navbar from "@/components/layout/Navbar";
import Hero from "@/components/sections/Hero";
import EmailCapture from "@/components/sections/EmailCapture";
import Problem from "@/components/sections/Problem";
import HowItWorks from "@/components/sections/HowItWorks";
import Calculator from "@/components/sections/Calculator";
import WhoItsFor from "@/components/sections/WhoItsFor";
import ValueStack from "@/components/sections/ValueStack";
import BonusStack from "@/components/sections/BonusStack";
import Pricing from "@/components/sections/Pricing";
import ProcessTimeline from "@/components/sections/ProcessTimeline";
import Guarantee from "@/components/sections/Guarantee";
import CaseStudies from "@/components/sections/CaseStudies";
import FAQ from "@/components/sections/FAQ";
import FinalCTA from "@/components/sections/FinalCTA";
import Footer from "@/components/sections/Footer";

const queryClient = new QueryClient();

function Home() {
  return (
    <div className="min-h-[100dvh] w-full flex flex-col bg-background text-foreground selection:bg-primary/30 selection:text-white">
      <ScarcityBanner />
      <Navbar />
      <main className="flex-1">
        <Hero />
        <EmailCapture />
        <Problem />
        <HowItWorks />
        <Calculator />
        <WhoItsFor />
        <ValueStack />
        <BonusStack />
        <Pricing />
        <ProcessTimeline />
        <Guarantee />
        <CaseStudies />
        <FAQ />
        <FinalCTA />
      </main>
      <Footer />
    </div>
  );
}

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <LanguageProvider>
        <TooltipProvider>
          <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, "")}>
            <Router />
          </WouterRouter>
          <Toaster />
        </TooltipProvider>
      </LanguageProvider>
    </QueryClientProvider>
  );
}

export default App;
