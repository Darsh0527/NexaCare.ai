export function Footer() {
  return (
    <footer className="bg-[#F2F0EB] relative pt-24 pb-8 overflow-hidden border-t border-[#E0DDD7]">
      {/* Oversized Wordmark Watermark */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 font-display font-black text-[200px] text-[#E0DDD7] opacity-60 leading-none whitespace-nowrap pointer-events-none select-none z-0">
        NexaCare
      </div>

      <div className="max-w-[1280px] mx-auto px-8 md:px-16 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-20">
          
          <div className="col-span-1 md:col-span-1">
            <div className="font-display font-bold text-2xl text-[#1A1A1A] mb-4">
              NexaCare<span className="text-[#C8A96E] italic">.ai</span>
            </div>
            <p className="text-[#6B6B6B] text-[14px] leading-relaxed max-w-[200px]">
              Predict risk. Prevent harm. Personalize care.
            </p>
          </div>

          <div>
             <h4 className="font-bold text-[#1A1A1A] mb-4">Product</h4>
             <ul className="space-y-2 text-[#6B6B6B] text-[14px]">
              <li><a href="/doctor" className="hover:text-[#C8A96E] transition-colors">Risk Scoring</a></li>
              <li><a href="/doctor" className="hover:text-[#C8A96E] transition-colors">SHAP Explainability</a></li>
              <li><a href="/doctor" className="hover:text-[#C8A96E] transition-colors">Clinician Hub</a></li>
              <li><a href="/doctor" className="hover:text-[#C8A96E] transition-colors">Pricing</a></li>
             </ul>
          </div>
          
          <div>
             <h4 className="font-bold text-[#1A1A1A] mb-4">Company</h4>
             <ul className="space-y-2 text-[#6B6B6B] text-[14px]">
              <li><a href="/doctor" className="hover:text-[#C8A96E] transition-colors">About Us</a></li>
              <li><a href="/doctor" className="hover:text-[#C8A96E] transition-colors">Careers</a></li>
              <li><a href="/doctor" className="hover:text-[#C8A96E] transition-colors">Events</a></li>
              <li><a href="/doctor" className="hover:text-[#C8A96E] transition-colors">Contact</a></li>
             </ul>
          </div>
          
          <div>
             <h4 className="font-bold text-[#1A1A1A] mb-4">Support</h4>
             <ul className="space-y-2 text-[#6B6B6B] text-[14px]">
              <li><a href="/doctor" className="hover:text-[#C8A96E] transition-colors">Help Center</a></li>
              <li><a href="/doctor" className="hover:text-[#C8A96E] transition-colors">API Documentation</a></li>
              <li><a href="/doctor" className="hover:text-[#C8A96E] transition-colors">HIPAA Compliance</a></li>
              <li><a href="/doctor" className="hover:text-[#C8A96E] transition-colors">System Status</a></li>
             </ul>
          </div>
        </div>

        <div className="border-t border-[#E0DDD7] pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-[13px] text-[#9B9B9B]">
           <div>&copy; 2026 NexaCare.ai. All rights reserved.</div>
           <div className="flex gap-6">
            <a href="/doctor" className="hover:text-[#1A1A1A] transition-colors">Privacy Policy</a>
            <a href="/doctor" className="hover:text-[#1A1A1A] transition-colors">Terms of Service</a>
           </div>
        </div>
      </div>
    </footer>
  );
}
