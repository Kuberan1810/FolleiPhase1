

const revenueData = [
  { label: 'Safe', color: '#00BB42', width: '90%' },
  { label: 'Critical', color: '#FFC20D', width: '25%' },
  { label: 'At Risk', color: '#FF6467', width: '10%' }
];

export default function RenewalRevenue() {
  return (
    <div className="col-span-12 lg:col-span-5 BoxStyle shadow-[0_4px_20px_rgba(237,243,253,0.4)] flex flex-col justify-between">
      <div className="mb-4">
        <h2 className="text-[20px] font-semibold text-black leading-[24px] tracking-[0.6px]">Renewal Revenue</h2>
      </div>

      <div className="space-y-5 flex-1 flex flex-col justify-center">
        {revenueData.map((item) => (
          <div key={item.label} className="flex items-center bg-[#F6F8FF] rounded-[10px] p-2 pl-6 h-[56px]">
            <span className="w-[70px] text-[16px] font-semibold text-black">{item.label}</span>
            <div className="flex-1 h-full flex items-center pr-4">
              <div
                className="h-[46px] rounded-tr-[10px] rounded-br-[10px] transition-all duration-500"
                style={{
                  width: item.width,
                  backgroundColor: item.color
                }}
              ></div>
            </div>
          </div>
        ))}
      </div>

      <div className="pt-4 text-center pl-4">
        <p className="text-[13px] font-medium text-black italic">
          - <u>The Statics from last one month</u>
        </p>
      </div>
    </div>
  );
}
