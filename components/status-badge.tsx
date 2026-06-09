import { Badge } from '@/components/ui/badge'
import { cn } from '@/lib/utils'

const styles: Record<string, string> = {
  // generic positive
  active: 'bg-primary/15 text-primary border-primary/20',
  paid: 'bg-primary/15 text-primary border-primary/20',
  completed: 'bg-primary/15 text-primary border-primary/20',
  income: 'bg-primary/15 text-primary border-primary/20',
  remote: 'bg-sky-500/15 text-sky-400 border-sky-500/20',
  // neutral / in progress
  lead: 'bg-sky-500/15 text-sky-400 border-sky-500/20',
  'in progress': 'bg-sky-500/15 text-sky-400 border-sky-500/20',
  planning: 'bg-sky-500/15 text-sky-400 border-sky-500/20',
  // warning
  pending: 'bg-amber-500/15 text-amber-400 border-amber-500/20',
  'on leave': 'bg-amber-500/15 text-amber-400 border-amber-500/20',
  'on hold': 'bg-amber-500/15 text-amber-400 border-amber-500/20',
  draft: 'bg-muted text-muted-foreground border-border',
  inactive: 'bg-muted text-muted-foreground border-border',
  // negative
  overdue: 'bg-destructive/15 text-destructive border-destructive/20',
  expense: 'bg-destructive/15 text-destructive border-destructive/20',
}

export function StatusBadge({ status }: { status: string }) {
  return (
    <Badge
      variant="outline"
      className={cn('capitalize font-medium', styles[status] ?? '')}
    >
      {status}
    </Badge>
  )
}
