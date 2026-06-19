
import { ComposedChart, Bar, ResponsiveContainer, XAxis, YAxis } from 'recharts';
import type { PredictionDataPoint } from '../RenewalDash';

interface RenewalPredictionChartProps {
  data: PredictionDataPoint[];
}

const OverlayBars = (props: any) => {
  const { x, y, width, height, payload } = props;
  const outerWidth = 64;
  const innerWidth = 40;
  const offsetXOuter = (width - outerWidth) / 2;
  const offsetXInner = (width - innerWidth) / 2;

  // height is already scaled to follei value by recharts
  // calculate actual bar's height proportionally
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
      />
      <rect
        x={x + offsetXInner}
        y={innerY}
        width={innerWidth}
        height={innerHeight}
        fill="#99B4C6"
        rx={4}
      />
    </g>
  );
};

export default function RenewalPredictionChart({ data }: RenewalPredictionChartProps) {
  return (
    <div style={{
      backgroundColor: '#FFFFFF',
      boxShadow: '0px 2px 4px 0px #00000026',
      borderRadius: '20px',
      padding: '24px',
      height: '100%',
      display: 'flex',
      flexDirection: 'column'
    }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
        <h3 style={{
          margin: 0,
          fontFamily: 'Urbanist',
          fontWeight: 600,
          fontSize: '20px',
          lineHeight: '28px',
          color: '#0D1C2E',
        }}>
          Renewal Prediction
        </h3>
        <div style={{ display: 'flex', gap: '16px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <div style={{ width: '20px', height: '20px', borderRadius: '999px', backgroundColor: '#014370' }} />
            <span style={{
              fontFamily: 'Urbanist',
              fontWeight: 500,
              fontSize: '16px',
              lineHeight: '28px',
              color: '#0D1C2E'
            }}>Follei Predicts</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <div style={{ width: '20px', height: '20px', borderRadius: '999px', backgroundColor: '#99B4C6' }} />
            <span style={{
              fontFamily: 'Urbanist',
              fontWeight: 500,
              fontSize: '16px',
              lineHeight: '28px',
              color: '#0D1C2E'
            }}>Actual Renewal</span>
          </div>
        </div>
      </div>

      <div style={{ flex: 1, minHeight: '250px' }}>
        <ResponsiveContainer width="100%" height="100%">
          <ComposedChart data={data} barCategoryGap="15%">
            <XAxis dataKey="month" hide />
            <YAxis hide />
            <Bar dataKey="follei" shape={OverlayBars} barSize={64} />
          </ComposedChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
