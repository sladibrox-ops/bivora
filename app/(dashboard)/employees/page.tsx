import { Plus } from 'lucide-react'

import { PageHeader } from '@/components/page-header'
import { StatusBadge } from '@/components/status-badge'
import { Button } from '@/components/ui/button'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import { employees } from '@/lib/data'

export default function EmployeesPage() {
  return (
    <>
      <PageHeader
        title="Employees"
        description="Your team directory and headcount overview."
      />
      <main className="flex flex-1 flex-col gap-4 p-4 md:p-6">
        <div className="flex items-center justify-between">
          <p className="text-sm text-muted-foreground">
            {employees.length} team members
          </p>
          <Button size="sm">
            <Plus data-icon="inline-start" />
            Add Employee
          </Button>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {employees.map((employee) => (
            <Card key={employee.id}>
              <CardHeader className="flex-row items-start justify-between gap-3">
                <div className="flex items-center gap-3">
                  <Avatar className="size-11">
                    <AvatarFallback className="bg-secondary">
                      {employee.name
                        .split(' ')
                        .map((n) => n[0])
                        .join('')}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex flex-col">
                    <CardTitle className="text-base">{employee.name}</CardTitle>
                    <CardDescription>{employee.role}</CardDescription>
                  </div>
                </div>
                <StatusBadge status={employee.status} />
              </CardHeader>
              <CardContent className="flex flex-col gap-2 text-sm">
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">Department</span>
                  <span className="font-medium">{employee.department}</span>
                </div>
                <Separator />
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">Employee ID</span>
                  <span className="font-mono text-xs">{employee.id}</span>
                </div>
              </CardContent>
              <CardFooter>
                <span className="truncate text-xs text-muted-foreground">
                  {employee.email}
                </span>
              </CardFooter>
            </Card>
          ))}
        </div>
      </main>
    </>
  )
}
