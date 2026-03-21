import { ArrowRight } from "lucide-react";
import Link from "next/link";

export function Features() {
  return (
    <section id="features" className="py-[100px] bg-[#F2F0EB]">
      <div className="max-w-[1280px] mx-auto px-8 md:px-16">
        
        {/* Feature Section 1 */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center mb-32">
          <div>
            <h2 className="font-display text-[44px] font-[700] text-[#1A1A1A] leading-[1.1] mb-6">
              Identify every at-risk patient with <span className="text-[#C8A96E] italic">precision</span>
            </h2>
            <p className="text-[15px] font-sans text-[#6B6B6B] leading-[1.7] mb-8">
              By analyzing thousands of data points backwards in time, our predictive models highlight patients who are most vulnerable so you can prevent adverse events before they happen.
            </p>
            <Link href="/login" className="inline-flex items-center text-[#C8A96E] italic font-semibold hover:underline">
              Get Started <ArrowRight className="w-4 h-4 ml-1" />
            </Link>
          </div>
          <div className="bg-white rounded-[20px] border border-[#E0DDD7] p-8 shadow-sm h-[400px] flex items-center justify-center relative overflow-hidden group">
             <img src="/images/features/dashboard.jpg" className="absolute inset-0 w-full h-full object-cover transition duration-500 group-hover:scale-105" alt="Medical dashboard" />
             <div className="absolute inset-0 bg-white/10 backdrop-blur-sm"></div>
          </div>
        </div>

        {/* Feature Section 2 (Explainability) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center mb-32">
          <div className="bg-white rounded-[20px] border border-[#E0DDD7] p-8 shadow-sm h-[400px] flex items-center justify-center order-2 md:order-1 relative">
            {/* Mocking the SHAP toggle */}
            <div className="absolute top-6 left-6 flex gap-2 bg-[#F2F0EB] p-1 rounded-full">
               <div className="px-4 py-1.5 bg-white shadow-sm rounded-full text-xs font-bold">With SHAP</div>
               <div className="px-4 py-1.5 text-xs font-bold text-[#6B6B6B]">Without SHAP</div>
            </div>
            
            <div className="mt-10 bg-[#F2F0EB] p-6 rounded-xl w-full max-w-sm">
                <div className="flex justify-between items-center border-b border-[#E0DDD7] pb-2 mb-2">
                   <span className="font-semibold text-sm">Heart Rate</span><span className="text-red-500 font-bold text-sm">+15%</span>
                </div>
                <div className="flex justify-between items-center border-b border-[#E0DDD7] pb-2 mb-2">
                   <span className="font-semibold text-sm">SpO2 Level</span><span className="text-red-500 font-bold text-sm">+8%</span>
                </div>
                <div className="flex justify-between items-center">
                   <span className="font-semibold text-sm">Age Factor</span><span className="text-green-600 font-bold text-sm">-2%</span>
                </div>
            </div>
          </div>
          <div className="order-1 md:order-2">
            <h2 className="font-display text-[44px] font-[700] text-[#1A1A1A] leading-[1.1] mb-6">
              Know exactly <span className="text-[#C8A96E] italic">why</span> every alert fires
            </h2>
            <p className="text-[15px] font-sans text-[#6B6B6B] leading-[1.7] mb-8">
              Trust is paramount in healthcare. Our explainable AI (SHAP) breaks down every risk score so clinicians understand the exact physiological drivers behind every prediction.
            </p>
          </div>
        </div>

        {/* Feature Cards Grid (3x2) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[
            { tag: "ANALYTICS", title: "Real-time Monitoring", img: "/images/features/1.jpg" },
            { tag: "INTEGRATION", title: "EHR Syncing APIs", img: "/images/features/2.jpg" },
            { tag: "PREDICTION", title: "Sepsis Early Warning", img: "/images/features/3.jpg" },
            { tag: "WORKFLOW", title: "Automated Triage", img: "/images/features/4.jpg" },
            { tag: "SECURITY", title: "HIPAA Compliant", img: "/images/features/5.jpg" },
            { tag: "SUPPORT", title: "24/7 Clinical Desk", img: "/images/features/6.jpg" }
          ].map((card, idx) => (
            <div key={idx} className="bg-white rounded-[20px] border border-[#E0DDD7] overflow-hidden hover:-translate-y-1 hover:border-[#1A1A1A] transition-all duration-200 group flex flex-col h-[320px]">
               <div className="h-1/2 w-full overflow-hidden">
                 <img src={card.img} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" alt={card.title} />
               </div>
               <div className="p-[28px] flex flex-col flex-1 justify-between">
                 <div>
                   <div className="text-[12px] font-semibold text-[#9B9B9B] tracking-[0.12em] uppercase mb-2">{card.tag}</div>
                   <h3 className="font-display text-[20px] font-bold text-[#1A1A1A]">{card.title}</h3>
                 </div>
                <Link href="/login" className="self-start mt-4" aria-label={`${card.title} - navigate to doctor dashboard`}>
                  <ArrowRight className="w-5 h-5 text-[#1A1A1A]" />
                </Link>
               </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
