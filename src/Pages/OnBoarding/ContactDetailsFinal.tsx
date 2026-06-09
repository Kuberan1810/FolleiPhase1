// import { useState } from 'react';
// import { Lock1, ShieldSecurity } from 'iconsax-react';
// import { useNavigate } from 'react-router-dom';
// import OnboardingProgress from './OnboardingProgress';
// import FolleiWhite from '../../assets/logo/FolleiLogo.svg';
// import BtnCom from '../../Component/BtnCom';

// const ContactDetailsFinal = () => {
//   const navigate = useNavigate();
//   const [formData, setFormData] = useState({
//     name: '',
//     whatsapp: ''
//   });

//   const isFormComplete = formData.name && formData.whatsapp;

//   const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const { name, value } = e.target;

//     if (name === 'whatsapp') {
//       const numericValue = value.replace(/\D/g, '');
//       if (numericValue.length <= 10) {
//         setFormData(prev => ({ ...prev, [name]: numericValue }));
//       }
//       return;
//     }

//     setFormData(prev => ({ ...prev, [name]: value }));
//   };

//   return (
//     <div className="min-h-screen bg-[#F8F9FC] flex flex-col font-['Inter'] px-5 pt-5">
//       <div className="flex items-center gap-3 mb-10">
//         <div className='w-28'>
//           <img src={FolleiWhite} alt="FolleiLogo" />
//         </div>
//       </div>

//       <main className="flex-1 flex flex-col items-center justify-center p-4 sm:p-6 bg-[#]">
//         <div className="BoxStyle p-7.5! flex flex-col relative w-full max-w-[750px] shadow-xs">
//           <div className="mb-[48px]">
//             <h2 className="text-[#191C1E] text-xl md:text-[24px] font-semibold leading-[24px] mb-[10px] font-manrope">Enter Your Contact Details</h2>
//             <p className="text-[#64748B] text-sm md:text-[16px] font-regular leading-none font-inter">We use your details only for security and essential updates</p>
//           </div>

//           <div className="flex flex-col gap-[24px] mb-[40px]">
//             <div className="flex flex-col gap-2">
//               <label className="text-[14px] font-normal text-[#191C1E] leading-none font-inter">Enter your Name</label>
//               <input
//                 type="text"
//                 name="name"
//                 value={formData.name}
//                 onChange={handleChange}
//                 placeholder="Full Name"
//                 className="w-full h-[56px] px-6 rounded-[10px] border border-[#D2D2D2] bg-white text-[16px] text-black focus:outline-none focus:ring-1 focus:ring-[#0C4A6E] font-inter"
//               />
//             </div>
//             <div className="flex flex-col gap-2">
//               <label className="text-[14px] font-normal text-[#191C1E] leading-none font-inter">Enter your Whatsapp number</label>
//               <div className="relative w-full flex items-center">
//                 <span className="absolute left-6 text-black text-[16px] font-inter">+91</span>
//                 <input
//                   type="tel"
//                   name="whatsapp"
//                   value={formData.whatsapp}
//                   onChange={handleChange}
//                   maxLength={10}
//                   className="w-full h-[56px] pl-[60px] pr-6 rounded-[10px] border border-[#D2D2D2] bg-white text-[16px] text-black focus:outline-none focus:ring-1 focus:ring-[#0C4A6E] font-inter"
//                 />
//               </div>
//             </div>
//           </div>

//           <div className="flex flex-wrap items-start justify-between gap-6 mb-[40px]">
//             <div className="flex flex-1 items-start gap-3 max-w-[260px]">
//               <div className="mt-1 text-[#005B96] shrink-0">
//                 <Lock1 size={28} color='currentColor' strokeWidth={2.5} />
//               </div>
//               <div>
//                 <h4 className="text-sm font-semibold text-[#191C1E] font-manrope">Secure Encryption</h4>
//                 <p className="text-xs text-[#6B7A90] font-regular leading-tight mt-0.5 ">End-to-end encrypted for your security</p>
//               </div>
//             </div>
//             <div className="flex flex-1 items-start gap-3 max-w-[260px]">
//               <div className="mt-1 text-[#005B96] shrink-0">
//                 <ShieldSecurity color='currentColor' size={28} strokeWidth={2.5} />
//               </div>
//               <div>
//                 <h4 className="text-sm font-semibold text-[#191C1E] font-manrope">Your data is secure with us</h4>
//                 <p className="text-xs text-[#6B7A90] font-regular leading-tight mt-0.5 ">We only use your contact method for essential updates no spam.</p>
//               </div>
//             </div>
//           </div>

//           <div className="flex justify-end gap-4">
//             <BtnCom
//               title="Go Back"
//               variant="outline"
//               onClick={() => navigate('/onboarding/verify')}
//               className="px-10!"
//             />
//             <BtnCom
//               title="Next"
//               variant="primary"
//               onClick={() => navigate('/onboarding/whatsapp-verify')}
//               disabled={!isFormComplete}
//               className="px-10!"
//             />
//           </div>
//         </div>

//         <OnboardingProgress currentStep={3} />
//       </main>
//     </div>
//   );
// };

// export default ContactDetailsFinal;
