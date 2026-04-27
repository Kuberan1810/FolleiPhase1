/** @type {import('tailwindcss').Config} */
export default {
    theme: {
        extend: {
            keyframes: {
                'spin-reverse': { from: { transform: 'rotate(360deg)' }, to: { transform: 'rotate(0deg)' } },
                'pulse-ring': { '0%, 100%': { transform: 'scale(1)', opacity: '0.6' }, '50%': { transform: 'scale(1.15)', opacity: '0' } },
                'breathe': { '0%, 100%': { opacity: '0.5', transform: 'scale(1)' }, '50%': { opacity: '1', transform: 'scale(1.05)' } },
                'float': { '0%, 100%': { transform: 'translateY(0px)' }, '50%': { transform: 'translateY(-4px)' } },
            },
            animation: {
                'spin-slow': 'spin 4s linear infinite',
                'spin-reverse': 'spin-reverse 6s linear infinite',
                'pulse-ring': 'pulse-ring 2.4s ease-out infinite',
                'breathe': 'breathe 2.4s ease-in-out infinite',
                'float': 'float 3s ease-in-out infinite',
            },
        },
    },
};