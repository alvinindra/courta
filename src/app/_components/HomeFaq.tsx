import Anim from '@/components/global/Anim'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger
} from '@/components/ui/accordion'

const HomeFaq = () => {
  const faqs = [
    {
      question: 'What is a FAQ?',
      answer:
        'A FAQ is a list of frequently asked questions and answers on a particular topic.'
    },
    {
      question: 'What is the purpose of a FAQ?',
      answer:
        'The purpose of a FAQ is to provide answers to common questions and help users find the information they need quickly and easily.'
    },
    {
      question: 'How do I create a FAQ?',
      answer:
        'To create a FAQ, you need to compile a list of common questions and answers on a particular topic and organize them in a clear and easy-to-navigate format.'
    },
    {
      question: 'What are the benefits of a FAQ?',
      answer:
        'The benefits of a FAQ include providing quick and easy access to information, reducing the number of support requests, and improving the overall user experience.'
    }
  ]

  return (
    <section className='py-8 pb-32'>
      <div className='container'>
        <Anim>
          <h1 className='mb-4 text-3xl font-bold md:mb-11 text-center lg:text-5xl'>
            Frequently asked questions
          </h1>
          {faqs.map((faq, index) => (
            <Accordion key={index} type='single' collapsible>
              <AccordionItem value={`item-${index}`}>
                <AccordionTrigger className='hover:text-foreground/60	hover:no-underline'>
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent>{faq.answer}</AccordionContent>
              </AccordionItem>
            </Accordion>
          ))}
        </Anim>
      </div>
    </section>
  )
}

export default HomeFaq
