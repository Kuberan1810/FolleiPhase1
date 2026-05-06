import React from 'react';
import type { LucideIcon } from 'lucide-react';

interface BtnComProps {
    /** The text to display inside the button */
    title: string;
    /** Optional click handler */
    onClick?: () => void;
    /** Optional Icon component (from lucide-react or similar) */
    icon?: LucideIcon;
    /** Visual style variant */
    variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger';
    /** Custom CSS classes to override/extend */
    className?: string;
    /** Button type attribute */
    type?: 'button' | 'submit' | 'reset';
    /** Loading state — shows spinner, hides content */
    isLoading?: boolean;
    /** Disabled state */
    disabled?: boolean;
    /** Icon position relative to the label */
    iconPosition?: 'left' | 'right';
    /** Override icon size (default: 18) */
    iconSize?: number;
}
const BtnCom: React.FC<BtnComProps> = ({
    title,
    onClick,
    icon: Icon,
    variant = 'primary',
    className = '',
    type = 'button',
    isLoading = false,
    disabled = false,
    iconPosition = 'left',
    iconSize = 18,
}) => {

    // ── Base ──────────────────────────────────────────────────────────────
    const base = [
        'relative inline-flex items-center justify-center cursor-pointer',
        'py-3.5 px-3 gap-2',                       // H:48px | P:12px | Gap:8px
        'rounded-[8px]',                          // Corner radius: 8
        'font-manrope font-bold text-[16px]', // Typography
        'whitespace-nowrap select-none',
        'transition-all duration-150 ease-out',
        'active:scale-[0.97]',
        'disabled:opacity-50 disabled:cursor-not-allowed disabled:pointer-events-none',
        'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2',
    ].join(' ');

    // ── Variants ──────────────────────────────────────────────────────────
    const variants: Record<string, string> = {
        // Exact Figma spec: gradient #11629D → #5595D3, left→right
        primary: [
            'text-white cursor-pointer',
            'bg-[linear-gradient(to_right,#11629D,#5595D3)]',
            'shadow-[0_1px_4px_rgba(17,98,157,0.30)]',
            'hover:shadow-[0_2px_8px_rgba(17,98,157,0.40)]',    
            'hover:brightness-105',
            'focus-visible:ring-[#11629D]',
        ].join(' '),

        secondary: [
            'text-[#1e293b] bg-[#F1F5F9]',
            'hover:bg-[#e2e8f0]',
            'shadow-sm',
            'focus-visible:ring-slate-400',
        ].join(' '),

        outline: [
            'text-[#11629D] bg-transparent',
            'border border-[#11629D]',
            'hover:bg-[#11629D]/8',
            'focus-visible:ring-[#11629D]',
        ].join(' '),

        ghost: [
            'text-[#64748B] bg-transparent',
            'hover:bg-slate-100 hover:text-slate-800',
            'focus-visible:ring-slate-400',
        ].join(' '),

        danger: [
            'text-white bg-red-500',
            'hover:bg-red-600',
            'shadow-sm shadow-red-200',
            'focus-visible:ring-red-400',
        ].join(' '),
    };

    return (
        <button
            type={type}
            onClick={onClick}
            disabled={disabled || isLoading}
            className={`${base} ${variants[variant]} ${className}`}
        >
            {/* ── Loading spinner overlay ── */}
            {isLoading && (
                <span className="absolute inset-0 flex items-center justify-center">
                    <svg
                        className="animate-spin h-[18px] w-[18px] text-current"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                    >
                        <circle
                            className="opacity-25"
                            cx="12" cy="12" r="10"
                            stroke="currentColor" strokeWidth="4"
                        />
                        <path
                            className="opacity-75"
                            fill="currentColor"
                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        />
                    </svg>
                </span>
            )}

            {/* ── Content row ── */}
            <span className={`inline-flex items-center gap-2 ${isLoading ? 'opacity-0' : 'opacity-100'}`}>
                {Icon && iconPosition === 'left' && (
                    <Icon size={iconSize} strokeWidth={2.5} aria-hidden />
                )}
                <span>{title}</span>
                {Icon && iconPosition === 'right' && (
                    <Icon size={iconSize} strokeWidth={2.5} aria-hidden />
                )}
            </span>
        </button>
    );
};

export default BtnCom;
