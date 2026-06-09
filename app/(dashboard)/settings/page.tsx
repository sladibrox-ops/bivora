import { PageHeader } from '@/components/page-header'

export default function SettingsPage() {
  return (
    <>
      <PageHeader title="Settings" description="Manage your workspace preferences." />
      <main className="flex flex-1 flex-col items-center justify-center p-4 md:p-6">
        <div className="flex flex-col items-center gap-2 py-16 text-center">
          <h2 className="text-lg font-semibold">Settings coming soon</h2>
          <p className="max-w-sm text-sm text-muted-foreground">
            Workspace, billing and team configuration will live here.
          </p>
        </div>
      </main>
    </>
  )
}
