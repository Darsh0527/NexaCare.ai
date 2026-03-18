import { AnimatedTestimonials } from "@/components/ui/animated-testimonials";
import { Star } from "lucide-react";

export function Testimonial() {
  const testimonials = [
    {
      quote:
        "NexaCare flagged a sepsis risk 8 hours before symptoms appeared. That window saved a life. It's the most impactful AI tool we've integrated.",
      name: "Dr. Arjun Mehta",
      designation: "Senior Intensivist, Apollo Hospitals",
      src: "/images/testimonials/1.jpg",
    },
    {
      quote:
        "We've seen a 30% reduction in ICU escalations since deploying the continuous monitoring algorithm. The explainable AI makes all the difference.",
      name: "Dr. Sarah Jenkins",
      designation: "Chief Medical Officer, Horizon Health",
      src: "/images/testimonials/2.jpg",
    },
    {
      quote:
        "The seamless integration with Epic meant our nurses didn't have to learn a new workflow. It just quietly runs in the background, keeping our patients safe.",
      name: "Michael Chen",
      designation: "Director of Nursing Informatics",
      src: "/images/testimonials/3.jpg",
    },
    {
      quote:
        "As a hospital administrator, predicting risk effectively translates directly to operational efficiency. NexaCare has paid for itself tenfold.",
      name: "Emily Watson",
      designation: "VP Operations, Trinity Care Network",
      src: "/images/testimonials/4.jpg",
    },
  ];

  return (
    <section className="py-[100px] bg-white border-y border-[#E0DDD7]">
      <div className="max-w-[1280px] mx-auto">
        <div className="uppercase text-[12px] font-semibold text-[#9B9B9B] tracking-[0.12em] mb-4 text-center">
            SUCCESS STORIES
        </div>
        <div className="flex justify-center gap-1 mb-6">
          {[...Array(5)].map((_, i) => (
            <Star key={i} className="w-5 h-5 fill-[#C8A96E] text-[#C8A96E]" />
          ))}
        </div>
        <AnimatedTestimonials testimonials={testimonials} autoplay={true} />
      </div>
    </section>
  );
}
