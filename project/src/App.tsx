import React, { useState, useEffect } from 'react';
import { Moon, Sun, Menu, X, ChevronDown, ExternalLink, Instagram, MessageCircle, Zap } from 'lucide-react';

function App() {
  const [darkMode, setDarkMode] = useState(true);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const [displayText, setDisplayText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [textIndex, setTextIndex] = useState(0);
  const [selectedPortfolioItem, setSelectedPortfolioItem] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const texts = ['Graphics Designer', 'UI-UX Designer'];

  useEffect(() => {
    const handleScroll = () => {
      const sections = ['home', 'about', 'portfolio', 'services', 'contact'];
      const scrollPosition = window.scrollY + 100;

      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const { offsetTop, offsetHeight } = element;
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Typing animation effect
  useEffect(() => {
    const currentText = texts[textIndex];
    const timeout = setTimeout(() => {
      if (!isDeleting) {
        if (displayText.length < currentText.length) {
          setDisplayText(currentText.substring(0, displayText.length + 1));
        } else {
          setTimeout(() => setIsDeleting(true), 2000);
        }
      } else {
        if (displayText.length > 0) {
          setDisplayText(currentText.substring(0, displayText.length - 1));
        } else {
          setIsDeleting(false);
          setTextIndex((prev) => (prev + 1) % texts.length);
        }
      }
    }, isDeleting ? 50 : 100);

    return () => clearTimeout(timeout);
  }, [displayText, isDeleting, textIndex, texts]);

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsMenuOpen(false);
  };

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  const portfolioItems = [
    {
      id: 1,
      title: "Discord Poster",
      category: "posters",
      image: "YUNG KAI Poster.png",
      description: "Vibrant music event poster with bold colors and dynamic composition.",
      subcategory: "Concert Posters",
      gallery: [
        "YUNG KAI Poster.png",
        "Metaversity Event Poster.png"
      ]
    },
    {
      id: 2,
      title: "YouTube Gaming Thumbnail",
      category: "thumbnails",
      image: "Youtube-Thumbnails.png",
      description: "High-conversion gaming thumbnail with dramatic lighting and bold text.",
      subcategory: "Gaming Thumbnails",
      gallery: [
        "THMB1-Recovered.jpg",
        "Kaiser Equipped PNG.png",
        "LENZIFF HIGLIGHT1.jpg",
        "LENZIFF IS LIVE.jpg",
        "Conqueror Push 16% Vignnette.png",
      ]
    },
    {
      id: 3,
      title: "Motion Graphics Intro",
      category: "motion",
      image: "https://images.pexels.com/photos/2004161/pexels-photo-2004161.jpeg?auto=compress&cs=tinysrgb&w=400",
      description: "Animated logo reveal with particle effects and dynamic transitions.",
      subcategory: "Logo Animations",
      gallery: [ <video src="One for all.mp4">One for All</video>,
        "One for all.mp4",
        "JJK.mp4"
      ]
    }
  ];

  const [selectedCategory, setSelectedCategory] = useState('all');

  const filteredItems = selectedCategory === 'all' 
    ? portfolioItems 
    : portfolioItems.filter(item => item.category === selectedCategory);

  const openModal = (item) => {
    setSelectedPortfolioItem(item);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedPortfolioItem(null);
  };

  return (
    <div className={`min-h-screen transition-colors duration-300 ${
      darkMode ? 'bg-gray-900 text-white' : 'bg-white text-gray-900'
    }`}>
      {/* Navigation */}
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        darkMode ? 'bg-gray-900/90 backdrop-blur-md border-gray-700' : 'bg-white/90 backdrop-blur-md border-gray-200'
      } border-b`}>
        <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
              <div className="flex items-center space-x-2">
                <div className="relative">
                  <Zap className="w-8 h-8 text-green-400 transform rotate-12" />
                  <div className="absolute inset-0 bg-green-400 rounded-full opacity-20 blur-sm"></div>
                </div>
                <h1 className="text-2xl font-black tracking-wider text-transparent bg-gradient-to-r from-green-400 to-emerald-600 bg-clip-text font-space">
                  LerenceGraphics
                </h1>
              </div>
            </div>
            
            {/* Desktop Navigation */}
            <div className="hidden md:block">
              <div className="flex items-baseline ml-10 space-x-8">
                {['home', 'about', 'portfolio', 'services', 'contact'].map((section) => (
                  <button
                    key={section}
                    onClick={() => scrollToSection(section)}
                    className={`px-3 py-2 text-sm font-bold transition-colors duration-200 capitalize font-inter ${
                      activeSection === section
                        ? 'text-green-400'
                        : darkMode ? 'text-gray-300 hover:text-green-400' : 'text-gray-700 hover:text-emerald-600'
                    }`}
                  >
                    {section}
                  </button>
                ))}
              </div>
            </div>

            {/* Theme Toggle and Mobile Menu */}
            <div className="flex items-center space-x-4">
              <button
                onClick={toggleDarkMode}
                className={`p-2 rounded-lg transition-colors duration-200 ${
                  darkMode ? 'bg-gray-800 text-yellow-400 hover:bg-gray-700' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {darkMode ? <Sun size={20} /> : <Moon size={20} />}
              </button>
              
              {/* Mobile menu button */}
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="p-2 rounded-lg md:hidden"
              >
                {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className={'md:hidden ' + (darkMode ? 'bg-gray-800' : 'bg-gray-50') + ' border-t'}>
            <div className="px-2 pt-2 pb-3 space-y-1">
              {['home', 'about', 'portfolio', 'services', 'contact'].map((section) => (
                <button
                  key={section}
                  onClick={() => scrollToSection(section)}
                  className={'block w-full text-left px-3 py-2 text-base font-bold transition-colors duration-200 capitalize font-inter ' + (
                    activeSection === section
                      ? 'text-green-400'
                      : darkMode ? 'text-gray-300 hover:text-green-400' : 'text-gray-700 hover:text-emerald-600'
                  )}
                >
                  {section}
                </button>
              ))}
            </div>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <section id="home" className="relative flex items-center justify-center min-h-screen overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-green-900/20 to-emerald-900/20"></div>
        <div className="relative z-10 max-w-6xl px-4 mx-auto text-center sm:px-6 lg:px-8">
          <div className="flex flex-col items-center justify-center gap-12 mb-8 lg:flex-row">
            {/* Profile Photo */}
            <div className="relative">
              <div className="w-64 h-64 overflow-hidden border-4 border-green-400 rounded-full shadow-2xl lg:w-80 lg:h-80 animate-fade-in">
                <img
                  src="Professional Portrait.png"
                  alt="Profile"
                  className="object-cover w-full h-full transition-transform duration-700 ease-out transform hover:scale-105"
                />
              </div>
            </div>

            {/* Text Content */}
            <div className="text-left lg:text-left">
              <h1 className="mb-6 text-5xl font-black text-transparent md:text-7xl bg-gradient-to-r from-green-400 via-emerald-500 to-teal-500 bg-clip-text font-space">
                Crafting Visual Stories
              </h1>
              <p className={`text-xl md:text-2xl mb-6 ${darkMode ? 'text-gray-300' : 'text-gray-700'} font-bold font-inter`}>
                That Captivate, Convert, and Inspire
              </p>
              
              {/* Animated Typing Text */}
              <div className="mb-8 text-2xl font-black md:text-3xl font-space">
                <span className={darkMode ? "text-white" : "text-gray-900"}>Hi, I'm a </span>
                <span className="text-green-400">
                  {displayText}
                  <span className="animate-pulse">|</span>
                </span>
              </div>
              
              <p className={`text-lg mb-8 ${darkMode ? 'text-gray-400' : 'text-gray-600'} max-w-xl font-semibold font-inter`}>
                Specializing in posters, YouTube thumbnails, motion graphics, and UI/UX design
              </p>
            </div>
          </div>

          <div className="flex flex-col justify-center gap-4 sm:flex-row">
            <button
              onClick={() => scrollToSection('portfolio')}
              className="px-8 py-3 font-black transition-all duration-200 transform rounded-lg shadow-lg bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 hover:scale-105 shadow-green-500/25 font-inter"
            >
              View Portfolio
            </button>
            <button
              onClick={() => scrollToSection('contact')}
              className={`px-8 py-3 border-2 border-green-500 rounded-lg font-black transition-all duration-200 transform hover:scale-105 font-inter ${
                darkMode ? 'hover:bg-green-500 hover:text-gray-900' : 'hover:bg-green-500 hover:text-white'
              }`}
            >
              Get In Touch
            </button>
          </div>
        </div>
        
        {/* Scroll Indicator */}
        <div className="absolute transform -translate-x-1/2 bottom-8 left-1/2 animate-bounce">
          <ChevronDown size={24} className="text-green-400" />
        </div>
      </section>

      {/* About Section */}
      <section id="about" className={`py-20 ${darkMode ? 'bg-gray-800' : 'bg-gray-50'}`}>
        <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
          <div className="mb-16 text-center">
            <h2 className="mb-4 text-4xl font-black text-transparent md:text-5xl bg-gradient-to-r from-green-400 to-emerald-600 bg-clip-text font-space">
              About Me
            </h2>
            <p className={`text-xl ${darkMode ? 'text-gray-400' : 'text-gray-600'} max-w-2xl mx-auto font-bold font-inter`}>
              A decade of visual storytelling experience meets cutting-edge design innovation
            </p>
          </div>
          
          <div className="grid items-center gap-12 md:grid-cols-2">
            <div className="space-y-6">
              <div className={`p-6 rounded-lg ${darkMode ? 'bg-gray-700' : 'bg-white'} shadow-lg border-l-4 border-green-400`}>
                <h3 className="mb-3 text-2xl font-black text-green-400 font-space">10 Years</h3>
                <p className={`${darkMode ? 'text-gray-400' : 'text-gray-600'} font-semibold font-inter`}>
                  Mastering Photoshop with a decade of pixel-perfect precision and creative innovation
                </p>
              </div>
              
              <div className={`p-6 rounded-lg ${darkMode ? 'bg-gray-700' : 'bg-white'} shadow-lg border-l-4 border-emerald-400`}>
                <h3 className="mb-3 text-2xl font-black text-emerald-400 font-space">4 Years</h3>
                <p className={`${darkMode ? 'text-gray-400' : 'text-gray-600'} font-semibold font-inter`}>
                  Expertise in Adobe Creative Suite - After Effects, Illustrator, Premiere Pro, and more
                </p>
              </div>
              
              <div className={`p-6 rounded-lg ${darkMode ? 'bg-gray-700' : 'bg-white'} shadow-lg border-l-4 border-teal-400`}>
                <h3 className="mb-3 text-2xl font-black text-teal-400 font-space">10 Months</h3>
                <p className={`${darkMode ? 'text-gray-400' : 'text-gray-600'} font-semibold font-inter`}>
                  Freelancing journey creating stunning posters, thumbnails, motion graphics, and UI/UX designs
                </p>
              </div>
            </div>
            
            <div className="space-y-6">
              <h3 className="mb-6 text-3xl font-black font-space">My Journey</h3>
              <p className={`${darkMode ? 'text-gray-400' : 'text-gray-600'} text-lg leading-relaxed font-semibold text-justify font-inter`}>
                With over a decade of experience in visual design, I've honed my skills across multiple Adobe platforms to deliver exceptional creative solutions. My journey began with Photoshop, where I spent 10 years perfecting the art of digital manipulation and design.
              </p>
              <p className={`${darkMode ? 'text-gray-400' : 'text-gray-600'} text-lg leading-relaxed font-semibold text-justify font-inter`}>
                For the past 4 years, I've expanded my expertise to include After Effects, Illustrator, Premiere Pro, and other Adobe Creative Suite tools, allowing me to offer comprehensive design services from static graphics to dynamic motion graphics.
              </p>
              <p className={`${darkMode ? 'text-gray-400' : 'text-gray-600'} text-lg leading-relaxed font-semibold text-justify font-inter`}>
                Currently, I'm enhancing my skill set by learning Figma to stay at the forefront of modern UI/UX design trends and collaborative design workflows.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Portfolio Section */}
      <section id="portfolio" className="py-20">
        <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
          <div className="mb-16 text-center">
            <h2 className="mb-4 text-4xl font-black text-transparent md:text-5xl bg-gradient-to-r from-green-400 to-emerald-600 bg-clip-text font-space">
              Portfolio
            </h2>
            <p className={`text-xl ${darkMode ? 'text-gray-400' : 'text-gray-600'} max-w-2xl mx-auto font-bold font-inter`}>
              Explore my creative work across different design disciplines
            </p>
          </div>

          {/* Portfolio Filter */}
          <div className="flex flex-wrap justify-center gap-4 mb-12">
            {['all', 'posters', 'thumbnails', 'motion'].map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-6 py-2 rounded-full font-black transition-all duration-200 capitalize font-inter ${
                  selectedCategory === category
                    ? 'bg-gradient-to-r from-green-500 to-emerald-600 text-white shadow-lg shadow-green-500/25'
                    : darkMode 
                      ? 'bg-gray-700 text-gray-300 hover:bg-gray-600' 
                      : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
              >
                {category}
              </button>
            ))}
          </div>

          {/* Portfolio Grid */}
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {filteredItems.map((item) => (
              <div
                key={item.id}
                onClick={() => openModal(item)}
                className={`group relative overflow-hidden rounded-lg ${
                  darkMode ? 'bg-gray-800' : 'bg-white'
                } shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 border border-green-400/20 cursor-pointer`}
              >
                <div className="relative overflow-hidden">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="object-cover w-full h-64 transition-transform duration-300 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 transition-opacity duration-300 opacity-0 bg-gradient-to-t from-black/60 to-transparent group-hover:opacity-100"></div>
                  <div className="absolute transition-opacity duration-300 opacity-0 top-4 right-4 group-hover:opacity-100">
                    <ExternalLink size={20} className="text-white" />
                  </div>
                </div>
                
                <div className="p-6">
                  <h3 className="mb-2 text-xl font-black font-space">{item.title}</h3>
                  <p className="mb-3 text-sm font-bold text-green-400 font-inter">
                    {item.subcategory}
                  </p>
                  <p className={`${darkMode ? 'text-gray-500' : 'text-gray-600'} text-sm font-semibold font-inter`}>{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Portfolio Modal */}
      {isModalOpen && selectedPortfolioItem && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div 
            className="absolute inset-0 bg-black/80 backdrop-blur-sm"
            onClick={closeModal}
          ></div>
          <div className={`relative max-w-6xl w-full max-h-[90vh] overflow-y-auto rounded-lg ${
            darkMode ? 'bg-gray-800' : 'bg-white'
          } shadow-2xl`}>
            <div className="sticky top-0 z-10 flex items-center justify-between p-6 border-b border-green-400/20 bg-inherit">
              <div>
                <h2 className="text-3xl font-black font-space">{selectedPortfolioItem.subcategory}</h2>
                <p className={`${darkMode ? 'text-gray-400' : 'text-gray-600'} font-semibold font-inter`}>
                  {selectedPortfolioItem.description}
                </p>
              </div>
              <button
                onClick={closeModal}
                className={`p-2 rounded-lg transition-colors duration-200 ${
                  darkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-100'
                }`}
              >
                <X size={24} />
              </button>
            </div>
            
            <div className="p-6">
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {selectedPortfolioItem.gallery.map((image, index) => (
                  <div
                    key={index}
                    className="relative overflow-hidden transition-all duration-300 transform rounded-lg shadow-lg group hover:shadow-xl hover:-translate-y-1"
                  >
                    <img
                      src={image}
                      alt={`${selectedPortfolioItem.subcategory} ${index + 1}`}
                      className="object-cover w-full h-64 transition-transform duration-300 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 transition-opacity duration-300 opacity-0 bg-gradient-to-t from-black/40 to-transparent group-hover:opacity-100"></div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Services Section */}
      <section id="services" className={`py-20 ${darkMode ? 'bg-gray-800' : 'bg-gray-50'}`}>
        <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
          <div className="mb-16 text-center">
            <h2 className="mb-4 text-4xl font-black text-transparent md:text-5xl bg-gradient-to-r from-green-400 to-emerald-600 bg-clip-text font-space">
              Services
            </h2>
            <p className={`text-xl ${darkMode ? 'text-gray-400' : 'text-gray-600'} max-w-2xl mx-auto font-bold font-inter`}>
              Comprehensive design solutions tailored to your creative needs
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {[
              {
                title: "Static & Dynamic Poster Design",
                description: "Eye-catching posters that communicate your message effectively with modern design principles.",
                icon: "🎨"
              },
              {
                title: "YouTube Channel Branding",
                description: "Complete channel makeover including thumbnails, banners, and consistent visual identity.",
                icon: "📺"
              },
              {
                title: "Motion Graphics",
                description: "Engaging animations for ads, intros, and social media content using After Effects.",
                icon: "🎬"
              },
              {
                title: "UI/UX Design",
                description: "User-centered design for web and mobile applications with modern aesthetics.",
                icon: "📱"
              },
              {
                title: "Branding Packages",
                description: "Complete branding solutions including logos, color palettes, and typography systems.",
                icon: "🎯"
              },
              {
                title: "Social Media Graphics",
                description: "Consistent visual content for all your social media platforms and campaigns.",
                icon: "📱"
              }
            ].map((service, index) => (
              <div
                key={index}
                className={`p-6 rounded-lg ${
                  darkMode ? 'bg-gray-700' : 'bg-white'
                } shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 border border-green-400/20`}
              >
                <div className="mb-4 text-4xl">{service.icon}</div>
                <h3 className="mb-3 text-xl font-black font-space">{service.title}</h3>
                <p className={(darkMode ? 'text-gray-400' : 'text-gray-600') + ' font-semibold font-inter'}>{service.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20">
        <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
          <div className="mb-16 text-center">
            <h2 className="mb-4 text-4xl font-black text-transparent md:text-5xl bg-gradient-to-r from-green-400 to-emerald-600 bg-clip-text font-space">
              Connect With Me
            </h2>
            <p className={`text-xl ${darkMode ? 'text-gray-400' : 'text-gray-600'} max-w-2xl mx-auto font-bold font-inter`}>
              Ready to bring your creative vision to life? Let's connect!
            </p>
          </div>

          <div className="flex justify-center space-x-8">
            <a
              href="https://www.instagram.com/_asheerwad_?igsh=cDY1MG4yZjc4eGJ3"
              target="_blank"
              rel="noopener noreferrer"
              className={`group flex flex-col items-center p-8 rounded-lg ${
                darkMode ? 'bg-gray-800 hover:bg-gray-700' : 'bg-white hover:bg-gray-50'
              } shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 border border-green-400/20`}
            >
              <div className="w-16 h-16 mb-4 overflow-hidden transition-transform duration-300 rounded-full shadow-lg group-hover:scale-110">
                <img
                  src="Instagram_icon.png"
                  alt="Instagram"
                  className="object-cover w-full h-full"
                />
              </div>
              <h3 className="mb-2 text-xl font-black font-space">Instagram</h3>
              <p className={`${darkMode ? 'text-gray-400' : 'text-gray-600'} font-bold font-inter`}>@_asheerwad_</p>
            </a>

            <a
              href="https://discord.com/users/asheerwad"
              target="_blank"
              rel="noopener noreferrer"
              className={`group flex flex-col items-center p-8 rounded-lg ${
                darkMode ? 'bg-gray-800 hover:bg-gray-700' : 'bg-white hover:bg-gray-50'
              } shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 border border-green-400/20`}
            >
              <div className="w-16 h-16 mb-4 overflow-hidden transition-transform duration-300 rounded-full shadow-lg group-hover:scale-110">
                <img
                  src="discord_icon.png"
                  alt="Discord"
                  className="object-cover w-full h-full"
                />
              </div>
              <h3 className="mb-2 text-xl font-black font-space">Discord</h3>
              <p className={(darkMode ? 'text-gray-400' : 'text-gray-600') + ' font-bold font-inter'}>asheerwad#8844</p>
            </a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className={`py-8 ${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-gray-50 border-gray-200'} border-t`}>
        <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
          <div className="text-center">
            <p className={(darkMode ? 'text-gray-400' : 'text-gray-600') + ' font-bold font-inter'}>
              © 2024 PixelKraft. All rights reserved. | Crafted with passion for visual excellence.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;