const withMT = require("@material-tailwind/react/utils/withMT");
const tailwindcssAnimated = require("tailwindcss-animated");

/** @type {import('tailwindcss').Config} */
module.exports = withMT({
    content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
    theme: {
        extend: {
            fontFamily: {
                architects: ['"Architects Daughter"', "cursive"],
                poppins: ["Poppins", "sans-serif"],
                teachers: ["Teachers", "sans-serif"],
                notoSansGujarati: ['"Noto Sans Gujarati"', "sans-serif"],
                notoSansDevanagari: ['"Noto Sans Devanagari"', "sans-serif"],
                openSans: ['"Open Sans"', "sans-serif"],
            },
        },
    },
    
    plugins: [tailwindcssAnimated],
});

