import { Separator } from "@/components/ui/separator"
import { ChatMessage } from "@/components/chat-message"
import { ChannelContext } from "@/lib/ChannelContext"
import { useContext } from "react"

export function ChatList() {
	const { messages, selectedChannel } = useContext(ChannelContext)

	if (selectedChannel?.title === "") {
		return (
			<div className="flex h-64 items-center justify-center text-muted-foreground">
				No Channel selected
			</div>
		)
	}
	if (!messages.length) {
		return (
			<div className="flex h-64 items-center justify-center text-muted-foreground">
				No messages yet
			</div>
		)
	}

	return (
		<div className="relative mx-auto my-auto max-w-2xl px-14 py-10">
			{messages.map((message, index) => (
				<div key={index}>
					<ChatMessage message={message} />
					{index < messages.length - 1 && (
						<Separator className="my-4 md:my-8" />
					)}
				</div>
			))}
		</div>
	)
}
