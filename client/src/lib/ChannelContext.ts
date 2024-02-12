import { createContext } from "react"

export interface Channel {
	title: string
	label?: string
	variant: "default" | "ghost"
}

export interface Message {
	id: string
	content?: string
}

export interface ChannelContextValue {
	channels: Channel[] | null
	messages: Message[]
	selectedChannel: Channel | null
	setSelectedChannel: (channel: Channel) => void
	setMessages: (messages: Message[]) => void
}

export const ChannelContext = createContext<ChannelContextValue>({
	channels: [],
	selectedChannel: null,
	messages: [],
	setSelectedChannel: () => {},
	setMessages: () => {},
})
