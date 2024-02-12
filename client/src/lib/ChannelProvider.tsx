import * as React from "react"
import io from "socket.io-client"

import { Channel, ChannelContext, Message } from "./ChannelContext"

export interface ChannelProviderProps {
	children: React.ReactNode
}

const socket = io("http://localhost:3001")

export const ChannelProvider: React.FunctionComponent<ChannelProviderProps> = ({
	children,
}) => {
	const [channels, setChannels] = React.useState<Channel[]>([])
	const [selectedChannel, setSelectedChannel] = React.useState<Channel | null>({
		title: "",
		label: "",
		variant: "default",
	})
	const [messages, setMessages] = React.useState<Message[]>([])

	const fetchChannels = async () => {
		try {
			const response = await fetch("http://localhost:3001/channels")
			if (!response.ok) {
				throw new Error(`HTTP error! status: ${response.status}`)
			} else {
				const data = await response.json()
				console.log("Channels:", data)
				setChannels(data)
			}
		} catch (error) {
			console.error("Failed to fetch channels:", error)
		}
	}

	React.useEffect(() => {
		fetchChannels()

		socket.on("messages", (messages: Message[]) => {
			setMessages(messages)
		})

		return () => {
			socket.off("messages")
		}
	}, [])

	const selectChannel = (channel: Channel) => {
		setSelectedChannel(channels.find((c) => c.label === channel.label) || null)
		socket.emit("channel select", channel.label)
	}

	return (
		<ChannelContext.Provider
			value={{
				channels,
				selectedChannel,
				messages,
				setSelectedChannel: selectChannel,
				setMessages,
			}}
		>
			{children}
		</ChannelContext.Provider>
	)
}
