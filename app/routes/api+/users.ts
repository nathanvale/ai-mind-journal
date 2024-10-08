import { PrismaClient } from '@prisma/client'
import { json } from '@remix-run/node'
import { z } from 'zod'
import { UserSchema } from '#app/utils/openapi'

const prisma = new PrismaClient()

export const loader = async () => {
	// Fetch all users
	const users = await prisma.user.findMany()

	// Validate with Zod
	const validatedUsers = z.array(UserSchema).parse(users)
	return json(validatedUsers)
}
