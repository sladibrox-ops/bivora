'use client'

import { useRef, useState } from 'react'
import { Sparkles, Send, Bot, User } from 'lucide-react'

import { PageHeader } from '@/components/page-header'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupTextarea,
} from '@/components/ui/input-group'
import { cn } from '@/lib/utils'

type Message = {
  id: number
  role: 'user' | 'assistant'
  content: string
}

const suggestions = [
  'Summarize this month\u2019s revenue',
  'Which invoices are overdue?',
  'Draft a follow-up email to Helios Retail',
  'Show project deadlines this week',
]

const cannedReplies: Record<string, string> = {
  default:
    'Here is a quick overview based on your workspace data. Revenue is up 12.4% month-over-month at $358,200, with 42 active clients and 18 projects in progress. Let me know if you\u2019d like a deeper breakdown of any area.',
}

export default function AssistantPage() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 0,
      role: 'assistant',
      content:
        'Hi, I\u2019m the BIVORA assistant. I can help you analyze revenue, draft client communications, track invoices and surface project risks. What would you like to do?',
    },
  ])
  const [input, setInput] = useState('')
  const idRef = useRef(1)

  const send = (text: string) => {
    const content = text.trim()
    if (!content) return
    const userMsg: Message = {
      id: idRef.current++,
      role: 'user',
      content,
    }
    const reply: Message = {
      id: idRef.current++,
      role: 'assistant',
      content: cannedReplies.default,
    }
    setMessages((prev) => [...prev, userMsg, reply])
    setInput('')
  }

  return (
    <>
      <PageHeader
        title="AI Assistant"
        description="Ask questions about your business in natural language."
      />
      <main className="flex flex-1 flex-col gap-4 p-4 md:p-6">
        <Card className="flex flex-1 flex-col overflow-hidden">
          <CardContent className="flex flex-1 flex-col gap-4 p-0">
            <ScrollArea className="flex-1 px-4 py-6 md:px-6">
              <div className="mx-auto flex max-w-2xl flex-col gap-6">
                {messages.map((message) => (
                  <div
                    key={message.id}
                    className={cn(
                      'flex gap-3',
                      message.role === 'user' && 'flex-row-reverse',
                    )}
                  >
                    <Avatar className="size-8 shrink-0">
                      <AvatarFallback
                        className={cn(
                          message.role === 'assistant'
                            ? 'bg-primary text-primary-foreground'
                            : 'bg-secondary',
                        )}
                      >
                        {message.role === 'assistant' ? (
                          <Bot className="size-4" />
                        ) : (
                          <User className="size-4" />
                        )}
                      </AvatarFallback>
                    </Avatar>
                    <div
                      className={cn(
                        'rounded-xl px-4 py-3 text-sm leading-relaxed',
                        message.role === 'assistant'
                          ? 'bg-muted text-foreground'
                          : 'bg-primary text-primary-foreground',
                      )}
                    >
                      {message.content}
                    </div>
                  </div>
                ))}
              </div>
            </ScrollArea>

            <div className="flex flex-col gap-3 border-t border-border p-4 md:p-6">
              <div className="mx-auto flex w-full max-w-2xl flex-wrap gap-2">
                {suggestions.map((suggestion) => (
                  <Button
                    key={suggestion}
                    variant="outline"
                    size="sm"
                    className="h-auto rounded-full text-xs"
                    onClick={() => send(suggestion)}
                  >
                    <Sparkles data-icon="inline-start" />
                    {suggestion}
                  </Button>
                ))}
              </div>

              <form
                className="mx-auto w-full max-w-2xl"
                onSubmit={(e) => {
                  e.preventDefault()
                  send(input)
                }}
              >
                <InputGroup>
                  <InputGroupTextarea
                    placeholder="Ask the BIVORA assistant anything..."
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' && !e.shiftKey) {
                        e.preventDefault()
                        send(input)
                      }
                    }}
                  />
                  <InputGroupAddon align="block-end">
                    <InputGroupButton
                      type="submit"
                      variant="default"
                      className="ml-auto"
                      disabled={!input.trim()}
                    >
                      <Send data-icon="inline-start" />
                      Send
                    </InputGroupButton>
                  </InputGroupAddon>
                </InputGroup>
              </form>
            </div>
          </CardContent>
        </Card>
      </main>
    </>
  )
}
