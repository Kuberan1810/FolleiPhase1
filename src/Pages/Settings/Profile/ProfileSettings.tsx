import React, { useState } from 'react';
import { User, Camera } from 'lucide-react';
import profileImg from '../../../assets/avatar.png';
import { PersonalDetails, Preferences as ProfilePreferences, Security, ChangePasswordModal } from './components';

const ProfileSettings: React.FC = () => {
    const [isEditing, setIsEditing] = useState(false);
    const [isPasswordModalOpen, setIsPasswordModalOpen] = useState(false);

    const [profileData, setProfileData] = useState({
        firstName: 'Kane',
        lastName: 'Williamson',
        userId: '2108220022',
        email: 'kanewilliamson@gmail.com',
        phone: '+91 9876543210',
    });

    const [preferences, setPreferences] = useState({
        theme: 'light',
        timezone: 'Indian Standard Time (IST) - India',
        notifications: true,
    });

    const handleSave = (newData: any) => {
        setProfileData(newData);
        setIsEditing(false);

    };

    return (
        <div className="min-h-screen pb-12  lg:-mx-6 lg:-mt-6   bg-[#FAFAF9]">
            <div className="bg-[#014370] pt-12 pb-24 px-8 rounded-b-[50px] relative overflow-hidden">
                <div className="absolute top-0 right-0 w-[200px] h-[200px] bg-white/5 rounded-full -mr-[311px] -mt-[211px] blur-3xl"></div>
                <div className="w-full relative z-10">
                    <div className="flex flex-col items-start gap-4">
                        <div className="flex flex-col items-start gap-1">
                            <div className="flex items-center gap-2 text-[12px] font-medium">
                                <span className="text-white/60 font-medium">Settings</span>
                                <span className="text-white/40">{'>'}</span>
                                <span className="text-white font-medium">Profile</span>
                            </div>
                            <span className="text-[12px] font-bold text-white uppercase tracking-[0.2em]">
                                Intelligence Hub
                            </span>
                        </div>
                        <div className="flex items-center gap-3">
                            <User size={40} className="text-white" />
                            <h1 className="text-[30px] font-bold text-white tracking-tight">Profile Settings</h1>
                        </div>
                    </div>
                </div>
            </div>

            <div className="w-full -mt-16 px-4 relative z-20">
                <div className="flex justify-start mb-10 ml-6">
                    <div className="relative group">
                        <div className="h-[200px] w-[200px] rounded-full border-4 border-white overflow-hidden bg-slate-100 ring-4 ring-white/10">
                            <img
                                src={profileImg}
                                alt="Profile"
                                className="h-full w-full object-cover"
                            />
                        </div>
                        <button className="absolute bottom-4 right-4 h-[40px] w-[40px] flex items-center justify-center bg-[#014370] hover:bg-[#00365a] text-white rounded-full border-4 border-white transform transition-all hover:scale-110 active:scale-95 cursor-pointer">
                            <Camera size={20} />
                        </button>
                    </div>
                </div>

                <div className="space-y-6">
                    <PersonalDetails
                        data={profileData}
                        isEditing={isEditing}
                        onEdit={() => setIsEditing(true)}
                        onCancel={() => setIsEditing(false)}
                        onSave={handleSave}
                    />

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 pb-12">
                        <ProfilePreferences
                            preferences={preferences}
                            setPreferences={setPreferences}
                        />
                        <Security
                            onOpenPasswordModal={() => setIsPasswordModalOpen(true)}
                        />
                    </div>
                </div>
            </div>

            {isPasswordModalOpen && (
                <ChangePasswordModal
                    onClose={() => setIsPasswordModalOpen(false)}
                />
            )}
        </div>
    );
};

export default ProfileSettings;
