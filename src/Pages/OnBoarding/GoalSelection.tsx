import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  ArrowRight, ArrowLeft, 
  LineChart, DollarSign, Smile, AlertTriangle, 
  Zap, Heart, Filter, ShieldCheck, Check
} from 'lucide-react';

const GoalSelection: React.FC = () => {
  const navigate = useNavigate();
  const [selectedGoals, setSelectedGoals] = useState<string[]>([]);

  const toggleGoal = (id: string) => {
    if (selectedGoals.includes(id)) {
      setSelectedGoals(selectedGoals.filter(goal => goal !== id));
    } else {
      if (selectedGoals.length < 3) {
        setSelectedGoals([...selectedGoals, id]);
      }
    }
  };

  const goals = [
    { 
      id: 'revenue', 
      title: 'Increase Revenue', 
      desc: 'Drive more revenue by identifying high-value opportunities.', 
      Icon: LineChart,
      color: 'text-blue-500',
      bg: 'bg-blue-50'
    },
    { 
      id: 'upsell', 
      title: 'Find Upsell Opportunities', 
      desc: 'Discover customers ready for upgrades and add-ons.', 
      Icon: DollarSign,
      color: 'text-green-500',
      bg: 'bg-green-50'
    },
    { 
      id: 'satisfaction', 
      title: 'Improve Customer Satisfaction', 
      desc: 'Improve happiness and build stronger customer relationships.', 
      Icon: Smile,
      color: 'text-yellow-500',
      bg: 'bg-yellow-50'
    },
    { 
      id: 'churn', 
      title: 'Reduce Customer Churn', 
      desc: 'Identify at-risk customers and take action to improve retention.', 
      Icon: AlertTriangle,
      color: 'text-orange-500',
      bg: 'bg-orange-50'
    },
    { 
      id: 'adoption', 
      title: 'Increase Product Adoption', 
      desc: 'Drive feature adoption and help customers get more value.', 
      Icon: Zap,
      color: 'text-purple-500',
      bg: 'bg-purple-50'
    },
    { 
      id: 'health', 
      title: 'Track Customer Health', 
      desc: 'Monitor customer health scores and overall account well-being.', 
      Icon: Heart,
      color: 'text-teal-500',
      bg: 'bg-teal-50'
    },
    { 
      id: 'conversion', 
      title: 'Improve Conversion Rate', 
      desc: 'Optimize your funnel and convert more prospects into customers.', 
      Icon: Filter,
      color: 'text-pink-500',
      bg: 'bg-pink-50'
    },
    { 
      id: 'risk', 
      title: 'Identify At-Risk Customers', 
      desc: 'Proactively detect at-risk accounts and prevent churn.', 
      Icon: ShieldCheck,
      color: 'text-blue-500',
      bg: 'bg-blue-50'
    }
  ];

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
                className={`flex-1 h-1.5 rounded-full bg-[#004370]`} 
              />
            ))}
          </div>

          {/* Header & Skip Button */}
          <div className="relative flex flex-col items-center text-center mb-6 w-full pt-10 lg:pt-0">
            <div className="absolute top-0 right-0">
              <button 
                onClick={() => navigate('/')}
                className="px-4 py-1.5 rounded-full bg-[#F1F5F9] text-[#64748B] text-[14px] font-semibold hover:bg-[#E2E8F0] transition-colors"
              >
                Skip
              </button>
            </div>
            <h1 className="text-[22px] sm:text-[26px] md:text-[30px] lg:text-[36px] font-bold text-[#0D1C2E] mb-3 leading-tight tracking-[-0.9px]">
              What would you like to achieve first?
            </h1>
            <p className="text-[16px] font-normal text-[#767587]">
              Choose up to 3 goals to personalize your dashboard and AI recommendations
            </p>
          </div>
        </div>

        {/* Scrollable Body */}
        <div className="flex-1 overflow-y-auto px-6 md:px-12 py-4 onboarding-scroll z-0">
          <div className="w-full">

        {/* Selection Tracker */}
        <div className="flex justify-end mb-4">
          <div className="bg-[#F4F7FB] px-3 py-1.5 rounded-full text-[12px] font-bold text-[#64748B]">
            <span className={selectedGoals.length === 3 ? "text-[#004370]" : ""}>{selectedGoals.length}</span> / 3 selected
          </div>
        </div>

        {/* Goals Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {goals.map((goal) => {
            const isSelected = selectedGoals.includes(goal.id);
            const isMaxReached = selectedGoals.length >= 3 && !isSelected;

            return (
              <div 
                key={goal.id}
                onClick={() => toggleGoal(goal.id)}
                className={`relative flex flex-col p-6 rounded-[20px] transition-all duration-300 border-[1.5px] min-h-[160px] 
                  ${isSelected 
                    ? 'border-[#004370] bg-[#F8FAFC]' 
                    : isMaxReached 
                      ? 'border-[#F1F5F9] opacity-60 cursor-not-allowed bg-white' 
                      : 'border-[#F1F5F9] hover:border-[#E2E8F0] hover:bg-[#FAFAFA] cursor-pointer bg-white'
                  }`}
              >
                {/* Checkbox Icon */}
                <div className={`absolute top-5 right-5 w-5 h-5 rounded-[4px] border-[1.5px] flex items-center justify-center transition-colors
                  ${isSelected ? 'bg-[#004370] border-[#004370]' : 'border-[#CBD5E1]'}`}>
                  {isSelected && <Check size={14} color="white" strokeWidth={3} />}
                </div>

                {/* Colored Icon Badge */}
                <div className={`w-10 h-10 rounded-full flex items-center justify-center mb-4 ${goal.bg} ${goal.color}`}>
                  <goal.Icon size={18} strokeWidth={2} />
                </div>

                <h3 className={`text-[15px] font-bold mb-2 ${isSelected ? 'text-[#004370]' : 'text-[#1E293B]'}`}>
                  {goal.title}
                </h3>
                <p className={`text-[12px] leading-relaxed pr-2 ${isSelected ? 'text-[#004370]/70' : 'text-[#8B98A5]'}`}>
                  {goal.desc}
                </p>
              </div>
            );
          })}
        </div>

          </div>
        </div>

        {/* Sticky Bottom Footer */}
        <div className="px-6 md:px-12 pb-6 md:pb-10 pt-6 shrink-0 bg-white rounded-b-[24px] border-t border-[#F1F5F9] z-10 relative">
          <div className="absolute top-0 left-0 w-full h-6 bg-gradient-to-t from-white to-transparent -mt-6 pointer-events-none z-20" />

          <div className="w-full flex items-center justify-between">
            <button 
              onClick={() => navigate('/onboarding/step-5')}
              className="flex items-center gap-2 text-[#64748B] font-semibold text-[15px] hover:text-[#0D1C2E] transition-colors px-2 py-2 cursor-pointer"
            >
              <ArrowLeft className="w-4 h-4" />
              Back
            </button>
            
            <button 
              onClick={() => navigate('/onboarding/review')}
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

export default GoalSelection;
