import { useEffect, useState } from 'react'

function App() {
	const [isPauseMenuActive, setIsPauseMenuActive] = useState(false)

	// This is the listener that will be called when the lua / js clients send a message
	const listener = (data) => {
		if (data.action === 'pauseMenuStatus') {
			setIsPauseMenuActive(data.status)
			return
		}
	}

	// Add a listener to listen for messages from the lua / js clients
	useEffect(() => {
		window.addEventListener('message', (event) => {
			listener(event.data)
		})

		return () => {
			window.removeEventListener('message', (event) => {
				listener(event.data)
			})
		}
	}, [])

	// Just the same structure as a normal React app
	return (
		!isPauseMenuActive && (
			<div>
				<h1>App</h1>
			</div>
		)
	)
}

export default App
