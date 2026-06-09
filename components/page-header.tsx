'use client'

import { Bell, Search } from 'lucide-react'

import { SidebarTrigger } from '@/components/ui/sidebar'
import { Separator } from '@/components/ui/separator'
import { Button } from '@/components/ui/button'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from '@/components/ui/input-group'

export function PageHeader({
  title,
  description,
}: {
  title: string
  description?: string
}) {
  return (
    <header className="sticky top-0 z-10 flex flex-col gap-3 border-b border-border bg-background/80 px-4 py-3 backdrop-blur md:px-6">
      <div className="flex items-center gap-3">
        <SidebarTrigger className="-ml-1" />
        <Separator orientation="vertical" className="h-5" />
        <div className="flex flex-1 flex-col">
          <h1 className="text-base font-semibold tracking-tight md:text-lg">
            {title}
          </h1>
          {description ? (
            <p className="hidden text-xs text-muted-foreground sm:block">
              {description}
            </p>
          ) : null}
        </div>

        <div className="hidden md:block">
          <InputGroup className="w-64">
            <InputGroupAddon>
              <Search className="size-4 text-muted-foreground" />
            </InputGroupAddon>
            <InputGroupInput placeholder="Search anything..." />
          </InputGroup>
        </div>

        <Button variant="ghost" size="icon" aria-label="Notifications">
          <Bell />
        </Button>
        <Avatar className="size-8">
          <AvatarFallback className="bg-primary text-xs text-primary-foreground">
            AM
          </AvatarFallback>
        </Avatar>
      </div>
    </header>
  )
}
