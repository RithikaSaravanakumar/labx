import LabXCoin, { LabXCoinSize } from './LabXCoin';

export function formatLabXPoints(points: number): string {
  return points.toLocaleString();
}

interface LabXPointsProps {
  points: number;
  size?: LabXCoinSize;
  animated?: boolean;
  showPlus?: boolean;
  className?: string;
  textClassName?: string;
  hideText?: boolean;
}

export default function LabXPoints({
  points,
  size = 'sm',
  animated = true,
  showPlus = false,
  className = '',
  textClassName = '',
  hideText = false,
}: LabXPointsProps) {
  const displayPoints = `${showPlus && points > 0 ? '+' : ''}${formatLabXPoints(points)}`;

  return (
    <div className={`inline-flex items-center gap-1.5 ${className}`}>
      <LabXCoin size={size} animated={animated} />
      {!hideText && (
        <span className={`font-bold tracking-wider ${textClassName}`}>
          {displayPoints} <span className="opacity-70 text-[0.85em]">PTS</span>
        </span>
      )}
    </div>
  );
}
