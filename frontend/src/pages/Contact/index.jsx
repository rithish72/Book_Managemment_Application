import React, { useState } from 'react';
import emailjs from "@emailjs/browser";
import './index.css';

export default function ContactMe() {
  const [formData, setFormData] = useState({
    name: '',
    subject: '',
    email: '',
    message: ''
  });
  const [textMsg, setTextMsg] = useState("");
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form data:', formData);

    emailjs.sendForm('service_85fdfwr', 'template_fvszab5', e.target, {
      publicKey: '-EWAIFd8aXj_tmvZ9',
    })
    .then(
      () => {
        setTextMsg('SUCCESS! Thank you.');
        document.getElementById("msg").style.color = "green";
      },
      (error) => {
        setTextMsg('FAILED... Try Again.');
        document.getElementById("msg").style.color = "red";
      },
    );
    
    setFormData({
      name: '',
      subject: '',
      email: '',
      message: ''
    });
  };

  return (
    <section id="contact" className="contact-me-container">
      <h2>Contact Me</h2>
      <form onSubmit={handleSubmit} className="contact-form" aria-label="Contact Form">
        <input
          type="text"
          name="name"
          placeholder="Your Name"
          value={formData.name}
          onChange={handleChange}
          required
          aria-label="Your Name"
        />
        <input
          type="text"
          name="subject"
          placeholder="Your Subject"
          value={formData.subject}
          onChange={handleChange}
          required
          aria-label="Your Subject"
        />
        <input
          type="email"
          name="email"
          placeholder="Your Email"
          value={formData.email}
          onChange={handleChange}
          required
          aria-label="Your Email"
        />
        <textarea
          name="message"
          placeholder="Your Message"
          value={formData.message}
          onChange={handleChange}
          required
          aria-label="Your Message"
        />
        <h5 id="msg" className='err-msg'>{textMsg}</h5>
        <button type="submit" className="primary-btn">Send Message</button>
      </form>
    </section>
  );
}
