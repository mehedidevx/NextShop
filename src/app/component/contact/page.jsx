"use client"
import React, { useState, useEffect } from 'react'
import { 
  Mail, 
  Phone, 
  MapPin, 
  Clock, 
  Send, 
  MessageCircle, 
  User, 
  Zap,
  Globe,
  Facebook,
  Twitter,
  Instagram,
  Linkedin,
  CheckCircle,
  Sparkles
} from 'lucide-react'

export default function ContactPage() {
  const [isVisible, setIsVisible] = useState(false)
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)

  useEffect(() => {
    setIsVisible(true)
  }, [])

  const contactInfo = [
    {
      icon: Phone,
      title: "Call Us",
      info: "+1 (555) 123-4567",
      subInfo: "Mon-Fri 9AM-6PM EST",
      gradient: "from-emerald-500 to-teal-500",
      action: "tel:+15551234567"
    },
    {
      icon: Mail,
      title: "Email Us",
      info: "hello@nextshop.com",
      subInfo: "We reply within 24 hours",
      gradient: "from-purple-500 to-pink-500",
      action: "mailto:hello@nextshop.com"
    },
    {
      icon: MapPin,
      title: "Visit Us",
      info: "123 Commerce Street",
      subInfo: "New York, NY 10001",
      gradient: "from-blue-500 to-cyan-500",
      action: "#"
    },
    {
      icon: Clock,
      title: "Business Hours",
      info: "Mon-Fri: 9AM-6PM",
      subInfo: "Sat-Sun: 10AM-4PM",
      gradient: "from-orange-500 to-red-500",
      action: "#"
    }
  ]

  const socialLinks = [
    { icon: Facebook, name: "Facebook", gradient: "from-blue-600 to-blue-500" },
    { icon: Twitter, name: "Twitter", gradient: "from-sky-500 to-blue-400" },
    { icon: Instagram, name: "Instagram", gradient: "from-pink-500 to-purple-500" },
    { icon: Linkedin, name: "LinkedIn", gradient: "from-blue-700 to-blue-600" }
  ]

  const faqs = [
    {
      question: "How can I track my order?",
      answer: "You can track your order using the tracking number sent to your email after purchase."
    },
    {
      question: "What's your return policy?",
      answer: "We offer a 30-day return policy for all unused items in original packaging."
    },
    {
      question: "Do you offer international shipping?",
      answer: "Yes, we ship worldwide! Shipping costs vary by location and will be calculated at checkout."
    }
  ]

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsSubmitting(true)
    
    // Simulate form submission
    setTimeout(() => {
      setIsSubmitting(false)
      setIsSubmitted(true)
      setFormData({ name: '', email: '', subject: '', message: '' })
      
      // Reset success message after 5 seconds
      setTimeout(() => setIsSubmitted(false), 5000)
    }, 2000)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-indigo-900">
      {/* Animated Background */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-10 w-72 h-72 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
        <div className="absolute top-40 right-10 w-80 h-80 bg-pink-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse animation-delay-2000"></div>
        <div className="absolute bottom-20 left-1/2 transform -translate-x-1/2 w-96 h-96 bg-indigo-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse animation-delay-4000"></div>
      </div>

      {/* Floating Elements */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(10)].map((_, i) => (
          <div
            key={i}
            className={`absolute w-3 h-3 bg-gradient-to-r from-white to-purple-200 rounded-full animate-float opacity-30`}
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${i * 0.8}s`,
              animationDuration: `${5 + Math.random() * 3}s`
            }}
          />
        ))}
      </div>

      <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 py-20">
        
        {/* Hero Section */}
        <div className={`text-center mb-16 mt-10 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-purple-500/20 to-pink-500/20 backdrop-blur-lg rounded-full px-6 py-2 border border-white/10 mb-6">
            <MessageCircle className="w-4 h-4 text-yellow-400" />
            <span className="text-white font-medium text-sm">Get In Touch</span>
          </div>
          
          <h1 className="text-5xl lg:text-7xl font-bold mb-6">
            <span className="bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 bg-clip-text text-transparent">
              Contact Us
            </span>
          </h1>
          
          <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Have questions, suggestions, or need support? We'd love to hear from you! Our team is here to help and ensure you have the best shopping experience possible.
          </p>
        </div>

        {/* Contact Info Cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {contactInfo.map((info, index) => (
            <a
              key={index}
              href={info.action}
              className={`block bg-white/5 backdrop-blur-lg rounded-2xl p-6 border border-white/10 hover:bg-white/10 transition-all duration-300 hover:scale-105 ${
                isVisible ? 'animate-fade-in-up' : 'opacity-0'
              }`}
              style={{ animationDelay: `${index * 200}ms` }}
            >
              <div className={`w-12 h-12 bg-gradient-to-r ${info.gradient} rounded-2xl flex items-center justify-center mb-4`}>
                <info.icon className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-lg font-bold text-white mb-2">{info.title}</h3>
              <p className="text-white font-medium mb-1">{info.info}</p>
              <p className="text-gray-400 text-sm">{info.subInfo}</p>
            </a>
          ))}
        </div>

        <div className="grid lg:grid-cols-2 gap-12 mb-16">
          
          {/* Contact Form */}
          <div className={`transition-all duration-1000 delay-500 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'}`}>
            <div className="bg-white/5 backdrop-blur-lg rounded-3xl p-8 border border-white/10">
              <div className="flex items-center mb-6">
                <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center mr-4">
                  <Send className="w-6 h-6 text-white" />
                </div>
                <h2 className="text-3xl font-bold text-white">Send us a Message</h2>
              </div>

              {isSubmitted && (
                <div className="mb-6 p-4 bg-gradient-to-r from-green-500/20 to-emerald-500/20 border border-green-500/20 rounded-2xl flex items-center space-x-3">
                  <CheckCircle className="w-5 h-5 text-green-400" />
                  <span className="text-green-400 font-medium">Message sent successfully! We'll get back to you soon.</span>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="name" className="block text-white font-medium mb-2">Full Name</label>
                    <div className="relative">
                      <User className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        required
                        className="w-full bg-white/10 border border-white/20 rounded-xl pl-12 pr-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:border-purple-500 focus:bg-white/20 transition-all duration-300"
                        placeholder="Your name"
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label htmlFor="email" className="block text-white font-medium mb-2">Email Address</label>
                    <div className="relative">
                      <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        required
                        className="w-full bg-white/10 border border-white/20 rounded-xl pl-12 pr-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:border-purple-500 focus:bg-white/20 transition-all duration-300"
                        placeholder="your@email.com"
                      />
                    </div>
                  </div>
                </div>

                <div>
                  <label htmlFor="subject" className="block text-white font-medium mb-2">Subject</label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleInputChange}
                    required
                    className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:border-purple-500 focus:bg-white/20 transition-all duration-300"
                    placeholder="What's this about?"
                  />
                </div>

                <div>
                  <label htmlFor="message" className="block text-white font-medium mb-2">Message</label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    required
                    rows={6}
                    className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:border-purple-500 focus:bg-white/20 transition-all duration-300 resize-none"
                    placeholder="Tell us how we can help you..."
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 disabled:from-purple-500/50 disabled:to-pink-500/50 text-white font-bold py-4 px-8 rounded-2xl transition-all duration-300 transform hover:scale-105 hover:shadow-2xl flex items-center justify-center space-x-2 disabled:cursor-not-allowed disabled:transform-none"
                >
                  {isSubmitting ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                      <span>Sending...</span>
                    </>
                  ) : (
                    <>
                      <Send className="w-5 h-5" />
                      <span>Send Message</span>
                    </>
                  )}
                </button>
              </form>
            </div>
          </div>

          {/* Additional Info */}
          <div className={`space-y-8 transition-all duration-1000 delay-700 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-10'}`}>
            
            {/* FAQ Section */}
            <div className="bg-white/5 backdrop-blur-lg rounded-3xl p-8 border border-white/10">
              <div className="flex items-center mb-6">
                <div className="w-12 h-12 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-2xl flex items-center justify-center mr-4">
                  <Sparkles className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-white">Quick Answers</h3>
              </div>
              
              <div className="space-y-4">
                {faqs.map((faq, index) => (
                  <div key={index} className="border-b border-white/10 pb-4 last:border-b-0">
                    <h4 className="text-white font-semibold mb-2">{faq.question}</h4>
                    <p className="text-gray-300 text-sm">{faq.answer}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Social Links */}
            <div className="bg-white/5 backdrop-blur-lg rounded-3xl p-8 border border-white/10">
              <div className="flex items-center mb-6">
                <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-2xl flex items-center justify-center mr-4">
                  <Globe className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-white">Follow Us</h3>
              </div>
              
              <p className="text-gray-300 mb-6">Stay connected and get the latest updates on our social media channels.</p>
              
              <div className="grid grid-cols-2 gap-4">
                {socialLinks.map((social, index) => (
                  <a
                    key={index}
                    href="#"
                    className={`bg-gradient-to-r ${social.gradient} p-4 rounded-xl hover:scale-105 transition-transform duration-300 flex items-center space-x-3`}
                  >
                    <social.icon className="w-6 h-6 text-white" />
                    <span className="text-white font-medium">{social.name}</span>
                  </a>
                ))}
              </div>
            </div>

            {/* Emergency Contact */}
            <div className="bg-gradient-to-r from-orange-500/20 to-red-500/20 backdrop-blur-lg rounded-3xl p-8 border border-orange-500/20">
              <div className="flex items-center mb-4">
                <Zap className="w-8 h-8 text-orange-400 mr-3" />
                <h3 className="text-xl font-bold text-white">Need Immediate Help?</h3>
              </div>
              <p className="text-gray-300 mb-4">For urgent matters or order issues, call our 24/7 support line:</p>
              <a 
                href="tel:+15551234567" 
                className="inline-flex items-center space-x-2 bg-gradient-to-r from-orange-500 to-red-500 text-white font-bold py-3 px-6 rounded-xl hover:from-orange-600 hover:to-red-600 transition-all duration-300"
              >
                <Phone className="w-5 h-5" />
                <span>+1 (555) 123-4567</span>
              </a>
            </div>
          </div>
        </div>

        {/* Map Section */}
        <div className="bg-white/5 backdrop-blur-lg rounded-3xl p-8 border border-white/10">
          <h3 className="text-2xl font-bold text-white mb-6 text-center">Find Us Here</h3>
          <div className="bg-gradient-to-br from-purple-500/20 to-pink-500/20 rounded-2xl p-8 text-center">
            <MapPin className="w-16 h-16 text-white mx-auto mb-4" />
            <h4 className="text-xl font-bold text-white mb-2">NextShop Headquarters</h4>
            <p className="text-gray-300 mb-4">123 Commerce Street, New York, NY 10001</p>
            <p className="text-gray-400 text-sm">Interactive map coming soon!</p>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0) rotate(0deg); }
          50% { transform: translateY(-25px) rotate(180deg); }
        }
        @keyframes fade-in-up {
          from { opacity: 0; transform: translateY(40px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-float { animation: float 5s ease-in-out infinite; }
        .animate-fade-in-up { animation: fade-in-up 0.8s ease forwards; }
        .animation-delay-2000 { animation-delay: 2s; }
        .animation-delay-4000 { animation-delay: 4s; }
      `}</style>
    </div>
  )
}