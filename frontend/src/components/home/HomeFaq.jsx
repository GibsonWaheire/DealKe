import { useRef } from 'react'
import { faqs } from '../../data/homeData'
import useScrollAnimation from '../../hooks/useScrollAnimation'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '../../ui/accordion'

export default function HomeFaq() {
  const sectionRef = useRef(null)
  const visible = useScrollAnimation(sectionRef, { threshold: 0.2 })

  return (
    <section ref={sectionRef} className="bg-zinc-50 py-16">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className={`transition-all duration-700 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'}`}>
          <p className="text-zinc-500 text-xs font-semibold uppercase tracking-widest mb-3">FAQ</p>
          <h2 className="text-2xl font-bold text-zinc-900 mb-8">Common questions</h2>
          <Accordion type="single" collapsible className="w-full">
            {faqs.map((faq, index) => (
              <AccordionItem key={faq.q} value={`item-${index}`} className="border-zinc-200">
                <AccordionTrigger className="text-zinc-900 text-sm font-medium text-left hover:no-underline py-4">
                  {faq.q}
                </AccordionTrigger>
                <AccordionContent className="text-zinc-600 text-sm pb-4">
                  {faq.a}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  )
}
