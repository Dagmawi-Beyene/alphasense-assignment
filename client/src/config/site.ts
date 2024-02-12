export type SiteConfig = typeof siteConfig

export const siteConfig = {
	name: "Message Board Prototype",
	description:
		"Prototype for a message board application using React, Vite, and Tailwind CSS.",
	mainNav: [
		{
			title: "Home",
			href: "/",
		},
	],
	links: {
		youtube: "https://youtube.com/",
		github: "https://github.com/",
		docs: "https://ui.shadcn.com",
	},
}
