import * as fs from 'fs'
import {
	OpenApiGeneratorV3,
	OpenAPIRegistry,
	extendZodWithOpenApi,
} from '@asteasolutions/zod-to-openapi'
import * as yaml from 'yaml'
import { z } from 'zod'

extendZodWithOpenApi(z)

const registry = new OpenAPIRegistry()

// Define Zod schema for User
export const UserSchema = registry.register(
	'User',
	z.object({
		id: z.string().openapi({ example: '1212121' }),
		email: z.string().openapi({ example: 'johndoe@gmail.com' }),
		username: z.string().openapi({ example: 'johndoe' }),
		name: z.string().openapi({ example: 'John' }),
	}),
)

const bearerAuth = registry.registerComponent('securitySchemes', 'bearerAuth', {
	type: 'http',
	scheme: 'bearer',
	bearerFormat: 'JWT',
})

registry.registerPath({
	method: 'get',
	path: '/users',
	description: 'Get all users',
	summary: 'Fetch all users',
	security: [{ [bearerAuth.name]: [] }],
	responses: {
		200: {
			description: 'Users found',
			content: {
				'application/json': {
					schema: z.array(UserSchema),
				},
			},
		},
	},
})

export function getOpenApiDocumentation() {
	const generator = new OpenApiGeneratorV3(registry.definitions)
	return generator.generateDocument({
		openapi: '3.0.0',
		info: {
			version: '1.0.0',
			title: 'My API',
			description: 'API for managing users',
		},
		servers: [{ url: '/api' }],
	})
}

// Write the OpenAPI document to YAML file
export function writeDocumentation() {
	const docs = getOpenApiDocumentation()
	const fileContent = yaml.stringify(docs)
	fs.writeFileSync(`${__dirname}/openapi-docs.yml`, fileContent, {
		encoding: 'utf-8',
	})
}
