/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}", // مسیر فایل‌های React
  ],
  theme: {
    extend: {
      colors: {
        irancell: '#FFCB05',
      },
    },
  },
  plugins: [
    function ({ addUtilities }) {
      addUtilities({
        ".scrollbar-hide": {
          /* Chrome, Safari و Opera */
          "&::-webkit-scrollbar": {
            display: "none",
          },
          /* IE و Edge */
          "-ms-overflow-style": "none",
          /* Firefox */
          "scrollbar-width": "none",
        },
      });
    },
    function ({ addComponents }) {
      addComponents({
        '.tooltip': {
          position: 'relative',
          display: 'inline-block',
          '& .tooltip-text': {
            position: 'absolute',
            bottom: '100%',
            left: '50%',
            transform: 'translateX(-50%)',
            marginBottom: '0.25rem',
            padding: '0.25rem 0.5rem',
            backgroundColor: 'rgba(55, 65, 81, 0.5)', // bg-gray-700 با opacity 10%
            color: '#fff',
            fontSize: '0.75rem', // text-xs
            borderRadius: '0.25rem',
            pointerEvents: 'none',
            opacity: 0, // در حالت عادی مخفی
            transition: 'opacity 0.2s',
            zIndex: 10,
            width: 'max-content',
            minWidth: '2rem',
            textAlign: 'center',
          },
          '&:hover .tooltip-text': {
            opacity: 1, // فقط هنگام hover نمایش داده شود
          },
        },
      });
    },
  ],
}
