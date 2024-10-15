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
      question: 'How do I make a field reservation through the Courta app?',
      answer:
        'To make a reservation, you first need to create an account or log in to your existing account. Once logged in, you can search for fields based on location and sport type. After selecting a field and an available time slot, you can proceed with payment via bank transfer. Don’t forget to upload the payment proof to confirm your reservation. You will receive a confirmation email once the reservation is successful.'
    },
    {
      question: 'How can I cancel or modify my reservation?',
      answer:
        'You can cancel or modify your reservation through the "My Reservations" page within the app. Find the reservation you wish to cancel or change, and follow the provided instructions. Please note that cancellations or modifications must comply with the cancellation policy, and there may be cancellation fees depending on the terms set by the field provider.'
    },
    {
      question: 'Can I leave a review or rating after using the field?',
      answer: `Yes, after you have finished using the field, you can leave a review and rating. This can be done through the "My Reservations" page, where you can rate the field's facilities and provide feedback for other users. Your review helps others choose the right field for their needs.`
    },
    {
      question: 'How do I make payments in the Courta app?',
      answer:
        'Currently, payments in the Courta app are made via bank transfer. After selecting a field and a time slot, you will be given instructions to make a transfer to the registered bank account. Once the transfer is completed, you need to upload the payment proof in the app to validate your reservation. You will receive a confirmation notification via email once validation is complete.'
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
