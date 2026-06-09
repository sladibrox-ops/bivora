import { PageHeader } from '@/components/page-header'

export default function SupportPage() {
  return (
    <>
      <PageHeader title="Support" description="Get help with BIVORA." />
      <main className="flex flex-1 flex-col items-center justify-center p-4 md:p-6">
        <div className="flex flex-col items-center gap-2 py-16 text-center">
          <h2 className="text-lg font-semibold">Need a hand?</h2>
          <p className="max-w-sm text-sm text-muted-foreground">
            Browse documentation or reach out to our team — support resources
            will appear here.
          </p>
        </div>
      </main>
    </>
  )
}
