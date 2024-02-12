import { SiteHeader } from "@/components/site-header"
import { useRoutes } from "react-router-dom"
import { TailwindIndicator } from "./components/tailwind-indicator"
import { MessageBoard } from "./components/message-board"
import { ChannelProvider } from "./lib/ChannelProvider"

const routes = [{ path: "/", element: <Home /> }]

function Home() {
	const defaultLayout = undefined
	const defaultCollapsed = false
	return (
		<section className="hidden flex-col md:flex">
			<MessageBoard
				defaultLayout={defaultLayout}
				defaultCollapsed={defaultCollapsed}
				navCollapsedSize={4}
			/>
		</section>
	)
}

function App() {
	const children = useRoutes(routes)

	return (
		<>
			<div className="relative flex min-h-screen flex-col">
				<SiteHeader />
				<ChannelProvider>
					<div className="flex-1">{children}</div>
				</ChannelProvider>
			</div>
			<TailwindIndicator />
		</>
	)
}

export default App
