import { Activity, BrainCircuit, ShieldAlert } from "lucide-react";

export function HowItWorks() {
  const steps = [
    {
      icon: <Activity className="w-8 h-8 text-[#1A1A1A]" />,
      title: "Data Collection",
      desc: "Aggregates live EHR, labs, and vitals."
    },
    {
      icon: <BrainCircuit className="w-8 h-8 text-[#1A1A1A]" />,
      title: "AI Scoring",
      desc: "Computes personalized risk trajectory."
    },
    {
      icon: <ShieldAlert className="w-8 h-8 text-[#1A1A1A]" />,
      title: "Clinical Action",
      desc: "Alerts care teams with explainable AI context."
    }
  ];

  return (
    <section id="how-it-works" className="py-[100px] bg-white">
      <div className="max-w-[1280px] mx-auto px-8 md:px-16 text-center">
        <div className="uppercase text-[12px] font-semibold text-[#9B9B9B] tracking-[0.12em] mb-4">
          HOW NEXACARE WORKS
        </div>
        <p className="text-[15px] font-sans text-[#6B6B6B] leading-[1.7] max-w-2xl mx-auto mb-16">
          We go beyond alerts — giving clinicians reasoning, guidance, and operational foresight.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {steps.map((step, idx) => (
            <div 
              key={idx} 
              className="bg-white border border-[#E0DDD7] rounded-[20px] p-[28px] hover:-translate-y-1 hover:border-[#1A1A1A] transition-all duration-200 shadow-sm flex flex-col items-center"
            >
              <div className="bg-[#F2F0EB] p-4 rounded-full mb-6">
                {step.icon}
              </div>
              <h3 className="font-display text-[22px] font-[600] text-[#1A1A1A] mb-2">{step.title}</h3>
              <p className="text-[15px] text-[#6B6B6B] leading-[1.7] text-center">{step.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
