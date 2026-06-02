'use client';

interface RangeSliderProps {
  value: number;
  min: number;
  max: number;
  step: number;
  onChange: (value: number) => void;
  displayValue: string;
  minLabel: string;
  maxLabel: string;
  label: string;
}

export default function RangeSlider({
  value,
  min,
  max,
  step,
  onChange,
  displayValue,
  minLabel,
  maxLabel,
  label,
}: RangeSliderProps) {
  const percentage = ((value - min) / (max - min)) * 100;

  return (
    <div className="relative z-20 space-y-3">
      <div className="flex justify-between items-center">
        <span className="text-xs uppercase tracking-[0.15em] text-marco-faint">{label}</span>
        <span className="text-sm font-medium text-marco-accent">{displayValue}</span>
      </div>
      
      <div className="relative">
        <input
          type="range"
          min={min}
          max={max}
          step={step}
          value={value}
          onChange={(e) => onChange(Number(e.target.value))}
          className="slider-input w-full h-2 rounded-lg cursor-pointer appearance-none"
          style={{
            background: `linear-gradient(to right, #D4C4A8 0%, #D4C4A8 ${percentage}%, rgba(255,255,255,0.08) ${percentage}%, rgba(255,255,255,0.08) 100%)`,
            pointerEvents: 'auto',
          }}
        />
      </div>
      
      <div className="flex justify-between text-[10px] text-marco-faint">
        <span>{minLabel}</span>
        <span>{maxLabel}</span>
      </div>
    </div>
  );
}