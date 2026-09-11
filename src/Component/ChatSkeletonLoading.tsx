export default function ChatSkeletonLoading() {
  return (
    <div className="flex-1 flex flex-col min-h-[calc(100vh-60px)] lg:min-h-screen justify-between bg-[#FDFDFC] select-none">
      {/* Top Header Bar Skeleton */}
      <div className="w-full grid grid-cols-3 items-center px-4 sm:px-8 py-3.5 sticky top-0 z-20 bg-transparent">
        <div className="flex items-center" />

        {/* Center Mode Switcher Skeleton */}
        <div className="flex justify-center">
          <div className="relative inline-flex items-center h-8 w-44 rounded-full bg-[#EAE5DF] animate-pulse p-0.5 shadow-2xs">
            <div className="h-full w-24 rounded-full bg-white/80 shadow-2xs" />
          </div>
        </div>

        {/* Right Panel Toggle Icon Skeleton */}
        <div className="flex items-center justify-end gap-3">
          <div className="size-8.5 rounded-[12px] bg-[#EAE5DF]/60 animate-pulse" />
        </div>
      </div>

      {/* Main Chat Conversation Stream Skeleton */}
      <div className="w-full max-w-6xl mx-auto px-4 sm:px-6 pt-2 pb-6 flex flex-col gap-6 flex-1">
        <div className="flex flex-col gap-5">
          {/* User Message Bubble Skeleton (Right-aligned) */}
          <div className="flex justify-end">
            <div className="w-[360px] max-w-[85%] rounded-[18px] bg-[#F4EFEA] px-5 py-3.5 shadow-2xs animate-pulse space-y-2">
              <div className="h-3.5 w-full rounded-full bg-[#E3DDD4]" />
              <div className="h-3.5 w-3/5 rounded-full bg-[#E3DDD4]" />
            </div>
          </div>

          {/* Assistant Response Bubble Skeleton (Left-aligned with Logo) */}
          <div className="flex justify-start gap-3 items-start">
            <div className="size-6 shrink-0 rounded-lg bg-[#EAE5DF] mt-1 animate-pulse" />

            <div className="w-[82%] max-w-[580px] rounded-[18px] bg-white border border-[#ECE7DE] px-5 py-4 shadow-2xs animate-pulse space-y-2.5">
              <div className="h-3.5 w-full rounded-full bg-[#ECE7DE]" />
              <div className="h-3.5 w-11/12 rounded-full bg-[#ECE7DE]" />
              <div className="h-3.5 w-4/5 rounded-full bg-[#ECE7DE]" />
              <div className="h-3.5 w-2/3 rounded-full bg-[#ECE7DE]" />
            </div>
          </div>

          {/* Checkpoint / Company Understanding Card Skeleton */}
          <div className="w-full rounded-[20px] border border-[#ECE7DE] bg-white p-5 sm:p-6 shadow-2xs animate-pulse space-y-4">
            <div className="flex items-center justify-between">
              <div className="h-4.5 w-48 rounded-lg bg-[#ECE7DE]" />
              <div className="h-3 w-20 rounded-full bg-[#ECE7DE]" />
            </div>

            <div className="space-y-2">
              <div className="h-3.5 w-full rounded-full bg-[#F4EFEA]" />
              <div className="h-3.5 w-5/6 rounded-full bg-[#F4EFEA]" />
            </div>

            {/* Sub-cards Grid Skeleton */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
              <div className="h-16 rounded-[14px] bg-[#FAF8F5] border border-[#ECE7DE] p-3 space-y-2">
                <div className="h-2.5 w-24 rounded-full bg-[#ECE7DE]" />
                <div className="h-3.5 w-36 rounded-full bg-[#ECE7DE]" />
              </div>
              <div className="h-16 rounded-[14px] bg-[#FAF8F5] border border-[#ECE7DE] p-3 space-y-2">
                <div className="h-2.5 w-24 rounded-full bg-[#ECE7DE]" />
                <div className="h-3.5 w-36 rounded-full bg-[#ECE7DE]" />
              </div>
            </div>

            {/* Action Button Skeleton */}
            <div className="h-9 w-52 rounded-full bg-[#EAE5DF] pt-1" />
          </div>
        </div>
      </div>

      {/* Sticky Bottom Bar Composer Skeleton */}
      <div className="sticky bottom-0 z-20 bg-[#FDFDFC]/95 backdrop-blur-xs px-4 sm:px-6 pb-4 pt-2">
        <div className="w-full max-w-[720px] mx-auto h-[52px] rounded-full border border-[#ECE7DE] bg-[#FAF8F5] flex items-center justify-between px-4 shadow-xs animate-pulse">
          <div className="size-6 rounded-full bg-[#EAE5DF]" />
          <div className="h-3.5 w-48 rounded-full bg-[#EAE5DF]" />
          <div className="size-8 rounded-full bg-[#191512]/20" />
        </div>
      </div>
    </div>
  );
}
