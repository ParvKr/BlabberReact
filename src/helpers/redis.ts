type Command = 'zrange' | 'sismember' | 'get' | 'smembers'

export async function fetchRedis(
  command: Command,
  ...args: (string | number)[]
) {
  const url = process.env.UPSTASH_REDIS_REST_URL
  const token = process.env.UPSTASH_REDIS_REST_TOKEN

  // Arguments are user-influenced (emails, ids), so encode every path segment
  // to stop a "/" from smuggling extra arguments into the Redis command.
  const commandUrl = `${url}/${command}/${args
    .map((arg) => encodeURIComponent(String(arg)))
    .join('/')}`

  const response = await fetch(commandUrl, {
    headers: { Authorization: `Bearer ${token}` },
    cache: 'no-store',
  })

  if (!response.ok) {
    throw new Error(`Error executing Redis command: ${response.statusText}`)
  }

  const data = await response.json()
  return data.result
}
