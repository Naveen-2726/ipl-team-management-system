import React from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { 
  Trophy, 
  Mail, 
  Phone, 
  MapPin, 
  Twitter, 
  Facebook, 
  Instagram, 
  Youtube,
  Heart
} from 'lucide-react'

const Footer = () => {
  const currentYear = new Date().getFullYear()

  const footerLinks = {
    platform: [
      { name: 'Teams', href: '/teams' },
      { name: 'Players', href: '/players' },
      { name: 'Matches', href: '/matches' },
      { name: 'Analytics', href: '/analytics' }
    ],
    company: [
      { name: 'About Us', href: '/about' },
      { name: 'Contact', href: '/contact' },
      { name: 'Privacy Policy', href: '/privacy' },
      { name: 'Terms of Service', href: '/terms' }
    ],
    support: [
      { name: 'Help Center', href: '/help' },
      { name: 'Documentation', href: '/docs' },
      { name: 'API Reference', href: '/api' },
      { name: 'Status', href: '/status' }
    ]
  }

  const socialLinks = [
    { name: 'Twitter', icon: Twitter, href: '#', color: 'hover:text-blue-400' },
    { name: 'Facebook', icon: Facebook, href: '#', color: 'hover:text-blue-600' },
    { name: 'Instagram', icon: Instagram, href: '#', color: 'hover:text-pink-500' },
    { name: 'YouTube', icon: Youtube, href: '#', color: 'hover:text-red-500' }
  ]

  const contactInfo = [
    { icon: Mail, text: 'support@ipltms.com', href: 'mailto:support@ipltms.com' },
    { icon: Phone, text: '+91 98765 43210', href: 'tel:+919876543210' },
    { icon: MapPin, text: 'Mumbai, Maharashtra, India', href: '#' }
  ]

  return (
    <footer className="bg-slate-900 text-white">
      {/* Main Footer */}
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-12">
          
          {/* Brand Section */}
          <div className="lg:col-span-1">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mb-6"
            >
              <Link to="/" className="flex items-center space-x-3 mb-4">
                <img src="/logos/ipl logo.png" alt="IPL" className="w-12 h-12 rounded-xl" />
                <span className="text-2xl font-bold">IPL Teams</span>
              </Link>
              <p className="text-slate-400 leading-relaxed mb-6">
                The ultimate platform for managing IPL teams, tracking player performance, and analyzing cricket statistics with advanced insights.
              </p>
              
              {/* Social Links */}
              <div className="flex space-x-4">
                {socialLinks.map((social) => (
                  <motion.a
                    key={social.name}
                    href={social.href}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    className={`w-10 h-10 bg-slate-800 rounded-lg flex items-center justify-center text-slate-400 transition-colors ${social.color}`}
                  >
                    <social.icon className="h-5 w-5" />
                  </motion.a>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Links Sections */}
          <div className="lg:col-span-2 grid grid-cols-1 md:grid-cols-3 gap-8">
            
            {/* Platform Links */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
            >
              <h3 className="text-lg font-semibold mb-4">Platform</h3>
              <ul className="space-y-3">
                {footerLinks.platform.map((link) => (
                  <li key={link.name}>
                    <Link
                      to={link.href}
                      className="text-slate-400 hover:text-white transition-colors duration-200"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </motion.div>

            {/* Company Links */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
            >
              <h3 className="text-lg font-semibold mb-4">Company</h3>
              <ul className="space-y-3">
                {footerLinks.company.map((link) => (
                  <li key={link.name}>
                    <Link
                      to={link.href}
                      className="text-slate-400 hover:text-white transition-colors duration-200"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </motion.div>

            {/* Support Links */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
            >
              <h3 className="text-lg font-semibold mb-4">Support</h3>
              <ul className="space-y-3">
                {footerLinks.support.map((link) => (
                  <li key={link.name}>
                    <Link
                      to={link.href}
                      className="text-slate-400 hover:text-white transition-colors duration-200"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </motion.div>
          </div>

          {/* Contact Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
            className="lg:col-span-1"
          >
            <h3 className="text-lg font-semibold mb-4">Get in Touch</h3>
            <div className="space-y-4">
              {contactInfo.map((contact, index) => (
                <a
                  key={index}
                  href={contact.href}
                  className="flex items-center space-x-3 text-slate-400 hover:text-white transition-colors duration-200"
                >
                  <contact.icon className="h-5 w-5 flex-shrink-0" />
                  <span className="text-sm">{contact.text}</span>
                </a>
              ))}
            </div>

            {/* Newsletter Signup */}
            <div className="mt-8">
              <h4 className="font-semibold mb-3">Stay Updated</h4>
              <div className="flex">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="flex-1 px-4 py-2 bg-slate-800 border border-slate-700 rounded-l-lg text-white placeholder-slate-400 focus:outline-none focus:border-orange-500"
                />
                <button className="px-4 py-2 bg-gradient-to-r from-orange-600 to-red-600 text-white rounded-r-lg hover:from-orange-700 hover:to-red-700 transition-colors">
                  Subscribe
                </button>
              </div>
              <p className="text-xs text-slate-500 mt-2">
                Get the latest updates on IPL matches and player statistics.
              </p>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-slate-800">
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="flex items-center text-slate-400 text-sm mb-4 md:mb-0"
            >
              <span>© {currentYear} IPL Team Management System. Made with</span>
              <Heart className="h-4 w-4 mx-1 text-red-500" />
              <span>for cricket enthusiasts.</span>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="flex items-center space-x-6 text-sm text-slate-400"
            >
              <Link to="/privacy" className="hover:text-white transition-colors">
                Privacy
              </Link>
              <Link to="/terms" className="hover:text-white transition-colors">
                Terms
              </Link>
              <Link to="/cookies" className="hover:text-white transition-colors">
                Cookies
              </Link>
            </motion.div>
          </div>
        </div>
      </div>


    </footer>
  )
}

export default Footer