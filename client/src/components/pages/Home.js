import React from 'react';
import Contacts from '../contacts/Contacts';
import ContactForm from '../contacts/ContactForm';
import ContactFilter from '../contacts/ContactFilter';

export const Home = () => {
  return (
    <div className='grid-2'>
        <div>
          {/* Contact Form */}
          <ContactForm />
        </div>
        <div>
          <ContactFilter />
          <Contacts />
        </div>
    </div>
  )
}
