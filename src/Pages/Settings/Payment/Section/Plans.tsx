// import React from 'react';
// import { Check } from 'lucide-react';

// const Plans: React.FC = () => {
//   const plans = [
//     {
//       name: "STARTER",
//       price: "$29",
//       description: "Perfect for individual curators and small creative projects.",
//       features: [
//         "Up to 5 active agents",
//         "Basic content analysis",
//         "1,000 monthly credits",
//         "Email support"
//       ],
//       buttonText: "Get Started",
//       isPopular: false
//     },
//     {
//       name: "PRO",
//       price: "$89",
//       description: "Advanced automation for growing creative studios.",
//       features: [
//         "Unlimited active agents",
//         "Deep semantic analysis",
//         "10,000 monthly credits",
//         "Priority 24/7 support",
//         "Custom API access"
//       ],
//       buttonText: "Upgrade to Pro",
//       isPopular: true
//     },
//     {
//       name: "ENTERPRISE",
//       price: "Custom",
//       description: "Bespoke AI solutions and dedicated infrastructure.",
//       features: [
//         "Dedicated GPU clusters",
//         "SLA guaranteed uptime",
//         "On-premise deployment",
//         "Dedicated account manager"
//       ],
//       buttonText: "Contact Sales",
//       isPopular: false
//     }
//   ];

//   return (
//     <div className="w-full py-8 transition-all duration-500 animate-in fade-in slide-in-from-bottom-4">
//       {/* Pricing Grid */}
      
                
             
//       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 items-stretch">
//         {plans.map((plan, index) => (
//           <div 
//             key={index}
//             className={`relative flex flex-col bg-white rounded-[24px] p-8 border transition-all duration-300 hover:shadow-xl ${
//               plan.isPopular 
//                 ? 'border-[#0F172A] border-2 shadow-md scale-[1.02] z-10' 
//                 : 'border-[#F1F5F9] border-1'
//             }`}
//           >
//             {/* Popular Badge */}
//             {plan.isPopular && (
//               <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-[#0F172A] text-white text-[10px] font-black px-4 py-1.5 rounded-full tracking-widest uppercase shadow-lg">
//                 Popular
//               </div>
//             )}

//             {/* Plan Header */}
//             <div className="mb-8">
//               <p className="text-[14px] font-bold text-[#45474C] tracking-widest uppercase mb-4">
//                 {plan.name}
//               </p>
//               <div className="flex items-baseline gap-1 mb-4">
//                 <span className="text-[36px] font-semibold text-[#0F172A] ">
//                   {plan.price}
//                 </span>
//                 {plan.price !== "Custom" && (
//                   <span className="text-[18px] font-medium text-[#45474C]">/mo</span>
//                 )}
//               </div>
//               <p className="text-[14px] leading-relaxed text-[#45474C] font-['Inter']">
//                 {plan.description}
//               </p>
//             </div>

//             {/* Features List */}
//             <div className="flex-1 space-y-5 mb-10">
//               {plan.features.map((feature, idx) => (
//                 <div key={idx} className="flex items-start gap-3">
//                   <div className={`mt-0.5 rounded-full  p-0.5 border ${
//                     plan.isPopular ? 'border-[#0F172A]' : 'border-[#64748B]'
//                   }`}>
//                     <Check size={12} strokeWidth={3} className={plan.isPopular ? 'text-[#0F172A]' : 'text-[#64748B] '}  />
//                   </div>
//                   <span className="text-[14px] font-medium text-[#1E293B] font-['Inter']">
//                     {feature}
//                   </span>
//                 </div>
//               ))}
//             </div>

//             {/* Action Button */}
//             <button 
//               className={`w-full py-4 rounded-xl text-[15px] font-bold transition-all ${
//                 plan.isPopular 
//                   ? 'bg-[#0F172A] text-white hover:bg-[#1e293b] shadow-lg shadow-slate-200' 
//                   : 'bg-[#E2E8F0] text-[#475569] hover:bg-[#CBD5E1]'
//               }`}
//             >
//               {plan.buttonText}
//             </button>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default Plans;

import React from 'react';
import { Check } from 'lucide-react';

const Plans: React.FC = () => {
  const plans = [
    {
      name: "STARTER",
      price: "$29",
      description: "Perfect for individual curators and small creative projects.",
      features: [
        "Up to 5 active agents",
        "Basic content analysis",
        "1,000 monthly credits",
        "Email support"
      ],
      buttonText: "Get Started",
      isPopular: false
    },
    {
      name: "PRO",
      price: "$89",
      description: "Advanced automation for growing creative studios.",
      features: [
        "Unlimited active agents",
        "Deep semantic analysis",
        "10,000 monthly credits",
        "Priority 24/7 support",
        "Custom API access"
      ],
      buttonText: "Upgrade to Pro",
      isPopular: true
    },
    {
      name: "ENTERPRISE",
      price: "Custom",
      description: "Bespoke AI solutions and dedicated infrastructure.",
      features: [
        "Dedicated GPU clusters",
        "SLA guaranteed uptime",
        "On-premise deployment",
        "Dedicated account manager"
      ],
      buttonText: "Contact Sales",
      isPopular: false
    }
  ];

  return (
    <div className="w-full py-8 transition-all duration-500 animate-in fade-in slide-in-from-bottom-4">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 items-stretch ">
        {plans.map((plan, index) => (
          <div 
            key={index}
            className={`relative flex flex-col bg-white rounded-[24px] p-8 border  ${
              plan.isPopular 
                ? 'border-[#0F172A] border-2 shadow-md scale-[1.02] z-10' 
                : 'border-[#F1F5F9] border-1'
            }`}
          >
            {/* Popular Badge */}
            {plan.isPopular && (
              <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-[#0F172A] text-white text-[10px] font-black px-4 py-1.5 rounded-full tracking-widest uppercase shadow-lg">
                Popular
              </div>
            )}

            {/* Plan Header */}
            <div className="mb-8">
              <p className="text-[14px] font-bold text-[#45474C] tracking-widest uppercase mb-4">
                {plan.name}
              </p>
              <div className="flex items-baseline gap-1 mb-4">
                <span className="text-[48px] font-bold text-[#0F172A] tracking-tight">
                  {plan.price}
                </span>
                {plan.price !== "Custom" && (
                  <span className="text-[18px] font-medium text-[#45474C]">/mo</span>
                )}
              </div>
              <p className={`text-[14px] leading-relaxed text-[#45474C] ${plan.isPopular ? 'font-medium' : 'font-normal'}`}>
                {plan.description}
              </p>
            </div>

            {/* Features List */}
            <div className="flex-1 space-y-5 mb-10">
              {plan.features.map((feature, idx) => (
                <div key={idx} className="flex items-center gap-3">
                  {/* Figma accurate Checkbox logic */}
                  <div className={`flex items-center justify-center rounded-full shrink-0 ${
                    plan.isPopular 
                      ? 'bg-[#0F172A] w-5 h-5' // Black background for Pro
                      : 'border border-slate-400 w-5 h-5' // Outline for others
                  }`}>
                    <Check 
                      size={12} 
                      strokeWidth={plan.isPopular ? 4 : 2} 
                      className={plan.isPopular ? 'text-white' : 'text-slate-600'} 
                    />
                  </div>
                  <span className={`text-[14px] text-[#1E293B] ${plan.isPopular ? 'font-medium' : 'font-normal'}`}>
                    {feature}
                  </span>
                </div>
              ))}
            </div>

            {/* Action Button */}
            <button 
              className={`w-full py-4 rounded-xl text-[15px] font-bold transition-all cursor-pointer ${
                plan.isPopular 
                  ? 'bg-[#0F172A] text-white hover:bg-[#1e293b] shadow-lg shadow-slate-200' 
                  : 'bg-[#E2E8F0] text-[#475569] hover:bg-[#CBD5E1]'
              }`}
            >
              {plan.buttonText}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Plans;