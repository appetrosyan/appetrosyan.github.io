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
							{ text: 'I don\'t like Vitepress either', link: '/blog/rants/vitepress' }, 
							{ text: 'I don\'t get Jekyll', link: '/blog/rants/jekyll' },
							{ text: 'Emacs -- the editor that I am trapped with', link: '/blog/rants/emacs' },
							{ text: 'Cat-v', link: '/blog/rants/cat-v-harmful' },
							{ text: 'neovim', link: '/blog/rants/neovim' },
							{ text: 'Language Elitism', link: '/blog/rants/language_elitism' }
						],
						link: '/blog/rants/index',
					},
					{
						text: 'Guides',
						collapsed: false,
						items: [
							{ text: 'Setting up KeepassXC as SSH agent', link: '/blog/guides/ssh-agent' },
							{ text: 'Setting up Magit forge', link: '/blog/guides/magit-forge' },
							{ text: 'Logging into Slack', link: '/blog/guides/slack-login' }
						],
						link: '/blog/guides/index'
					}
				]
			},
			{
				text: 'Documentation',
				collapsed: false,
				items: [
					{
						text: 'supernest',
						link: 'https://appetrosyan.github.io/supernest',
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
