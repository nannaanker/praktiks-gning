/** @type {import('tailwindcss').Config} */
module.exports = {

    theme: {
        extend: {
          colors: {
            'lyserod': '#FFF7FE',
            'rod': '#DA1919',
           
          },
          spacing: {
            '450': '450px',
            '500': '500px',
            '600': '600px',
            '560': '560px',
            '580': '580px',
            '410': '481px',
            '700': '700px',
            '900': '900px',
            '100px': '100px',
            '390': '390px',
            '270': '270px',
            '110': '110px',
            
          
            
            
          },

           
            fontFamily: {
              'futura': ['futura', 'futura-pt, sans-serif;']
            },

        }
      },



    
    content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
    plugins: [
        require('@tailwindcss/typography'),
        require('@tailwindcss/forms'),
        require('@tailwindcss/aspect-ratio'),
        require('@tailwindcss/container-queries'),
    ],
  };