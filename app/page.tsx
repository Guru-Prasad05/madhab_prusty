'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Image from 'next/image'
import { 
  BookOpen, 
  GraduationCap, 
  Award, 
  Mail, 
  MapPin, 
  Calendar,
  FileText,
  Users,
  Quote,
  ChevronDown,
  ExternalLink,
  Menu,
  X,
  Send,
  Sparkles,
  BookMarked,
  Scroll,
  Heart
} from 'lucide-react'

// Animation variants
const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
}

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 }
  }
}

const scaleIn = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.5 } }
}

// Data
const stats = [
  { icon: BookOpen, value: '50+', label: 'Publications' },
  { icon: GraduationCap, value: '30+', label: 'Years Experience' },
  { icon: Award, value: '15+', label: 'Awards' },
  { icon: Users, value: '1000+', label: 'Students Mentored' },
]

const timeline = [
  {
    year: '1990',
    title: 'Ph.D. in Odia Literature',
    institution: 'Utkal University',
    description: 'Completed doctoral research on classical Odia poetry and its cultural significance.'
  },
  {
    year: '',
    title: 'Principal',
    institution: 'OPS College, Odapada, Dhenkanal',
    description: 'Served as Principal, leading the institution with academic excellence and administrative expertise.'
  },
  {
    year: '',
    title: 'Former Cultural Secretary',
    institution: 'Sree Nilachal Nikhila Utkala Pala Gayaka Parishada',
    description: 'Contributed to the promotion and preservation of Odia cultural heritage through Pala tradition.'
  },
]

const publications = [
  {
    title: 'Punya Parag',
    type: 'Book',
    year: 'Student Life',
    description: 'First literary work written during student life - the beginning of a prolific writing journey.',
    link: '#'
  },
  {
    title: 'Sahitya Sanskriti Sidhant',
    type: 'Book',
    year: '',
    description: 'Comprehensive exploration of literary and cultural theories.',
    link: '#'
  },
  {
    title: 'Ama Sahitya Ama Sanskruti',
    type: 'Book',
    year: '',
    description: 'A deep dive into our literature and cultural heritage.',
    link: '#'
  },
  {
    title: 'Odia Baishnava Rasa Sahitya Re Kabi Dinakrishna Oo Kabya Rasa Vinod',
    type: 'Book',
    year: '',
    description: 'Study of Vaishnava Rasa literature and the poetic contributions of Kabi Dinakrishna.',
    link: '#'
  },
  {
    title: 'Mahima Dharma Katha O Kahani',
    type: 'Book',
    year: '',
    description: 'Stories and narratives from the Mahima Dharma tradition.',
    link: '#'
  },
  {
    title: 'Sri Jagannath Sahitya Sanskriti',
    type: 'Book',
    year: '',
    description: 'Literature and culture centered around Lord Jagannath.',
    link: '#'
  },
  {
    title: 'Bhasa Bigyani Professor Golaka Bihari Dhal',
    type: 'Book',
    year: '',
    description: 'Tribute to the renowned linguist Professor Golaka Bihari Dhal.',
    link: '#'
  },
  {
    title: 'Pala Pradeepa',
    type: 'Edited',
    year: '',
    description: 'Edited volume illuminating the Pala tradition of Odisha.',
    link: '#'
  },
  {
    title: 'Gangadhara Sahitya Samikshya',
    type: 'Edited',
    year: '',
    description: 'Critical analysis and review of Gangadhara\'s literary works.',
    link: '#'
  },
  {
    title: 'Pragya Prabandha O Parjyalochana',
    type: 'Book',
    year: '',
    description: 'Essays and critical reviews on various literary subjects.',
    link: '#'
  },
  {
    title: 'Kanhu Charan Granthavali',
    type: 'Edited',
    year: 'Latest',
    description: 'Complete edited collection of Kanhu Charan\'s works.',
    link: '#'
  },
  {
    title: 'Pranika Hite Bhagavata',
    type: 'Edited',
    year: '',
    description: 'Edited work on Bhagavata with focus on animal welfare themes.',
    link: '#'
  },
  {
    title: 'Odia Sahityare Kabi Dinakrishna',
    type: 'Book',
    year: '',
    description: 'Comprehensive study of poet Dinakrishna\'s contribution to Odia literature.',
    link: '#'
  },
]

const testimonials = [
  {
    name: 'Dr. Ananya Mishra',
    role: 'Former Ph.D. Student',
    text: 'Dr. Prusty\'s guidance transformed my understanding of Odia literature. His depth of knowledge and patient mentorship made my doctoral journey truly enriching.',
    image: '/api/placeholder/80/80'
  },
  {
    name: 'Prof. Rajesh Panda',
    role: 'Colleague, Utkal University',
    text: 'A true scholar and gentleman. His contributions to Odia literary studies are unparalleled, and his dedication to preserving our cultural heritage is inspiring.',
    image: '/api/placeholder/80/80'
  },
  {
    name: 'Smt. Priya Sahoo',
    role: 'Former M.A. Student',
    text: 'The way Dr. Prusty brings ancient texts to life is magical. His classes were always the highlight of my academic journey.',
    image: '/api/placeholder/80/80'
  },
]

const navLinks = [
  { href: '#home', label: 'Home' },
  { href: '#about', label: 'About' },
  { href: '#journey', label: 'Journey' },
  { href: '#publications', label: 'Publications' },
  { href: '#philosophy', label: 'Philosophy' },
  { href: '#contact', label: 'Contact' },
]

export default function Home() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [activeSection, setActiveSection] = useState('home')
  const [formData, setFormData] = useState({ name: '', email: '', message: '' })
  const [formSubmitted, setFormSubmitted] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
      
      // Update active section based on scroll position
      const sections = navLinks.map(link => link.href.slice(1))
      for (const section of sections.reverse()) {
        const element = document.getElementById(section)
        if (element) {
          const rect = element.getBoundingClientRect()
          if (rect.top <= 150) {
            setActiveSection(section)
            break
          }
        }
      }
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setFormSubmitted(true)
    setTimeout(() => setFormSubmitted(false), 3000)
    setFormData({ name: '', email: '', message: '' })
  }

  return (
    <main className="min-h-screen odia-pattern">
      {/* Navigation */}
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled ? 'glass shadow-lg' : 'bg-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 md:h-20">
            <a href="#home" className="font-playfair text-xl md:text-2xl font-bold text-primary">
              Dr. D.M. Prusty
            </a>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className={`animated-underline font-medium transition-colors ${
                    activeSection === link.href.slice(1)
                      ? 'text-secondary'
                      : 'text-charcoal hover:text-primary'
                  }`}
                >
                  {link.label}
                </a>
              ))}
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 text-charcoal"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden glass border-t"
            >
              <div className="px-4 py-4 space-y-2">
                {navLinks.map((link) => (
                  <a
                    key={link.href}
                    href={link.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className={`block py-2 px-4 rounded-lg transition-colors ${
                      activeSection === link.href.slice(1)
                        ? 'bg-primary text-white'
                        : 'text-charcoal hover:bg-primary/10'
                    }`}
                  >
                    {link.label}
                  </a>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>

      {/* Hero Section */}
      <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Background decorations */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-20 left-10 w-72 h-72 bg-secondary/10 rounded-full blur-3xl" />
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-primary/10 rounded-full blur-3xl" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-accent/5 rounded-full blur-3xl" />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-32">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Text Content */}
            <motion.div
              initial="hidden"
              animate="visible"
              variants={staggerContainer}
              className="text-center lg:text-left"
            >
              <motion.div variants={fadeInUp} className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 rounded-full text-primary text-sm font-medium mb-6">
                <Sparkles size={16} />
                Distinguished Professor of Odia Literature
              </motion.div>
              
              <motion.h1 variants={fadeInUp} className="font-playfair text-4xl md:text-5xl lg:text-6xl font-bold text-charcoal mb-6">
                Dr. Durga Madhab{' '}
                <span className="gradient-text">Prusty</span>
              </motion.h1>
              
              <motion.p variants={fadeInUp} className="text-lg md:text-xl text-gray-600 mb-8 max-w-xl mx-auto lg:mx-0">
                Dedicated to preserving and promoting the rich literary heritage of Odisha through 
                research, teaching, and cultural advocacy for over three decades.
              </motion.p>

              <motion.div variants={fadeInUp} className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <a
                  href="#publications"
                  className="btn-ripple inline-flex items-center justify-center gap-2 px-8 py-4 bg-primary text-white rounded-full font-semibold hover:bg-primary-dark transition-colors shadow-lg hover:shadow-xl"
                >
                  <BookMarked size={20} />
                  View Publications
                </a>
                <a
                  href="#contact"
                  className="inline-flex items-center justify-center gap-2 px-8 py-4 border-2 border-primary text-primary rounded-full font-semibold hover:bg-primary hover:text-white transition-colors"
                >
                  <Mail size={20} />
                  Get in Touch
                </a>
              </motion.div>
            </motion.div>

            {/* Profile Image */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative flex justify-center"
            >
              <div className="relative">
                {/* Decorative rings */}
                <div className="absolute inset-0 -m-4 border-2 border-secondary/30 rounded-full animate-pulse" />
                <div className="absolute inset-0 -m-8 border-2 border-primary/20 rounded-full" />
                
                {/* Image container */}
                <div className="relative w-72 h-72 md:w-80 md:h-80 lg:w-96 lg:h-96 rounded-full overflow-hidden border-4 border-white shadow-2xl pulse-glow">
                  <Image
                    src="/profile.jpg"
                    alt="Dr. Durga Madhab Prusty"
                    fill
                    className="object-cover object-top"
                    priority
                  />
                </div>

                {/* Floating badges */}
                <motion.div
                  animate={{ y: [0, -10, 0] }}
                  transition={{ duration: 3, repeat: Infinity }}
                  className="absolute -top-4 -right-4 bg-white p-3 rounded-xl shadow-lg"
                >
                  <Award className="text-accent" size={32} />
                </motion.div>
                <motion.div
                  animate={{ y: [0, 10, 0] }}
                  transition={{ duration: 4, repeat: Infinity }}
                  className="absolute -bottom-4 -left-4 bg-white p-3 rounded-xl shadow-lg"
                >
                  <BookOpen className="text-secondary" size={32} />
                </motion.div>
              </div>
            </motion.div>
          </div>

          {/* Stats */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-16 md:mt-24"
          >
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                variants={scaleIn}
                className="glass rounded-2xl p-6 text-center card-hover"
              >
                <stat.icon className="mx-auto text-secondary mb-3" size={32} />
                <div className="font-playfair text-3xl md:text-4xl font-bold text-primary mb-1">
                  {stat.value}
                </div>
                <div className="text-gray-600 text-sm">{stat.label}</div>
              </motion.div>
            ))}
          </motion.div>

          {/* Scroll indicator */}
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="absolute bottom-8 left-1/2 -translate-x-1/2 hidden md:block"
          >
            <a href="#about" className="flex flex-col items-center text-gray-400 hover:text-primary transition-colors">
              <span className="text-sm mb-2">Scroll to explore</span>
              <ChevronDown size={24} />
            </a>
          </motion.div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 md:py-32 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="grid lg:grid-cols-2 gap-12 items-center"
          >
            <motion.div variants={fadeInUp} className="relative">
              <div className="relative rounded-2xl overflow-hidden shadow-2xl">
                <div className="aspect-[4/5] bg-gradient-to-br from-primary/10 to-secondary/10 flex items-center justify-center">
                  <div className="text-center p-8">
                    <Scroll size={100} className="mx-auto text-primary/50 mb-6" />
                    <p className="font-playfair text-2xl text-primary/70">Scholar & Mentor</p>
                  </div>
                </div>
              </div>
              {/* Decorative element */}
              <div className="absolute -bottom-6 -right-6 w-48 h-48 bg-secondary/20 rounded-2xl -z-10" />
              <div className="absolute -top-6 -left-6 w-32 h-32 bg-primary/20 rounded-2xl -z-10" />
            </motion.div>

            <motion.div variants={fadeInUp}>
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-secondary/10 rounded-full text-secondary text-sm font-medium mb-6">
                <Heart size={16} />
                About Me
              </div>
              <h2 className="font-playfair text-3xl md:text-4xl font-bold text-charcoal mb-6">
                A Lifetime Dedicated to{' '}
                <span className="gradient-text">Odia Literature</span>
              </h2>
              <div className="space-y-4 text-gray-600">
                <p>
                  With over three decades of dedicated service to academia, I have devoted my life to 
                  the study, preservation, and promotion of Odia literature and its rich cultural heritage.
                </p>
                <p>
                  My research spans classical Odia poetry, folk literature, modern fiction, and the 
                  linguistic heritage of Odisha. I believe that literature is not merely an academic 
                  pursuit but a living bridge connecting generations and preserving the soul of our culture.
                </p>
                <p>
                  As an educator, my greatest joy comes from inspiring young minds to appreciate and 
                  contribute to our literary traditions. I have had the privilege of mentoring hundreds 
                  of students who have gone on to become scholars, writers, and cultural ambassadors.
                </p>
              </div>

              <div className="mt-8 grid grid-cols-2 gap-4">
                <div className="p-4 bg-primary/5 rounded-xl">
                  <h4 className="font-semibold text-primary mb-1">Specialization</h4>
                  <p className="text-sm text-gray-600">Classical & Modern Odia Literature</p>
                </div>
                <div className="p-4 bg-secondary/5 rounded-xl">
                  <h4 className="font-semibold text-secondary mb-1">Languages</h4>
                  <p className="text-sm text-gray-600">Odia, Hindi, English, Sanskrit</p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Academic Journey Section */}
      <section id="journey" className="py-20 md:py-32 bg-gradient-to-b from-white to-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
            className="text-center mb-16"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 rounded-full text-primary text-sm font-medium mb-6">
              <GraduationCap size={16} />
              Academic Journey
            </div>
            <h2 className="font-playfair text-3xl md:text-4xl font-bold text-charcoal mb-4">
              A Path of <span className="gradient-text">Scholarly Excellence</span>
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              From humble beginnings to becoming a distinguished professor, every step has been 
              guided by a passion for knowledge and dedication to Odia literary heritage.
            </p>
          </motion.div>

          <div className="relative max-w-3xl mx-auto">
            {/* Timeline line */}
            <div className="absolute left-0 md:left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-primary via-secondary to-accent" />

            {timeline.map((item, index) => (
              <motion.div
                key={index}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeInUp}
                className={`relative pl-8 md:pl-0 pb-12 ${
                  index % 2 === 0 ? 'md:pr-1/2 md:text-right' : 'md:pl-1/2 md:ml-auto'
                }`}
              >
                <div className={`md:w-1/2 ${index % 2 === 0 ? 'md:pr-12' : 'md:pl-12'}`}>
                  {/* Timeline dot */}
                  <div className={`absolute top-0 w-4 h-4 bg-secondary border-4 border-white rounded-full shadow-lg ${
                    index % 2 === 0 ? 'left-[-7px] md:left-auto md:right-[-8px]' : 'left-[-7px] md:left-1/2 md:-translate-x-1/2'
                  }`} />
                  
                  <div className="glass rounded-2xl p-6 card-hover">
                    <span className="inline-block px-3 py-1 bg-accent/20 text-accent-dark rounded-full text-sm font-semibold mb-3">
                      {item.year}
                    </span>
                    <h3 className="font-playfair text-xl font-bold text-charcoal mb-1">
                      {item.title}
                    </h3>
                    <p className="text-secondary font-medium mb-2">{item.institution}</p>
                    <p className="text-gray-600 text-sm">{item.description}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Publications Section */}
      <section id="publications" className="py-20 md:py-32 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
            className="text-center mb-16"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-secondary/10 rounded-full text-secondary text-sm font-medium mb-6">
              <FileText size={16} />
              Research & Publications
            </div>
            <h2 className="font-playfair text-3xl md:text-4xl font-bold text-charcoal mb-4">
              Contributions to <span className="gradient-text">Odia Literature</span>
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              A selection of books, research papers, and articles that represent decades of 
              scholarly work in Odia literary studies.
            </p>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {publications.map((pub, index) => (
              <motion.div
                key={index}
                variants={scaleIn}
                className="group glass rounded-2xl p-6 card-hover decorative-border"
              >
                <div className="flex items-start justify-between mb-4">
                  <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                    pub.type === 'Book' 
                      ? 'bg-primary/10 text-primary' 
                      : pub.type === 'Research Paper'
                      ? 'bg-secondary/10 text-secondary'
                      : 'bg-accent/20 text-accent-dark'
                  }`}>
                    {pub.type}
                  </span>
                  <span className="text-sm text-gray-500">{pub.year}</span>
                </div>
                <h3 className="font-playfair text-lg font-bold text-charcoal mb-2 group-hover:text-primary transition-colors">
                  {pub.title}
                </h3>
                <p className="text-gray-600 text-sm mb-4">{pub.description}</p>
                <a
                  href={pub.link}
                  className="inline-flex items-center gap-2 text-secondary hover:text-secondary-dark font-medium text-sm transition-colors"
                >
                  Read More <ExternalLink size={14} />
                </a>
              </motion.div>
            ))}
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
            className="text-center mt-12"
          >
            <a
              href="#"
              className="inline-flex items-center gap-2 px-8 py-4 border-2 border-primary text-primary rounded-full font-semibold hover:bg-primary hover:text-white transition-colors"
            >
              View All Publications
              <ExternalLink size={18} />
            </a>
          </motion.div>
        </div>
      </section>

      {/* Philosophy Section */}
      <section id="philosophy" className="py-20 md:py-32 bg-gradient-to-br from-primary to-primary-dark text-white relative overflow-hidden">
        {/* Background pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-full h-full" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
          }} />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="text-center"
          >
            <motion.div variants={fadeInUp}>
              <Quote className="mx-auto text-secondary mb-8" size={64} />
            </motion.div>
            
            <motion.blockquote
              variants={fadeInUp}
              className="font-playfair text-2xl md:text-3xl lg:text-4xl font-medium leading-relaxed mb-8 max-w-4xl mx-auto"
            >
              "Literature is the mirror of society and the lamp that illuminates the path forward. 
              Through the study of our literary heritage, we not only understand our past but also 
              find wisdom to navigate our future."
            </motion.blockquote>
            
            <motion.div variants={fadeInUp} className="flex items-center justify-center gap-4">
              <div className="w-16 h-0.5 bg-secondary" />
              <span className="text-secondary font-semibold">Dr. Durga Madhab Prusty</span>
              <div className="w-16 h-0.5 bg-secondary" />
            </motion.div>
          </motion.div>

          {/* Testimonials */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="grid md:grid-cols-3 gap-6 mt-20"
          >
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={index}
                variants={scaleIn}
                className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20"
              >
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 rounded-full bg-secondary/30 flex items-center justify-center">
                    <Users size={24} className="text-white" />
                  </div>
                  <div>
                    <h4 className="font-semibold">{testimonial.name}</h4>
                    <p className="text-sm text-white/70">{testimonial.role}</p>
                  </div>
                </div>
                <p className="text-white/90 text-sm italic">"{testimonial.text}"</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 md:py-32 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
            className="text-center mb-16"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 rounded-full text-primary text-sm font-medium mb-6">
              <Mail size={16} />
              Get in Touch
            </div>
            <h2 className="font-playfair text-3xl md:text-4xl font-bold text-charcoal mb-4">
              Let's <span className="gradient-text">Connect</span>
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Whether you're a student, researcher, or fellow literature enthusiast, 
              I welcome the opportunity to connect and discuss our shared passion for Odia literature.
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-12">
            {/* Contact Info */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={staggerContainer}
              className="space-y-6"
            >
              <motion.div variants={fadeInUp} className="glass rounded-2xl p-6 card-hover">
                <div className="flex items-start gap-4">
                  <div className="p-3 bg-primary/10 rounded-xl">
                    <MapPin className="text-primary" size={24} />
                  </div>
                  <div>
                    <h3 className="font-semibold text-charcoal mb-1">Address</h3>
                    <p className="text-gray-600">
                      Kallola Kutira<br />
                      Housing Board Colony<br />
                      Dhenkanal, Odisha
                    </p>
                  </div>
                </div>
              </motion.div>

              <motion.div variants={fadeInUp} className="glass rounded-2xl p-6 card-hover">
                <div className="flex items-start gap-4">
                  <div className="p-3 bg-secondary/10 rounded-xl">
                    <Mail className="text-secondary" size={24} />
                  </div>
                  <div>
                    <h3 className="font-semibold text-charcoal mb-1">Email</h3>
                    <a href="mailto:dmp8957@gmail.com" className="text-gray-600 hover:text-primary transition-colors">
                      dmp8957@gmail.com
                    </a>
                  </div>
                </div>
              </motion.div>

              <motion.div variants={fadeInUp} className="glass rounded-2xl p-6 card-hover">
                <div className="flex items-start gap-4">
                  <div className="p-3 bg-primary/10 rounded-xl">
                    <Calendar className="text-primary" size={24} />
                  </div>
                  <div>
                    <h3 className="font-semibold text-charcoal mb-1">Office Hours</h3>
                    <p className="text-gray-600">
                      Monday - Friday: 10:00 AM - 4:00 PM<br />
                      Saturday: By Appointment
                    </p>
                  </div>
                </div>
              </motion.div>
            </motion.div>

            {/* Contact Form */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInUp}
            >
              <form onSubmit={handleSubmit} className="glass rounded-2xl p-8">
                <div className="space-y-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-charcoal mb-2">
                      Your Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      required
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all"
                      placeholder="Enter your name"
                    />
                  </div>

                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-charcoal mb-2">
                      Email Address
                    </label>
                    <input
                      type="email"
                      id="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      required
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all"
                      placeholder="Enter your email"
                    />
                  </div>

                  <div>
                    <label htmlFor="message" className="block text-sm font-medium text-charcoal mb-2">
                      Message
                    </label>
                    <textarea
                      id="message"
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      required
                      rows={5}
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all resize-none"
                      placeholder="Write your message here..."
                    />
                  </div>

                  <button
                    type="submit"
                    className="btn-ripple w-full inline-flex items-center justify-center gap-2 px-8 py-4 bg-primary text-white rounded-xl font-semibold hover:bg-primary-dark transition-colors shadow-lg hover:shadow-xl"
                  >
                    <Send size={20} />
                    Send Message
                  </button>

                  <AnimatePresence>
                    {formSubmitted && (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className="text-center text-green-600 font-medium"
                      >
                        Thank you! Your message has been sent successfully.
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </form>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-charcoal text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-8 mb-8">
            <div>
              <h3 className="font-playfair text-2xl font-bold mb-4">Dr. D.M. Prusty</h3>
              <p className="text-gray-400 text-sm">
                Distinguished Professor of Odia Literature, dedicated to preserving and 
                promoting the rich literary heritage of Odisha.
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Quick Links</h4>
              <ul className="space-y-2">
                {navLinks.map((link) => (
                  <li key={link.href}>
                    <a href={link.href} className="text-gray-400 hover:text-secondary transition-colors text-sm">
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Connect</h4>
              <p className="text-gray-400 text-sm mb-4">
                Feel free to reach out for academic collaborations, research inquiries, 
                or speaking engagements.
              </p>
              <a href="mailto:dmp8957@gmail.com" className="text-secondary hover:text-secondary-light transition-colors">
                dmp8957@gmail.com
              </a>
            </div>
          </div>
          
          <div className="border-t border-gray-700 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-gray-400 text-sm">
              © {new Date().getFullYear()} Dr. Durga Madhab Prusty. All rights reserved.
            </p>
            <p className="text-gray-500 text-sm">
              Crafted with passion for Odia Literature
            </p>
          </div>
        </div>
      </footer>
    </main>
  )
}
