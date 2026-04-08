import { CopyButton } from '@/components/CopyButton'
import { useLanguage } from '@/hooks/useLanguage'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

interface MaintenanceCommandCardProps {
  title: string
  command: string
}

export function MaintenanceCommandCard({ title, command }: MaintenanceCommandCardProps) {
  const { messages } = useLanguage()

  return (
    <Card className="rounded-xl border bg-card/80 shadow-sm">
      <CardHeader>
        <CardTitle className="text-base">{title}</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <pre className="min-h-20 overflow-x-auto whitespace-pre-wrap break-words rounded-md border bg-muted/40 p-3 font-mono text-xs leading-relaxed sm:text-sm">
          {command}
        </pre>
        <CopyButton text={command} label={messages.common.copyCommand} />
      </CardContent>
    </Card>
  )
}
