import { ChevronDown } from 'lucide-react'
import { useLanguage } from '@/hooks/useLanguage'

export function FAQSection() {
  const { messages } = useLanguage()

  return (
    <section aria-labelledby="faq-title" className="py-6 sm:py-8">
      <h2 id="faq-title" className="text-2xl font-bold tracking-tight sm:text-3xl">
        {messages.faq.title}
      </h2>
      <p className="mt-2 max-w-3xl text-sm leading-relaxed text-muted-foreground sm:text-base">
        {messages.faq.description}
      </p>

      <div className="mt-4 space-y-2 sm:space-y-3">
        {messages.faq.items.map((faq) => (
          <details key={faq.question} className="group rounded-xl border bg-card/80 px-4 py-3 shadow-sm open:border-primary/40 open:bg-primary/[0.04]">
            <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-sm font-semibold text-foreground sm:text-base">
              {faq.question}
              <ChevronDown className="h-4 w-4 shrink-0 text-muted-foreground transition-transform duration-200 group-open:rotate-180" />
            </summary>
            <p className="pt-2 text-sm leading-relaxed text-muted-foreground">{faq.answer}</p>
          </details>
        ))}
      </div>
    </section>
  )
}
