import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { HowItWorks } from "@/components/HowItWorks";
import { Features } from "@/components/Features";
import { StatsBar } from "@/components/StatsBar";
import { ScrollingTicker } from "@/components/ScrollingTicker";
import { Pricing } from "@/components/Pricing";
import { Testimonial } from "@/components/Testimonial";
import { CtaSection } from "@/components/CtaSection";
import { Footer } from "@/components/Footer";
import { GlowingEffectDemo } from "@/components/GlowingEffectDemo";
export default function Home() {
  return (
    <main className="min-h-screen bg-[#F2F0EB]">
      <Navbar />
      <Hero />
      <section className="py-[100px] bg-white border-y border-[#E0DDD7]">
        <div className="max-w-[1280px] mx-auto px-8 md:px-16">
           <div className="uppercase text-[12px] font-semibold text-[#9B9B9B] tracking-[0.12em] mb-4 text-center">
             PLATFORM CAPABILITIES
           </div>
           <p className="text-[15px] font-sans text-[#6B6B6B] leading-[1.7] max-w-2xl mx-auto mb-16 text-center">
             The most advanced predictive engine built specifically for modern healthcare networks.
           </p>
           <GlowingEffectDemo />
        </div>
      </section>
      <HowItWorks />
      <Features />
      <StatsBar />
      <ScrollingTicker />
      <Pricing />
      <Testimonial />
      <CtaSection />
      <Footer />
    </main>
  );
}
