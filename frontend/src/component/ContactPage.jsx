import { useState } from 'react';
import { MapPin, Phone, Mail, Clock, Instagram, Facebook, Twitter } from 'lucide-react';
import Header from './Header';
import Footer from './Footer';

export default function ContactPage() {
  const [hoveredCard, setHoveredCard] = useState(null);

  const contactCards = [
    {
      id: 1,
      icon: <MapPin className="w-6 h-6" />,
      title: "Visit Our Store",
      details: "MMMUT, Gorakhpur, India",
      color: "bg-indigo-50 text-indigo-600"
    },
    {
      id: 2,
      icon: <Phone className="w-6 h-6" />,
      title: "Call Us",
      details: "+91 6393295514",
      color: "bg-rose-50 text-rose-600"
    },
    {
      id: 3,
      icon: <Mail className="w-6 h-6" />,
      title: "Email Us",
      details: "ujjwalgupta0506@gmail.com",
      color: "bg-amber-50 text-amber-600"
    },
    {
      id: 4,
      icon: <Clock className="w-6 h-6" />,
      title: "Business Hours",
      details: "Mon-Fri: 9am - 6pm, Sat: 10am - 4pm",
      color: "bg-emerald-50 text-emerald-600"
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
    <Header/>
      {/* Hero Section */}
      <div className="bg-gray-100 text-black">
        <div className="max-w-6xl mx-auto px-4 py-16 md:py-24">
          <h1 className="text-4xl md:text-5xl font-bold text-black text-center">Contact Us</h1>
          <p className="mt-4 text-lg text-center max-w-2xl mx-auto">
            We're here to help with any questions about your shopping experience
          </p>
        </div>
      </div>

      {/* Contact Cards Section */}
      <div className="max-w-6xl mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {contactCards.map((card) => (
            <div 
              key={card.id}
              className={`bg-white rounded-xl shadow-md p-6 transition-all duration-300 ${
                hoveredCard === card.id ? 'transform -translate-y-2' : ''
              }`}
              onMouseEnter={() => setHoveredCard(card.id)}
              onMouseLeave={() => setHoveredCard(null)}
            >
              <div className={`${card.color} p-3 rounded-full w-12 h-12 flex items-center justify-center mb-4`}>
                {card.icon}
              </div>
              <h3 className="text-xl font-medium text-gray-900">{card.title}</h3>
              <p className="mt-2 text-gray-600">{card.details}</p>
            </div>
          ))}
        </div>
      </div>

      {/* FAQ Section */}
      <div className="max-w-6xl mx-auto px-4 py-12">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900">Frequently Asked Questions</h2>
          <p className="mt-2 text-gray-600">Find quick answers to common questions</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-white rounded-xl shadow-md p-6">
            <h3 className="text-xl font-medium text-gray-900">What are your shipping options?</h3>
            <p className="mt-2 text-gray-600">We offer standard (3-5 days), express (1-2 days), and same-day delivery options depending on your location.</p>
          </div>
          
          <div className="bg-white rounded-xl shadow-md p-6">
            <h3 className="text-xl font-medium text-gray-900">How do I return an item?</h3>
            <p className="mt-2 text-gray-600">You can return any item within 30 days of purchase. Simply visit your order history to start the return process.</p>
          </div>
          
          <div className="bg-white rounded-xl shadow-md p-6">
            <h3 className="text-xl font-medium text-gray-900">Do you offer international shipping?</h3>
            <p className="mt-2 text-gray-600">Yes, we ship to over 100 countries worldwide with delivery times varying by location.</p>
          </div>
          
          <div className="bg-white rounded-xl shadow-md p-6">
            <h3 className="text-xl font-medium text-gray-900">What payment methods do you accept?</h3>
            <p className="mt-2 text-gray-600">We accept all major credit cards, PayPal, Apple Pay, Google Pay, and cryptocurrency.</p>
          </div>
        </div>
      </div>
      <Footer/>
    </div>
  );
}

// import React from 'react'
// import linkdin from '../images/linkdin-img.png' 
// import github from '../images/github-img.png' 
// import instagram from '../images/instagram-img.png' 
// import "../App.css"
// import Header from './Header'
// import Footer from './Footer'

// const Contact=()=>{
//     return(
//         <>
//          <Header/>
//          <h2 className='contact-page-heading'>Contact_us</h2>
//             <div className="contact-page">
             
//             <div className='contact-page-box'>
//             <div>
//                     <h2>ujjwalgupta0506@gmail.com</h2>
//                 </div>
//                 <div className="links">
//                         <a href="https://www.linkedin.com/in/ujjwal-gupta-b05130289?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app" target='blank'><img className='sociallinks' src={linkdin} alt="" /></a>
//                         <a href="https://github.com/UjjwalGupta1105" target='blank'><img className='sociallinks' src={github} alt="" /></a>
//                         <a href="https://github.com/UjjwalGupta1105" target='blank'><img className='sociallinks' src={instagram} alt="" /></a>
//                     </div>
//             </div>
//             </div>
//             <Footer/>
//         </>
//     )
// }

// export default Contact