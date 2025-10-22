/*
🚀 Next-Level Animated Portfolio - README

Advanced React component with Framer Motion animations:
- Typing animation hero
- 3D rotating project cards
- Floating mobile mockup with parallax
- Animated gradient background
- Smooth scroll navbar
- Glowing skill badges
- Interactive contact form with paper plane animation
- Dark/light mode with smooth transitions

Dependencies:
- React 18+
- Framer Motion: npm install framer-motion
- Tailwind CSS configured
- React Icons: npm install react-icons

Deploy:
- Works on Vercel/Netlify
- Build with: npm run build

Customization:
- Search for "REPLACE_ME" to update content
- Modify colors in the theme object
- Add your real project links and contact info
*/

import React, { useState, useEffect, useRef } from 'react';
import { motion, useScroll, useTransform, useInView, AnimatePresence } from 'framer-motion';
import { 
  FaGithub, 
  FaLinkedin, 
  FaEnvelope, 
  FaJava, 
  FaPython, 
  FaReact, 
  FaNodeJs,
  FaBars,
  FaTimes,
  FaMoon,
  FaSun,
  FaPaperPlane,
  FaExternalLinkAlt,
  FaGraduationCap,
  FaCertificate,
  FaCode,
  FaBrain,
  FaFileDownload,
  FaImages,
  FaChevronLeft,
  FaChevronRight,
  FaPlay,
  FaPause
} from 'react-icons/fa';
import { 
  SiTensorflow, 
  SiPytorch, 
  SiMysql, 
  SiMongodb,
  SiTailwindcss,
  SiSpringboot,
  SiJavascript,
  SiHtml5,
  SiCss3,
  SiDocker,
  SiAmazonaws,
  SiGit,
  SiLinux,
  SiOpencv
} from 'react-icons/si';

export default function Portfolio() {
  const [darkMode, setDarkMode] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [collegeModalOpen, setCollegeModalOpen] = useState(false);
  const [galleryModalOpen, setGalleryModalOpen] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const { scrollYProgress } = useScroll();
  
  // REPLACE_ME: Update your information here
  const personalInfo = {
    name: 'Souvik Ghosh', // REPLACE_ME_NAME
    role: 'Computer Science Engineering Student | Full-Stack Developer | Machine Learning Engineer', // REPLACE_ME_ROLE
    email: 'souvikg9474@gmail.com', // REPLACE_ME_EMAIL
    github: 'https://github.com/souvikghosh777', // REPLACE_ME_GITHUB
    linkedin: 'https://www.linkedin.com/in/souvik-ghosh-216b6b32a/', // REPLACE_ME_LINKEDIN
    heroHeadline: "Souvik Ghosh — Software Engineer & AI/ML Specialist", // REPLACE_ME_HEADLINE
  };

  // REPLACE_ME: Update your projects
  const projects = [
    {
      title: 'AgriGuru - Agricultural Intelligence Platform',
      description: 'Enterprise-grade agricultural advisory system leveraging machine learning algorithms for precision farming. Features predictive crop modeling, soil analysis, and yield optimization recommendations for sustainable agriculture.',
      techStack: ['Java', 'Spring Boot', 'TensorFlow', 'React', 'MySQL', 'Docker', 'AWS'],
      github: 'https://github.com/shriom17/AgriGuru', // REPLACE_ME_PROJECT_LINK
      image: 'https://images.unsplash.com/photo-1574943320219-553eb213f72d?q=80&w=800&auto=format&fit=crop',
      color: 'from-green-400 to-blue-500'
    },
    {
      title: 'Smart Traffic Management System',
      description: 'Intelligent traffic optimization system using machine learning and IoT sensors for real-time traffic flow analysis, congestion prediction, and automated signal control to reduce urban traffic delays.',
      techStack: ['Python', 'OpenCV', 'TensorFlow', 'Flask', 'JavaScript', 'IoT Sensors', 'MySQL'],
      github: 'https://github.com/souvikghosh777/TRAFFIC_MANAGEMENT_SYSTEM', // REPLACE_ME_PROJECT_LINK
      image: 'https://images.unsplash.com/photo-1449824913935-59a10b8d2000?q=80&w=800&auto=format&fit=crop',
      color: 'from-blue-400 to-cyan-500'
    },
    {
      title: 'CodeCollab - Real-time Development Environment',
      description: 'Scalable collaborative coding platform with real-time synchronization, integrated version control, code review workflows, and team communication tools designed for distributed development teams.',
      techStack: ['React', 'Socket.io', 'Express', 'Redis', 'Docker', 'MongoDB', 'WebRTC'],
      github: '#', // REPLACE_ME_PROJECT_LINK
      image: 'https://images.unsplash.com/photo-1555949963-aa79dcee981c?q=80&w=800&auto=format&fit=crop',
      color: 'from-blue-400 to-cyan-500'
    }
  ];

  const skills = [
    { icon: FaPython, name: 'Python', color: 'text-blue-500' },
    { icon: FaJava, name: 'Java', color: 'text-orange-500' },
    { icon: SiJavascript, name: 'JavaScript', color: 'text-yellow-500' },
    { icon: SiHtml5, name: 'HTML5', color: 'text-orange-600' },
    { icon: SiCss3, name: 'CSS3', color: 'text-blue-600' },
    { icon: FaReact, name: 'React', color: 'text-cyan-400' },
    { icon: FaNodeJs, name: 'Node.js', color: 'text-green-500' },
    { icon: SiMongodb, name: 'MongoDB', color: 'text-green-600' },
    { icon: SiDocker, name: 'Docker', color: 'text-blue-500' },
    { icon: SiAmazonaws, name: 'AWS', color: 'text-orange-400' },
    { icon: SiGit, name: 'Git', color: 'text-red-500' },
    { icon: SiLinux, name: 'Linux', color: 'text-yellow-600' },
    { icon: SiTensorflow, name: 'TensorFlow', color: 'text-orange-400' },
    { icon: SiOpencv, name: 'OpenCV', color: 'text-green-500' },
    { icon: SiMysql, name: 'MySQL', color: 'text-blue-600' }
  ];

  // Theme configuration
  const theme = {
    light: {
      bg: 'bg-blue-50',
      text: 'text-gray-900',
      secondary: 'text-gray-600',
      card: 'bg-white/90 backdrop-blur-sm',
      border: 'border-blue-200'
    },
    dark: {
      bg: 'bg-gray-900',
      text: 'text-white',
      secondary: 'text-gray-300',
      card: 'bg-gray-800/80 backdrop-blur-sm',
      border: 'border-gray-700'
    }
  };

  const currentTheme = darkMode ? theme.dark : theme.light;

  // Typing animation hook
  const useTypewriter = (text, speed = 50) => {
    const [displayText, setDisplayText] = useState('');
    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
      if (currentIndex < text.length) {
        const timeout = setTimeout(() => {
          setDisplayText(prev => prev + text[currentIndex]);
          setCurrentIndex(prev => prev + 1);
        }, speed);
        return () => clearTimeout(timeout);
      }
    }, [currentIndex, text, speed]);

    return displayText;
  };

  // Scroll tracking
  useEffect(() => {
    const handleScroll = () => {
      const sections = ['hero', 'about', 'projects', 'skills', 'education', 'contact'];
      const current = sections.find(section => {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          return rect.top <= 100 && rect.bottom >= 100;
        }
        return false;
      });
      if (current) setActiveSection(current);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Animation variants
  const fadeInUp = {
    hidden: { opacity: 0, y: 60 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } }
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };

  const floatingAnimation = {
    y: [-10, 10, -10],
    transition: {
      duration: 3,
      ease: 'easeInOut',
      repeat: Infinity
    }
  };

  // Components
  const TypewriterText = ({ text, className }) => {
    const typedText = useTypewriter(text, 80);
    return (
      <span className={className}>
        {typedText}
        <motion.span
          animate={{ opacity: [0, 1, 0] }}
          transition={{ duration: 1, repeat: Infinity }}
          className="ml-1"
        >
          |
        </motion.span>
      </span>
    );
  };

  const AnimatedBackground = () => (
    <div className="fixed inset-0 -z-10">
      <motion.div
        animate={{
          background: darkMode 
            ? ['radial-gradient(circle at 20% 80%, #1e293b 0%, #0f172a 50%, #000000 100%)',
               'radial-gradient(circle at 80% 20%, #1e293b 0%, #0f172a 50%, #000000 100%)',
               'radial-gradient(circle at 40% 40%, #1e293b 0%, #0f172a 50%, #000000 100%)']
            : ['radial-gradient(circle at 20% 80%, #dbeafe 0%, #eff6ff 50%, #f0f9ff 100%)',
               'radial-gradient(circle at 80% 20%, #bfdbfe 0%, #dbeafe 50%, #f0f9ff 100%)',
               'radial-gradient(circle at 40% 40%, #93c5fd 0%, #dbeafe 50%, #f0f9ff 100%)']
        }}
        transition={{ duration: 8, repeat: Infinity, repeatType: 'reverse' }}
        className="w-full h-full"
      />
    </div>
  );

  const Navbar = () => (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className={`sticky top-0 z-50 px-6 py-4 ${currentTheme.card} border-b ${currentTheme.border} rounded-t-3xl`}
    >
      <div className="flex justify-between items-center">
        <motion.div
          whileHover={{ scale: 1.05 }}
          className={`text-2xl font-bold bg-gradient-to-r from-sky-500 to-blue-600 bg-clip-text text-transparent`}
        >
          Souvik Ghosh
        </motion.div>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-8">
          {['Hero', 'About', 'Projects', 'Skills', 'Education', 'Contact'].map((item) => (
            <motion.a
              key={item}
              href={`#${item.toLowerCase()}`}
              className={`relative px-3 py-2 transition-colors ${
                activeSection === item.toLowerCase() 
                  ? 'text-sky-500' 
                  : currentTheme.text
              }`}
              whileHover={{ scale: 1.05 }}
            >
              {item}
              {activeSection === item.toLowerCase() && (
                <motion.div
                  layoutId="activeSection"
                  className="absolute bottom-0 left-0 right-0 h-0.5 bg-sky-500"
                />
              )}
            </motion.a>
          ))}
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => setDarkMode(!darkMode)}
            className={`p-2 rounded-full ${currentTheme.card} border ${currentTheme.border}`}
          >
            {darkMode ? <FaSun className="text-yellow-500" /> : <FaMoon className="text-gray-600" />}
          </motion.button>
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden flex items-center space-x-4">
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => setDarkMode(!darkMode)}
            className={`p-2 rounded-full ${currentTheme.card} border ${currentTheme.border}`}
          >
            {darkMode ? <FaSun className="text-yellow-500" /> : <FaMoon className="text-gray-600" />}
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className={`p-2 ${currentTheme.text}`}
          >
            {mobileMenuOpen ? <FaTimes /> : <FaBars />}
          </motion.button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className={`md:hidden mt-4 ${currentTheme.card} rounded-lg border ${currentTheme.border} p-4`}
          >
            {['Hero', 'About', 'Projects', 'Skills', 'Education', 'Contact'].map((item) => (
              <motion.a
                key={item}
                href={`#${item.toLowerCase()}`}
                className={`block py-2 px-4 rounded ${currentTheme.text} hover:bg-sky-500/10`}
                onClick={() => setMobileMenuOpen(false)}
                whileHover={{ x: 10 }}
              >
                {item}
              </motion.a>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );

  const ProfileImage = () => (
    <motion.div
      animate={floatingAnimation}
      whileHover={{ 
        scale: 1.05,
        rotateY: 5,
        transition: { duration: 0.3 }
      }}
      className="relative w-80 h-80 mx-auto"
    >
      <div className="relative w-full h-full">
        {/* Glowing Border Effect */}
        <div className="absolute inset-0 bg-gradient-to-r from-sky-400 via-blue-500 to-purple-600 rounded-full blur-xl opacity-70 animate-pulse"></div>
        
        {/* Main Image Container */}
        <div className="relative w-full h-full border-4 border-white/20 rounded-full overflow-hidden shadow-2xl backdrop-blur-sm">
          <img 
            src="/images/profile.jpg" 
            alt="Souvik Ghosh - Profile" 
            className="w-full h-full object-cover"
          />
          
          {/* Overlay Gradient */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent"></div>
        </div>
        
        {/* Floating Elements */}
        <motion.div
          animate={{ 
            y: [-10, 10, -10],
            rotate: [0, 5, -5, 0],
          }}
          transition={{ 
            duration: 6, 
            repeat: Infinity, 
            ease: "easeInOut" 
          }}
          className="absolute -top-4 -right-4 w-12 h-12 bg-gradient-to-r from-sky-400 to-blue-500 rounded-full shadow-lg flex items-center justify-center"
        >
          <FaCode className="text-white text-lg" />
        </motion.div>
        
        <motion.div
          animate={{ 
            y: [10, -10, 10],
            rotate: [0, -5, 5, 0],
          }}
          transition={{ 
            duration: 4, 
            repeat: Infinity, 
            ease: "easeInOut",
            delay: 1 
          }}
          className="absolute -bottom-2 -left-4 w-10 h-10 bg-gradient-to-r from-purple-400 to-pink-500 rounded-full shadow-lg flex items-center justify-center"
        >
          <FaBrain className="text-white text-sm" />
        </motion.div>
      </div>
    </motion.div>
  );

  const CollegeModal = () => (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4"
      onClick={() => setCollegeModalOpen(false)}
    >
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.8, opacity: 0 }}
        className="relative max-w-5xl w-full h-full max-h-[90vh] rounded-2xl overflow-hidden shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <motion.button
          onClick={() => setCollegeModalOpen(false)}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          className="absolute top-4 right-4 z-10 w-12 h-12 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center text-white text-xl hover:bg-white/30 transition-all"
        >
          <FaTimes />
        </motion.button>

        {/* College Image as Background */}
        <div 
          className="w-full h-full bg-cover bg-center relative"
          style={{ backgroundImage: 'url(/images/college-campus.jpg)' }}
        >
          {/* Overlay with College Information */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-black/30 flex items-end p-8">
            <div className="text-white">
              <h2 className="text-4xl font-bold mb-4">Supreme Knowledge Foundation Group of Institutions</h2>
              <p className="text-xl mb-2">Bachelor of Technology - Computer Science & Engineering</p>
              <p className="text-lg opacity-90">Expected Graduation: 2027</p>
              <p className="text-base opacity-80 mt-2">Specialization: Artificial Intelligence & Machine Learning</p>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );

  const GalleryModal = () => {
    const [isVideoPlaying, setIsVideoPlaying] = useState(false);
    const videoRef = useRef(null);
    
    const mediaItems = [
      { src: '/images/gallery1.jpg', title: 'Memories 1', type: 'image' },
      { src: '/images/gallery2.jpg', title: 'Memories 2', type: 'image' },
      { src: '/images/gallery4.mp4', title: 'Special Moments Video', type: 'video' },
      { src: '/images/gallery5.jpg', title: 'Professional Moment', type: 'image' },
      { src: '/images/gallery6.jpg', title: 'Event Celebration', type: 'image' },
      { src: '/images/gallery7.jpg', title: 'Achievement Day', type: 'image' }
    ];

    const nextImage = () => {
      setCurrentImageIndex((prev) => (prev + 1) % mediaItems.length);
      setIsVideoPlaying(false);
    };

    const prevImage = () => {
      setCurrentImageIndex((prev) => (prev - 1 + mediaItems.length) % mediaItems.length);
      setIsVideoPlaying(false);
    };

    const toggleVideoPlayPause = () => {
      if (videoRef.current) {
        if (isVideoPlaying) {
          videoRef.current.pause();
        } else {
          videoRef.current.play();
        }
        setIsVideoPlaying(!isVideoPlaying);
      }
    };

    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-sm p-4"
        onClick={() => setGalleryModalOpen(false)}
      >
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.8, opacity: 0 }}
          className="relative max-w-4xl w-full h-full max-h-[90vh] rounded-2xl overflow-hidden shadow-2xl"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Close Button */}
          <motion.button
            onClick={() => setGalleryModalOpen(false)}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="absolute top-4 right-4 z-10 w-12 h-12 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center text-white text-xl hover:bg-white/30 transition-all"
          >
            <FaTimes />
          </motion.button>

          {/* Navigation Buttons */}
          <motion.button
            onClick={prevImage}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="absolute left-4 top-1/2 transform -translate-y-1/2 z-10 w-12 h-12 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center text-white text-xl hover:bg-white/30 transition-all"
          >
            <FaChevronLeft />
          </motion.button>

          <motion.button
            onClick={nextImage}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="absolute right-4 top-1/2 transform -translate-y-1/2 z-10 w-12 h-12 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center text-white text-xl hover:bg-white/30 transition-all"
          >
            <FaChevronRight />
          </motion.button>

          {/* Main Media Content */}
          <div className="w-full h-full bg-black rounded-2xl overflow-hidden relative">
            {mediaItems[currentImageIndex].type === 'video' ? (
              <div className="relative w-full h-full">
                <motion.video
                  key={currentImageIndex}
                  ref={videoRef}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.3 }}
                  src={mediaItems[currentImageIndex].src}
                  className="w-full h-full object-contain"
                  controls={false}
                  onPlay={() => setIsVideoPlaying(true)}
                  onPause={() => setIsVideoPlaying(false)}
                />
                {/* Video Play/Pause Button */}
                <motion.button
                  onClick={toggleVideoPlayPause}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-16 h-16 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center text-white text-2xl hover:bg-white/30 transition-all"
                >
                  {isVideoPlaying ? <FaPause /> : <FaPlay />}
                </motion.button>
              </div>
            ) : (
              <motion.img
                key={currentImageIndex}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3 }}
                src={mediaItems[currentImageIndex].src}
                alt={mediaItems[currentImageIndex].title}
                className="w-full h-full object-contain"
              />
            )}
          </div>

          {/* Media Counter & Title */}
          <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 text-white text-center">
            <p className="text-lg font-semibold mb-1">{mediaItems[currentImageIndex].title}</p>
            <p className="text-sm opacity-80">{currentImageIndex + 1} of {mediaItems.length}</p>
            {mediaItems[currentImageIndex].type === 'video' && (
              <p className="text-xs opacity-70 mt-1">🎬 Video</p>
            )}
          </div>

          {/* Thumbnail Navigation */}
          <div className="absolute bottom-4 left-4 flex space-x-2">
            {mediaItems.map((item, index) => (
              <motion.button
                key={index}
                onClick={() => {
                  setCurrentImageIndex(index);
                  setIsVideoPlaying(false);
                }}
                whileHover={{ scale: 1.1 }}
                className={`w-3 h-3 rounded-full transition-all ${
                  index === currentImageIndex ? 'bg-white' : 'bg-white/50'
                } ${item.type === 'video' ? 'border border-yellow-400' : ''}`}
              />
            ))}
          </div>
        </motion.div>
      </motion.div>
    );
  };

  const ProjectCard = ({ project, index }) => {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true });

    return (
      <motion.div
        ref={ref}
        initial={{ opacity: 0, y: 50 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6, delay: index * 0.2 }}
        whileHover={{ 
          rotateY: 10,
          rotateX: 5,
          scale: 1.05,
          transition: { duration: 0.3 }
        }}
        className="group perspective-1000"
      >
        <div className={`${currentTheme.card} rounded-2xl border ${currentTheme.border} overflow-hidden shadow-xl transform-gpu`}>
          <div className="relative h-48 overflow-hidden">
            <motion.div
              className={`absolute inset-0 bg-gradient-to-br ${project.color} opacity-90`}
              whileHover={{ scale: 1.1 }}
              transition={{ duration: 0.3 }}
            />
            <img
              src={project.image}
              alt={project.title}
              className="w-full h-full object-cover mix-blend-overlay"
            />
            <div className="absolute top-4 right-4">
              <motion.a
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.2, rotate: 360 }}
                className="bg-white/20 backdrop-blur-sm p-2 rounded-full text-white hover:bg-white/30 transition-all"
              >
                <FaExternalLinkAlt size={16} />
              </motion.a>
            </div>
          </div>
          <div className="p-6">
            <h3 className={`text-xl font-bold ${currentTheme.text} mb-2`}>{project.title}</h3>
            <p className={`${currentTheme.secondary} text-sm mb-4 leading-relaxed`}>
              {project.description}
            </p>
            <div className="flex flex-wrap gap-2">
              {project.techStack.map((tech) => (
                <motion.span
                  key={tech}
                  whileHover={{ scale: 1.1 }}
                  className="px-3 py-1 bg-gradient-to-r from-sky-400/20 to-blue-500/20 text-sky-600 dark:text-sky-400 rounded-full text-xs font-medium border border-sky-200 dark:border-sky-700"
                >
                  {tech}
                </motion.span>
              ))}
            </div>
          </div>
        </div>
      </motion.div>
    );
  };

  const SkillIcon = ({ skill, index }) => (
    <motion.div
      initial={{ opacity: 0, scale: 0 }}
      whileInView={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      whileHover={{ 
        scale: 1.2, 
        rotate: 360,
        transition: { duration: 0.3 }
      }}
      className={`relative group p-4 ${currentTheme.card} rounded-2xl border ${currentTheme.border} shadow-lg`}
    >
      <motion.div
        animate={{ 
          boxShadow: [
            '0 0 20px rgba(14, 165, 233, 0.5)',
            '0 0 30px rgba(14, 165, 233, 0.8)',
            '0 0 20px rgba(14, 165, 233, 0.5)'
          ]
        }}
        transition={{ duration: 2, repeat: Infinity }}
        className="absolute inset-0 rounded-2xl bg-gradient-to-r from-sky-400/20 to-blue-500/20 opacity-0 group-hover:opacity-100 transition-opacity"
      />
      <skill.icon size={32} className={`${skill.color} relative z-10`} />
      <div className={`mt-2 text-sm font-medium ${currentTheme.text} text-center relative z-10`}>
        {skill.name}
      </div>
    </motion.div>
  );

  const ContactForm = () => {
    const [formData, setFormData] = useState({
      name: '',
      email: '',
      message: ''
    });

    const handleSubmit = (e) => {
      e.preventDefault();
      setFormSubmitted(true);
      setTimeout(() => setFormSubmitted(false), 3000);
      setFormData({ name: '', email: '', message: '' });
    };

    return (
      <motion.form
        onSubmit={handleSubmit}
        variants={fadeInUp}
        className="relative"
      >
        <h3 className={`text-2xl font-semibold mb-6 ${currentTheme.text}`}>
          Send a Message
        </h3>
        
        <motion.div
          animate={{ x: [-1000, 1000] }}
          transition={{ duration: 15, repeat: Infinity, ease: 'linear' }}
          className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-sky-500 to-transparent"
        />
        
        <div className="space-y-6">
          <div>
            <label className={`block text-sm font-medium ${currentTheme.text} mb-2`}>
              Name
            </label>
            <motion.input
              whileFocus={{ scale: 1.02 }}
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className={`w-full px-4 py-3 rounded-xl border ${currentTheme.border} ${currentTheme.card} ${currentTheme.text} focus:ring-2 focus:ring-sky-500 focus:border-transparent transition-all`}
              required
            />
          </div>
          
          <div>
            <label className={`block text-sm font-medium ${currentTheme.text} mb-2`}>
              Email
            </label>
            <motion.input
              whileFocus={{ scale: 1.02 }}
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className={`w-full px-4 py-3 rounded-xl border ${currentTheme.border} ${currentTheme.card} ${currentTheme.text} focus:ring-2 focus:ring-sky-500 focus:border-transparent transition-all`}
              required
            />
          </div>
          
          <div>
            <label className={`block text-sm font-medium ${currentTheme.text} mb-2`}>
              Message
            </label>
            <motion.textarea
              whileFocus={{ scale: 1.02 }}
              value={formData.message}
              onChange={(e) => setFormData({ ...formData, message: e.target.value })}
              rows={4}
              className={`w-full px-4 py-3 rounded-xl border ${currentTheme.border} ${currentTheme.card} ${currentTheme.text} focus:ring-2 focus:ring-sky-500 focus:border-transparent transition-all resize-none`}
              required
            />
          </div>
          
          <motion.button
            type="submit"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="w-full bg-gradient-to-r from-sky-500 to-blue-600 text-white py-3 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all flex items-center justify-center space-x-2"
          >
            <span>Send Message</span>
            <motion.div
              animate={formSubmitted ? { x: 1000, y: -1000 } : { x: 0, y: 0 }}
              transition={{ duration: 0.8, ease: 'easeInOut' }}
            >
              <FaPaperPlane />
            </motion.div>
          </motion.button>
        </div>

        <AnimatePresence>
          {formSubmitted && (
            <motion.div
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0 }}
              className="absolute inset-0 bg-green-500/90 flex items-center justify-center rounded-2xl backdrop-blur-sm"
            >
              <div className="text-center text-white">
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1 }}
                  className="text-4xl mb-2"
                >
                  ✈️
                </motion.div>
                <div className="text-lg font-semibold">Message Sent!</div>
                <div className="text-sm">Thanks for reaching out!</div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.form>
    );
  };

  return (
    <div className={`min-h-screen ${currentTheme.bg} ${currentTheme.text} transition-colors duration-500 p-4 md:p-8`}>
      <AnimatedBackground />
      
      {/* Main Container Box */}
      <div className={`max-w-7xl mx-auto ${currentTheme.card} border-2 ${currentTheme.border} rounded-3xl shadow-2xl backdrop-blur-sm bg-opacity-95 overflow-hidden`}>
        <Navbar />

      {/* Hero Section */}
      <motion.section
        id="hero"
        className="min-h-screen flex items-center justify-center px-6 py-12"
        initial="hidden"
        animate="visible"
        variants={staggerContainer}
      >
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-center">
          <motion.div variants={fadeInUp} className="text-center md:text-left">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="mb-6"
            >
              <TypewriterText
                text={personalInfo.heroHeadline}
                className="text-4xl md:text-6xl font-bold leading-tight"
              />
            </motion.div>
            
            <motion.p
              variants={fadeInUp}
              className={`text-xl ${currentTheme.secondary} mb-8`}
            >
              {personalInfo.role}
            </motion.p>

            <motion.div
              variants={fadeInUp}
              className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start mb-8"
            >
              <motion.a
                href="#projects"
                whileHover={{ scale: 1.05, boxShadow: '0 20px 25px -5px rgba(14, 165, 233, 0.4)' }}
                whileTap={{ scale: 0.95 }}
                className="bg-gradient-to-r from-sky-500 to-blue-600 text-white px-8 py-4 rounded-full font-semibold shadow-lg transition-all"
              >
                View Portfolio
              </motion.a>
              <motion.a
                href="#contact"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={`border-2 border-sky-500 text-sky-500 px-8 py-4 rounded-full font-semibold hover:bg-sky-500 hover:text-white transition-all`}
              >
                Get In Touch
              </motion.a>
              <motion.button
                onClick={() => setGalleryModalOpen(true)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-gradient-to-r from-purple-500 to-pink-600 text-white px-8 py-4 rounded-full font-semibold shadow-lg transition-all flex items-center space-x-2"
              >
                <FaImages />
                <span>Gallery</span>
              </motion.button>
            </motion.div>

            <motion.div
              variants={fadeInUp}
              className="flex justify-center md:justify-start space-x-6"
            >
              {[
                { icon: FaGithub, href: personalInfo.github },
                { icon: FaLinkedin, href: personalInfo.linkedin },
                { icon: FaEnvelope, href: `mailto:${personalInfo.email}` }
              ].map(({ icon: Icon, href }, index) => (
                <motion.a
                  key={index}
                  href={href}
                  whileHover={{ scale: 1.2, y: -5 }}
                  whileTap={{ scale: 0.9 }}
                  className={`p-3 ${currentTheme.card} rounded-full border ${currentTheme.border} shadow-lg hover:shadow-xl transition-all`}
                >
                  <Icon size={24} className="text-sky-500" />
                </motion.a>
              ))}
            </motion.div>
          </motion.div>

          <motion.div variants={fadeInUp}>
            <ProfileImage />
          </motion.div>
        </div>
      </motion.section>

      {/* About Section */}
      <motion.section
        id="about"
        className="py-20 px-6"
        initial="hidden"
        whileInView="visible"
        variants={staggerContainer}
        viewport={{ once: true }}
      >
        <div className="max-w-4xl mx-auto text-center">
          <motion.h2
            variants={fadeInUp}
            className="text-4xl font-bold mb-8"
          >
            About Me
          </motion.h2>
          <motion.div
            variants={fadeInUp}
            className={`${currentTheme.card} rounded-2xl border ${currentTheme.border} p-8 shadow-xl`}
          >
            <p className={`text-lg ${currentTheme.secondary} leading-relaxed mb-8`}>
              I am a dedicated Computer Science Engineering student with expertise in full-stack development, 
              artificial intelligence, and machine learning systems. My technical proficiency encompasses 
              enterprise-level Java development, modern web technologies, and advanced ML frameworks. 
              I specialize in architecting scalable solutions that bridge theoretical computer science 
              concepts with practical business applications, delivering robust software systems that 
              drive innovation and efficiency.
              {/* REPLACE_ME: Update this about section with your own story */}
            </p>
            
            <motion.div
              variants={fadeInUp}
              className="flex justify-center"
            >
              <motion.a
                href="/SouvikGhosh_Resume.pdf"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ 
                  scale: 1.05, 
                  boxShadow: '0 20px 25px -5px rgba(14, 165, 233, 0.4)',
                  y: -2
                }}
                whileTap={{ scale: 0.95 }}
                className="inline-flex items-center space-x-3 bg-gradient-to-r from-sky-500 to-blue-600 text-white px-8 py-4 rounded-full font-semibold shadow-lg transition-all hover:shadow-xl"
              >
                <FaFileDownload className="text-lg" />
                <span>Download Resume</span>
              </motion.a>
            </motion.div>
          </motion.div>
        </div>
      </motion.section>

      {/* Projects Section */}
      <motion.section
        id="projects"
        className="py-20 px-6"
        initial="hidden"
        whileInView="visible"
        variants={staggerContainer}
        viewport={{ once: true }}
      >
        <div className="max-w-6xl mx-auto">
          <motion.h2
            variants={fadeInUp}
            className="text-4xl font-bold text-center mb-12"
          >
            Portfolio & Projects
          </motion.h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project, index) => (
              <ProjectCard key={index} project={project} index={index} />
            ))}
          </div>
        </div>
      </motion.section>

      {/* Skills Section */}
      <motion.section
        id="skills"
        className="py-20 px-6"
        initial="hidden"
        whileInView="visible"
        variants={staggerContainer}
        viewport={{ once: true }}
      >
        <div className="max-w-6xl mx-auto">
          <motion.h2
            variants={fadeInUp}
            className="text-4xl font-bold text-center mb-12"
          >
            Technologies & Tools
          </motion.h2>
          <motion.div
            variants={staggerContainer}
            className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6"
          >
            {skills.map((skill, index) => (
              <SkillIcon key={index} skill={skill} index={index} />
            ))}
          </motion.div>
        </div>
      </motion.section>

      {/* Education Section */}
      <motion.section
        id="education"
        className="py-20 px-6"
        initial="hidden"
        whileInView="visible"
        variants={staggerContainer}
        viewport={{ once: true }}
      >
        <div className="max-w-4xl mx-auto">
          <motion.h2
            variants={fadeInUp}
            className="text-4xl font-bold text-center mb-12"
          >
            Education & Certifications
          </motion.h2>
          
          <div className="space-y-8">
            <motion.div
              variants={fadeInUp}
              className={`${currentTheme.card} rounded-2xl border ${currentTheme.border} p-6 shadow-xl`}
            >
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center">
                  <FaGraduationCap className="text-sky-500 text-2xl mr-4" />
                  <div>
                    <h3 className={`text-xl font-semibold ${currentTheme.text}`}>
                      Bachelor of Technology - Computer Science & Engineering
                    </h3>
                    <p className={`${currentTheme.secondary}`}>Supreme Knowledge Foundation Group of Institutions • Expected Graduation: 2027</p>
                    <p className={`${currentTheme.secondary} text-sm mt-1`}>Specialization: Artificial Intelligence & Machine Learning</p>
                  </div>
                </div>
                <motion.button
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  whileTap={{ scale: 0.9 }}
                  className="w-16 h-16 bg-gradient-to-r from-sky-400 to-blue-500 rounded-full shadow-lg flex items-center justify-center text-white font-bold text-3xl hover:shadow-xl transition-all ml-4"
                  onClick={() => setCollegeModalOpen(true)}
                >
                  🏫
                </motion.button>
              </div>
            </motion.div>

            <motion.div
              variants={fadeInUp}
              className={`${currentTheme.card} rounded-2xl border ${currentTheme.border} p-6 shadow-xl`}
            >
              <div className="flex items-center mb-4">
                <FaCertificate className="text-sky-500 text-2xl mr-4" />
                <h3 className={`text-xl font-semibold ${currentTheme.text}`}>Certifications</h3>
              </div>
              <div className="space-y-4">
                <div className={`p-4 ${currentTheme.card} rounded-xl border ${currentTheme.border} shadow-md`}>
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <h4 className={`font-semibold ${currentTheme.text} mb-2`}>🏆 Infosys Global Hackathon 2025</h4>
                      <p className={`${currentTheme.secondary} text-sm mb-2`}>
                        <strong>Skills Demonstrated:</strong> Java, Python, Ideas Development, Project Management, Problem Solving, Project Planning
                      </p>
                      <p className={`${currentTheme.secondary} text-xs`}>
                        Participated in prestigious global hackathon showcasing innovative solutions and technical excellence
                      </p>
                    </div>
                    <motion.a
                      href="/Infosys-Certificate.pdf"
                      target="_blank"
                      rel="noopener noreferrer"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="ml-4 bg-gradient-to-r from-orange-500 to-red-600 text-white px-4 py-2 rounded-lg text-sm font-medium shadow-lg hover:shadow-xl transition-all flex items-center space-x-2"
                    >
                      <FaCertificate className="text-sm" />
                      <span>View Certificate</span>
                    </motion.a>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </motion.section>

      {/* Contact Section */}
      <motion.section
        id="contact"
        className="py-20 px-6"
        initial="hidden"
        whileInView="visible"
        variants={staggerContainer}
        viewport={{ once: true }}
      >
        <div className="max-w-4xl mx-auto">
          <motion.h2
            variants={fadeInUp}
            className="text-4xl font-bold text-center mb-12"
          >
            Professional Contact
          </motion.h2>
          
          {/* Main Contact Container Box */}
          <motion.div
            variants={fadeInUp}
            className={`${currentTheme.card} rounded-3xl border-2 ${currentTheme.border} p-8 shadow-2xl backdrop-blur-sm bg-opacity-95`}
          >
            <div className="grid md:grid-cols-2 gap-8">
              {/* Left Side - Opportunities */}
              <div>
                <h3 className={`text-2xl font-semibold mb-6 ${currentTheme.text}`}>
                  Open to Opportunities
                </h3>
                <p className={`${currentTheme.secondary} mb-6 leading-relaxed`}>
                  I am actively seeking software engineering internships and full-time opportunities 
                  where I can contribute my technical expertise in AI/ML and full-stack development. 
                  I welcome discussions about innovative projects, collaboration opportunities, 
                  and professional engagements in the technology sector.
                </p>
                
                <div className="space-y-4">
                  <motion.a
                    href={`mailto:${personalInfo.email}`}
                    whileHover={{ scale: 1.05, x: 10 }}
                    className={`flex items-center space-x-3 p-4 ${currentTheme.card} rounded-xl border ${currentTheme.border} shadow-lg hover:shadow-xl transition-all`}
                  >
                    <FaEnvelope className="text-sky-500" />
                    <span className={currentTheme.text}>{personalInfo.email}</span>
                  </motion.a>
                  
                  <motion.a
                    href={personalInfo.github}
                    whileHover={{ scale: 1.05, x: 10 }}
                    className={`flex items-center space-x-3 p-4 ${currentTheme.card} rounded-xl border ${currentTheme.border} shadow-lg hover:shadow-xl transition-all`}
                  >
                    <FaGithub className="text-sky-500" />
                    <span className={currentTheme.text}>GitHub Portfolio</span>
                  </motion.a>
                  
                  <motion.a
                    href={personalInfo.linkedin}
                    whileHover={{ scale: 1.05, x: 10 }}
                    className={`flex items-center space-x-3 p-4 ${currentTheme.card} rounded-xl border ${currentTheme.border} shadow-lg hover:shadow-xl transition-all`}
                  >
                    <FaLinkedin className="text-sky-500" />
                    <span className={currentTheme.text}>LinkedIn Network</span>
                  </motion.a>
                </div>
              </div>
              
              {/* Right Side - Contact Form */}
              <div>
                <h3 className={`text-2xl font-semibold mb-6 ${currentTheme.text}`}>
                  Send a Message
                </h3>
                
                <form className="space-y-6">
                  <div>
                    <label className={`block text-sm font-medium ${currentTheme.text} mb-2`}>
                      Name
                    </label>
                    <input
                      type="text"
                      className={`w-full px-4 py-3 rounded-xl border ${currentTheme.border} ${currentTheme.card} ${currentTheme.text} focus:ring-2 focus:ring-sky-500 focus:border-transparent transition-all`}
                      placeholder="Your Name"
                      required
                    />
                  </div>
                  
                  <div>
                    <label className={`block text-sm font-medium ${currentTheme.text} mb-2`}>
                      Email
                    </label>
                    <input
                      type="email"
                      className={`w-full px-4 py-3 rounded-xl border ${currentTheme.border} ${currentTheme.card} ${currentTheme.text} focus:ring-2 focus:ring-sky-500 focus:border-transparent transition-all`}
                      placeholder="your.email@example.com"
                      required
                    />
                  </div>
                  
                  <div>
                    <label className={`block text-sm font-medium ${currentTheme.text} mb-2`}>
                      Message
                    </label>
                    <textarea
                      rows={4}
                      className={`w-full px-4 py-3 rounded-xl border ${currentTheme.border} ${currentTheme.card} ${currentTheme.text} focus:ring-2 focus:ring-sky-500 focus:border-transparent transition-all resize-none`}
                      placeholder="Tell me about your project or opportunity..."
                      required
                    />
                  </div>
                  
                  <button
                    type="submit"
                    className="w-full bg-gradient-to-r from-sky-500 to-blue-600 text-white py-3 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all flex items-center justify-center space-x-2"
                  >
                    <span>Send Message</span>
                    <FaPaperPlane />
                  </button>
                </form>
              </div>
            </div>
          </motion.div>
        </div>
      </motion.section>

      {/* Footer */}
      <footer className={`py-12 px-6 border-t ${currentTheme.border}`}>
        <div className="max-w-6xl mx-auto text-center">
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className={`${currentTheme.secondary}`}
          >
            © 2025 {personalInfo.name}. Built with React, Tailwind CSS, and Framer Motion.
          </motion.p>
        </div>
      </footer>
      </div>
      
      {/* College Modal */}
      {collegeModalOpen && <CollegeModal />}
      
      {/* Gallery Modal */}
      {galleryModalOpen && <GalleryModal />}
    </div>
  );
}