"use client";

import * as React from "react";
import { GooeyText } from "@/components/ui/gooey-text-morphing";

function GooeyTextDemo() {
  return (
    <div className="h-[80px] lg:h-[90px] flex items-center justify-start max-w-[600px] w-full">
      <GooeyText
        texts={["Predictive", "Proactive", "Precision"]}
        morphTime={1.2}
        cooldownTime={0.4}
        className="w-full h-full"
        textClassName="font-display font-[800] text-[64px] lg:text-[72px] leading-[1.0] text-[#1A1A1A] text-left !justify-start"
      />
    </div>
  );
}

export { GooeyTextDemo };
