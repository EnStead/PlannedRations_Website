import React from 'react'
import ContactHeroPage from '../component/ContactHeroPage'
import FAQSection from '../component/FAQSection'
import StoreSection from '../component/StoreSection'

const ContactPage = () => {
  return (
    <div>
        <ContactHeroPage/>
        <FAQSection/>
        <div className='bg-brand-carhead'>
          <StoreSection/>
        </div>
    </div>
  )
}

export default ContactPage