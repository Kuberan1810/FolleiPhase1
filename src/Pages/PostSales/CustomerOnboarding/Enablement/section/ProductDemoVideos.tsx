import React from 'react';

const videosAndPdfsData = [
  { name: 'Product Introduction', duration: '5 mins', status: 'COMPLETED', progress: 100 },
  { name: 'Dashboard Overview', duration: '8 mins', status: 'COMPLETED', progress: 100 },
  { name: 'Lead Management', duration: '12 mins', status: 'COMPLETED', progress: 100 },
  { name: 'Workflow Automation', duration: '15 mins', status: 'IN PROGRESS', progress: 65 },
  { name: 'Reports & Analytics', duration: '10 mins', status: 'NOT STARTED', progress: 0 }
];

const ProductDemoVideos: React.FC = () => {
  return (
    <div className="BoxStyle p-6 flex flex-col gap-4">
      <h3 className="text-[20px] font-bold text-[#191C1E]">
        Product Demo Videos & Pdf
      </h3>

      <div className="w-full bg-white border border-[#EDF3FD] rounded-[10px] overflow-hidden flex flex-col mt-2">
        <div className="overflow-x-auto">
          <table className="w-full border-collapse text-left">
            <thead>
              <tr className="bg-[#F3F5FF] border-b border-[#EDF3FD] text-[12px] font-semibold tracking-wider text-[#434655] uppercase">
                <th className="py-3.5 px-6 whitespace-nowrap font-semibold">NAME</th>
                <th className="py-3.5 px-6 text-center whitespace-nowrap font-semibold">DURATION</th>
                <th className="py-3.5 px-6 text-center whitespace-nowrap font-semibold">STATUS</th>
                <th className="py-3.5 px-6 text-right whitespace-nowrap font-semibold">WATCHED</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#EDF3FD] text-[14px]">
              {videosAndPdfsData.map((item, idx) => {
                const isCompleted = item.status === 'COMPLETED';
                const isInProgress = item.status === 'IN PROGRESS';

                return (
                  <tr key={idx} className="bg-white hover:bg-slate-50 transition-colors text-[14px] text-[#191C1E]">
                    <td className="py-4 px-6 font-semibold whitespace-nowrap">
                      {item.name}
                    </td>
                    <td className="py-4 px-6 text-[#565E74] font-medium text-center whitespace-nowrap">
                      {item.duration}
                    </td>
                    <td className="py-4 px-6 text-center whitespace-nowrap">
                      {isCompleted && (
                        <span className="whitespace-nowrap px-2.5 py-0.5 rounded-full bg-[#DCFCE7] text-[#166534] text-[11px] font-bold">
                          COMPLETED
                        </span>
                      )}
                      {isInProgress && (
                        <span className="whitespace-nowrap px-2.5 py-0.5 rounded-full bg-[#DBEAFE] text-[#1E40AF] text-[11px] font-bold">
                          IN PROGRESS
                        </span>
                      )}
                      {!isCompleted && !isInProgress && (
                        <span className="whitespace-nowrap px-2.5 py-0.5 rounded-full bg-[#E6E8EA] text-[#565E74] text-[11px] font-bold">
                          NOT STARTED
                        </span>
                      )}
                    </td>
                    <td className="py-4 px-6 text-right whitespace-nowrap">
                      <div className="flex items-center justify-end gap-2">
                        {isInProgress && (
                          <div className="w-[40px] h-[6px] bg-[#E6E8EA] rounded-full overflow-hidden">
                            <div
                              className="h-full rounded-full bg-[#004370]"
                              style={{ width: `${item.progress}%` }}
                            />
                          </div>
                        )}
                        <span className={`font-bold text-[14px] ${item.progress > 0 ? 'text-[#004370]' : 'text-[#565E74]'}`}>
                          {item.progress}%
                        </span>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ProductDemoVideos;
