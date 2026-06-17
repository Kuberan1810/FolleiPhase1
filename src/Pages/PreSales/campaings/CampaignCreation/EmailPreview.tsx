import summerBeachBanner from '../../../../assets/img/summer_beach_banner.jpg';

const EmailPreview = () => {
  return (
    <div className="text-left w-full mx-auto">
      <div className="border-b border-[#E2E8F0] pb-5 mb-6 flex flex-col gap-4 text-[14px] text-left">
        <div>
          <span className="text-[10px] font-medium text-[#767587] uppercase tracking-wider block select-none">Subject</span>
          <p className="text-[#131B2E] font-semibold text-[14px] mt-1.5">
            Exclusive Access: The Summer Minimalist Collection
          </p>
        </div>
        <div>
          <span className="text-[10px] font-medium text-[#767587] uppercase tracking-wider block select-none">Preheader</span>
          <div className="text-[#464555] text-[12px] mt-1.5 flex flex-wrap items-center gap-1">
            <span>Don't miss out on the season's most anticipated drop.</span>
            <span className="inline-flex items-center bg-[#E1DFFF] text-[#004370] px-1.5 py-0.5 rounded-[4px] text-[10px] font-medium select-none">
              {"{{First Name}}"}
            </span>
          </div>
        </div>
      </div>

      <div className="bg-white border border-[#E2E8F0] rounded-[12px] overflow-hidden shadow-sm">
        <div className="w-full relative bg-sky-100 overflow-hidden select-none aspect-[1213/304.64] rounded-[6px]">
          <img
            src={summerBeachBanner}
            alt="Summer Beach Banner"
            className="absolute inset-0 w-full h-full object-cover block"
            onError={(e) => {
              const target = e.target as HTMLElement;
              target.style.display = 'none';
            }}
          />
          <div className="absolute inset-y-0 right-0 w-[55%] flex items-center justify-center p-4 text-center sm:p-6">
            <h3 className="font-extrabold text-[#333333] text-[13px] sm:text-[26px] leading-snug">
              Hello <span className="text-[#004370] font-bold">{"{{First Name}}"}</span>. We've missed you in <span className="text-[#004370] font-bold">{"[[City]]"}</span>.
            </h3>
          </div>
        </div>
      </div>

      <div className="pt-6">

        <p className="text-[#464555] text-[15px] sm:text-[16px] leading-relaxed mb-4">
          As a valued member of our inner circle, we wanted to give you first-row access to our new Summer Collection before it opens to the general public. Based on your interest in minimalist design, we think you'll love what we've crafted.
        </p>

        <p className="text-[#464555] text-[13px] sm:text-[16px] leading-relaxed mb-6">
          Since your last purchase of <span className="font-semibold text-[#004370] bg-[#E1DFFF] rounded-[4px] px-1.5 py-0.5">[Last Purchased]</span>, we have refined our silhouettes for even greater comfort, style, and durability.
        </p>

        <div>
          <button className="bg-[#004370] hover:bg-[#002e62] text-white font-semibold text-[14px] px-6 py-3 rounded-[8px] transition-colors cursor-pointer shadow-sm">
            Shop the Collection
          </button>
        </div>

      </div>
    </div>
  );
};

export default EmailPreview;
