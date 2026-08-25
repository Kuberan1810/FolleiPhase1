import React from 'react';
import type { CourseInterestInfo } from '../../types';

interface CourseInterestSectionProps {
  courseInterest?: CourseInterestInfo;
}

export const CourseInterestSection: React.FC<CourseInterestSectionProps> = ({
  courseInterest = {
    mode: 'Online •',
    batch: 'Weekend',
    courseName: 'Digital Marketing',
    preferredStart: 'September 2026',
    courseFee: '₹45,000',
  },
}) => {
  return (
    <div className="rounded-[15px] bg-white p-5 sm:p-6 border border-[#E5E7EB]">
      <h3 className="text-[16px] font-bold uppercase tracking-wider text-[#464555]">
        Course Interest
      </h3>

      <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-y-4 gap-x-6">
        {/* Mode */}
        <div>
          <span className="text-[14px] text-[#4B5563] block">Mode</span>
          <span className="text-[14px] font-medium text-[#222222] mt-0.5 block">
            {courseInterest.mode}
          </span>
        </div>

        {/* Batch */}
        <div>
          <span className="text-[14px] text-[#4B5563] block">Batch</span>
          <span className="text-[14px] font-medium text-[#222222] mt-0.5 block">
            {courseInterest.batch}
          </span>
        </div>

        {/* Course name */}
        <div>
          <span className="text-[14px] text-[#4B5563] block">Course name</span>
          <span className="text-[14px] font-medium text-[#222222] mt-0.5 block">
            {courseInterest.courseName}
          </span>
        </div>

        {/* Preferred Start */}
        <div>
          <span className="text-[14px] text-[#4B5563] block">Preferred Start</span>
          <span className="text-[14px] font-medium text-[#222222] mt-0.5 block">
            {courseInterest.preferredStart}
          </span>
        </div>
      </div>

      {/* Course Fee Footer */}
      <div className="mt-6 flex items-center justify-between border-t border-[#F0F0EC] pt-4">
        <span className="text-[12px] font-medium text-[#4B5563]">Course Fee</span>
        <span className="text-[20px] font-bold tracking-tight text-[#1B1B24]">
          {courseInterest.courseFee}
        </span>
      </div>
    </div>
  );
};

export default CourseInterestSection;
