
import { ComposedChart, Bar, ResponsiveContainer, XAxis, YAxis, Tooltip } from 'recharts';
import type { PredictionDataPoint } from '../RenewalDash';

interface RenewalPredictionChartProps {
  data: PredictionDataPoint[];
}

const CustomTooltip = ({ active, payload }: any) => {
  if (active && payload && payload.length) {
    const data = payload[0].payload;
    return (
      <div className="bg-[#111827] text-white text-xs font-medium py-2 px-3 rounded shadow-lg flex flex-col gap-1 pointer-events-none">
        <div className="font-bold border-b border-gray-600 pb-1 mb-1">{data.month}</div>
        <div className="flex items-center justify-between gap-3">
          <span className="text-gray-300">Follei Predicts:</span>
          <span>{data.follei}</span>
        </div>
        <div className="flex items-center justify-between gap-3">
          <span className="text-gray-300">Actual Renewal:</span>
          <span>{data.actual}</span>
        </div>
      </div>
    );
  }
  return null;
};

const OverlayBars = (props: any) => {
  const { x, y, width, height, payload } = props;
  const outerWidth = Math.min(width, 64);
  const innerWidth = Math.min(width * 0.625, 40);
  const offsetXOuter = (width - outerWidth) / 2;
  const offsetXInner = (width - innerWidth) / 2;

  const actualRatio = payload.actual / payload.follei;
  const innerHeight = height * actualRatio;
  const innerY = y + (height - innerHeight);

  return (
    <g>
      <rect
        x={x + offsetXOuter}
        y={y}
        width={outerWidth}
        height={height}
        fill="#014370"
        rx={6}
        className="transition-opacity duration-200 hover:opacity-80 cursor-pointer"
      />
      <rect
        x={x + offsetXInner}
        y={innerY}
        width={innerWidth}
        height={innerHeight}
        fill="#99B4C6"
        rx={4}
        className="transition-opacity duration-200 hover:opacity-80 cursor-pointer"
      />
    </g>
  );
};

export default function RenewalPredictionChart({ data }: RenewalPredictionChartProps) {
  return (
    <div className="bg-white shadow-[0px_2px_4px_0px_rgba(0,0,0,0.15)] rounded-[20px] p-6 w-full flex flex-col">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-5">
        <h3 className="m-0 font-semibold text-[20px] leading-[28px] text-[#0D1C2E]">
          Renewal Prediction
        </h3>
        <div className="flex gap-4">
          <div className="flex items-center gap-2">
            <div className="w-5 h-5 rounded-full bg-[#014370]" />
            <span className="font-medium text-[14px] sm:text-base leading-7 text-[#0D1C2E]">Follei Predicts</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-5 h-5 rounded-full bg-[#99B4C6]" />
            <span className="font-medium text-[14px] sm:text-base leading-7 text-[#0D1C2E]">Actual Renewal</span>
          </div>
        </div>
      </div>

      <div className="w-full h-[250px] mt-auto">
        <ResponsiveContainer width="100%" height="100%">
          <ComposedChart data={data} barCategoryGap="15%">
            <XAxis dataKey="month" hide />
            <YAxis hide />
            <Tooltip content={<CustomTooltip />} cursor={{ fill: 'rgba(0,0,0,0.02)' }} />
            <Bar dataKey="follei" shape={OverlayBars} maxBarSize={64} />
          </ComposedChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
