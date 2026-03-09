import { CopyButton } from '@/components/CopyButton'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

interface MaintenanceCommandCardProps {
  title: string
  command: string
}

export function MaintenanceCommandCard({ title, command }: MaintenanceCommandCardProps) {
  return (
    <Card className="rounded-xl border bg-card/80 shadow-sm">
      <CardHeader>
        <CardTitle className="text-base">{title}</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <pre className="overflow-x-auto rounded-md border bg-muted/40 p-3 font-mono text-xs sm:text-sm">{command}</pre>
        <CopyButton text={command} label="Copy Command" />
      </CardContent>
    </Card>
  )
}
