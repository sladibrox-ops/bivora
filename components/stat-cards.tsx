import { TrendingDown, TrendingUp } from 'lucide-react'

import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { cn } from '@/lib/utils'

export type Stat = {
  label: string
  value: string
  delta: string
  trend: 'up' | 'down'
  hint: string
}

export function StatCards({ stats }: { stats: Stat[] }) {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {stats.map((stat) => (
        <Card key={stat.label}>
          <CardHeader className="pb-2">
            <span className="text-sm text-muted-foreground">{stat.label}</span>
          </CardHeader>
          <CardContent className="flex flex-col gap-2">
            <span className="text-2xl font-semibold tracking-tight">
              {stat.value}
            </span>
            <div className="flex items-center gap-2 text-xs">
              <span
                className={cn(
                  'inline-flex items-center gap-1 rounded-md px-1.5 py-0.5 font-medium',
                  stat.trend === 'up'
                    ? 'bg-primary/15 text-primary'
                    : 'bg-destructive/15 text-destructive',
                )}
              >
                {stat.trend === 'up' ? (
                  <TrendingUp className="size-3" />
                ) : (
                  <TrendingDown className="size-3" />
                )}
                {stat.delta}
              </span>
              <span className="text-muted-foreground">{stat.hint}</span>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
