import { z } from 'zod'

export const MAX_MESSAGE_LENGTH = 2000

export const messageValidator = z.object({
  id: z.string(),
  senderId: z.string(),
  text: z.string(),
  timestamp: z.number(),
})

export const messageArrayValidator = z.array(messageValidator)

export const sendMessageValidator = z.object({
  chatId: z.string().regex(/^[\w-]+--[\w-]+$/),
  text: z.string().trim().min(1).max(MAX_MESSAGE_LENGTH),
})

export type Message = z.infer<typeof messageValidator>
