import { defineConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
	title: "Aleksandr Petrosyan",
	lang: "en-GB",
	description: "A home to Philosophy, Science, Music and Software",
	themeConfig: {
		// https://vitepress.dev/reference/default-theme-config
		nav: [
			{ text: 'Home', link: '/' },
			{ text: 'Blog', link: '/rants' }
		],

		sidebar: [
			{
				text: 'Blog',
				items: [
					{ text: 'Jekyll', link: '/rants/jekyll' },
				]
			}
		],

		socialLinks: [
			{ icon: 'github', link: 'https://github.com/appetrosyan' },
			{ icon: 'gitlab', link: 'https://gitlab.com/a-p-petrosyan' }
		]
	}
})
