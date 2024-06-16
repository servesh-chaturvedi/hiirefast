import { IconBadge } from '@/components/icon-badge'
import { TitleForm } from '@/features/jobs/components/title-form'
import { LayoutDashboard } from 'lucide-react'

type Props = {
  params: {
    jobId: string
  }
}

export default function JobIdPage({ params }: Props) {
  const { jobId } = params

  const requiredFields: string[] = []
  const completedFields = requiredFields.filter(Boolean).length

  const completionText = `(${completedFields}/${requiredFields.length})`

  return (
    <div className="p-6">
      <div>
        <h1 className="text-2xl font-medium">Position Setup</h1>
        <span className="text-sm text-slate-600">
          Complete all fields {completionText}
        </span>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-16">
        <div>
          <div className="flex items-center gap-x-2">
            <IconBadge icon={LayoutDashboard} />
            <h2 className="text-xl font-medium">Customise your position</h2>
          </div>
          <TitleForm title="123" />
        </div>
      </div>
    </div>
  )
}
