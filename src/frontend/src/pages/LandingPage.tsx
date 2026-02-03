import { useState, useRef, useEffect } from 'react';
import { SiLinkedin, SiGithub, SiX, SiYoutube, SiInstagram } from 'react-icons/si';
import { Mail } from 'lucide-react';
import PersonalModeContent from '../components/PersonalModeContent';
import ProfessionalModeContent from '../components/ProfessionalModeContent';
import InteractiveBackground from '../components/InteractiveBackground';

type Mode = 'initial' | 'personal' | 'professional';

interface LandingPageProps {
  mode: Mode;
  onModeChange: (mode: Mode) => void;
}

export default function LandingPage({ mode, onModeChange }: LandingPageProps) {
  const [hoveredMode, setHoveredMode] = useState<'personal' | 'professional' | null>(null);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [tappedMode, setTappedMode] = useState<'personal' | 'professional' | null>(null);
  const [showContent, setShowContent] = useState(false);
  const [isFadingOut, setIsFadingOut] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);
  const [backgroundLoaded, setBackgroundLoaded] = useState(false);
  const [profilePictureState, setProfilePictureState] = useState<'center' | 'personal' | 'professional'>('center');
  const [showProfilePicture, setShowProfilePicture] = useState(false);
  const [isInitialLoad, setIsInitialLoad] = useState(true);
  const [isReturningToLanding, setIsReturningToLanding] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const personalButtonRef = useRef<HTMLButtonElement>(null);
  const professionalButtonRef = useRef<HTMLButtonElement>(null);

  // Initialize audio element
  useEffect(() => {
    audioRef.current = new Audio('/assets/tap-sound.mp3');
    audioRef.current.volume = 0.3; // Subtle volume
    
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
    };
  }, []);

  // Preload background image on mount
  useEffect(() => {
    const bgImg = new Image();
    bgImg.src = '/assets/Cover-2.jpg';
    bgImg.onload = () => {
      setBackgroundLoaded(true);
    };
    bgImg.onerror = () => {
      // If image fails to load, still show the background
      setBackgroundLoaded(true);
    };
  }, []);

  // Preload profile image on mount
  useEffect(() => {
    const img = new Image();
    img.src = '/assets/my_dp.jpg';
    img.onload = () => {
      setImageLoaded(true);
    };
    img.onerror = () => {
      // If image fails to load, still show the section
      setImageLoaded(true);
    };
  }, []);

  // Handle profile picture delayed fade-in ONLY on initial page load
  useEffect(() => {
    if (mode === 'initial' && imageLoaded && isInitialLoad) {
      // 500ms delay before showing profile picture on initial load only
      const timer = setTimeout(() => {
        setShowProfilePicture(true);
      }, 500);
      
      return () => clearTimeout(timer);
    } else if (mode === 'initial' && !isInitialLoad) {
      // When returning to landing (not initial load), show immediately for motion transition
      setShowProfilePicture(true);
    } else if (mode !== 'initial') {
      // When entering a mode, show profile picture immediately for transitions
      setShowProfilePicture(true);
    }
  }, [mode, imageLoaded, isInitialLoad]);

  // Track when user leaves initial state for the first time
  useEffect(() => {
    if (mode !== 'initial' && isInitialLoad) {
      setIsInitialLoad(false);
    }
  }, [mode, isInitialLoad]);

  // Handle content visibility with 30ms delay
  useEffect(() => {
    if (mode !== 'initial' && !isFadingOut) {
      // Delay content display by 30ms to allow Name & Role transition to play smoothly
      const contentTimer = setTimeout(() => {
        setShowContent(true);
      }, 30);
      
      return () => clearTimeout(contentTimer);
    } else if (mode === 'initial') {
      // Reset content visibility when returning to initial state
      setShowContent(false);
      setIsFadingOut(false);
    }
  }, [mode, isFadingOut]);

  // Sync profile picture state with mode - with smooth return transition
  useEffect(() => {
    if (mode === 'initial') {
      // When returning to landing, smoothly transition back to center
      if (isReturningToLanding) {
        // Small delay to ensure button position is captured before transition
        const timer = setTimeout(() => {
          setProfilePictureState('center');
        }, 50);
        return () => clearTimeout(timer);
      } else {
        setProfilePictureState('center');
      }
    } else if (mode === 'personal') {
      setProfilePictureState('personal');
    } else if (mode === 'professional') {
      setProfilePictureState('professional');
    }
  }, [mode, isReturningToLanding]);

  // Reset returning state after transition completes
  useEffect(() => {
    if (isReturningToLanding && profilePictureState === 'center') {
      const timer = setTimeout(() => {
        setIsReturningToLanding(false);
      }, 500);
      return () => clearTimeout(timer);
    }
  }, [isReturningToLanding, profilePictureState]);

  const playFeedback = () => {
    // Play audio feedback
    if (audioRef.current) {
      audioRef.current.currentTime = 0; // Reset to start
      audioRef.current.play().catch(err => {
        // Silently handle if audio playback is blocked
        console.debug('Audio playback prevented:', err);
      });
    }

    // Trigger haptic feedback for mobile devices
    if ('vibrate' in navigator) {
      try {
        navigator.vibrate(50); // Gentle 50ms vibration
      } catch (err) {
        // Silently handle if vibration is not supported
        console.debug('Vibration not supported:', err);
      }
    }
  };

  const handleModeSelect = (selectedMode: 'personal' | 'professional') => {
    // Trigger micro-motion effect
    setTappedMode(selectedMode);
    setTimeout(() => setTappedMode(null), 400);

    // Play audio and haptic feedback
    playFeedback();

    if (mode !== 'initial') {
      // Already in a mode, need to fade out current content first
      setIsFadingOut(true);
      
      // Wait for fade-out to complete, then hide content and change mode
      setTimeout(() => {
        setShowContent(false);
        setIsFadingOut(false);
        onModeChange(selectedMode);
      }, 500);
      return;
    }

    // Coming from initial state
    setIsTransitioning(true);
    setTimeout(() => {
      onModeChange(selectedMode);
      setIsTransitioning(false);
    }, 500);
  };

  const handleReturnHome = () => {
    if (mode === 'initial') return;
    
    setIsReturningToLanding(true);
    setIsFadingOut(true);
    setIsTransitioning(true);
    setTimeout(() => {
      setShowContent(false);
      setIsFadingOut(false);
      onModeChange('initial');
      setIsTransitioning(false);
    }, 500);
  };

  const getSocialIcons = () => {
    if (mode === 'professional') {
      return [
        { Icon: SiLinkedin, href: 'https://www.linkedin.com/in/prabhatchhirolya', label: 'LinkedIn', type: 'brand' as const },
        { Icon: SiGithub, href: 'https://github.com/arprabhatchhirolya', label: 'GitHub', type: 'brand' as const },
        { Icon: SiX, href: 'https://x.com/_The_PC__', label: 'X', type: 'brand' as const },
        { Icon: SiYoutube, href: 'https://youtube.com/prabhatchhirolya', label: 'YouTube', type: 'brand' as const },
        { Icon: Mail, href: 'mailto:ar.prabhatchhirolya@gmail.com', label: 'Email', type: 'ui' as const },
      ];
    } else if (mode === 'personal') {
      return [
        { Icon: SiInstagram, href: 'https://www.instagram.com/prabhatchhirolya.x?igsh=YmpnYWFlbnBtaDly', label: 'Instagram', type: 'brand' as const },
        { Icon: SiX, href: 'https://x.com/_The_PC__', label: 'X', type: 'brand' as const },
        { Icon: SiYoutube, href: 'https://youtube.com/prabhatchhirolya', label: 'YouTube', type: 'brand' as const },
        { Icon: Mail, href: 'mailto:ar.prabhatchhirolya@gmail.com', label: 'Email', type: 'ui' as const },
      ];
    }
    return [
      { Icon: SiLinkedin, href: 'https://www.linkedin.com/in/prabhatchhirolya', label: 'LinkedIn', type: 'brand' as const },
      { Icon: SiGithub, href: 'https://github.com/arprabhatchhirolya', label: 'GitHub', type: 'brand' as const },
      { Icon: SiX, href: 'https://x.com/_The_PC__', label: 'X', type: 'brand' as const },
      { Icon: SiYoutube, href: 'https://youtube.com/prabhatchhirolya', label: 'YouTube', type: 'brand' as const },
      { Icon: SiInstagram, href: 'https://www.instagram.com/prabhatchhirolya.x?igsh=YmpnYWFlbnBtaDly', label: 'Instagram', type: 'brand' as const },
      { Icon: Mail, href: 'mailto:ar.prabhatchhirolya@gmail.com', label: 'Email', type: 'ui' as const },
    ];
  };

  const backgroundShift = hoveredMode === 'personal' ? -2 : hoveredMode === 'professional' ? 2 : 0;

  // Calculate profile picture position and size based on state
  const getProfilePictureTransform = () => {
    if (profilePictureState === 'center') {
      return {
        transform: 'translate(-50%, -50%) scale(1)',
        left: '50%',
        top: 'calc(50% - 4rem)',
        width: '7rem',
        height: '7rem',
        opacity: 1,
      };
    }

    // Get button position for morphing effect
    const buttonRef = profilePictureState === 'personal' ? personalButtonRef : professionalButtonRef;
    if (!buttonRef.current) {
      return {
        transform: 'translate(-50%, -50%) scale(0.4)',
        left: '50%',
        top: '3rem',
        width: '3rem',
        height: '3rem',
        opacity: 0.3,
      };
    }

    const buttonRect = buttonRef.current.getBoundingClientRect();
    const buttonCenterX = buttonRect.left + buttonRect.width / 2;
    const buttonCenterY = buttonRect.top + buttonRect.height / 2;

    return {
      transform: 'translate(-50%, -50%) scale(1.2)',
      left: `${buttonCenterX}px`,
      top: `${buttonCenterY}px`,
      width: `${buttonRect.width}px`,
      height: `${buttonRect.height}px`,
      opacity: 0.3,
    };
  };

  const profileTransform = getProfilePictureTransform();

  // Determine if we should apply the delayed fade-in animation
  const shouldApplyDelayedFadeIn = mode === 'initial' && isInitialLoad && showProfilePicture;

  // Determine which profile picture to show: only ONE at a time
  const showStaticProfilePicture = mode === 'initial' && profilePictureState === 'center' && !isReturningToLanding;
  const showAnimatedProfilePicture = mode !== 'initial' || isReturningToLanding;

  return (
    <div className="relative h-full w-full">
      {/* Background Image with Fade-in on Initial Load */}
      <div
        className={`absolute inset-0 transition-all duration-500 ${
          mode !== 'initial' ? 'opacity-0 scale-105' : backgroundLoaded ? 'background-fade-in' : 'opacity-0'
        }`}
        style={{
          transform: `translateX(${backgroundShift}%)`,
          backgroundImage: 'url(/assets/Cover-2.jpg)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          backgroundAttachment: 'fixed',
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-background/60 via-background/40 to-background/80" />
      </div>

      {/* Interactive Background System - Only visible on landing page */}
      <InteractiveBackground isVisible={mode === 'initial'} />

      {/* Mode Selectors - Top */}
      <div className="absolute top-0 left-0 right-0 z-20 flex items-center justify-center gap-12 sm:gap-20 md:gap-28 lg:gap-36 pt-6 sm:pt-8 md:pt-12 px-4">
        <button
          ref={personalButtonRef}
          onClick={() => handleModeSelect('personal')}
          onMouseEnter={() => setHoveredMode('personal')}
          onMouseLeave={() => setHoveredMode(null)}
          className={`mode-selector text-xl sm:text-2xl md:text-3xl lg:text-4xl tracking-wider transition-all duration-500 ${
            mode === 'personal'
              ? 'mode-selector-active text-accent-bright opacity-100'
              : hoveredMode === 'personal'
              ? 'text-foreground/90 opacity-100 font-light'
              : mode === 'professional'
              ? 'text-foreground/30 opacity-50 font-light'
              : 'text-foreground/60 opacity-80 font-light'
          } ${
            tappedMode === 'personal' ? 'mode-selector-tap' : ''
          }`}
        >
          PERSONAL
        </button>
        <button
          ref={professionalButtonRef}
          onClick={() => handleModeSelect('professional')}
          onMouseEnter={() => setHoveredMode('professional')}
          onMouseLeave={() => setHoveredMode(null)}
          className={`mode-selector text-xl sm:text-2xl md:text-3xl lg:text-4xl tracking-wider transition-all duration-500 ${
            mode === 'professional'
              ? 'mode-selector-active text-accent-bright opacity-100'
              : hoveredMode === 'professional'
              ? 'text-foreground/90 opacity-100 font-light'
              : mode === 'personal'
              ? 'text-foreground/30 opacity-50 font-light'
              : 'text-foreground/60 opacity-80 font-light'
          } ${
            tappedMode === 'professional' ? 'mode-selector-tap' : ''
          }`}
        >
          PROFESSIONAL
        </button>
      </div>

      {/* Unified Identity Group - Profile Picture + Text as Single Responsive Unit */}
      <div 
        className={`absolute inset-0 z-10 flex items-center justify-center pointer-events-none ${
          mode === 'initial' && !imageLoaded ? 'opacity-0' : 'identity-group-fade-in'
        }`}
      >
        <div
          className={`identity-group-container flex flex-col items-center pointer-events-auto ${
            mode === 'initial' ? 'identity-group-center' : 'identity-group-mode'
          }`}
        >
          {/* Static Profile Picture - Only visible when on landing page and not transitioning */}
          {showStaticProfilePicture && (
            <div
              className={`relative transition-all duration-500 ${
                !imageLoaded || !showProfilePicture ? 'opacity-0' : shouldApplyDelayedFadeIn ? 'profile-picture-delayed-fade-in' : ''
              }`}
              style={{ 
                width: '7rem',
                height: '7rem',
              }}
            >
              <div className="profile-picture-border-wrapper w-full h-full rounded-full">
                <div className="w-full h-full overflow-hidden rounded-full">
                  <img
                    src="/assets/my_dp.jpg"
                    alt="Prabhat Chhirolya"
                    className="h-full w-full object-cover"
                  />
                </div>
              </div>
            </div>
          )}

          {/* Text Content - Part of Unified Group */}
          <div className={`flex flex-col px-4 items-center text-center ${
            mode === 'initial' ? 'gap-3 sm:gap-4' : 'gap-2 sm:gap-3'
          }`}>
            <p className={`text-sm sm:text-base md:text-lg font-light tracking-wide text-foreground/70 transition-opacity duration-500 ${mode !== 'initial' ? 'opacity-0 h-0 overflow-hidden' : 'opacity-100'}`}>
              Hey I'm…
            </p>
            <h1 
              onClick={handleReturnHome}
              className={`name-with-underline text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extralight tracking-wide text-foreground transition-all duration-300 ${
                mode !== 'initial' ? 'cursor-pointer hover:text-accent-bright' : ''
              }`}
            >
              Prabhat Chhirolya
            </h1>
            <p className="max-w-2xl text-xs sm:text-sm md:text-base lg:text-lg font-light tracking-wide text-foreground/80">
              XR Designer • Immersive Visualiser • BIM/VDC Architect • AI-Native Builder
            </p>
          </div>
        </div>
      </div>

      {/* Animated Profile Picture - Single element for all transitions - Always Circular */}
      {showAnimatedProfilePicture && (
        <div
          className={`fixed z-30 pointer-events-none rounded-full ${
            !imageLoaded || !showProfilePicture ? 'opacity-0' : ''
          }`}
          style={{
            left: profileTransform.left,
            top: profileTransform.top,
            width: profileTransform.width,
            height: profileTransform.height,
            transform: profileTransform.transform,
            opacity: showProfilePicture ? profileTransform.opacity : 0,
            transition: 'all 0.5s cubic-bezier(0.4, 0, 0.2, 1)',
          }}
        >
          <div className="profile-picture-border-wrapper w-full h-full rounded-full">
            <div className="w-full h-full overflow-hidden rounded-full">
              <img
                src="/assets/my_dp.jpg"
                alt="Prabhat Chhirolya"
                className="h-full w-full object-cover"
              />
            </div>
          </div>
        </div>
      )}

      {/* Mode Content Area - Constrained between header and footer with 30ms delay */}
      {mode === 'personal' && showContent && (
        <PersonalModeContent isFadingOut={isFadingOut} />
      )}

      {mode === 'professional' && showContent && (
        <ProfessionalModeContent isFadingOut={isFadingOut} />
      )}

      {/* Footer */}
      <footer className="absolute bottom-0 left-0 right-0 z-20 px-4 sm:px-8 md:px-12 py-4 sm:py-6 md:py-8">
        <div className="flex items-center justify-between gap-4">
          {/* Left: Text content */}
          <div className="flex flex-col gap-0.5 justify-center">
            <p className="text-sm sm:text-base md:text-lg font-bold tracking-wide footer-glow-text">
              I'd love to meet you :)
            </p>
            <p className="text-xs sm:text-sm md:text-base font-light tracking-wide text-foreground/70">
              Mumbai, India
            </p>
          </div>

          {/* Right: Social icons */}
          <div className="flex items-center gap-3 sm:gap-4 md:gap-5">
            {getSocialIcons().map(({ Icon, href, label, type }) => (
              <a
                key={label}
                href={href}
                target={type === 'brand' ? '_blank' : undefined}
                rel={type === 'brand' ? 'noopener noreferrer' : undefined}
                className="text-foreground/60 transition-all duration-300 hover:text-accent-bright hover:scale-110"
                aria-label={label}
              >
                <Icon className="h-5 w-5 sm:h-6 sm:w-6" />
              </a>
            ))}
          </div>
        </div>
      </footer>
    </div>
  );
}
