import { HashIcon } from "lucide-react"

import { cn } from "@/lib/utils"
import { buttonVariants } from "@/components/ui/button"
import {
	Tooltip,
	TooltipContent,
	TooltipTrigger,
} from "@/components/ui/tooltip"
import { ChannelContext } from "@/lib/ChannelContext"
import { useContext } from "react"

interface NavProps {
	isCollapsed: boolean
	channels:
		| {
				title: string
				label?: string
				variant: "default" | "ghost"
		  }[]
		| null
}

export function Nav({ channels, isCollapsed }: NavProps) {
	const { selectedChannel, setSelectedChannel } = useContext(ChannelContext)

	return (
		<div
			data-collapsed={isCollapsed}
			className="group flex flex-col gap-4 py-2 data-[collapsed=true]:py-2"
		>
			<nav className="grid gap-1 px-2 group-[[data-collapsed=true]]:justify-center group-[[data-collapsed=true]]:px-2">
				{channels?.length ? (
					channels.map((channel, index) =>
						isCollapsed ? (
							<Tooltip key={index} delayDuration={0}>
								<TooltipTrigger asChild>
									<div
										className={cn(
											buttonVariants({
												variant: channel.variant,
												size: "icon",
											}),
											"h-9 w-9 cursor-pointer",
											channel.title === selectedChannel?.title &&
												"bg-muted dark:bg-muted dark:text-muted-foreground dark:hover:bg-muted dark:hover:text-white",
										)}
										onClick={() =>
											setSelectedChannel &&
											setSelectedChannel({
												title: channel.title || "",
												label: channel.label || "",
												variant: "default",
											})
										}
									>
										<HashIcon className="h-4 w-4" />
										<span className="sr-only">{channel.title}</span>
									</div>
								</TooltipTrigger>
								<TooltipContent
									side="right"
									className="flex items-center gap-4"
								>
									{channel.title}
								</TooltipContent>
							</Tooltip>
						) : (
							<div
								key={index}
								className={cn(
									buttonVariants({ variant: channel.variant, size: "sm" }),
									channel.title === selectedChannel?.title &&
										"bg-muted dark:bg-muted dark:text-white dark:hover:bg-muted dark:hover:text-white",
									"cursor-pointer justify-start",
								)}
								onClick={() =>
									setSelectedChannel &&
									setSelectedChannel({
										title: channel.title || "",
										label: channel.label || "",
										variant: channel.variant || "default",
									})
								}
							>
								<HashIcon className="mr-2 h-4 w-4" />
								{channel.title}
							</div>
						),
					)
				) : (
					<div className="flex h-64 items-center justify-center text-muted-foreground">
						No channels yet
					</div>
				)}
			</nav>
		</div>
	)
}
