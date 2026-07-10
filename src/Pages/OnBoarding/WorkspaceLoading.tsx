import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Database, RefreshCw, Sparkles, LineChart, CheckCircle2
} from 'lucide-react';
import folleiLogo from '../../assets/logo/follei-dark.svg';

const WorkspaceLoading: React.FC = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);

  // Auto-progress through the 5 steps
  useEffect(() => {
    const timer1 = setTimeout(() => setCurrentStep(2), 2000); // Step 2 active
    const timer2 = setTimeout(() => setCurrentStep(3), 4000); // Step 3 active
    const timer3 = setTimeout(() => setCurrentStep(4), 6000); // Step 4 active
    const timer4 = setTimeout(() => setCurrentStep(5), 8000); // Step 4 finishes (all complete)
    const timer5 = setTimeout(() => navigate('/presales/dashboard'), 9000);     // Redirect exactly 1s after last icon finishes

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
      clearTimeout(timer4);
      clearTimeout(timer5);
    };
  }, [navigate]);

  // Calculate fill percentage based on current step
  const getFillTop = () => {
    switch (currentStep) {
      case 1: return '75%'; // 25% full
      case 2: return '50%'; // 50% full
      case 3: return '25%'; // 75% full
      case 4: return '0%';  // 100% full
      case 5: return '-20%';// Overfilled to ensure complete coverage
      default: return '100%';
    }
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-gradient-to-br from-[#E8F0F8] via-[#F8FAFC] to-[#DCE6ED] p-4 font-inter">

      {/* Background blur overlays */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] left-[-5%] w-[60%] h-[60%] rounded-full bg-blue-300/40 blur-[120px]" />
        <div className="absolute bottom-[-10%] right-[-5%] w-[50%] h-[50%] rounded-full bg-cyan-200/40 blur-[120px]" />
        <div className="absolute top-[20%] right-[10%] w-[40%] h-[40%] rounded-full bg-blue-200/30 blur-[100px]" />
      </div>

      {/* Main Content Card */}
      <div className="relative z-10 w-full max-w-[900px] h-[600px] bg-white rounded-[24px] shadow-[0_8px_40px_rgba(0,0,0,0.06)] p-8 md:p-12 flex flex-col items-center animate-in fade-in zoom-in duration-500 overflow-hidden justify-between">

        {/* Header */}
        <div className="flex flex-col items-center mt-6">
          <div className="flex items-center gap-3 mb-8">
            <img src={folleiLogo} alt="Follie" className="h-10" />
            <span className="text-[28px] font-bold text-[#0D1C2E]">Follei</span>
          </div>

          <h1 className="text-[28px] md:text-[32px] font-bold text-[#0D1C2E] mb-3 text-center tracking-[-0.5px]">
            Loading Your Workspace
          </h1>
          <p className="text-[15px] font-normal text-[#64748B] text-center leading-relaxed">
            We're preparing everything you need.<br />This will just take a few moments.
          </p>
        </div>

        {/* Central Liquid Wave Animation (CSS Squircle Method) */}
        <div className="w-full h-[180px] flex items-center justify-center relative overflow-visible my-4">
          <div className="relative w-[150px] h-[150px] rounded-full overflow-hidden shadow-[inset_0_4px_10px_rgba(0,0,0,0.05)] bg-[#F8FAFC] border-4 border-white">

            {/* Liquid Fill Container */}
            <div
              className="absolute left-1/2 -translate-x-1/2 w-[300px] h-[300px] transition-all duration-[2000ms] ease-in-out z-10"
              style={{ top: getFillTop() }}
            >
              {/* Wave 3 - Deepest (Light Blue) */}
              <div className="absolute top-0 left-0 w-full h-full bg-[#54D6E7] opacity-50 rounded-[38%] animate-[spin_5s_linear_infinite]" />

              {/* Wave 2 - Mid (Mid Blue) */}
              <div className="absolute top-0 left-0 w-full h-full bg-[#0065A8] opacity-70 rounded-[43%] animate-[spin_6s_linear_infinite]" />

              {/* Wave 1 - Top (Swirling Gradient) */}
              <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-tr from-[#003152] via-[#005B96] to-[#0172B1] opacity-95 rounded-[40%] animate-[spin_4s_linear_infinite]" />
            </div>

          </div>
          {/* Ambient Glow */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[220px] h-[220px] bg-blue-400/10 blur-[40px] rounded-full pointer-events-none" />
        </div>

        {/* Loading Steps Indicator */}
        <div className="w-full flex justify-between items-center px-4 md:px-12 mb-8">

          {/* Step 1: Connecting data */}
          <div className="flex flex-col items-center gap-3 w-1/4">
            <div className={`relative w-12 h-12 rounded-full flex items-center justify-center transition-colors duration-500
              ${currentStep >= 1 ? 'bg-green-50 text-green-500' : 'bg-gray-50 text-gray-400'}`}>
              <Database size={20} strokeWidth={2} />
              {currentStep > 1 && (
                <div className="absolute -top-1 -right-1 bg-white rounded-full">
                  <CheckCircle2 size={16} className="text-green-500 fill-green-500 text-white" />
                </div>
              )}
            </div>
            <span className={`text-[12px] md:text-[13px] font-medium text-center transition-colors duration-500
              ${currentStep >= 1 ? 'text-[#0D1C2E]' : 'text-[#94A3B8]'}`}>
              Connecting data
            </span>
          </div>

          {/* Step 2: Analyzing data */}
          <div className="flex flex-col items-center gap-3 w-1/4">
            <div className={`relative w-12 h-12 rounded-full flex items-center justify-center transition-colors duration-500
              ${currentStep > 2 ? 'bg-green-50 text-green-500' : currentStep === 2 ? 'bg-blue-50 text-blue-500' : 'bg-gray-50 text-gray-400'}`}>
              <RefreshCw size={20} strokeWidth={2} className={currentStep === 2 ? 'animate-spin' : ''} />
              {currentStep > 2 && (
                <div className="absolute -top-1 -right-1 bg-white rounded-full">
                  <CheckCircle2 size={16} className="text-green-500 fill-green-500 text-white" />
                </div>
              )}
            </div>
            <span className={`text-[12px] md:text-[13px] font-medium text-center transition-colors duration-500
              ${currentStep >= 2 ? 'text-[#0D1C2E]' : 'text-[#94A3B8]'}
              ${currentStep === 2 ? 'text-blue-500' : ''}`}>
              Analyzing data
            </span>
          </div>

          {/* Step 3: Generating insights */}
          <div className="flex flex-col items-center gap-3 w-1/4">
            <div className={`relative w-12 h-12 rounded-full flex items-center justify-center transition-colors duration-500
              ${currentStep > 3 ? 'bg-green-50 text-green-500' : currentStep === 3 ? 'bg-blue-50 text-blue-500' : 'bg-gray-50 text-gray-400'}`}>
              <Sparkles size={20} strokeWidth={2} className={currentStep === 3 ? 'animate-pulse' : ''} />
              {currentStep > 3 && (
                <div className="absolute -top-1 -right-1 bg-white rounded-full">
                  <CheckCircle2 size={16} className="text-green-500 fill-green-500 text-white" />
                </div>
              )}
            </div>
            <span className={`text-[12px] md:text-[13px] font-medium text-center transition-colors duration-500
              ${currentStep >= 3 ? 'text-[#0D1C2E]' : 'text-[#94A3B8]'}
              ${currentStep === 3 ? 'text-blue-500' : ''}`}>
              Generating insights
            </span>
          </div>

          {/* Step 4: Personalizing dashboard */}
          <div className="flex flex-col items-center gap-3 w-1/4">
            <div className={`relative w-12 h-12 rounded-full flex items-center justify-center transition-colors duration-500
              ${currentStep > 4 ? 'bg-green-50 text-green-500' : currentStep === 4 ? 'bg-blue-50 text-blue-500' : 'bg-gray-50 text-gray-400'}`}>
              <LineChart size={20} strokeWidth={2} className={currentStep === 4 ? 'animate-bounce' : ''} />
              {currentStep > 4 && (
                <div className="absolute -top-1 -right-1 bg-white rounded-full">
                  <CheckCircle2 size={16} className="text-green-500 fill-green-500 text-white" />
                </div>
              )}
            </div>
            <span className={`text-[12px] md:text-[13px] font-medium text-center transition-colors duration-500
              ${currentStep >= 4 ? 'text-[#0D1C2E]' : 'text-[#94A3B8]'}
              ${currentStep === 4 ? 'text-blue-500' : ''}`}>
              Personalizing dashboard
            </span>
          </div>

        </div>

      </div>
    </div>
  );
};

export default WorkspaceLoading;
