import FloatingButton from "../../../Component/FloatingButton";
import OutboundMetrics from "./section/OutboundMetrics";
import OutboundCampaignList from "./section/OutboundCampaignList";

const Campaings = () => {
  return (
    <>
      {/* Header Section */}
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-4 mb-8">
        <div>

          <h1
            className="text-[#191C1E] font-extrabold text-[24px] sm:text-[30px] leading-[32px] sm:leading-[36px] tracking-[0px] font-manrope"
          >
            Campaign Intelligence
          </h1>
        </div>
        {/* <div className="flex gap-3 sm:gap-4">
          <button
            className="flex-1 sm:flex-none sm:w-[155px] h-[52px] sm:h-[62px] bg-[#014370] text-white rounded-[10px] text-[14px] font-semibold hover:bg-[#013254] transition-colors cursor-pointer flex items-center justify-center px-4"
          >
            Pre Sales
          </button>
          <button
            className="flex-1 sm:flex-none sm:w-[155px] h-[52px] sm:h-[62px] bg-[#E5ECF1] text-black rounded-[10px] text-[14px] font-semibold border border-gray-200/50 hover:bg-gray-200 transition-colors cursor-pointer flex items-center justify-center px-4"
          >
            Post Sales
          </button>
        </div> */}
      </div>

      {/* Metrics Section */}
      <OutboundMetrics />

      {/* Bottom Data Row */}
      <div className="grid grid-cols-1 xl:grid-cols-12 gap-5 sm:gap-6 lg:gap-[32px] w-full items-start">
        <div className="xl:col-span-12">
          <OutboundCampaignList />
        </div>
        <FloatingButton />
      </div>
    </>
  );
};

export default Campaings;
