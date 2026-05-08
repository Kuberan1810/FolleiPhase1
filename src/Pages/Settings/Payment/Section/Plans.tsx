

// import React, { useState } from 'react';
// import { Check, X, Zap, Rocket, ShieldCheck, CreditCard, Lock } from 'lucide-react';

// const Plans: React.FC = () => {
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [selectedPlanData, setSelectedPlanData] = useState<any>(null);

//   const plans = [
//     {
//       name: "STARTER",
//       price: "$29",
//       description: "Perfect for individual curators and small creative projects.",
//       features: ["Up to 5 active agents", "Basic content analysis", "1,000 monthly credits", "Email support"],
//       buttonText: "Get Started",
//       icon: <Zap className="text-blue-500" size={24} />,
//       color: "#3B82F6"
//     },
//     {
//       name: "ADVANCED",
//       price: "$89",
//       description: "Advanced automation for growing creative studios.",
//       features: ["Unlimited active agents", "Deep semantic analysis", "10,000 monthly credits", "Priority 24/7 support", "Custom API access"],
//       buttonText: "Upgrade to Advanced",
//       isPopular: true,
//       icon: <Rocket className="text-[#004370]" size={24} />,
//       color: "#004370"
//     },
//     {
//       name: "PRO",
//       price: "$59",
//       description: "Bespoke AI solutions and dedicated infrastructure.",
//       features: ["Dedicated GPU clusters", "SLA guaranteed uptime", "On-premise deployment", "Dedicated account manager"],
//       buttonText: "Get Started",
//       icon: <ShieldCheck className="text-purple-600" size={24} />,
//       color: "#9333EA"
//     }
//   ];

//   const handleOpenModal = (plan: any) => {
//     setSelectedPlanData(plan);
//     setIsModalOpen(true);
//   };

//   return (
//     <div className="w-full py-12 px-4 font-[Inter] relative bg-[#F8FAFC]">
      
//       {/* --- FIGMA PAYMENT MODAL INTEGRATION --- */}
//       {isModalOpen && selectedPlanData && (
//         <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
//           <div className="bg-white w-full max-w-[480px] rounded-[32px] overflow-hidden shadow-2xl relative animate-in zoom-in-95 duration-200">
            
//             {/* Close Button */}
//             <button 
//               onClick={() => setIsModalOpen(false)} 
//               className="absolute top-8 right-8 p-1.5 rounded-full hover:bg-gray-100 transition-colors z-10"
//             >
//               <X size={20} className="text-gray-400" />
//             </button>

//             <div className="p-10">
//               {/* Header Section */}
//               <div className="flex flex-col items-center text-center mb-8">
//                 <div className="w-10 h-10 bg-[#F1F5F9] rounded-xl flex items-center justify-center mb-3">
//                   <Lock size={20} className="text-[#0F172A]" strokeWidth={2.5} />
//                 </div>
//                 <h3 className="text-[20px] font-bold text-[#0F172A] tracking-tight">Secure Payment</h3>
//                 <p className="text-[#64748B] text-[14px] mt-1">Your payment is encrypted and secure</p>
//               </div>

//               {/* Selected Plan Card (Light Blue Background) */}
//               <div className="w-full bg-[#F0F7FF] border border-[#E0EFFF] rounded-[20px] p-5 flex items-center justify-between mb-8">
//                 <div className="flex items-center gap-4">
//                   <div className="w-12 h-12 rounded-xl bg-white flex items-center justify-center shadow-sm">
//                     {selectedPlanData.icon}
//                   </div>
//                   <div className="flex flex-col">
//                     <span className="text-[15px] font-bold text-[#0F172A] leading-tight">
//                       {selectedPlanData.name} Plan
//                     </span>
//                     <span className="text-[12px] text-[#64748B] font-medium">
//                       Monthly Subscription
//                     </span>
//                   </div>
//                 </div>
//                 <div className="text-right">
//                   <span className="text-[20px] font-bold text-[#0F172A]">{selectedPlanData.price}</span>
//                   <span className="text-[12px] text-gray-400 font-medium ml-0.5">/mo</span>
//                 </div>
//               </div>

//               {/* Payment Form */}
//               <div className="space-y-5">
//                 <div className="space-y-2">
//                   <label className="text-[11px] font-bold text-[#94A3B8] uppercase tracking-[0.1em]">Card Number</label>
//                   <div className="relative">
//                     <input 
//                       type="text" 
//                       placeholder="1234 5678 1234 5678"
//                       className="w-full px-4 py-3.5 bg-[#F8FAFC] border border-[#E2E8F0] rounded-xl text-[14px] font-medium focus:outline-none focus:border-[#004370] transition-all pl-12"
//                     />
//                     <CreditCard className="absolute left-4 top-1/2 -translate-y-1/2 text-[#94A3B8]" size={18} />
//                   </div>
//                 </div>

//                 <div className="space-y-2">
//                   <label className="text-[11px] font-bold text-[#94A3B8] uppercase tracking-[0.1em]">Card Holder Name</label>
//                   <input 
//                     type="text" 
//                     placeholder="Enter name on card"
//                     className="w-full px-4 py-3.5 bg-[#F8FAFC] border border-[#E2E8F0] rounded-xl text-[14px] font-medium focus:outline-none focus:border-[#004370] transition-all"
//                   />
//                 </div>

//                 <div className="grid grid-cols-2 gap-4">
//                   <div className="space-y-2">
//                     <label className="text-[11px] font-bold text-[#94A3B8] uppercase tracking-[0.1em]">Expiry Date</label>
//                     <input 
//                       type="text" 
//                       placeholder="MM/YY"
//                       className="w-full px-4 py-3.5 bg-[#F8FAFC] border border-[#E2E8F0] rounded-xl text-[14px] font-medium focus:outline-none focus:border-[#004370] transition-all"
//                     />
//                   </div>
//                   <div className="space-y-2">
//                     <label className="text-[11px] font-bold text-[#94A3B8] uppercase tracking-[0.1em]">CVV</label>
//                     <input 
//                       type="text" 
//                       placeholder="***"
//                       className="w-full px-4 py-3.5 bg-[#F8FAFC] border border-[#E2E8F0] rounded-xl text-[14px] font-medium focus:outline-none focus:border-[#004370] transition-all"
//                     />
//                   </div>
//                 </div>
//               </div>

//               {/* Pay Button */}
//               <button 
//                 className="w-full mt-10 py-4 rounded-xl text-white font-bold text-[15px] bg-[#103960] shadow-lg transition-all hover:bg-[#0c2d4d] active:scale-[0.98]" 
//               >
//                 Pay {selectedPlanData.price}.00
//               </button>
//             </div>
//           </div>
//         </div>
//       )}

//       {/* --- PLANS UI SECTION (No styling changes as requested) --- */}
//       <div className="text-center mb-16">
//         <p className="text-[#64748B] text-[18px] max-w-2xl mx-auto leading-relaxed">
//           Elevate your system architecture with tiers designed for every scale of complexity.
//         </p>
//       </div>

//       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 items-stretch mb-20 max-w-7xl mx-auto">
//         {plans.map((plan, index) => {
//           const isAdvanced = plan.name === "ADVANCED";
//           return (
//             <div key={index} className={`relative flex flex-col bg-white rounded-[24px] p-8 border transition-all duration-300 ${isAdvanced ? 'border-[#004370] border-2 shadow-xl scale-[1.02] z-10' : 'border-[#E2E8F0]'}`}>
//               {isAdvanced && <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-[#103960] text-white text-[10px] font-bold px-5 py-2 rounded-full tracking-widest uppercase">Popular</div>}
//               <div className="mb-8 text-center md:text-left">
//                 <p className="text-[14px] font-bold uppercase mb-4 tracking-tight" style={{ color: isAdvanced ? "#004370" : "#45474C" }}>{plan.name}</p>
//                 <div className="flex items-baseline gap-1 mb-4 justify-center md:justify-start">
//                   <span className="text-[36px] font-semibold text-[#004370]">{plan.price}</span>
//                   <span className="text-[14px] font-medium text-[#45474C]">/mo</span>
//                 </div>
//                 <p className="text-[14px] leading-relaxed text-[#475569]">{plan.description}</p>
//               </div>
//               <div className="flex-1 space-y-5 mb-10">
//                 {plan.features.map((feature, idx) => (
//                   <div key={idx} className="flex items-center gap-3">
//                     <div className={`flex items-center justify-center rounded-full shrink-0 w-5 h-5 ${isAdvanced ? 'bg-[#004370]' : 'border border-[#94A3B8]'}`}>
//                       <Check size={12} strokeWidth={4} className={isAdvanced ? 'text-white' : 'text-[#64748B]'} />
//                     </div>
//                     <span className="text-[14px] text-[#334155]">{feature}</span>
//                   </div>
//                 ))}
//               </div>
//               <button onClick={() => handleOpenModal(plan)} className={`w-full py-4 rounded-[12px] text-[14px] font-semibold transition-all ${isAdvanced ? 'bg-[#004370] text-white' : 'bg-[#F0F7FF] text-[#103960]'}`}>{plan.buttonText}</button>
//             </div>
//           );
//         })}
//       </div>

//       <div className="bg-[#E9F2F9] rounded-[24px] p-10 border border-[#D1E2EF] max-w-7xl mx-auto">
//         <h2 className="text-[32px] font-extrabold text-[#0F172A] mb-4">Purchase Now & Get a Lot of Benefits</h2>
//         <p className="text-[#64748B] text-[16px]">Choose the plan that fits your workflow. Start with Starter for basic usage, or move to Pro for full-scale performance.</p>
//       </div>
//     </div>
//   );
// };

// export default Plans;

import React, { useState } from 'react';
import { Check, X, Zap,BadgeCheck,Rocket, ShieldCheck, CreditCard, Lock, ArrowRight, ArrowLeft ,AlertCircle,FileExclamationPoint } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Plans: React.FC = () => {
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedPlanData, setSelectedPlanData] = useState<any>(null);
  
  // Payment Status States: 'idle' | 'processing' | 'success' | 'failure'
  const [paymentStatus, setPaymentStatus] = useState<'idle' | 'processing' | 'success' | 'failure'>('idle');

  const plans = [
    {
      name: "STARTER",
      price: "$29",
      description: "Perfect for individual curators and small creative projects.",
      features: ["Up to 5 active agents", "Basic content analysis", "1,000 monthly credits", "Email support"],
      buttonText: "Get Started",
      icon: <BadgeCheck className="text-[#009C22]" size={24} />,
      color: "#3B82F6"
    },
    {
      name: "ADVANCED",
      price: "$89",
      description: "Advanced automation for growing creative studios.",
      features: ["Unlimited active agents", "Deep semantic analysis", "10,000 monthly credits", "Priority 24/7 support", "Custom API access"],
      buttonText: "Upgrade to Advanced",
      isPopular: true,
      icon: <BadgeCheck className="text-[#009C22]" size={24} />,
      color: "#009C22"
    },
    {
      name: "PRO",
      price: "$59",
      description: "Bespoke AI solutions and dedicated infrastructure.",
      features: ["Dedicated GPU clusters", "SLA guaranteed uptime", "On-premise deployment", "Dedicated account manager"],
      buttonText: "Get Started",
      icon: <BadgeCheck className="text-[#009C22]" size={24} />,
      color: "#009C22"
    }
  ];

  const handleOpenModal = (plan: any) => {
    setSelectedPlanData(plan);
    setPaymentStatus('idle');
    setIsModalOpen(true);
  };

  const handlePayment = () => {
    setPaymentStatus('processing');
    
    // Simulating API Call
    setTimeout(() => {
      // Simple logic: Randomly succeed or fail for demo
      // In real scenario, validate card number here
      const isSuccessful = Math.random() > 0.3; 
      setPaymentStatus(isSuccessful ? 'success' : 'failure');
    }, 2000);
  };

  return (
    <div className="w-full py-4 px-4 font-[Inter] relative bg-[#F8FAFC]">
      
      {/* --- INTEGRATED MODAL SYSTEM --- */}
      {isModalOpen && selectedPlanData && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-white w-full max-w-[500px] rounded-[32px] overflow-hidden shadow-2xl relative animate-in zoom-in-95 duration-200 flex flex-col max-h-[90vh]">
            
            {/* Close Button (Visible only in idle/failure) */}
            {paymentStatus !== 'processing' && (
              <button 
                onClick={() => setIsModalOpen(false)} 
                className="absolute top-8 right-8 p-1.5 rounded-full hover:bg-gray-100 transition-colors z-10 cursor-pointer"
              >
                <X size={20} className="text-gray-400" />
              </button>
            )}
{/* button fixed header fixed,COntent onscroll enable   */}
            <div className="BoxStyle max-h-[600px] h-full overflow-y-scroll no-scrollbar">
              
              {/* --- VIEW 1: PAYMENT FORM (IDLE/PROCESSING) --- */}
              { (paymentStatus === 'idle' || paymentStatus === 'processing') && (
                <div className={paymentStatus === 'processing' ? 'opacity-50 pointer-events-none' : ''}>
                  <div className="flex flex-col items-center text-center mb-8 font-[Inter]">
                    <div className="w-15 h-15 bg-[#F1F5F9] rounded-full flex items-center justify-center mb-3">
                      <Lock size={25}  className="text-[#B7C4FF]" strokeWidth={2.5} />
                    </div>
                    <h3 className="text-[24px] font-bold text-[#004370] ">Secure Payment</h3>
                    <p className="text-[#64748B] text-[14px] mt-1">Your payment is encrypted and secure</p>
                  </div>

                  <div className="w-full bg-[#F0F7FF] border border-[#E0EFFF] rounded-[20px] p-5 flex items-center justify-between mb-8">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-xl bg-[#00FF37]/15 flex items-center justify-center shadow-sm">
                        {selectedPlanData.icon}
                      </div>
                      <div className="flex flex-col text-left ">
                        <span className="text-[16px] font-semibold  text-[#64748B] lowercase first-letter:uppercase">{selectedPlanData.name} Plan</span>
                        <span className="text-[12px] text-[#64748B]">Monthly Subscription</span>
                      </div>
                    </div>
                    <div className="text-right">
                      <span className="text-[24px] font-bold text-[#64748B]">{selectedPlanData.price}</span>
                      <span className="text-[12px] text-[#64748B] ml-0.5">/mo</span>
                    </div>
                  </div>

                  <div className="space-y-5 font-[Inter] h-[150px] overflow-y-scroll">
                    <div className="space-y-2">
                      <label className="text-[12px] font-medium text-[#64748B] tracking-[1.2px] uppercase">Card Number</label>
                      <div className="relative">
                        <input type="text" placeholder="1234 5678 1234 5678" className="w-full px-4 py-3.5 bg-[#F8FAFC] border border-[#E2E8F0] rounded-xl text-[14px] pl-12 focus:outline-none" />
                        <CreditCard className="absolute left-4 top-1/2 -translate-y-1/2 text-[#94A3B8]" size={18} />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <label className="text-[12px] font-medium text-[#64748B] tracking-[1.2px] uppercase">Card Holder Name</label>
                      <input type="text" placeholder="Enter name on card" className="w-full px-4 py-3.5 bg-[#F8FAFC] border border-[#E2E8F0] rounded-xl text-[14px] focus:outline-none" />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                    <div className="flex flex-col gap-2">
                      <label className="text-[12px] font-medium text-[#64748B] tracking-[1.2px] uppercase">
                        Expiry Date
                      </label>
                      <input
                        type="text"
                        placeholder="MM / YY"
                        className="w-full px-4 py-3.5 bg-[#F8FAFC] border border-[#E2E8F0] rounded-xl text-[14px] focus:outline-none"
                      />
                    </div>
                    <div className="flex flex-col gap-2">
                      <label className="text-[12px] font-medium text-[#64748B] tracking-[1.2px] uppercase">
                        CVV
                      </label>
                      <div className="relative">
                        <input
                          type="text"
                          placeholder="***"
                          className="w-full px-4 py-3.5 bg-[#F8FAFC] border border-[#E2E8F0] rounded-xl text-[14px] focus:outline-none pr-10"
                        />
                        <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none opacity-50">
                          <svg
                            width="16"
                            height="16"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="#94A3B8"
                            strokeWidth="2.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          >
                            <circle cx="12" cy="12" r="10" />
                            <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3" />
                            <line x1="12" y1="17" x2="12.01" y2="17" />
                          </svg>
                        </div>
                      </div>
                    </div>
                  </div>
                  </div>

                  {(paymentStatus === 'idle' || paymentStatus === 'processing') && (
                  <div className="p-5 pt-4 bg-white border-t border-gray-100 z-10">
                    <button 
                      onClick={handlePayment}
                      className="w-full py-4 rounded-3xl text-white font-bold text-[16px] bg-[#004370] shadow-lg flex items-center justify-center gap-2 hover:bg-[#00355a] transition-all cursor-pointer"
                    >
                      {paymentStatus === 'processing' ? 'Processing...' : `Pay ${selectedPlanData.price}.00`}
                    </button>
                  </div>
                )}

              </div>
              )}

              

              {/* --- VIEW 2: SUCCESS MODAL --- */}
              {paymentStatus === 'success' && (
                <div className="flex flex-col items-center text-center py-6 animate-in zoom-in-90 duration-300">
                  <div className="w-20 h-20 bg-green-50 rounded-full flex items-center justify-center mb-6 border border-green-100">
                    <div className="w-14 h-14 bg-green-500 rounded-full flex items-center justify-center shadow-lg shadow-green-200">
                      <Check className="text-white" size={32} strokeWidth={3} />
                    </div>
                  </div>
                  <h3 className="text-[24px] font-bold text-[#0F172A] mb-2 font-[Manrope]">Payment Successful!</h3>
                  <p className="text-[#64748B] text-[15px] font-[Inter] mb-10">
                    Your Plan has been upgraded  to <span className="font-bold text-[#0F172A]">{selectedPlanData.name}</span>.Enjoy unlimited access to all premium features.
                  </p>
                  <button 
                    onClick={() => navigate('/dashboard')}
                    className="w-full py-4 rounded-3xl text-white font-semibold text-[18px] bg-[#103960] flex items-center justify-center gap-2 hover:bg-[#0c2d4d] transition-all"
                  >
                    <ArrowLeft size={18} /> Go to Dashboard 
                    
                  </button>
                  <p className='mt-3 text-[12px] text-[#64748B]/60 uppercase tracking-[2.4px] '>Confirmation Sent to your email.</p>
                </div>
              )}

              {/* --- VIEW 3: FAILURE MODAL --- */}
              {paymentStatus === 'failure' && (
                <div className="flex flex-col items-center text-center py-6 animate-in zoom-in-90 duration-300">
                  <div className="w-20 h-20 bg-red-50 rounded-full flex items-center justify-center mb-6 border border-red-100">
                    <div className="w-14 h-14 bg-red-500 rounded-full flex items-center justify-center shadow-lg shadow-red-200">
                      <FileExclamationPoint className="text-white" size={32} strokeWidth={3} />
                    </div>
                  </div>
                  <h3 className="text-[24px] font-bold text-[#0F172A] mb-2 font-[Manrope]">Payment Failed</h3>
                  <p className="text-[#64748B] text-[15px] font-[Inter] mb-5">
                    We were unable to process your payment.Please check your card details and try again.
                  </p>
                  <div className="w-full flex flex-col gap-3">
                    <button 
                      onClick={() => setPaymentStatus('idle')}
                      className="w-full py-4 rounded-3xl text-white font-bold text-[18px] bg-[#E20000] hover:bg-[#E20000]/50 transition-all"
                    >
                      Retry Payment
                    </button>
                     <p className=' flex ml-7 gap-5 items-center text-[12px] text-[#64748B]/60 uppercase tracking-[2.4px] '><Lock size={12} />Secure Encrypted Connection.</p>
                  </div>
                </div>
              )}

            </div>
          </div>
        </div>
      )}

      {/* --- PLANS UI SECTION (UNTOUCHED) --- */}
      <div className="text-center mb-16">
        <p className="text-[#64748B] text-[18px] max-w-2xl mx-auto leading-relaxed">
          Elevate your system architecture with tiers designed for every scale of complexity.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 items-stretch mb-20 max-w-7xl mx-auto">
        {plans.map((plan, index) => {
          const isAdvanced = plan.name === "ADVANCED";
          return (
            <div key={index} className={`relative flex flex-col bg-white rounded-[24px] p-8 border transition-all duration-300 ${isAdvanced ? 'border-[#004370] border-2 shadow-xl scale-[1.02] z-10' : 'border-[#E2E8F0]'}`}>
              {isAdvanced && <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-[#103960] text-white text-[10px] font-bold px-5 py-2 rounded-full tracking-widest uppercase">Popular</div>}
              <div className="mb-8 text-center md:text-left">
                <p className="text-[14px] font-bold uppercase mb-4 tracking-tight" style={{ color: isAdvanced ? "#004370" : "#45474C" }}>{plan.name}</p>
                <div className="flex items-baseline gap-1 mb-4 justify-center md:justify-start">
                  <span className="text-[36px] font-semibold text-[#004370]">{plan.price}</span>
                  <span className="text-[14px] font-medium text-[#45474C]">/mo</span>
                </div>
                <p className="text-[14px] leading-relaxed text-[#475569]">{plan.description}</p>
              </div>
              <div className="flex-1 space-y-5 mb-10">
                {plan.features.map((f, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <div className={`flex items-center justify-center rounded-full shrink-0 w-5 h-5 ${isAdvanced ? 'bg-[#004370]' : 'border border-[#94A3B8]'}`}>
                      <Check size={12} strokeWidth={4} className={isAdvanced ? 'text-white' : 'text-[#64748B]'} />
                    </div>
                    <span className="text-[14px] text-[#334155]">{f}</span>
                  </div>
                ))}
              </div>
              <button 
                    onClick={() => handleOpenModal(plan)} 
                    className={`w-full py-4 rounded-[12px] text-[14px] font-semibold cursor-pointer transition-all 
                      ${isAdvanced 
                        ? 'bg-[#004370] text-white hover:bg-[#00355a]' 
                        : 'bg-[#F0F7FF] text-[#103960] hover:bg-[#E0EFFF]'
                      }`}
                  >
                    {plan.buttonText}
                  </button>
            </div>
          );
        })}
      </div>
          <div className="bg-[#E0EAF2] rounded-[24px] p-10 border border-[#D1E2EF] ">
            <h2 className="text-[30px] font-extrabold text-[#191C1E] mb-4">Purchase Now & Get a Lot of Benefits</h2>
              <p className="text-[#64748B] text-[16px]">Choose the plan that fits your workflow. Start with Starter for basic usage, or move to Pro for full-scale performance.</p>
      </div>
    </div>
    
  );
};

export default Plans;