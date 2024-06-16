import { useQuery } from '@tanstack/react-query'
import { client } from '@/lib/hono'

export const useGetJob = (jobId: string) => {
  const query = useQuery({
    queryKey: ['jobs', { jobId }],
    queryFn: async () => {
      const res = await client.api.jobs[':jobId'].$get({
        param: { jobId },
      })

      if (!res.ok) throw new Error('Failed to fetch job')

      const { data } = await res.json()
      return data
    },
  })
  return query
}
