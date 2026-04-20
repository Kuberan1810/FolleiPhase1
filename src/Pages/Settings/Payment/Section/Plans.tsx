// import React from 'react';
// import { Check } from 'lucide-react';

// const Plans: React.FC = () => {
//   const plans = [
//     {
//       name: "STARTER",
//       price: "$29",
//       description: "Perfect for individual curators and small creative projects.",
//       features: ["Up to 5 active agents", "Basic content analysis", "1,000 monthly credits", "Email support"],
//       buttonText: "Get Started",
//       isPopular: false
//     },
//     {
//       name: "ADVANCED",
//       price: "$89",
//       description: "Advanced automation for growing creative studios.",
//       features: ["Unlimited active agents", "Deep semantic analysis", "10,000 monthly credits", "Priority 24/7 support", "Custom API access"],
//       buttonText: "Upgrade to Advanced",
//       isPopular: true 
//     },
//     {
//       name: "PRO",
//       price: "$59",
//       description: "Bespoke AI solutions and dedicated infrastructure.",
//       features: ["Dedicated GPU clusters", "SLA guaranteed uptime", "On-premise deployment", "Dedicated account manager"],
//       buttonText: "Get Started",
//       isPopular: false
//     }
//   ];

//   return (
//     <div className="w-full py-12 px-4 font-[Inter]">
      
//       {/* Figma Sub-header text */}
//       <div className="text-center mb-16">
//         <p className="text-[#64748B] text-[18px] max-w-2xl mx-auto leading-relaxed">
//           Elevate your system architecture with tiers designed for every scale of complexity.
//         </p>
//       </div>

//       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 items-stretch mb-20">
//         {plans.map((plan, index) => {
//           const isAdvanced = plan.name === "ADVANCED";
//           const advancedBlue = "#004370"; // Neenga sonna specific color
//           const defaultGrey = "#45474C"; // Screenshot-la irukkura other card text color

//           return (
//             <div 
//               key={index}
//               className={`relative flex flex-col bg-white rounded-[24px] p-8 border transition-all duration-300 ${
//                 isAdvanced 
//                   ? 'border-[#004370] border-2 shadow-xl scale-[1.02] z-10' 
//                   : 'border-[#E2E8F0]'
//               }`}
//             >
//               {/* Popular Badge matching Screenshot */}
//               {isAdvanced && (
//                 <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-[#103960] text-white text-[10px] font-bold px-5 py-2 rounded-full tracking-widest uppercase shadow-lg">
//                   Popular
//                 </div>
//               )}

//               <div className="mb-8">
                
//                 <p 
//                   className="text-[14px] text-[#45474C] font-semibold uppercase mb-4 "
//                   style={{ color: isAdvanced ? advancedBlue : defaultGrey }}
//                 >
//                   {plan.name}
//                 </p>
                
//                 <div className="flex items-baseline gap-1 mb-4">
//                   <span 
//                     className="text-[36px] font-semibold tracking-tight"
//                     style={{ color: isAdvanced ? advancedBlue : '#004370' }}
//                   >
//                     {plan.price}
//                   </span>
//                   <span className="text-[14px] font-medium text-[#45474C]">/mo</span>
//                 </div>
                
//                 <p className="text-[14px] leading-relaxed text-[#45474C]">
//                   {plan.description}
//                 </p>
//               </div>

//               {/* Features List */}
//               <div className="flex-1 space-y-5 mb-10">
//                 {plan.features.map((feature, idx) => (
//                   <div key={idx} className="flex items-center gap-3">
//                     <div className={`flex items-center justify-center rounded-full shrink-0 w-5 h-5 ${
//                       isAdvanced ? 'bg-[#004370]' : 'border border-[#94A3B8]'
//                     }`}>
//                       <Check 
//                         size={12} 
//                         strokeWidth={4} 
//                         className={isAdvanced ? 'text-white' : 'text-[#64748B]'} 
//                       />
//                     </div>
//                     <span className="text-[14px] text-[#434655]">
//                       {feature}
//                     </span>
//                   </div>
//                 ))}
//               </div>

//               {/* Action Button */}
//               <button 
//                 className={`w-full py-4 rounded-[12px] text-[15px] font-bold transition-all ${
//                   isAdvanced 
//                     ? 'bg-[#103960] text-white hover:bg-[#0c2d4d] shadow-lg shadow-blue-50' 
//                     : 'bg-[#F0F7FF] text-[#103960] hover:bg-[#E0EFFF]'
//                 }`}
//               >
//                 {plan.buttonText}
//               </button>
//             </div>
//           );
//         })}
//       </div>

//       {/* Footer Banner - Figma exact match */}
//       <div className="bg-[#E0EAF2] rounded-[24px] p-10 border border-[#D1E2EF] font-[Manrope]">
//         <h2 className="text-[32px] font-extrabold text-[#0F172A] mb-4">
//           Purchase Now & Get a Lot of Benefits
//         </h2>
//         <div className="space-y-1">
//           <p className="text-[#64748B] text-[16px]">Choose the plan that fits your workflow.</p>
//           <p className="text-[#64748B] text-[16px]">
//             Start with Starter for basic usage, upgrade to Advanced for powerful automation, or move to Pro for full-scale performance and dedicated features.
//           </p>
//         </div>
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
      features: ["Up to 5 active agents", "Basic content analysis", "1,000 monthly credits", "Email support"],
      buttonText: "Get Started",
      isPopular: false
    },
    {
      name: "ADVANCED",
      price: "$89",
      description: "Advanced automation for growing creative studios.",
      features: ["Unlimited active agents", "Deep semantic analysis", "10,000 monthly credits", "Priority 24/7 support", "Custom API access"],
      buttonText: "Upgrade to Advanced",
      isPopular: true 
    },
    {
      name: "PRO",
      price: "$59",
      description: "Bespoke AI solutions and dedicated infrastructure.",
      features: ["Dedicated GPU clusters", "SLA guaranteed uptime", "On-premise deployment", "Dedicated account manager"],
      buttonText: "Get Started",
      isPopular: false
    }
  ];

  return (
    <div className="w-full py-12 px-4  font-[Inter]">
      
      {/* Header section as seen in Figma */}
      <div className="text-center mb-16">
        <p className="text-[#64748B] text-[18px] max-w-2xl mx-auto leading-relaxed">
          Elevate your system architecture with tiers designed for every scale of complexity.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 items-stretch mb-20">
        {plans.map((plan, index) => {
          const isAdvanced = plan.name === "ADVANCED";
          const advancedBlue = "#004370";
          const featureTextColor = isAdvanced ? "#191C1E" : "#334155"; // Specific hex code for Advanced features

          return (
            <div 
              key={index}
              className={`relative flex flex-col bg-white rounded-[24px] p-8 border transition-all duration-300 ${
                isAdvanced 
                  ? 'border-[#004370] border-2 shadow-xl scale-[1.02] z-10' 
                  : 'border-[#E2E8F0]'
              }`}
            >
              {/* Popular Badge */}
              {isAdvanced && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-[#103960] text-white text-[10px] font-bold px-5 py-2 rounded-full tracking-widest uppercase shadow-lg">
                  Popular
                </div>
              )}

              <div className="mb-8">
                <p 
                  className="text-[14px] font-bold uppercase mb-4 tracking-tight"
                  style={{ color: isAdvanced ? advancedBlue : "#45474C" }}
                >
                  {plan.name}
                </p>
                
                <div className="flex items-baseline gap-1 mb-4">
                  <span 
                    className="text-[36px] font-semibold "
                    style={{ color: isAdvanced ? advancedBlue : '#004370' }}
                  >
                    {plan.price}
                  </span>
                  <span className="text-[14px] font-medium text-[#45474C]">/mo</span>
                </div>
                
                <p className="text-[14px] leading-relaxed text-[#475569]">
                  {plan.description}
                </p>
              </div>

              {/* Features List with Updated Color Logic */}
              <div className="flex-1 space-y-5 mb-10">
                {plan.features.map((feature, idx) => (
                  <div key={idx} className="flex items-center gap-3">
                    <div className={`flex items-center justify-center rounded-full shrink-0 w-5 h-5 ${
                      isAdvanced ? 'bg-[#004370]' : 'border border-[#94A3B8]'
                    }`}>
                      <Check 
                        size={12} 
                        strokeWidth={4} 
                        className={isAdvanced ? 'text-white' : 'text-[#64748B]'} 
                      />
                    </div>
                    {/* Text color updated to #191C1E for Advanced card */}
                    <span 
                      className="text-[14px] leading-tight"
                      style={{ color: featureTextColor }}
                    >
                      {feature}
                    </span>
                  </div>
                ))}
              </div>

              {/* Action Button */}
              <button 
                className={`w-full py-4 rounded-[8px] text-[14px] font-semibold transition-all ${
                  isAdvanced 
                    ? 'bg-[#004370] text-white hover:bg-[#0c2d4d] shadow-lg shadow-blue-50' 
                    : 'bg-[#F0F7FF] text-[#103960] hover:bg-[#E0EFFF]'
                }`}
              >
                {plan.buttonText}
              </button>
            </div>
          );
        })}
      </div>

      {/* Footer Banner */}
      <div className="bg-[#E9F2F9] rounded-[24px] p-10 border border-[#D1E2EF] font-[Manrope]">
        <h2 className="text-[32px] font-extrabold text-[#0F172A] mb-4">
          Purchase Now & Get a Lot of Benefits
        </h2>
        <div className="space-y-1">
          <p className="text-[#64748B] text-[16px]">Choose the plan that fits your workflow.</p>
          <p className="text-[#64748B] text-[16px]">
            Start with Starter for basic usage, upgrade to Advanced for powerful automation, or move to Pro for full-scale performance and dedicated features.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Plans;