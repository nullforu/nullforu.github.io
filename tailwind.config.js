/** @type {import('tailwindcss').Config} */
export default {
    content: ['./index.html', './src/**/*.{ts,tsx}'],
    theme: {
        extend: {
            fontFamily: {
                chicago: ['"ChicagoFLF"', '"DungGeunMo"', '"Pretendard"', '"Geneva"', '"Lucida Console"', 'monospace'],
            },
            colors: {
                mac: {
                    paper: '#f7f7f7',
                    ui: '#d8d8d8',
                    ink: '#111111',
                    shadow: '#000000',
                },
            },
            boxShadow: {
                mac: '2px 2px 0 #111111',
            },
        },
    },
    plugins: [],
}
