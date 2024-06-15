import { Button } from '@/components/ui/button'
import { CirclePlus } from 'lucide-react'
import Link from 'next/link'

export default function DashboardPage() {
  return (
    <div className="p-6">
      <Button asChild>
        <Link href="/job/create">
          <CirclePlus className="size-6 mr-2" />
          Create a job
        </Link>
      </Button>
    </div>
  )
}
