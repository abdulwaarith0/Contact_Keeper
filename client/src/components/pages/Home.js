import React from 'react';
import Contacts from '../contacts/Contacts';
import ContactForm from './ContactForm';

export const Home = () => {
  return (
    <div className='grid-2'>
        <div>
          {/* Contact Form */}
          <ContactForm />
        </div>
        <div>
          <Contacts />
        </div>
    </div>
  )
}
