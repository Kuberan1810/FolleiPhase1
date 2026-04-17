import React, { useState } from 'react';
import { Bug, Lightbulb, Smile, Star, Send, MessageSquare, Users, ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const Feedback: React.FC = () => {
    const [category, setCategory] = useState<'Bug' | 'Suggestion' | 'Experience'>('Suggestion');
    const [rating, setRating] = useState<number>(4);
    const [message, setMessage] = useState('');

    const categories = [
        { id: 'Bug', label: 'Bug Report', icon: Bug },
        { id: 'Suggestion', label: 'Suggestion', icon: Lightbulb },
        { id: 'Experience', label: 'Experience', icon: Smile },
    ];

    return (
        <div className="min-h-screen bg-[#FFFFFF] p-4">
            <div className="w-full space-y-6">

                <div className="space-y-1">
                    <div className="flex items-center gap-2 text-[12px] font-medium text-[#64748B]">
                        <Link to="/settings" className="hover:text-[#004370] transition-colors">Settings</Link>
                        <span>{'>'}</span>
                        <span className="text-[#191C1E]">Feedback</span>
                    </div>
                    <span className="text-[12px] font-semibold text-[#004370] uppercase tracking-[0.15em] block pt-2">
                        Intelligence Hub
                    </span>
                    <h1 className="text-[30px] font-bold text-[#000000] tracking-tight">
                        Feedback
                    </h1>
                </div>

                <div className="rounded-[24px] space-y-6 pl-8">

                    <div className="space-y-2">
                        <label className="text-[14px] font-semibold text-[#94A3B8] uppercase tracking-wider block">
                            FEEDBACK CATEGORY
                        </label>
                        <div className="grid grid-cols-3 gap-2 md:gap-4 pt-4">
                            {categories.map((cat) => (
                                <button
                                    key={cat.id}
                                    onClick={() => setCategory(cat.id as any)}
                                    className={`flex flex-col items-center justify-center h-[82px] p-2 md:p-6 rounded-[12px] border-[2px] transition-all duration-200 gap-2 md:gap-3 group ${category === cat.id
                                        ? 'border-[#004370] bg-[#004AC6]/5'
                                        : 'border-[#000000]/0 bg-[#F2F4F6]'
                                        }`}
                                >
                                    <div className={` rounded-full transition-colors ${category === cat.id ? 'text-[#004370]' : 'group-hover:text-[#004370]'
                                        }`}>
                                        <cat.icon className="w-[18px] h-[18px] " />
                                    </div>
                                    <span className={`text-[10px] md:text-[14px] font-semibold text-center leading-tight ${category === cat.id ? 'text-[#191C1E]' : ''
                                        }`}>
                                        {cat.label}
                                    </span>
                                </button>
                            ))}
                        </div>
                    </div>

                    <div className="space-y-3 text-center">
                        <label className="text-[14px] font-bold text-[#94A3B8] uppercase tracking-wider block">
                            OVERALL RATING
                        </label>
                        <div className="flex justify-center gap-1 md:gap-2">
                            {[1, 2, 3, 4, 5].map((star) => (
                                <button
                                    key={star}
                                    onClick={() => setRating(star)}
                                    className="p-1"
                                >
                                    <Star
                                        className={`w-6 h-6 md:w-8 md:h-8 ${star <= rating ? "text-[#004370]" : "text-[#C3C6D7]"}`}
                                        fill={star <= rating ? "#004370" : "transparent"}
                                    />
                                </button>
                            ))}
                        </div>
                    </div>

                    <div className="space-y-2">
                        <label className="text-[14px] font-bold text-[#94A3B8] uppercase tracking-wider block pb-2">
                            YOUR MESSAGE
                        </label>
                        <textarea
                            value={message}
                            onChange={(e) => setMessage(e.target.value)}
                            placeholder="Tell us what's on your mind..."
                            className="w-full h-[180px] p-4 rounded-[12px] bg-[#F2F4F6] focus:outline-none focus:border-[#004370] focus:ring-2 focus:ring-[#004370]/10 transition-all resize-none text-[15px] placeholder:text-[#94A3B8]"
                        />
                    </div>

                    <div className="flex flex-col items-center gap-4 pt-4">
                        <button className="flex items-center w-[200px] md:w-[260px] h-[52px] md:h-[68px] justify-center gap-2 bg-[#004370] hover:bg-[#00365a] text-white rounded-[12px] text-[14px] md:text-[16px] font-bold transition-all shadow-[0px_8px_10px_-6px_rgba(0,74,198,0.2),0px_20px_25px_-5px_rgba(0,74,198,0.2)]">
                            Submit Feedback
                            <Send size={18} />
                        </button>
                        <p className="text-[10px] text-[#94A3B8] font-medium uppercase tracking-widest text-center">
                            OUR TEAM REVIEWS EVERY RESPONSE WITHIN 24 HOURS.
                        </p>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4 pl-8">
                    <div className="bg-[#F2F4F6] rounded-[32px] p-8 flex flex-col justify-between h-[194px]">
                        <div className="space-y-4">
                            <div className="text-[#004370]">
                                <MessageSquare size={24} />
                            </div>
                            <div className="flex flex-col gap-1">
                                <span className="text-[18px] font-bold text-[#191C1E]">Need immediate help?</span>
                                <span className="text-[14px] text-[#434655] leading-relaxed">Our support engineers are available 24/7 for critical system issues.</span>
                            </div>
                        </div>
                        <Link to="/support" className="text-[#004370] text-[16px] font-bold flex items-center gap-1 hover:underline">
                            Contact Support <ChevronRight size={18} />
                        </Link>
                    </div>

                    <div className="bg-[#D4E3FF] rounded-[32px] p-8 flex flex-col justify-between h-[194px]">
                        <div className="space-y-4">
                            <div className="text-[#004883]">
                                <Users size={24} />
                            </div>
                            <div className="flex flex-col gap-1">
                                <span className="text-[18px] font-bold text-[#001C39]">Community Forum</span>
                                <span className="text-[14px] text-[#004883] leading-relaxed">Discuss features and workflows with other architects.</span>
                            </div>
                        </div>
                        <Link to="/community" className="text-[#001C39] text-[16px] font-bold flex items-center gap-1 hover:underline">
                            Join Discussion <ChevronRight size={18} />
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Feedback;
