import { useState } from 'react'
import { Check, Copy } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useLanguage } from '@/hooks/useLanguage'

interface CopyButtonProps {
  text: string
  disabled?: boolean
  label?: string
}

export function CopyButton({ text, disabled, label }: CopyButtonProps) {
  const [copied, setCopied] = useState(false)
  const { messages } = useLanguage()

  const handleCopy = async () => {
    if (!text.trim()) {
      return
    }

    try {
      await navigator.clipboard.writeText(text)
      setCopied(true)
      window.setTimeout(() => setCopied(false), 1400)
    } catch {
      setCopied(false)
    }
  }

  return (
    <Button onClick={handleCopy} disabled={disabled || !text.trim()} variant={copied ? 'secondary' : 'default'}>
      {copied ? <Check className="mr-2 h-4 w-4" /> : <Copy className="mr-2 h-4 w-4" />}
      {copied ? messages.common.copied : label ?? messages.common.copyCommand}
    </Button>
  )
}
