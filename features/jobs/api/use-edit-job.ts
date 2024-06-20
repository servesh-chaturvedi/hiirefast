import { useMutation, useQueryClient } from '@tanstack/react-query'
import { InferRequestType, InferResponseType } from 'hono'
import { client } from '@/lib/hono'
import { toast } from 'sonner'

type ResponseType = InferResponseType<
  (typeof client.api.jobs)[':jobId']['$patch']
>
type RequestType = InferRequestType<
  (typeof client.api.jobs)[':jobId']['$patch']
>['json']

export const useEditJob = (jobId: string) => {
  const queryClient = useQueryClient()

  const mutation = useMutation<ResponseType, Error, RequestType>({
    mutationFn: async (json) => {
      const res = await client.api.jobs[':jobId']['$patch']({
        json,
        param: { jobId },
      })
      return await res.json()
    },
    onSuccess: () => {
      toast.success('Update success!')
      queryClient.invalidateQueries({ queryKey: ['jobs', { jobId }] })
    },
    onError: (err) => {
      console.log(err.message)
      toast.error('Update failed')
    },
  })

  return mutation
}
