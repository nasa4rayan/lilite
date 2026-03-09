import { ArrowLeft } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { useLanguage } from '@/hooks/useLanguage'

export function BackButton() {
  const navigate = useNavigate()
  const { messages } = useLanguage()

  const handleBack = () => {
    if (window.history.length > 1) {
      navigate(-1)
      return
    }

    navigate('/')
  }

  return (
    <Button variant="outline" size="sm" onClick={handleBack}>
      <ArrowLeft className="mr-2 h-4 w-4" />
      {messages.common.back}
    </Button>
  )
}
