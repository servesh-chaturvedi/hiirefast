'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { insertJobSchema } from '@/db/schema'
import { useRouter } from 'next/navigation'
import { useCreateJob } from '@/features/jobs/api/use-create-job'

const formSchema = insertJobSchema
  .pick({
    title: true,
  })
  .refine((data) => data.title.length > 0)

type FormValues = z.input<typeof formSchema>

export default function CreateJob() {
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: '',
    },
  })

  const { isValid } = form.formState
  const router = useRouter()
  const mutation = useCreateJob()

  const onSubmit = (values: FormValues) => {
    mutation.mutate(values)
  }

  return (
    <div className="min-h-dvh grid content-center">
      <div className="max-w-md mx-auto px-4">
        <h1 className="text-2xl font-medium">Name your position</h1>
        <p className="text-sm text-slate-600">
          What would you like to name the position? Don&apos;t worry, you can
          change this later.
        </p>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="my-8 space-y-8"
          >
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Job Title</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      placeholder="e.g. Software Engineer"
                      type="text"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="flex flex-row-reverse items-center gap-x-4">
              <Button disabled={!isValid || mutation.isPending} type="submit">
                Continue
              </Button>
              <Button
                onClick={() => router.push('/dashboard')}
                type="button"
                variant="outline"
              >
                Cancel
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </div>
  )
}
