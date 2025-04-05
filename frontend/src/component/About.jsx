import { useState } from 'react';
import { Users, ShoppingBag, Globe, Heart, ChevronDown, ChevronUp } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';
import img from "../images/user-img.jpeg"

export default function AboutPage() {
  const [activeAccordion, setActiveAccordion] = useState(null);
  const navigate = useNavigate();

  const toggleAccordion = (index) => {
    setActiveAccordion(activeAccordion === index ? null : index);
  };

  const teamMembers = [
    {
      name: "Ujjwal Gupta",
      role: "Founder & CEO",
      image: "/api/placeholder/120/120",
      description: "With over 15 years in retail, Sarah founded JustBuy with a vision to make quality products accessible to everyone."
    },
    {
      name: "Marcus Johnson",
      role: "Head of Design",
      image: "/api/placeholder/120/120",
      description: "Marcus ensures our platform offers an intuitive and delightful shopping experience for all customers."
    },
    {
      name: "Priya Sharma",
      role: "Chief Technology Officer",
      image: "/api/placeholder/120/120",
      description: "Priya leads our tech team in building innovative solutions that power the JustBuy platform."
    },
    {
      name: "David Lee",
      role: "Customer Experience Director",
      image: "/api/placeholder/120/120",
      description: "David is committed to making every customer interaction with JustBuy exceptional and memorable."
    }
  ];

  const faqs = [
    {
      question: "What makes JustBuy different from other e-commerce platforms?",
      answer: "JustBuy combines the convenience of modern online shopping with carefully curated products, transparent pricing, and eco-friendly practices. Our platform is designed to make shopping simple and enjoyable, while our commitment to sustainability sets us apart."
    },
    {
      question: "How do you select products for JustBuy?",
      answer: "Our expert team carefully evaluates products based on quality, value, sustainability, and customer demand. We work directly with manufacturers and brands that share our values, ensuring every item meets our high standards."
    },
    {
      question: "What are your shipping and return policies?",
      answer: "We offer free shipping on orders over $50, with delivery within 2-5 business days. Our hassle-free return policy gives you 30 days to return any item for a full refund, no questions asked."
    },
    {
      question: "How is JustBuy contributing to sustainability?",
      answer: "We implement multiple sustainability initiatives: eco-friendly packaging, carbon-neutral shipping options, partnerships with environmentally responsible manufacturers, and a contribution from every purchase toward reforestation projects."
    }
  ];

  return (
    <div className="bg-white min-h-screen">
    <Header/>
      {/* Hero Section */}
      <div className="bg-gray-100 text-black">
        <div className="container mx-auto px-4 py-24">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-5xl font-bold mb-6">Our Story</h1>
            <p className="text-xl mb-8">Founded in 2022, JustBuy is reimagining online shopping with simplicity, transparency, and sustainability at our core.</p>
            <div className="flex justify-center">
              <button onClick={() => navigate("/products")}
              className="bg-red-500 text-white-200 font-medium font-semibold py-3 px-8 rounded-lg hover:bg-opacity-90 transition-all">
                Explore Our Products
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Mission Section */}
      <div className="container mx-auto px-4 py-14">
        <div className="grid md:grid-cols-2 gap-16 items-center">
          <div>
            <h2 className="text-3xl font-bold mb-6 text-gray-800">Our Mission</h2>
            <p className="text-lg text-gray-600 mb-6">
              At JustBuy, we believe shopping should be straightforward, enjoyable, and responsible. Our mission is to connect people with products they'll love while minimizing our environmental impact.
            </p>
            <p className="text-lg text-gray-600 mb-6">
              We carefully curate our selection to offer quality, value, and sustainability in every purchase. By working directly with manufacturers and cutting out middlemen, we deliver exceptional products at fair prices.
            </p>
            <p className="text-lg text-gray-600">
              Our platform is designed with you in mind—intuitive, transparent, and hassle-free from browsing to delivery.
            </p>
          </div>
          <div className="grid grid-cols-2 gap-6">
            <div className="bg-indigo-50 p-8 rounded-xl">
              <ShoppingBag className="text-indigo-600 mb-4" size={36} />
              <h3 className="font-bold text-xl mb-2 text-gray-800">Quality Products</h3>
              <p className="text-gray-600">Carefully selected items that meet our high standards for durability and design.</p>
            </div>
            <div className="bg-blue-50 p-8 rounded-xl">
              <Users className="text-blue-600 mb-4" size={36} />
              <h3 className="font-bold text-xl mb-2 text-gray-800">Customer First</h3>
              <p className="text-gray-600">Everything we do is designed to create an exceptional shopping experience.</p>
            </div>
            <div className="bg-green-50 p-8 rounded-xl">
              <Globe className="text-green-600 mb-4" size={36} />
              <h3 className="font-bold text-xl mb-2 text-gray-800">Sustainability</h3>
              <p className="text-gray-600">Eco-friendly practices throughout our supply chain and operations.</p>
            </div>
            <div className="bg-purple-50 p-8 rounded-xl">
              <Heart className="text-purple-600 mb-4" size={36} />
              <h3 className="font-bold text-xl mb-2 text-gray-800">Community</h3>
              <p className="text-gray-600">Building connections through our platform and giving back to those in need.</p>
            </div>
          </div>
        </div>
      </div>

      {/* Team Section */}
      <div className="bg-gray-50 py-24">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">Meet Our Team</h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              The passionate individuals behind JustBuy are committed to creating the best possible shopping experience for our community.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {teamMembers.map((member, index) => (
              <div key={index} className="bg-white rounded-xl overflow-hidden shadow-lg transform transition-transform hover:-translate-y-2">
                <div className="p-6 text-center">
                  <img 
                    src={img} 
                    alt={member.name} 
                    className="w-24 h-24 rounded-full mx-auto mb-4 object-cover"
                  />
                  <h3 className="font-bold text-xl text-gray-800">{member.name}</h3>
                  <p className="text-indigo-600 font-medium mb-4">{member.role}</p>
                  <p className="text-gray-600">{member.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* FAQ Section */}
      <div className="container mx-auto px-4 py-24">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">Frequently Asked Questions</h2>
            <p className="text-lg text-gray-600">
              Find answers to common questions about JustBuy and our approach to e-commerce.
            </p>
          </div>
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div key={index} className="border border-gray-200 rounded-lg overflow-hidden">
                <button
                  className="w-full flex justify-between items-center p-6 text-left bg-white hover:bg-gray-50 transition-colors"
                  onClick={() => toggleAccordion(index)}
                >
                  <span className="font-medium text-lg text-gray-800">{faq.question}</span>
                  {activeAccordion === index ? (
                    <ChevronUp className="text-gray-500 flex-shrink-0" size={20} />
                  ) : (
                    <ChevronDown className="text-gray-500 flex-shrink-0" size={20} />
                  )}
                </button>
                {activeAccordion === index && (
                  <div className="p-6 pt-0 text-gray-600">
                    {faq.answer}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      
      <Footer/>
    </div>
  );
}