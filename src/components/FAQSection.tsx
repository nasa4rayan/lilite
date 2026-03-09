import { ChevronDown } from 'lucide-react'

const faqs = [
  {
    question: 'Does Lilite install software automatically?',
    answer: 'No. Lilite only generates commands. You manually copy, review, and run them in your terminal.',
  },
  {
    question: 'Where do package names come from?',
    answer: 'Lilite uses local typed datasets with package names from official repositories for each supported distro family.',
  },
  {
    question: 'Can Lilite generate scripts?',
    answer: 'No. Lilite intentionally outputs one grouped install command to keep behavior transparent and easy to inspect.',
  },
  {
    question: 'Are third-party package sources supported?',
    answer: 'No. Flatpak, Snap, AUR, COPR, AppImage, and external repositories are intentionally excluded.',
  },
]

export function FAQSection() {
  return (
    <section aria-labelledby="faq-title" className="py-6 sm:py-8">
      <h2 id="faq-title" className="text-2xl font-bold tracking-tight sm:text-3xl">
        FAQ
      </h2>
      <p className="mt-2 max-w-3xl text-sm leading-relaxed text-muted-foreground sm:text-base">
        Quick answers about how Lilite keeps package installation safe, transparent, and fully manual.
      </p>

      <div className="mt-4 space-y-2 sm:space-y-3">
        {faqs.map((faq) => (
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
