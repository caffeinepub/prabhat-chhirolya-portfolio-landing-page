import { useEffect, useRef, useState } from 'react';
import { Mail, ChevronDown, ChevronUp } from 'lucide-react';
import ProjectCard from './ProjectCard';

interface PersonalModeContentProps {
  isFadingOut?: boolean;
}

export default function PersonalModeContent({ isFadingOut = false }: PersonalModeContentProps) {
  const [scrolled, setScrolled] = useState(false);
  const [showScrollCue, setShowScrollCue] = useState(true);
  const [isBeliefsSectionExpanded, setIsBeliefsSectionExpanded] = useState(false);
  const [isBackgroundLoaded, setIsBackgroundLoaded] = useState(false);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const sectionsRef = useRef<(HTMLElement | null)[]>([]);
  const carouselRef = useRef<HTMLDivElement>(null);
  const [hasPlayedCarouselHint, setHasPlayedCarouselHint] = useState(false);

  // Preload background image
  useEffect(() => {
    const img = new Image();
    img.src = '/assets/generated/personal-mode-background.dim_1920x1080.jpg';
    img.onload = () => {
      setIsBackgroundLoaded(true);
    };
    img.onerror = () => {
      // If image fails to load, still show the section
      setIsBackgroundLoaded(true);
    };
  }, []);

  useEffect(() => {
    const container = scrollContainerRef.current;
    if (!container) return;

    const handleScroll = () => {
      if (!scrolled && container.scrollTop > 10) {
        setScrolled(true);
        setShowScrollCue(false);
      }

      // Fade in sections on scroll
      sectionsRef.current.forEach((section) => {
        if (!section) return;
        const rect = section.getBoundingClientRect();
        const windowHeight = window.innerHeight;
        
        if (rect.top < windowHeight * 0.8) {
          section.classList.add('section-visible');
        }
      });
    };

    container.addEventListener('scroll', handleScroll);
    return () => container.removeEventListener('scroll', handleScroll);
  }, [scrolled]);

  // Intersection Observer for carousel hint animation
  useEffect(() => {
    const carousel = carouselRef.current;
    if (!carousel) return;

    // Check if hint has already been played in this session
    const hintPlayed = sessionStorage.getItem('carouselHintPlayed');
    if (hintPlayed === 'true') {
      setHasPlayedCarouselHint(true);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !hasPlayedCarouselHint) {
            // Trigger the hint animation
            carousel.classList.add('carousel-hint-active');
            setHasPlayedCarouselHint(true);
            sessionStorage.setItem('carouselHintPlayed', 'true');

            // Remove the class after animation completes
            setTimeout(() => {
              carousel.classList.remove('carousel-hint-active');
            }, 600);
          }
        });
      },
      {
        threshold: 0.3, // Trigger when 30% of the section is visible
        rootMargin: '0px',
      }
    );

    observer.observe(carousel);

    return () => {
      observer.disconnect();
    };
  }, [hasPlayedCarouselHint]);

  const projects = [
    {
      title: 'CivicReport.xyz',
      description: 'A citizen-first platform that turns everyday civic problems into clear, actionable reports that authorities can\'t ignore. This civic-tech experiment built e2e on the ICP.',
      thumbnail: '/assets/civicreportthumbnail-2.jpg',
      details: {
        paragraphs: [
          "CivicReport.xyz is a civic-tech experiment showing how blockchain can empower citizens and hold authorities accountable. Built fully on the Internet Computer, it's a proof-of-concept for decentralized tech in public good.",
          'Users can report civic issues with location, images, and descriptions—creating an immutable on-chain record—while instantly activating pressure tools like auto-emails to authorities, GPS-tagged leader images, certificates, printable complaints, legal notices, and more.',
          'By combining on-chain storage with decentralized identity, CivicReport.xyz preserves data integrity without compromising user privacy, demonstrating how Web3 can meaningfully upgrade civic engagement and accountability.',
        ],
        images: [
          '/assets/Civicreport01.jpeg',
          '/assets/Civicreport02.jpeg',
          '/assets/Civicreport03.jpeg',
          '/assets/Civicreport04.jpeg',
          '/assets/Civicreport05.jpeg',
        ],
        liveProjectUrl: 'https://civicreport.xyz',
      },
    },
    {
      title: 'MANIT BHOPAL : it\'s a feeling',
      description: 'A cinematic glimpse into the NIT Bhopal (MANIT) campus—capturing its vibe, everyday life, and the diverse event-driven societies that define the overall MANIT experience.',
      thumbnail: '/assets/manitbhopalthumbnail-2.jpg',
      details: {
        paragraphs: [
          'I created this video during my college years while pursuing my architecture degree. I gained so much from my time at MANIT, and this film was my small way of giving back through my creative skills. Made in 2018 during my fourth year, the cinematic campus video features my friends, captures the spirit and slogan of MANIT, and was intended to help new students and their parents experience what the campus feels like—its environment, events, and the vibrant societies MANIT offers.',
        ],
        youtubeUrl: 'https://youtu.be/CfA6EBYuItM?si=ENMJ5YO5yUpTcfbh',
      },
    },
    {
      title: 'AR Personal Card (Web AR)',
      description: 'An experimental decentralized personal/Professional Augmented Reality card that blends NFC, WebAR, and Web3 to turn a physical card into an interactive digital identity.',
      thumbnail: '/assets/arcardthumbna-1.jpg',
      details: {
        paragraphs: [
          'This project reimagines a personal/business card using NFC, WebAR, and Web3. Instead of being static, the card becomes an interactive digital identity that unlocks rich content beyond what a traditional card can hold.',
          'The experience starts by scanning a QR code or tapping the card on an NFC-enabled phone, which opens my decentralized website (prabhatchhirolya.x). From there, users can explore my links or enter the AR experience.',
          'In AR, the phone camera recognizes the physical card and overlays videos, audio, UI, buttons, or 3D elements directly into the real world using image tracking.',
          'The domain is minted on Ethereum, and the website is hosted on IPFS (Filecoin)—chosen for lower cost, high uptime, full ownership, and future metaverse compatibility.',
        ],
        youtubeUrl: 'https://youtu.be/D1sX8BFzGbw?si=IlQLwpUMGlQITOFU',
      },
    },
  ];

  const thoughts = [
    'I learn best by building first and refining along the way.',
    "I'm drawn to systems that feel obvious only after they exist.",
    'Tools matter - but clarity of intent matters more.',
    'I prefer depth over noise and long-term thinking over quick wins.',
    'I believe the future of design is spatial, collaborative, and AI-augmented.',
  ];

  const curiosities = [
    'XR as a natural interface, not a novelty',
    'AI as a collaborator in creative and technical work',
    'On-chain systems for civic and public good',
    'Designing tools that feel intuitive before they feel powerful',
    'Bridging architecture, code, and immersive experience',
  ];

  const handleStayInTouch = () => {
    window.location.href = 'mailto:ar.prabhatchhirolya@gmail.com?subject=hello';
  };

  const toggleBeliefsSection = () => {
    setIsBeliefsSectionExpanded(!isBeliefsSectionExpanded);
  };

  return (
    <div className={`personal-mode-content-container ${isFadingOut ? 'content-fade-out' : 'content-fade-in'}`}>
      <div
        ref={scrollContainerRef}
        className="h-full overflow-y-auto overflow-x-hidden scroll-smooth px-6 sm:px-12 md:px-16 lg:px-24"
      >
        {/* Entry Section with Background Image and Branded Dark Overlay */}
        <section className={`min-h-[70vh] flex flex-col items-center justify-center text-center relative personal-mode-entry-bg ${isBackgroundLoaded ? 'mode-bg-loaded' : ''}`}>
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-5xl font-extralight tracking-wide text-foreground mb-6 sm:mb-8 relative z-10">
            Personal Journey
          </h2>
          <p className="max-w-3xl text-sm sm:text-base md:text-lg lg:text-xl font-light tracking-wide text-foreground/70 leading-relaxed mb-8 sm:mb-10 relative z-10">
            I explore creativity, technology, and systems by building, experimenting, and reflecting - often before there&apos;s a clear outcome.
          </p>
          
          {/* Stay in touch CTA Button with Gradient Glow */}
          <button
            onClick={handleStayInTouch}
            className="cta-button-glow flex items-center gap-2 px-6 py-3 rounded-lg border border-foreground/15 bg-background/20 backdrop-blur-sm text-sm sm:text-base font-light tracking-wide text-foreground/70 transition-all duration-300 hover:border-foreground/30 hover:bg-background/30 hover:text-foreground hover:scale-105 relative z-10"
          >
            <Mail className="h-4 w-4" />
            Stay in touch
          </button>
          
          {/* Scroll Cue */}
          <div
            className={`absolute bottom-12 left-1/2 -translate-x-1/2 transition-opacity duration-700 z-10 ${
              showScrollCue ? 'opacity-60' : 'opacity-0'
            }`}
          >
            <p className="text-xs sm:text-sm font-light tracking-wider text-foreground/50">
              Scroll to explore
            </p>
            <div className="mt-2 flex justify-center">
              <div className="w-px h-8 bg-gradient-to-b from-foreground/30 to-transparent animate-pulse" />
            </div>
          </div>
        </section>

        {/* How I Think Section */}
        <section
          ref={(el) => {
            sectionsRef.current[0] = el;
          }}
          className="section-fade min-h-[60vh] flex flex-col items-center justify-center py-16 sm:py-20 md:py-24"
        >
          <h3 className="text-2xl sm:text-3xl md:text-4xl font-light tracking-wide text-foreground mb-12 sm:mb-16 md:mb-20">
            How I Think
          </h3>
          <div className="max-w-4xl w-full space-y-6 sm:space-y-8 md:space-y-10">
            {thoughts.map((thought, index) => (
              <p
                key={index}
                className="text-sm sm:text-base md:text-lg font-light tracking-wide text-foreground/80 leading-relaxed text-center"
                style={{
                  animationDelay: `${index * 100}ms`,
                }}
              >
                {thought}
              </p>
            ))}
          </div>
        </section>

        {/* Current Curiosities Section */}
        <section
          ref={(el) => {
            sectionsRef.current[1] = el;
          }}
          className="section-fade min-h-[60vh] flex flex-col items-center justify-center py-16 sm:py-20 md:py-24"
        >
          <h3 className="text-2xl sm:text-3xl md:text-4xl font-light tracking-wide text-foreground mb-12 sm:mb-16">
            Current Curiosities
          </h3>
          <div className="max-w-4xl w-full grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
            {curiosities.map((curiosity, index) => (
              <div
                key={index}
                className="p-6 sm:p-8 rounded-lg border border-foreground/10 bg-card/30 backdrop-blur-sm transition-all duration-300 hover:border-foreground/20 hover:bg-card/40"
              >
                <p className="text-sm sm:text-base md:text-lg font-light tracking-wide text-foreground/80 leading-relaxed">
                  {curiosity}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Personal Projects Section with Horizontal Carousel */}
        <section
          ref={(el) => {
            sectionsRef.current[2] = el;
          }}
          className="section-fade min-h-[60vh] flex flex-col items-center justify-center py-16 sm:py-20 md:py-24"
        >
          <h3 className="text-2xl sm:text-3xl md:text-4xl font-light tracking-wide text-foreground mb-4 sm:mb-6">
            Personal Projects & Experiments
          </h3>
          <p className="text-sm sm:text-base md:text-lg font-light tracking-wide text-foreground/60 mb-3 sm:mb-4">
            Built from curiosity, not requirements.
          </p>
          
          {/* Swipe Cue */}
          <div className="mb-8 sm:mb-10">
            <p className="text-xs sm:text-sm font-light tracking-wider text-foreground/40">
              Swipe to explore
            </p>
          </div>

          {/* Horizontal Scrollable Carousel with hint animation */}
          <div className="w-full overflow-x-auto overflow-y-hidden scrollbar-hide -mx-6 sm:-mx-12 md:-mx-16 lg:-mx-24 px-6 sm:px-12 md:px-16 lg:px-24">
            <div ref={carouselRef} className="flex gap-6 sm:gap-8 pb-4 carousel-hint-container">
              {projects.map((project, index) => (
                <ProjectCard
                  key={index}
                  title={project.title}
                  description={project.description}
                  thumbnail={project.thumbnail}
                  details={project.details}
                />
              ))}
            </div>
          </div>
        </section>

        {/* Personal Note Section */}
        <section
          ref={(el) => {
            sectionsRef.current[3] = el;
          }}
          className="section-fade min-h-[50vh] flex flex-col items-center justify-center py-16 sm:py-20 md:py-24 text-center"
        >
          <h3 className="text-2xl sm:text-3xl md:text-4xl font-light tracking-wide text-foreground mb-8 sm:mb-12">
            A Note
          </h3>
          <p className="max-w-3xl text-base sm:text-lg md:text-xl font-light tracking-wide text-foreground/70 leading-relaxed">
            I don&apos;t draw a hard line between work and curiosity. Most of my professional projects started as personal experiments. This space exists to capture the thinking before the outcome.
          </p>
        </section>

        {/* Personal Beliefs & Interests - Expandable Section */}
        <section
          ref={(el) => {
            sectionsRef.current[4] = el;
          }}
          className="section-fade flex flex-col items-center justify-center py-12 sm:py-16 md:py-20 pb-24 sm:pb-32 md:pb-40"
        >
          {/* Expandable Section Trigger Button */}
          <button
            onClick={toggleBeliefsSection}
            className="beliefs-trigger-button flex items-center gap-2 px-5 py-2.5 rounded-lg border border-foreground/10 bg-background/10 backdrop-blur-sm text-xs sm:text-sm font-light tracking-wider text-foreground/50 transition-all duration-500 hover:border-foreground/20 hover:bg-background/20 hover:text-foreground/70 mb-8"
          >
            {isBeliefsSectionExpanded ? (
              <>
                <ChevronUp className="h-3.5 w-3.5" />
                Close
              </>
            ) : (
              <>
                Know me beyond work
                <ChevronDown className="h-3.5 w-3.5" />
              </>
            )}
          </button>

          {/* Expandable Content */}
          <div
            className={`beliefs-expandable-content overflow-hidden transition-all duration-500 ease-out ${
              isBeliefsSectionExpanded ? 'beliefs-expanded' : 'beliefs-collapsed'
            }`}
          >
            <div className="beliefs-content-inner max-w-3xl w-full px-4 sm:px-6 md:px-8">
              {/* Header */}
              <h3 className="text-xl sm:text-2xl md:text-3xl font-light tracking-wide text-foreground/80 mb-10 sm:mb-12 md:mb-16 text-center">
                Personal Beliefs & Interests
              </h3>

              {/* Subsections */}
              <div className="space-y-8 sm:space-y-10 md:space-y-12">
                {/* Religious / Philosophical view */}
                <div className="beliefs-subsection">
                  <h4 className="text-sm sm:text-base font-light tracking-wider text-foreground/60 mb-3 sm:mb-4 uppercase">
                    Religious / Philosophical view
                  </h4>
                  <p className="text-sm sm:text-base font-light tracking-wide text-foreground/70 leading-relaxed">
                    I consider myself an atheist, but I deeply love Buddhist philosophy. In general, I value philosophy over organized religion. I often listen to and feel inspired by Osho, Javed Akhtar, Varun Grover, J. Krishnamurthy, and Acharya Prashant.
                  </p>
                </div>

                {/* Political inclination */}
                <div className="beliefs-subsection">
                  <h4 className="text-sm sm:text-base font-light tracking-wider text-foreground/60 mb-3 sm:mb-4 uppercase">
                    Political inclination
                  </h4>
                  <p className="text-sm sm:text-base font-light tracking-wide text-foreground/70 leading-relaxed">
                    I don&apos;t associate myself strictly with the right or left wing. I consider myself liberal and admire political movements that emphasize education, rational thinking, and governance—which is why I resonate most with the Aam Aadmi Party.
                  </p>
                </div>

                {/* Musical taste */}
                <div className="beliefs-subsection">
                  <h4 className="text-sm sm:text-base font-light tracking-wider text-foreground/60 mb-3 sm:mb-4 uppercase">
                    Musical taste
                  </h4>
                  <p className="text-sm sm:text-base font-light tracking-wide text-foreground/70 leading-relaxed">
                    I love indie music. Favorite bands/artists include: When Chai Met Toast, The Local Train, Indian Ocean, Mitraz. I also deeply enjoy Pakistani music, especially Nusrat Fateh Ali Khan, Ghulam Ali Khan, and Atif Aslam. My favorite singer overall is Arijit Singh.
                  </p>
                </div>

                {/* Book taste */}
                <div className="beliefs-subsection">
                  <h4 className="text-sm sm:text-base font-light tracking-wider text-foreground/60 mb-3 sm:mb-4 uppercase">
                    Book taste
                  </h4>
                  <p className="text-sm sm:text-base font-light tracking-wide text-foreground/70 leading-relaxed">
                    I&apos;m drawn to books on investing, self-improvement, philosophy, economics, and history. Currently reading: <em>The Bitcoin Standard</em>, <em>The Gold Standard</em>.
                  </p>
                </div>

                {/* Other interests */}
                <div className="beliefs-subsection">
                  <h4 className="text-sm sm:text-base font-light tracking-wider text-foreground/60 mb-3 sm:mb-4 uppercase">
                    Other interests
                  </h4>
                  <p className="text-sm sm:text-base font-light tracking-wide text-foreground/70 leading-relaxed">
                    I love traveling, cinematography, and vibe coding. I have a deep interest in ICP Blockchain, Caffeine AI, Web3, artificial intelligence, personal finance & investing, and the metaverse.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
