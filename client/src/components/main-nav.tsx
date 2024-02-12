import { Icons } from "@/components/icons"
import { siteConfig } from "@/config/site"
import { Link } from "react-router-dom"



export function MainNav() {
	return (
		<div className="flex gap-6 md:gap-10">
			<Link to="/" className="flex items-center space-x-2">
				<Icons.logo className="h-6 w-6" />
				<span className="inline-block font-bold">{siteConfig.name}</span>
			</Link>
		</div>
	)
}
