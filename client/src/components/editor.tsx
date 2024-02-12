import { Button } from "@/components/ui/button"

import { Separator } from "@/components/ui/separator"
import { Textarea } from "@/components/ui/textarea"
import { ChannelContext } from "@/lib/ChannelContext"
import { useContext, useEffect, useState } from "react"
import io from "socket.io-client"

const socket = io("http://localhost:3001")

export function EditorDisplay() {
	const { selectedChannel, setMessages, messages } = useContext(ChannelContext)
	const [message, setMessage] = useState("")

	useEffect(() => {
		setMessage("")
	}, [selectedChannel])

	const postMessage = (channelLabel: string, message: string) => {
		socket.emit("new message", { channelLabel, content: message })
		setMessage("")
	}

	function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
		e.preventDefault()
		setMessages([
			...messages,
			{
				id: String(messages.length + 1),
				content: message,
			},
		])
		if (!selectedChannel?.label) return
		postMessage(selectedChannel.label, message)
		setMessage("")
	}

	return (
		<div className="flex h-full flex-col">
			<Separator />
			{selectedChannel?.title ? (
				<div className="flex flex-1 flex-col">
					<Separator />
					<div className="p-4">
						<form onSubmit={handleSubmit}>
							<div className="grid gap-4">
								<Textarea
									className="p-4"
									placeholder={`Send a message...`}
									value={message}
									onChange={(e) => setMessage(e.target.value)}
								/>
								<div className="flex items-center">
									<Button
										type="submit"
										size="sm"
										className="ml-auto"
										disabled={message.length === 0}
									>
										Submit
									</Button>
								</div>
							</div>
						</form>
					</div>
				</div>
			) : (
				<div className="p-8 text-center text-muted-foreground">
					No message selected
				</div>
			)}
		</div>
	)
}
