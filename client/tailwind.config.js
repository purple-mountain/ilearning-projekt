const withMT = require("@material-tailwind/react/utils/withMT");

/** @type {import('tailwindcss').Config} */
export default withMT({
    content: [
        "./src/**/*.{js,jsx,ts,tsx}",
        "./index.html",
    ],

    theme: {
        extend: {},
    },
    plugins: [],
})
