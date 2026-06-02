'use client';

interface ToggleButtonProps {
  children: React.ReactNode;
  active: boolean;
  onClick: () => void;
}

export default function ToggleButton({ children, active, onClick }: ToggleButtonProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`relative z-20 w-full px-3 py-3 rounded-lg text-[11px] uppercase tracking-[0.1em] border transition-all duration-200 cursor-pointer select-none ${
        active
          ? 'bg-marco-accent text-marco-bg font-medium border-marco-accent shadow-md shadow-marco-accent/20'
          : 'bg-marco-surface text-marco-faint border-marco-border hover:text-marco-accent hover:border-marco-accent/40'
      }`}
      style={{ pointerEvents: 'auto' }}
    >
      {children}
    </button>
  );
}