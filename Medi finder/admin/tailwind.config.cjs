const config = {
	content: [
		'./src/**/*.{html,js,svelte,ts}',
		'./node_modules/flowbite-svelte/**/*.{html,js,svelte,ts}'
	],

	plugins: [require('flowbite/plugin')],

	darkMode: 'class',

	theme: {
		extend: {
			colors: {
				primary: {
					50: '#e9fff5',
					100: '#cbffe4',
					200: '#99ffcf',
					300: '#5bfab9',
					400: '#1bec9e',
					500: '#00d488',
					600: '#00ad70',
					700: '#008a5e',
					800: '#006d4b',
					900: '#00593f',
					950: '#003324'
				}
			}
		}
	}
};

module.exports = config;
