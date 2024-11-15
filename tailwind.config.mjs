/** @type {import('tailwindcss').Config} */
import defaultTheme from 'tailwindcss/defaultTheme'
export default {
	content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
	darkMode: 'class',
	theme: {
	  extend: {
		fontFamily: {
		  sans: ['Inter var', ...defaultTheme.fontFamily.sans],
		},
		colors: {
		  // Custom color palette
		},
	  },
	},
	plugins: [
	  require('@tailwindcss/typography'),
	  require('@tailwindcss/forms'),
	],
}
