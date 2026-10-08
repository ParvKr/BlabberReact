import { ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/**
 * Builds the name of a *private* Pusher channel. Private channels require the
 * subscriber to be authorised by `/api/pusher/auth`, which checks that the
 * signed-in user is actually allowed to listen to the channel.
 */
export function toPusherKey(key: string) {
  return `private-${key.replace(/:/g, '__')}`
}

export function chatHrefConstructor(id1: string, id2: string) {
  const sortedIds = [id1, id2].sort()
  return `${sortedIds[0]}--${sortedIds[1]}`
}
