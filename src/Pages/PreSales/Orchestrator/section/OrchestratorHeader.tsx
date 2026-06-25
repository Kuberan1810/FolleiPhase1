const OrchestratorHeader = () => {
  return (
    <div className="flex items-end justify-between gap-4 pb-6 border-b border-[#E2E8F0]">
      <div>
        <h1 className="m-0 font-semibold text-[24px] md:text-[30px] leading-[32px] md:leading-[36px] text-[#0D1C2E]">
          Data Import
        </h1>
        <p className="m-0 font-normal text-sm md:text-base leading-[24px] md:leading-[36px] text-[#6B7280]">
          Management suite for automated intelligence and data synchronization
        </p>
      </div>
      <span className="shrink-0 mt-1 text-[14px] font-bold text-[#64748B] bg-[#F1F5F9] px-3 py-1.5 rounded-[8px] tracking-wider">
        v4.2.0
      </span>
    </div>
  );
};

export default OrchestratorHeader;
