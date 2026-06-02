'use client';

interface ButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  variant?: 'primary' | 'secondary';
  type?: 'button' | 'submit';
  disabled?: boolean;
  className?: string;
}

export default function Button({
  children,
  onClick,
  variant = 'primary',
  type = 'button',
  disabled = false,
  className = '',
}: ButtonProps) {
  const baseStyles = 'relative z-20 inline-flex items-center justify-center font-medium uppercase tracking-[0.15em] text-[11px] transition-all duration-200 cursor-pointer select-none';
  
  const variants = {
    primary: 'bg-marco-accent text-marco-bg hover:bg-marco-accent-hover active:scale-[0.98] shadow-lg shadow-marco-accent/20 hover:shadow-marco-accent/40',
    secondary: 'bg-transparent border border-marco-border text-marco-faint hover:text-marco-accent hover:border-marco-accent/40',
  };

  const disabledStyles = disabled ? 'opacity-50 cursor-not-allowed pointer-events-none' : '';
  const sizeStyles = 'py-3.5 px-6 rounded-xl';

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`${baseStyles} ${variants[variant]} ${disabledStyles} ${sizeStyles} ${className}`}
      style={{ pointerEvents: disabled ? 'none' : 'auto' }}
    >
      {children}
    </button>
  );
}