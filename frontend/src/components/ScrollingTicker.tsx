export function ScrollingTicker() {
  return (
    <div className="w-full relative overflow-hidden bg-[#F2F0EB] py-16 border-y border-[#E0DDD7] whitespace-nowrap">
      <div className="animate-[scroll_20s_linear_infinite] inline-block">
        <span className="font-display italic text-[#1A1A1A] text-[48px] mr-12">
          NexaCare · Predict · Prevent · Personalize · NexaCare · Predict · Prevent · Personalize ·
        </span>
        <span className="font-display italic text-[#1A1A1A] text-[48px] mr-12">
          NexaCare · Predict · Prevent · Personalize · NexaCare · Predict · Prevent · Personalize ·
        </span>
      </div>
    </div>
  );
}
