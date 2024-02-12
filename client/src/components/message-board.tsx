import * as React from "react"

import { ChatList } from "@/components/chat-list"
import { Nav } from "@/components/nav"
import { cn } from "@/lib/utils"
import { TooltipProvider } from "@/components/ui/tooltip"
import {
	ResizableHandle,
	ResizablePanel,
	ResizablePanelGroup,
} from "@/components/ui/resizable"
import { ChannelContext } from "@/lib/ChannelContext"
import { EditorDisplay } from "./editor"

interface MessageProps {
	defaultLayout: number[] | undefined
	defaultCollapsed?: boolean
	navCollapsedSize: number
}

export function MessageBoard({
	defaultLayout = [265, 440, 655],
	defaultCollapsed = false,
	navCollapsedSize,
}: MessageProps) {
	const [isCollapsed, setIsCollapsed] =
		React.useState<boolean>(defaultCollapsed)
	const { channels, selectedChannel } = React.useContext(ChannelContext)

	return (
		<TooltipProvider delayDuration={0}>
			<ResizablePanelGroup
				direction="horizontal"
				onLayout={(sizes: number[]) => {
					document.cookie = `react-resizable-panels:layout=${JSON.stringify(
						sizes,
					)}`
				}}
				className="h-full max-h-[800px] items-stretch"
			>
				<ResizablePanel
					defaultSize={defaultLayout[0]}
					collapsedSize={navCollapsedSize}
					collapsible={true}
					minSize={15}
					maxSize={20}
					onCollapse={() => {
						document.cookie = `react-resizable-panels:collapsed=${JSON.stringify(
							!isCollapsed,
						)}`
						setIsCollapsed(!isCollapsed)
					}}
					className={cn(
						isCollapsed &&
							"min-w-[50px] transition-all duration-300 ease-in-out",
					)}
				>
					<Nav isCollapsed={isCollapsed} channels={channels} />
				</ResizablePanel>
				<ResizableHandle withHandle />
				<ResizablePanel defaultSize={defaultLayout[1]} minSize={30}>
					<ChatList />
				</ResizablePanel>

				{selectedChannel?.title ? (
					<>
						<ResizableHandle withHandle />
						<ResizablePanel defaultSize={defaultLayout[2]}>
							<EditorDisplay />
						</ResizablePanel>
					</>
				) : null}
			</ResizablePanelGroup>
		</TooltipProvider>
	)
}
