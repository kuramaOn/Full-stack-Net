import { Link } from 'react-router-dom';
import { FiGithub, FiTwitter, FiFacebook, FiInstagram } from 'react-icons/fi';
import { motion } from 'framer-motion';

const Footer = () => {
  const footerLinks = {
    Company: [
      { name: 'About Us', path: '/about' },
      { name: 'Careers', path: '/careers' },
      { name: 'Press', path: '/press' },
    ],
    Support: [
      { name: 'Help Center', path: '/help' },
      { name: 'Contact Us', path: '/contact' },
      { name: 'FAQ', path: '/faq' },
    ],
    Legal: [
      { name: 'Privacy Policy', path: '/privacy' },
      { name: 'Terms of Service', path: '/terms' },
      { name: 'Cookie Policy', path: '/cookies' },
    ],
  };

  const socialLinks = [
    { icon: FiFacebook, url: '#' },
    { icon: FiTwitter, url: '#' },
    { icon: FiInstagram, url: '#' },
    { icon: FiGithub, url: '#' },
  ];

  return (
    <footer className="relative mt-20 border-t border-glacier-900/30 glass-effect">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="space-y-4"
          >
            <h3 className="text-2xl font-bold text-glow bg-gradient-to-r from-glacier-400 to-glacier-600 bg-clip-text text-transparent">
              NetStream
            </h3>
            <p className="text-gray-400 text-sm">
              Your ultimate destination for movies and TV shows. Stream unlimited content anytime, anywhere.
            </p>
            <div className="flex space-x-4">
              {socialLinks.map((social, index) => (
                <motion.a
                  key={index}
                  href={social.url}
                  whileHover={{ scale: 1.2 }}
                  whileTap={{ scale: 0.9 }}
                  className="p-2 rounded-full glass-effect hover:glacier-glow transition-all duration-300"
                >
                  <social.icon className="text-glacier-400" />
                </motion.a>
              ))}
            </div>
          </motion.div>

          {/* Links */}
          {Object.entries(footerLinks).map(([category, links], index) => (
            <motion.div
              key={category}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <h4 className="text-glacier-400 font-semibold mb-4">{category}</h4>
              <ul className="space-y-2">
                {links.map((link) => (
                  <li key={link.name}>
                    <Link
                      to={link.path}
                      className="text-gray-400 hover:text-glacier-400 text-sm transition-colors duration-300"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mt-12 pt-8 border-t border-glacier-900/30 text-center"
        >
          <p className="text-gray-500 text-sm">
            © {new Date().getFullYear()} NetStream. All rights reserved.
          </p>
        </motion.div>
      </div>

      {/* Decorative gradient */}
      <div className="absolute inset-0 bg-gradient-to-t from-glacier-900/10 to-transparent pointer-events-none" />
    </footer>
  );
};

export default Footer;
