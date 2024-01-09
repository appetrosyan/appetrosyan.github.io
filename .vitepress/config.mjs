import { defineConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
	title: "Aleksandr Petrosyan",
	lang: "en-GB",
	description: "A home to Philosophy, Science, Music and Software",
	themeConfig: {
		// https://vitepress.dev/reference/default-theme-config
		nav: [
			{ text: 'About', link: '/' },
			{ text: 'Blog', link: '/blog/index' },
			// TODO: Add automatic CV generation from CI on my GitHub
			{ text: 'Projects', link: 'https://github.com/appetrosyan?tab=repositories' },
			{ text: 'Greybeard Consulting', link: 'http://greybeard.consulting/' },
			// { text: 'Sirius memes', link: 'localhost:8080'}, 
			{ text: 'Music', link: 'https://soundcloud.com/user-793734474'}
		],
		sidebar: [
			{
				text: 'Blog',
				link: 'blog/index',
				collapsed: false,
				items: [
					{
						text: 'Rants',
						collapsed: true,
						items: [
							{ text: 'Jekyll', link: '/blog/rants/jekyll' },
							{ text: 'Rust', link: '/blog/rants/rust' },
							{ text: 'Vitepress', link: '/blog/rants/vitepress' },
							{ text: 'Emacs', link: '/blog/rants/emacs' }
						],
						link: 'blog/rants/index',
					}
				]
			}
		],

		socialLinks: [
			{ icon: 'github', link: 'https://github.com/appetrosyan' },
			{ icon: 'discord', link: 'https://discordapp.com/users/411912361817931787' },
			// TODO: add Orcid
			// TODO: Add gitlab
			// TODO: Add crates.io
			{ icon: 'linkedin', link: 'https://www.linkedin.com/in/alexander-petrosyan' }
		]
	}
})

// Local Variables:
// mode: js
// End:
