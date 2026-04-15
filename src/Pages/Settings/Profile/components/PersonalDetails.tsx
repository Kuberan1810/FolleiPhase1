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
                        className="px-6 py-2 bg-[#004370] text-white text-[11px] font-bold rounded-[2px] "
                    >
                        Edit Profile
                    </button>
                ) : (
                    <div className="flex gap-2">
                        <button
                            onClick={onCancel}
                            className="px-4 py-1.5 bg-[#F3F4F5] text-[#767676] text-[12px] font-bold rounded-[2px]"
                        >
                            Cancel
                        </button>
                        <button
                            onClick={handleFormSave}
                            className="px-4 py-1.5 bg-[#004370] text-white text-[12px] font-bold rounded-[2px]"
                        >
                            Save Changes
                        </button>
                    </div>
                )}
            </div>

            <div className="px-6 pb-8 space-y-6">
                <div className="space-y-0.5">
                    <label className="text-[12px] font-medium text-[#414755] capitalize">Full Name</label>
                    <input
                        type="text"
                        name="firstName"
                        value={`${formData.firstName} ${formData.lastName}`}
                        onChange={(e) => {
                            const [first, ...last] = e.target.value.split(' ');
                            setFormData(prev => ({ ...prev, firstName: first || '', lastName: last.join(' ') }));
                        }}
                        disabled={!isEditing}
                        className="w-full px-[16px] py-[12px]  border-b-[0.5px] border-[#000000]/15 rounded-[8px] bg-[#F7F9FB] text-[14px] text-[#191C1D] outline-none"
                    />
                </div>

                <div className="space-y-0.5">
                    <label className="text-[12px] font-medium text-[#414755] capitalize">User Id</label>
                    <input
                        type="text"
                        name="userId"
                        value={formData.userId}
                        disabled={true}
                        className="w-full px-[16px] py-[12px] border-b-[0.5px] border-[#000000]/15 rounded-[8px] bg-[#F7F9FB] text-[14px] text-[#191C1D] outline-none"
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
                        className="w-full px-[16px] py-[12px]  border-b-[0.5px] border-[#000000]/15 rounded-[8px] bg-[#F7F9FB] text-[14px] text-[#191C1D] outline-none "
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
                        className="w-full px-[16px] py-[12px]  border-b-[0.5px] border-[#000000]/15 rounded-[8px] bg-[#F7F9FB] text-[14px] text-[#191C1D] outline-none "
                    />
                </div>
            </div>
        </div>
    );
};

export default PersonalDetails;
