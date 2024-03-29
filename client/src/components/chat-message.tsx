import remarkGfm from "remark-gfm"
import remarkMath from "remark-math"

import { cn } from "@/lib/utils"
import { MemoizedReactMarkdown } from "@/components/markdown"
import { IconUser } from "@/components/ui/icons"
import { Message } from "@/lib/ChannelContext"

export interface ChatMessageProps {
	message: Message
}

export function ChatMessage({ message, ...props }: ChatMessageProps) {
	return (
		<div
			className={cn("group relative mb-4 flex items-start md:-ml-12")}
			{...props}
		>
			<div
				className={cn(
					"flex size-8 shrink-0 select-none items-center justify-center rounded-md border shadow",
					"bg-primary text-primary-foreground",
				)}
			>
				<IconUser />
			</div>
			<div className="ml-4 flex-1 space-y-2 overflow-hidden px-1">
				<MemoizedReactMarkdown
					className="prose dark:prose-invert prose-p:leading-relaxed prose-pre:p-0 break-words"
					remarkPlugins={[remarkGfm, remarkMath]}
					components={{
						p({ children }) {
							return <p className="mb-2 last:mb-0">{children}</p>
						},
					}}
				>
					{message.content}
				</MemoizedReactMarkdown>
			</div>
		</div>
	)
}
