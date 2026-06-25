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

      <div className="overflow-x-auto mt-2">
        <table className="w-full text-left">
          <thead>
            <tr className="border-b border-[#EDF3FD] bg-[#F9FBFE] pb-2 text-[11px] font-bold text-[#8C90A6] uppercase tracking-[0.5px]">
              <th className="py-2.5 pl-2 sm:pl-4 pr-4 whitespace-nowrap">NAME</th>
              <th className="py-2.5 px-4 text-center whitespace-nowrap">DURATION</th>
              <th className="py-2.5 px-4 text-center whitespace-nowrap">STATUS</th>
              <th className="py-2.5 pl-4 pr-2 sm:pr-4 text-right whitespace-nowrap">WATCHED</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#EDF3FD]">
            {videosAndPdfsData.map((item, idx) => {
              const isCompleted = item.status === 'COMPLETED';
              const isInProgress = item.status === 'IN PROGRESS';

              return (
                <tr key={idx} className="text-[14px] text-[#191C1E]">
                  <td className="py-3.5 font-semibold text-[14px] pl-2 sm:pl-4 pr-4 whitespace-nowrap">
                    {item.name}
                  </td>
                  <td className="py-3.5 px-4 text-[#565E74] font-medium text-center whitespace-nowrap">
                    {item.duration}
                  </td>
                  <td className="py-3.5 px-4 text-center whitespace-nowrap">
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
                  <td className="py-3.5 pl-4 pr-2 sm:pr-4 text-right whitespace-nowrap">
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
  );
};

export default ProductDemoVideos;
