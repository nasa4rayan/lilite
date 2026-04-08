import { AlertCircle, TerminalSquare } from 'lucide-react'
import { CopyButton } from '@/components/CopyButton'
import { useLanguage } from '@/hooks/useLanguage'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

interface TerminalPreviewProps {
  command: string
}

export function TerminalPreview({ command }: TerminalPreviewProps) {
  const hasCommand = Boolean(command.trim())
  const { messages } = useLanguage()

  return (
    <Card className="h-fit rounded-xl border bg-card/80 shadow-sm lg:sticky lg:top-24">
      <CardHeader className="pb-4">
        <CardTitle className="inline-flex items-center gap-2 text-base">
          <TerminalSquare className="h-4 w-4 text-primary" />
          {messages.terminalPreview.title}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <pre className="min-h-32 overflow-x-auto whitespace-pre-wrap break-words rounded-md border bg-muted/40 p-3 font-mono text-xs leading-relaxed sm:text-sm">
          {hasCommand ? command : messages.terminalPreview.placeholder}
        </pre>
        <p className="inline-flex items-start gap-2 text-xs text-muted-foreground">
          <AlertCircle className="mt-0.5 h-3.5 w-3.5 shrink-0" />
          {messages.terminalPreview.reviewMessage}
        </p>
        <CopyButton text={command} disabled={!hasCommand} />
      </CardContent>
    </Card>
  )
}
