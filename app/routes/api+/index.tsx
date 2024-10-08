import { json, type LoaderFunction } from '@remix-run/node'
import { useLoaderData } from '@remix-run/react'
import { useEffect, useRef } from 'react'
import { getOpenApiDocumentation } from '#app/utils/openapi'

// Loader to fetch OpenAPI docs
export const loader: LoaderFunction = async () => {
	const docs = getOpenApiDocumentation()
	return json({ docs })
}

// Main component to load Scalar API
export default function ApiSandbox() {
	const { docs } = useLoaderData<{ docs: any }>()
	const apiRef = useRef<HTMLDivElement | null>(null)

	useEffect(() => {
		let apiRefElement: HTMLDivElement
		if (apiRef.current) {
			apiRefElement = apiRef.current
			// Create a <script> tag with type="application/json" for the docs
			const docsScript = document.createElement('script')
			docsScript.id = 'api-reference'
			docsScript.type = 'application/json'
			docsScript.innerHTML = JSON.stringify(docs) // Inject OpenAPI docs here
			apiRef.current.appendChild(docsScript)

			// Dynamically load the Scalar API script
			const scalarScript = document.createElement('script')
			scalarScript.src = 'https://cdn.jsdelivr.net/npm/@scalar/api-reference'
			scalarScript.async = true
			scalarScript.onerror = () =>
				console.error('Failed to load Scalar API script')

			document.body.appendChild(scalarScript)

			// Cleanup script on component unmount
			return () => {
				if (scalarScript) {
					document.body.removeChild(scalarScript)
				}
				if (docsScript) {
					apiRefElement.removeChild(docsScript)
				}
			}
		}
	}, [docs])

	return <div ref={apiRef}></div>
}
