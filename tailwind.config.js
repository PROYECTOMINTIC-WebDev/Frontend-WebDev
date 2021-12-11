module.exports = {
    resolve: {
        alias: {
            '@mui/styled-engine': '@mui/styled-engine-sc'
        },
    },
    purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
    darkMode: false, // or 'media' or 'class'
    theme: {
        extend: {
            backgroundImage: {
                'hero-pattern': "url('../../src/images/img_login.svg')",
            }


        },

    },
    variants: {
        extend: {},
    },
    plugins: [],
    plugins: [
        require('@themesberg/flowbite/plugin')
    ]

}