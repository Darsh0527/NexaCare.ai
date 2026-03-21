export function Pricing() {
  const plans = [
    { num: "01", name: "starter plan", desc: "Up to 100 beds · Basic risk scoring", price: "₹15K/mo", btn: "Reserve Spot" },
    { num: "02", name: "pro plan", desc: "Up to 500 beds · Full features + ops", price: "₹35K/mo", btn: "Reserve Spot" },
    { num: "03", name: "enterprise", desc: "Unlimited · Federated learning", price: "Custom", btn: "Contact Us" },
    { num: "04", name: "research license", desc: "Academic / NGO access", price: "Free", btn: "Apply Now" },
  ];

  return (
    <section id="pricing" className="py-[120px] bg-white">
      <div className="max-w-[1000px] mx-auto px-8 md:px-16">
        <div className="uppercase text-[12px] font-semibold text-[#9B9B9B] tracking-[0.12em] mb-4">
          PLANS FOR EVERY HOSPITAL
        </div>
        <h2 className="font-display text-[44px] font-[700] text-[#1A1A1A] leading-[1.1] mb-16">
          Simple pricing. <span className="text-[#C8A96E] italic">Serious impact.</span>
        </h2>

        <div className="border-t border-[#E0DDD7]">
          {plans.map((plan, idx) => (
            <div key={idx} className="flex flex-col md:flex-row items-start md:items-center border-b border-[#E0DDD7] py-8 gap-6 group hover:bg-[#F2F0EB] transition-colors -mx-4 px-4 rounded-xl">
              <div className="font-display text-[24px] font-[400] text-[#9B9B9B] w-16">
                {plan.num}
              </div>
              <div className="flex-1">
                <h3 className="font-display text-[28px] font-[700] text-[#1A1A1A] lowercase">{plan.name}</h3>
              </div>
              <div className="flex-1 text-[15px] font-sans text-[#6B6B6B]">
                {plan.desc}
              </div>
              <div className="w-32 font-display text-[22px] font-bold text-[#1A1A1A]">
                {plan.price}
              </div>
              <div>
                <a
                  href="/doctor"
                  className="bg-transparent border-[1.5px] border-[#1A1A1A] text-[#1A1A1A] px-6 py-2.5 rounded-[6px] text-[14px] font-medium group-hover:bg-[#1A1A1A] group-hover:text-white transition-all whitespace-nowrap inline-block"
                >
                  {plan.btn}
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
