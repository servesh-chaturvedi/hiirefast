import { useQuery } from '@tanstack/react-query'
import { client } from '@/lib/hono'

export const useGetJobs = () => {
  const query = useQuery({
    queryKey: ['jobs'],
    queryFn: async () => {
      const res = await client.api.jobs.$get()

      if (!res.ok) throw new Error('Failed to get jobs')

      const { message } = await res.json()
      return message
    },
  })
  return query
}
