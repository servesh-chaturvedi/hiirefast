'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from '@/components/ui/form'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Pencil } from 'lucide-react'
import { useState } from 'react'
import { insertJobSchema } from '@/db/schema'

type TitleFormProps = {
  title: string
}

const formSchema = insertJobSchema
  .pick({
    title: true,
  })
  .refine((data) => data.title.length > 0)

type FormValues = z.input<typeof formSchema>
export const TitleForm = ({ title }: TitleFormProps) => {
  const [isEditing, setIsEditing] = useState(false)
  const toggleEdit = () => setIsEditing((prev) => !prev)

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: title,
    },
  })

  const { isValid } = form.formState

  const onSubmit = (values: FormValues) => {
    console.log(values)
    toggleEdit()
  }

  return (
    <div className="px-4 py-2 mt-6 border bg-slate-100 rounded-md">
      <div className="flex items-center justify-between font-medium">
        Position Title
        <Button onClick={toggleEdit} variant="ghost" className="p-2 h-auto">
          {isEditing ? (
            'Cancel'
          ) : (
            <>
              <Pencil className="size-4 mr-2" /> Edit
            </>
          )}
        </Button>
      </div>
      {!isEditing ? (
        <p className="text-sm mt-2">{title}</p>
      ) : (
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="mt-2 space-y-2"
          >
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
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
            <Button disabled={!isValid} type="submit">
              Save
            </Button>
          </form>
        </Form>
      )}
    </div>
  )
}
