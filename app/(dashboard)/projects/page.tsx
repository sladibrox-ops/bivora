import { CalendarDays, Plus } from 'lucide-react'

import { PageHeader } from '@/components/page-header'
import { StatusBadge } from '@/components/status-badge'
import { Button } from '@/components/ui/button'
import { Progress } from '@/components/ui/progress'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { projects, formatCurrency } from '@/lib/data'

export default function ProjectsPage() {
  return (
    <>
      <PageHeader
        title="Projects"
        description="Monitor delivery progress, budgets and deadlines."
      />
      <main className="flex flex-1 flex-col gap-4 p-4 md:p-6">
        <div className="flex items-center justify-between">
          <p className="text-sm text-muted-foreground">
            {projects.length} active engagements
          </p>
          <Button size="sm">
            <Plus data-icon="inline-start" />
            New Project
          </Button>
        </div>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
          {projects.map((project) => (
            <Card key={project.id} className="flex flex-col">
              <CardHeader>
                <div className="flex items-start justify-between gap-3">
                  <div className="flex flex-col gap-1">
                    <CardTitle className="text-base text-balance">
                      {project.name}
                    </CardTitle>
                    <CardDescription>{project.client}</CardDescription>
                  </div>
                  <StatusBadge status={project.status} />
                </div>
              </CardHeader>
              <CardContent className="flex flex-1 flex-col gap-4">
                <div className="flex flex-col gap-2">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Progress</span>
                    <span className="font-medium tabular-nums">
                      {project.progress}%
                    </span>
                  </div>
                  <Progress value={project.progress} />
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Budget</span>
                  <span className="font-medium tabular-nums">
                    {formatCurrency(project.budget)}
                  </span>
                </div>
              </CardContent>
              <CardFooter className="justify-between border-t border-border pt-4">
                <div className="flex -space-x-2">
                  {project.team.map((member) => (
                    <Avatar
                      key={member}
                      className="size-7 border-2 border-card"
                    >
                      <AvatarFallback className="bg-secondary text-[10px]">
                        {member}
                      </AvatarFallback>
                    </Avatar>
                  ))}
                </div>
                <span className="flex items-center gap-1.5 text-xs text-muted-foreground">
                  <CalendarDays className="size-3.5" />
                  {project.deadline}
                </span>
              </CardFooter>
            </Card>
          ))}
        </div>
      </main>
    </>
  )
}
