import { useMutation, useQueryClient } from '@tanstack/react-query'
import { InferRequestType, InferResponseType } from 'hono'
import { client } from '@/lib/hono'
import { toast } from 'sonner'
import { useRouter } from 'next/navigation'

type ResponseType = InferResponseType<typeof client.api.jobs.$post>
type RequestType = InferRequestType<typeof client.api.jobs.$post>['json']

export const useCreateJob = () => {
  const queryClient = useQueryClient()
  const router = useRouter()

  const mutation = useMutation<ResponseType, Error, RequestType>({
    mutationFn: async (json) => {
      const res = await client.api.jobs.$post({ json })
      return await res.json()
    },
    onSuccess: (result) => {
      toast.success('Position created!')
      queryClient.invalidateQueries({ queryKey: ['jobs'] })
      router.push(`/job/${result.data.id}`)
    },
    onError: (err) => {
      console.log(err.message)
      toast.error('Failed to create position')
    },
  })

  return mutation
}
