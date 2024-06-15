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
import Link from 'next/link'

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

  const { isValid, isSubmitting } = form.formState

  const onSubmit = (values: FormValues) => {
    console.log(values)
  }

  return (
    <div className="max-w-md mx-auto">
      <h1 className="text-2xl font-medium">Name your position</h1>
      <p className="text-sm text-slate-600">
        What would you like to name the position? Don&apos;t worry, you can
        change this later.
      </p>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="my-8 space-y-8">
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
          <div className="flex items-center gap-x-4">
            <Button asChild variant="outline">
              <Link href="/dashboard">Cancel</Link>
            </Button>
            <Button disabled={!isValid || isSubmitting} type="submit">
              Continue
            </Button>
          </div>
        </form>
      </Form>
    </div>
  )
}
