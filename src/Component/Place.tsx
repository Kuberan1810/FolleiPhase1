/**
 * Location and social handles, shown from what the site itself declared
 * (schema.org PostalAddress and sameAs links) rather than model inference.
 */
import type { Data } from '../api/coirei';

export interface LocationData {
  headquarters?: { city?: string; state?: string; country?: string };
  offices?: { city?: string; state?: string; country?: string }[];
  target_markets?: string[];
  declared_addresses?: Data[];
  social_profiles?: Data[];
  linkedin?: string;
}

export const placeText = (place?: { city?: string; state?: string; country?: string }) =>
  [place?.city, place?.state, place?.country].filter(Boolean).join(', ');

/** One-line headquarters label, e.g. "Pune, Maharashtra, India". */
export function PlaceLabel({ location, className = '' }: { location?: LocationData; className?: string }) {
  const text = placeText(location?.headquarters);
  if (!text) return null;
  return (
    <span className={`inline-flex items-center text-[11.5px] text-[#717378] ${className}`}>
      {text}
    </span>
  );
}

/** Link out to a company's LinkedIn page when the site published one. */
export function LinkedInLink({ url, className = '' }: { url?: string; className?: string }) {
  if (!url) return null;
  return (
    <a
      href={url}
      target="_blank"
      rel="noreferrer"
      onClick={(event) => event.stopPropagation()}
      title={url}
      className={`inline-flex items-center text-[11.5px] text-[#0A66C2] hover:underline ${className}`}
    >
      LinkedIn
    </a>
  );
}

/** Full location card: HQ, other offices, markets served. */
export function LocationCard({ location }: { location?: LocationData }) {
  const hq = placeText(location?.headquarters);
  const offices = (location?.offices || []).map(placeText).filter(Boolean).filter((text) => text !== hq);
  const markets = location?.target_markets || [];
  if (!hq && !offices.length && !markets.length) return null;

  return (
    <div className="space-y-2.5">
      {hq && (
        <div>
          <div className="text-[11px] uppercase tracking-wide text-[#717378]">Headquarters</div>
          <div className="mt-0.5 text-[13.5px] text-[#16171A] font-medium">
            {hq}
          </div>
        </div>
      )}
      {offices.length > 0 && (
        <div>
          <div className="text-[11px] uppercase tracking-wide text-[#717378]">Other offices</div>
          <div className="mt-1 flex flex-wrap gap-1.5">
            {offices.map((office) => (
              <span key={office} className="rounded-full bg-[#F1F5F9] px-2.5 py-0.5 text-[11.5px] text-[#1E293B]">{office}</span>
            ))}
          </div>
        </div>
      )}
      {markets.length > 0 && (
        <div>
          <div className="text-[11px] uppercase tracking-wide text-[#717378]">Markets served</div>
          <div className="mt-1 flex flex-wrap gap-1.5">
            {markets.map((market) => (
              <span key={market} className="rounded-full bg-[#F4F7E6] px-2.5 py-0.5 text-[11.5px] text-[#7A9601]">{market}</span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
