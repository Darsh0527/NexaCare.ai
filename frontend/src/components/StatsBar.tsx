export function StatsBar() {
  return (
    <section className="bg-[#1A1A1A] py-[80px]">
      <div className="max-w-[1280px] mx-auto px-8 md:px-16">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 divide-x divide-[#333333]">
          
          <div className="px-4 text-center">
            <div className="font-display text-[56px] font-[800] text-white">6–48h</div>
            <div className="text-[15px] text-[#9B9B9B] mt-2 font-medium">earlier intervention window</div>
          </div>
          
          <div className="px-4 text-center">
            <div className="font-display text-[56px] font-[800] text-white">30%</div>
            <div className="text-[15px] text-[#9B9B9B] mt-2 font-medium">reduction in ICU escalations</div>
          </div>
          
          <div className="px-4 text-center">
            <div className="font-display text-[56px] font-[800] text-white">₹80K</div>
            <div className="text-[15px] text-[#9B9B9B] mt-2 font-medium">saved per avoided readmission</div>
          </div>
          
          <div className="px-4 text-center">
            <div className="font-display text-[56px] font-[800] text-white">95%</div>
            <div className="text-[15px] text-[#9B9B9B] mt-2 font-medium">clinician trust with explainability</div>
          </div>
          
        </div>
      </div>
    </section>
  );
}
