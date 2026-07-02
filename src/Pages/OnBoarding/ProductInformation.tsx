import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  ArrowRight, ArrowLeft, 
  Package, LayoutGrid, Layers, Tag, Star, Users
} from 'lucide-react';
import CustomDropdown from '../../components/ui/CustomDropdown';

const ProductInformation: React.FC = () => {
  const navigate = useNavigate();
  
  // Basic state for the form inputs
  const [productName, setProductName] = useState('');
  const [productCategory, setProductCategory] = useState('');
  const [productType, setProductType] = useState('');
  const [pricingModel, setPricingModel] = useState('');
  const [productDescription, setProductDescription] = useState('');
  const [keyFeatures, setKeyFeatures] = useState('');
  const [targetAudience, setTargetAudience] = useState('');

  return (
    <div className="fixed inset-0 w-full h-full flex items-center justify-center bg-gradient-to-br from-[#E8F0F8] via-[#F8FAFC] to-[#DCE6ED] p-4 md:p-8 font-inter overflow-hidden">
      
      {/* Background blur overlays */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] left-[-5%] w-[60%] h-[60%] rounded-full bg-blue-300/40 blur-[120px]" />
        <div className="absolute bottom-[-10%] right-[-5%] w-[50%] h-[50%] rounded-full bg-cyan-200/40 blur-[120px]" />
        <div className="absolute top-[20%] right-[10%] w-[40%] h-[40%] rounded-full bg-blue-200/30 blur-[100px]" />
      </div>

      {/* Main Content Card - Flex Layout Chassis */}
      <div className="relative z-10 w-full max-w-[1200px] h-full max-h-[900px] bg-white rounded-[24px] shadow-[0_8px_40px_rgba(0,0,0,0.06)] flex flex-col animate-in fade-in zoom-in duration-500">
        
        {/* Sticky Top Header Area */}
        <div className="px-6 md:px-12 pt-6 md:pt-10 shrink-0 bg-white rounded-t-[24px] z-10 relative">
          <div className="absolute bottom-0 left-0 w-full h-6 bg-gradient-to-b from-white to-transparent -mb-6 pointer-events-none z-20" />

          {/* Stepper */}
          <div className="flex items-center gap-3 w-full mb-8">
            {[1, 2, 3, 4, 5].map((_, index) => (
              <div 
                key={index} 
                className={`flex-1 h-1.5 rounded-full ${index < 4 ? 'bg-[#004370]' : 'bg-[#E2E8F0]'}`} 
              />
            ))}
          </div>

          {/* Header */}
          <div className="flex flex-col items-center text-center mb-6">
            <h1 className="text-[32px] md:text-[36px] font-bold text-[#0D1C2E] mb-3 leading-[40px] tracking-[-0.9px]">
              Product Information
            </h1>
            <p className="text-[16px] font-normal text-[#767587] max-w-[650px] leading-relaxed">
              Tell us about your product so Follei can deliver personalized customer insights, health scores, and AI recommendations.
            </p>
          </div>
        </div>

        {/* Scrollable Body */}
        <div className="flex-1 overflow-y-auto px-6 md:px-12 py-4 onboarding-scroll z-0">
          <div className="w-full">

        {/* Form Fields Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
          
          {/* Row 1 */}
          <div className="flex flex-col gap-1.5">
            <label className="text-[14px] font-bold text-[#334155]">Product Name</label>
            <div className="relative flex items-center">
              <div className="absolute left-4 text-[#94A3B8]">
                <Package size={18} strokeWidth={1.5} />
              </div>
              <input 
                type="text" 
                value={productName}
                onChange={(e) => setProductName(e.target.value)}
                className="w-full h-[48px] pl-11 pr-4 rounded-[10px] border border-[#E2E8F0] text-[#1E293B] text-[15px] focus:outline-none focus:border-[#004370] focus:ring-1 focus:ring-[#004370]/20 transition-all bg-transparent placeholder:text-[#94A3B8]"
                placeholder="Product Name"
              />
            </div>
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="text-[14px] font-bold text-[#334155]">Product Category</label>
            <CustomDropdown
              options={[
                { value: 'software', label: 'Software' },
                { value: 'hardware', label: 'Hardware' },
                { value: 'services', label: 'Services' }
              ]}
              value={productCategory}
              onChange={setProductCategory}
              placeholder="Category"
              icon={<LayoutGrid size={18} strokeWidth={1.5} />}
            />
          </div>

          {/* Row 2 */}
          <div className="flex flex-col gap-1.5">
            <label className="text-[14px] font-bold text-[#334155]">Product Type</label>
            <div className="relative flex items-center">
              <div className="absolute left-4 text-[#94A3B8]">
                <Layers size={18} strokeWidth={1.5} />
              </div>
              <input 
                type="text" 
                value={productType}
                onChange={(e) => setProductType(e.target.value)}
                className="w-full h-[48px] pl-11 pr-4 rounded-[10px] border border-[#E2E8F0] text-[#1E293B] text-[15px] focus:outline-none focus:border-[#004370] focus:ring-1 focus:ring-[#004370]/20 transition-all bg-transparent placeholder:text-[#94A3B8]"
                placeholder="Software"
              />
            </div>
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="text-[14px] font-bold text-[#334155]">Pricing Model</label>
            <CustomDropdown
              options={[
                { value: 'monthly', label: 'Monthly Billing' },
                { value: 'annual', label: 'Annual Billing' },
                { value: 'one-time', label: 'One-Time Payment' }
              ]}
              value={pricingModel}
              onChange={setPricingModel}
              placeholder="Monthly Billing"
              icon={<Tag size={18} strokeWidth={1.5} />}
            />
          </div>

          {/* Row 3: Product Description */}
          <div className="flex flex-col gap-1.5 md:col-span-2">
            <label className="text-[14px] font-bold text-[#334155]">Product Description</label>
            <textarea 
              value={productDescription}
              onChange={(e) => setProductDescription(e.target.value)}
              className="w-full min-h-[120px] p-4 rounded-[10px] border border-[#E2E8F0] text-[#1E293B] text-[15px] focus:outline-none focus:border-[#004370] focus:ring-1 focus:ring-[#004370]/20 transition-all bg-transparent placeholder:text-[#94A3B8] resize-y"
              placeholder="Briefly describe what your product does, who it serves, and the value it provides to customers."
            />
          </div>

          {/* Row 4 */}
          <div className="flex flex-col gap-1.5">
            <label className="text-[14px] font-bold text-[#334155]">Key Features</label>
            <div className="relative flex items-center">
              <div className="absolute left-4 text-[#94A3B8]">
                <Star size={18} strokeWidth={1.5} />
              </div>
              <input 
                type="text" 
                value={keyFeatures}
                onChange={(e) => setKeyFeatures(e.target.value)}
                className="w-full h-[48px] pl-11 pr-4 rounded-[10px] border border-[#E2E8F0] text-[#1E293B] text-[15px] focus:outline-none focus:border-[#004370] focus:ring-1 focus:ring-[#004370]/20 transition-all bg-transparent placeholder:text-[#94A3B8]"
                placeholder="Enter Features separated by commas"
              />
            </div>
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="text-[14px] font-bold text-[#334155]">Target Audience</label>
            <div className="relative flex items-center">
              <div className="absolute left-4 text-[#94A3B8]">
                <Users size={18} strokeWidth={1.5} />
              </div>
              <input 
                type="text" 
                value={targetAudience}
                onChange={(e) => setTargetAudience(e.target.value)}
                className="w-full h-[48px] pl-11 pr-4 rounded-[10px] border border-[#E2E8F0] text-[#1E293B] text-[15px] focus:outline-none focus:border-[#004370] focus:ring-1 focus:ring-[#004370]/20 transition-all bg-transparent placeholder:text-[#94A3B8]"
                placeholder="Mid-market"
              />
            </div>
          </div>

          </div>
        </div>
      </div>

      {/* Sticky Bottom Footer */}
        <div className="px-6 md:px-12 pb-6 md:pb-10 pt-6 shrink-0 bg-white rounded-b-[24px] border-t border-[#F1F5F9] z-10 relative">
          <div className="absolute top-0 left-0 w-full h-6 bg-gradient-to-t from-white to-transparent -mt-6 pointer-events-none z-20" />

          <div className="w-full flex items-center justify-between">
            <button 
              onClick={() => navigate('/onboarding/step-4')}
              className="flex items-center gap-2 text-[#64748B] font-semibold text-[15px] hover:text-[#0D1C2E] transition-colors px-2 py-2 cursor-pointer"
            >
              <ArrowLeft className="w-4 h-4" />
              Back
            </button>
            
            <button 
              onClick={() => navigate('/onboarding/step-6')}
              className="h-[48px] px-8 bg-[#004370] text-white rounded-[10px] flex items-center justify-center gap-2 font-semibold text-[15px] hover:bg-[#003152] transition-colors cursor-pointer"
            >
              Continue
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};

export default ProductInformation;
