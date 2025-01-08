import React from 'react';
import { useLocation } from 'react-router-dom';
import { Contact } from '../components/contact/Contact';

export default function ContactPage() {
  const location = useLocation();
  const subject = location.state?.subject || '';

  return (
    <div className="pt-20">
      <Contact initialSubject={subject} />
    </div>
  );
}