import React, { useState, useEffect } from 'react';

interface PersonalDetailsProps {
    data: {
        firstName: string;
        lastName: string;
        userId: string;
        email: string;
        phone: string;
    };
    isEditing: boolean;
    onEdit: () => void;
    onCancel: () => void;
    onSave: (data: any) => void;
}

const PersonalDetails: React.FC<PersonalDetailsProps> = ({ data, isEditing, onEdit, onCancel, onSave }) => {
    const [formData, setFormData] = useState(data);

    useEffect(() => {
        setFormData(data);
    }, [data]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleFormSave = () => {
        onSave(formData);
    };

    return (
        <div className="bg-white rounded-[20px] overflow-hidden">
            <div className="p-6 flex items-center justify-between bg-white">
                <h2 className="text-[14px] font-bold text-[#414755] uppercase tracking-wider">
                    Personal Details
                </h2>
                {!isEditing ? (
                    <button
                        onClick={onEdit}
                        className="px-6 py-2 bg-[#004370] text-white text-[12px] font-bold rounded-[4px] cursor-pointer hover:bg-[#00365a] transition-all"
                    >
                        Edit Profile
                    </button>
                ) : (
                    <div className="flex gap-3">
                        <button
                            onClick={onCancel}
                            className="px-6 py-2 bg-[#F3F4F5] text-[#767676] text-[12px] font-bold rounded-[4px] cursor-pointer hover:bg-[#e8eaeb] transition-all"
                        >
                            Cancel
                        </button>
                        <button
                            onClick={handleFormSave}
                            className="px-6 py-2 bg-[#004370] text-white text-[12px] font-bold rounded-[4px] cursor-pointer hover:bg-[#00365a] transition-all"
                        >
                            Save Changes
                        </button>
                    </div>
                )}
            </div>

            <div className="px-6 pb-8 space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div className="space-y-0.5">
                        <label className="text-[12px] font-medium text-[#414755] capitalize">First Name</label>
                        <input
                            type="text"
                            name="firstName"
                            value={formData.firstName}
                            onChange={handleChange}
                            disabled={!isEditing}
                            className="w-full px-[16px] py-[12px] border-b-[0.5px] border-[#000000]/15 rounded-[8px] bg-[#F7F9FB] text-[14px] text-[#191C1D] outline-none transition-colors disabled:opacity-70"
                        />
                    </div>
                    <div className="space-y-0.5">
                        <label className="text-[12px] font-medium text-[#414755] capitalize">Last Name</label>
                        <input
                            type="text"
                            name="lastName"
                            value={formData.lastName}
                            onChange={handleChange}
                            disabled={!isEditing}
                            className="w-full px-[16px] py-[12px] border-b-[0.5px] border-[#000000]/15 rounded-[8px] bg-[#F7F9FB] text-[14px] text-[#191C1D] outline-none transition-colors disabled:opacity-70"
                        />
                    </div>
                </div>

                <div className="space-y-0.5">
                    <label className="text-[12px] font-medium text-[#414755] capitalize">User Id</label>
                    <input
                        type="text"
                        name="userId"
                        value={formData.userId}
                        disabled={true}
                        className="w-full px-[16px] py-[12px] border-b-[0.5px] border-[#000000]/15 rounded-[8px] bg-[#E5E7EB] text-[14px] text-[#191C1D]/60 outline-none cursor-not-allowed"
                    />
                </div>

                <div className="space-y-0.5">
                    <label className="text-[12px] font-medium text-[#414755] capitalize">Email Address</label>
                    <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        disabled={!isEditing}
                        className="w-full px-[16px] py-[12px] border-b-[0.5px] border-[#000000]/15 rounded-[8px] bg-[#F7F9FB] text-[14px] text-[#191C1D] outline-none transition-colors disabled:opacity-70"
                    />
                </div>

                <div className="space-y-0.5">
                    <label className="text-[12px] font-medium text-[#414755] capitalize">Phone Number</label>
                    <input
                        type="text"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        disabled={!isEditing}
                        className="w-full px-[16px] py-[12px] border-b-[0.5px] border-[#000000]/15 rounded-[8px] bg-[#F7F9FB] text-[14px] text-[#191C1D] outline-none transition-colors disabled:opacity-70"
                    />
                </div>
            </div>
        </div>
    );
};

export default PersonalDetails;
