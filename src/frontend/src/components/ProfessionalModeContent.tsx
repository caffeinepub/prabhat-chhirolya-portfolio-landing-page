import { useEffect, useRef, useState } from 'react';
import { Download, ArrowRight, Briefcase, ChevronDown } from 'lucide-react';
import ProjectCard from './ProjectCard';

interface ProfessionalModeContentProps {
  isFadingOut?: boolean;
}

export default function ProfessionalModeContent({ isFadingOut = false }: ProfessionalModeContentProps) {
  const [scrolled, setScrolled] = useState(false);
  const [showScrollCue, setShowScrollCue] = useState(true);
  const [activeRole, setActiveRole] = useState<number | null>(null);
  const [expandedEcosystem, setExpandedEcosystem] = useState<number | null>(null);
  const [hoveredTool, setHoveredTool] = useState<string | null>(null);
  const [isBackgroundLoaded, setIsBackgroundLoaded] = useState(false);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const sectionsRef = useRef<(HTMLElement | null)[]>([]);
  const carouselRefs = useRef<(HTMLDivElement | null)[]>([]);
  const timelineItemsRef = useRef<(HTMLDivElement | null)[]>([]);
  const workExperienceItemsRef = useRef<(HTMLDivElement | null)[]>([]);
  const ecosystemItemsRef = useRef<(HTMLDivElement | null)[]>([]);
  const toolItemsRef = useRef<(HTMLDivElement | null)[]>([]);

  // Preload background image
  useEffect(() => {
    const img = new Image();
    img.src = '/assets/generated/professional-mode-background.dim_1920x1080.jpg';
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

      // Animate timeline items sequentially
      timelineItemsRef.current.forEach((item, index) => {
        if (!item) return;
        const rect = item.getBoundingClientRect();
        const windowHeight = window.innerHeight;
        
        if (rect.top < windowHeight * 0.75) {
          setTimeout(() => {
            item.classList.add('timeline-item-visible');
          }, index * 150);
        }
      });

      // Animate work experience items sequentially
      workExperienceItemsRef.current.forEach((item, index) => {
        if (!item) return;
        const rect = item.getBoundingClientRect();
        const windowHeight = window.innerHeight;
        
        if (rect.top < windowHeight * 0.75) {
          setTimeout(() => {
            item.classList.add('work-experience-item-visible');
          }, index * 200);
        }
      });

      // Animate ecosystem items sequentially
      ecosystemItemsRef.current.forEach((item, index) => {
        if (!item) return;
        const rect = item.getBoundingClientRect();
        const windowHeight = window.innerHeight;
        
        if (rect.top < windowHeight * 0.75) {
          setTimeout(() => {
            item.classList.add('ecosystem-item-visible');
          }, index * 100);
        }
      });

      // Animate tool items sequentially
      toolItemsRef.current.forEach((item, index) => {
        if (!item) return;
        const rect = item.getBoundingClientRect();
        const windowHeight = window.innerHeight;
        
        if (rect.top < windowHeight * 0.75) {
          setTimeout(() => {
            item.classList.add('tool-item-visible');
          }, index * 40);
        }
      });
    };

    container.addEventListener('scroll', handleScroll);
    handleScroll();
    
    return () => container.removeEventListener('scroll', handleScroll);
  }, [scrolled]);

  const workPhilosophy = [
    {
      title: 'Building Before Knowing',
      description: 'I start with prototypes and experiments rather than extensive planning. The best solutions emerge through iteration and direct engagement with the problem space.',
    },
    {
      title: 'Systems Over Tools',
      description: 'I focus on creating workflows and frameworks that scale beyond individual projects. Tools are temporary; good systems adapt and evolve.',
    },
    {
      title: 'Experience as a Decision Tool',
      description: 'Every design choice should be tested through user experience. I use immersive visualization and spatial interfaces to make complex decisions more intuitive.',
    },
    {
      title: 'Future-Oriented by Default',
      description: "I design for emerging technologies and evolving workflows. Today's solutions should anticipate tomorrow's capabilities and constraints.",
    },
  ];

  const timeline = [
    {
      period: '2012–2014',
      years: '2 years',
      title: 'Foundation',
      subtitle: 'Science + Math (10+2)',
      text: 'Built strong analytical thinking and structured problem-solving skills—this is the base of my technical mindset.',
      vectorBg: '/assets/generated/foundation-math-vectors.dim_800x400.png',
      animationClass: 'timeline-bg-foundation',
    },
    {
      period: '2014–2019',
      years: '5 years',
      title: 'Academic',
      subtitle: 'Architecture – NIT Bhopal',
      text: 'Developed spatial reasoning, concept design, and user-centric thinking during my B.Arch journey.',
      vectorBg: '/assets/generated/academic-architecture-vectors.dim_800x400.png',
      animationClass: 'timeline-bg-academic',
    },
    {
      period: '2019–2020',
      years: '1 year',
      title: 'Transition',
      subtitle: 'Intern → VDC Proposal Architect – vConstruct',
      text: 'Entered real-world delivery: proposal modeling, architectural packages, and bridging creativity with execution.',
      vectorBg: '/assets/generated/transition-bridge-vectors.dim_800x400.png',
      animationClass: 'timeline-bg-transition',
    },
    {
      period: '2020–2023',
      years: '3 years',
      title: 'Core Career',
      subtitle: 'BIM & VDC – DPR / vConstruct',
      text: 'Deepened expertise in Revit workflows, multi-disciplinary coordination, and client communication.',
      vectorBg: '/assets/generated/bim-wireframe-vectors.dim_800x400.png',
      animationClass: 'timeline-bg-core',
    },
    {
      period: '2023–2025',
      years: '2 years',
      title: 'Specialization',
      subtitle: 'XR & Immersive Visualization – Jacobs',
      text: 'Lead immersive storytelling through VR/AR experiences using Unreal, Enscape, and Twinmotion for AECO projects.',
      vectorBg: '/assets/generated/xr-immersive-vectors.dim_800x400.png',
      animationClass: 'timeline-bg-specialization',
    },
    {
      period: '2026+',
      years: 'Future',
      title: 'Future Tech',
      subtitle: 'Omniverse, USD, Generative AI',
      text: 'Moving toward AI-assisted visualization, USD pipelines, and Omniverse to build a unified, future-ready AECO ecosystem.',
      vectorBg: '/assets/generated/ai-future-vectors.dim_800x400.png',
      animationClass: 'timeline-bg-future',
    },
  ];

  const capabilities = [
    'Design immersive XR experiences that make complex architectural data intuitive and actionable',
    'Build BIM/VDC workflows that bridge design intent with construction reality',
    'Create AI-augmented tools that accelerate design iteration and decision-making',
    'Develop spatial interfaces that transform how teams collaborate on complex projects',
    'Prototype emerging technology solutions before they become industry standard',
    'Translate technical complexity into clear, compelling visual narratives',
  ];

  const workExperience = [
    {
      company: 'Jacobs',
      logo: '/assets/jacobs.png',
      period: '2022 – Present',
      years: '3 years, 10 months',
      roles: [
        {
          title: 'Sr. XR Designer & Immersive Visualizer – AECO',
          timeline: '01/2026 - Present ~ 3 mos',
          level: 5,
          responsibilities: [
            'Lead the integration of XR workflows into enterprise BIM processes in collaboration with multidisciplinary global teams.',
            'Deliver advanced immersive visualization, XR, 4D, and Digital Twin solutions across multiple regions and project typologies.',
            'Design and manage scalable pipelines for multi-source 3D and geospatial data integration.',
            'Drive innovation through real-world implementation of emerging technologies including neural rendering, Omniverse USD, OpenUSD, WebXR, Gaussian splatting, and AI-powered workflows while strengthening internal XR capability and knowledge sharing.',
          ],
          achievements: [
            'Led and delivered 15+ XR, advanced visualization, 4D, and Digital Twin projects while managing a cross-functional team of six specialists.',
            'Conducted 10+ VR demonstration sessions for senior leadership and clients, strengthening confidence in immersive visualization as a decision-making tool.',
            'Implemented collaborative Omniverse workflows and integrated the D5 Rendering Engine into advanced XR pipelines, significantly enhancing visual quality and technical capability.',
          ],
        },
        {
          title: 'Associate XR Designer & Immersive Visualizer',
          timeline: '01/2025 - 01/2026 ~ 12 mos',
          level: 4,
          responsibilities: [
            'Took on expanded leadership and mentorship responsibilities, supporting skill development within the XR and visualization team.',
            'Led immersive storytelling through VR and AR experiences using Unreal Engine, Enscape, and Twinmotion for AECO projects.',
            'Developed interactive visualization solutions to support complex infrastructure design reviews and stakeholder engagement.',
            'Built and optimized real-time rendering pipelines for large-scale architectural and infrastructure projects.',
          ],
          achievements: [
            'Successfully delivered 20+ XR, visualization, and 4D projects with 100% on-time, high-quality outcomes.',
            'Received consistent commendations from multiple project stakeholders for producing client-ready, impactful deliverables.',
            'Reduced design review cycles by approximately 30% through the adoption of VR-based coordination workflows and established XR design standards adopted across regional offices.',
          ],
        },
        {
          title: 'XR Designer & Advanced 3D Visualizer',
          timeline: '07/2022 - 01/2025 ~ 2 yrs, 7 mos',
          level: 3,
          responsibilities: [
            'Delivered immersive VR and AR experiences that translated complex design intent into engaging visual narratives.',
            'Developed interactive visualization solutions to support infrastructure and architectural design reviews.',
            'Collaborated with architects, engineers, and BIM teams to integrate XR workflows into live project environments.',
            'Created real-time rendering pipelines to support large-scale, performance-driven visualization requirements.',
          ],
          achievements: [
            'Delivered 12+ immersive project presentations, achieving 95% stakeholder approval ratings.',
            'Reduced design review cycles by approximately 30% through VR-enabled coordination and visualization.',
            'Contributed to the development of XR design standards later adopted across regional teams.',
          ],
        },
      ],
    },
    {
      company: 'vConstruct Private Limited / DPR',
      logo: '/assets/dpr.png',
      period: '2019 – 2022',
      years: '3 years, 2 months',
      roles: [
        {
          title: 'BIM Architect & XR Designer',
          timeline: '06/2020 - 07/2022 ~ 2 yrs, 2 mos',
          level: 2,
          responsibilities: [
            'Led VR-driven project delivery while working closely with XR teams and serving as the primary point of responsibility for immersive outputs.',
            'Managed multidisciplinary coordination, ensuring BIM models were optimized for XR, VR, and AR deliverables.',
            'Engaged directly with clients to present work, incorporate feedback, and provide regular project updates.',
            'Provided team leadership, training, and workflow development, streamlining BIM and XR processes to improve efficiency.',
          ],
          achievements: [
            'Successfully led and delivered 10+ major projects with consistently high-quality outputs.',
            'Developed strong XR capabilities within the AECO domain by adopting tools such as Unreal Engine and Unity.',
            'Implemented new advanced visualization and XR workflows that reduced delivery timelines by approximately 35%.',
          ],
        },
        {
          title: 'BIM Architect – VDC',
          timeline: '06/2019 - 05/2020 ~ 12 mos',
          level: 1,
          responsibilities: [
            'Supported proposal and delivery teams through architectural modeling using Revit and SketchUp, collaborating closely with senior architects.',
            'Produced high-quality renders and visualizations using Enscape and Twinmotion for client presentations and RFP submissions.',
            'Worked directly with the DPR US team and project managers to deliver RFP visuals, logistics planning, and construction phasing outputs.',
            'Developed 3D and 4D construction sequence visuals, flythroughs, walkthroughs, and custom 360-degree experiences bridging design and execution.',
          ],
          achievements: [
            'Delivered 20+ successful project proposals supporting winning bids.',
            'Recognized for strong design quality, visualization clarity, and technical attention to detail.',
            'Promoted to BIM Architect & XR Designer within 12 months based on performance and impact.',
          ],
        },
        {
          title: 'Intern – GET VDC',
          timeline: '12/2018 - 04/2019 ~ 5 mos',
          level: 0,
          responsibilities: [
            'Gained hands-on experience in real-world BIM and VDC project delivery through live project involvement.',
            'Supported proposal modeling and architectural package development under senior team guidance.',
            'Produced BIM and 3D models using Revit and SketchUp based on plans, elevations, and sections.',
            'Assisted with BIM coordination, standards compliance, and rendering using Enscape and Lumion.',
          ],
          achievements: [
            'Completed intensive training in Revit, BIM standards, and coordination workflows.',
            'Contributed to 10+ successful project deliveries during the internship period.',
            'Converted to a full-time VDC Proposal Architect role based on performance.',
          ],
        },
      ],
    },
  ];

  const workApproach = [
    'Research-driven: I start every project by understanding the problem space and user needs',
    'Performance-aware: Solutions must be technically sound and scalable for real-world use',
    'Cross-disciplinary: I bridge architecture, technology, and user experience design',
    'Clarity-focused: Complex systems should feel simple and intuitive to use',
  ];

  const toolCategories = [
    {
      category: 'BIM Modelling',
      tools: ['Revit', 'SketchUp', 'AutoCAD', 'BIM360 & ACC', '3ds Max'],
      color: 'oklch(0.72 0.14 200)',
    },
    {
      category: 'XR Viz',
      tools: ['Unity', 'Unreal Engine', 'WebXR', 'Enscape', 'D5 Render', 'Twinmotion', 'Workshop XR', 'Omniverse'],
      color: 'oklch(0.78 0.16 280)',
    },
    {
      category: 'Graphics & Video',
      tools: ['Adobe Creative Suite', 'Photoshop', 'Premiere Pro', 'After Effects', 'InDesign'],
      color: 'oklch(0.75 0.15 340)',
    },
    {
      category: 'UI/UX',
      tools: ['Figma', 'Adobe XD', 'Miro'],
      color: 'oklch(0.80 0.14 160)',
    },
    {
      category: 'Productivity',
      tools: ['Notion', 'Slack', 'Microsoft 365', 'Gen AI Tools'],
      color: 'oklch(0.76 0.13 120)',
    },
    {
      category: 'Generative AI',
      tools: ['Midjourney', 'Stable Diffusion', 'ComfyUI', 'Higgsfield', 'Gen AI Models – ChatGPT, Claude, Midjourney, Google AI Studio'],
      color: 'oklch(0.82 0.17 60)',
    },
    {
      category: 'Programming',
      tools: ['Python', 'OpenUSD', 'Vibe Coding'],
      color: 'oklch(0.70 0.15 240)',
    },
  ];

  const ecosystemFluency = [
    {
      category: 'BIM Design',
      items: [
        'Virtual Design & Construction',
        '4D Construction Sequence',
        'Arch BIM Modelling & Authoring',
        'Interdisciplinary coordination',
        'BIM 360 & ACC',
        'BIM Visualization',
        'Model Optimization',
        'Reality capture',
        'Handling DTM & Drone imagery',
        'RFP Proposal Modeling',
      ],
    },
    {
      category: 'XR Design',
      items: [
        'Omniverse CloudXR',
        'Browser based XR (WebXR, WebGL)',
        'Cloud Presenter',
        'Performance Optimization',
        'Adv, Core-Framework',
        'Interactive VR/AR Presentations',
      ],
    },
    {
      category: 'Visual Media',
      items: [
        'Creative Presentation',
        'UI/UX design',
        'Motion graphics and video editing',
        'Photoshop editing',
        'InDesign Reports',
      ],
    },
    {
      category: 'Immersive Viz',
      items: [
        'Immersive Storytelling',
        '3DGS (Gaussian Splatting)',
        'Real-Time Ray Tracing',
        'Construction Phasing & Logistics',
        '360 Rendered Tours',
        'Rendering Pipelines',
        'Material & Lighting Optimization',
        'Simulations',
      ],
    },
    {
      category: 'Digital Twin',
      items: [
        'Omniverse CloudXR',
        'Cesium',
        'BIM-to-Twin integration',
        'USD Based Data Workflows',
        'IoT-Ready Visualization',
      ],
    },
    {
      category: 'Architecture Design',
      items: [
        'Concept Design Development',
        'Design Thinking',
        'Visualization Proposal',
        'Architectural Modeling',
      ],
    },
    {
      category: 'Gen AI',
      items: [
        'Prompt Engineering',
        'Text to 3D model',
        'Video & Image Generation',
        'ComfyUI Workflow',
        'Open USD Code Generation',
        'Self Writhing Internet',
        'AI Integration',
      ],
    },
  ];

  const professionalProjects = [
    {
      title: 'Google Randall – VR & Advanced Visualisation',
      description: 'Ultra-realistic VR chalk walk and advanced visualization optimized for high-fidelity design review and executive walkthroughs',
      thumbnail: '/assets/GoogleRandalthumbnaill.jpg',
      details: {
        paragraphs: [
          'This project focused on delivering a high-fidelity VR chalk walk and advanced visualisation experience for Google. I coordinated with multiple BIM teams to secure and optimise the project model, ensuring high LOD accuracy through detailed grouping, layering, and model refinement.',
          'The workflow combined Revit, SketchUp, and Enscape, enhanced with 4K PBR textures, custom IES lighting based on real illumination data, and drone-captured 360° HDR surroundings. The final output delivered ultra-realistic rendering and a smooth VR experience optimized for HTC Vive, supporting immersive design reviews and executive-level walkthroughs.',
        ],
        youtubeUrl: 'https://youtu.be/Sjwes7IX0ns',
        role: 'Project Lead',
        tools: 'Revit, Sketchup, Enscape, Premierer Pro, Photoshop, HTC Vive VR headset',
        results: 'Elevated design reviews with ultra-realistic VR, enabling faster feedback cycles and clearer stakeholder consensus.',
      },
    },
    {
      title: 'University of Arizona, VIP Lounge- Adv Interactive VR',
      description: 'Fully interactive VR experience with advanced user interactions, realistic lighting, and immersive spatial storytelling',
      thumbnail: '/assets/UniversityofArizonthumbnaila.jpg',
      details: {
        paragraphs: [
          'This project involved developing a fully interactive VR experience for a VIP Lounge environment using Unreal Engine. I handled BIM model optimization, XR project setup, and advanced interaction design. Models prepared from Revit and SketchUp were enhanced with realistic lighting, PBR materials, and a 360° HDR backdrop to match real-world site conditions.',
          'A custom VR framework was implemented with motion controller mapping and rich interactions including teleportation, object manipulation, material swapping, physics-based actions, animations, and spatial audio. The experience was extensively tested on HTC Vive to ensure performance, realism, and intuitive interaction, delivering a highly immersive, client-ready VR solution.',
        ],
        youtubeUrl: 'https://youtu.be/EbOqIsLLMv8?si=-9Qj_0JRhocqJ8fW',
        role: 'Project Lead',
        tools: 'Revit, Sketchup, Unreal Engine, Advanced Core Framework, Meta Quest VR headset',
        results: 'Delivered an intuitive, high-immersion VR experience that improved spatial understanding and design confidence.',
      },
    },
    {
      title: 'Genesis R&D Center – Durham',
      description: 'Complete immersive visualization package combining cloud presentations, real-time rendering, and VR exploration.',
      thumbnail: '/assets/rndcentreGenesisthumbnailm.jpg',
      details: {
        paragraphs: [
          'For the Genesis R&D Center, I delivered a comprehensive immersive visualization package combining real-time rendering, VR, and cloud-based presentations. I managed BIM modeling, asset preparation, PBR texturing, lighting, and media setup using Revit, SketchUp, and Twinmotion.',
          'The project leveraged Twinmotion Cloud Presenter for remote stakeholder access, alongside VR experiences deployed on Meta Quest Pro and HTC Vive. My role covered end-to-end delivery, from model optimization to VR testing and deployment. The result was a flexible visualization ecosystem supporting design review, stakeholder engagement, and immersive exploration across multiple platforms.',
        ],
        youtubeUrl: 'https://youtu.be/ktL9OBo5_T8?si=ErphIltj_gevE_Gb',
        role: 'Project Lead',
        tools: 'Revit, Sketchup, Twinmotion & Web Presenter, Meta Quest VR headset',
        results: 'Expanded stakeholder access and engagement through cloud-based and VR visualization across multiple platforms.',
      },
    },
    {
      title: 'ASU CFL multiplayer collaborative VR',
      description: 'Realistic, cross-platform collaborative XR enabling multi-user VR and non-VR design review across devices.',
      thumbnail: '/assets/asu2.jpg',
      details: {
        paragraphs: [
          'This project involved designing and delivering a large-scale, multi-user, cross-platform collaborative XR experience for the ASU CFL Recreation Studio. I led the development of a shared virtual environment that supports both VR and non-VR users, enabling up to 100 participants to join a single session across VR headsets, desktop (Windows, macOS), and mobile devices (iOS and Android). The solution allows one user to host a session while others join via IP-based or network access, creating a fully synchronized collaborative space.',
          'Built using Revit, SketchUp, and Unreal Engine, the experience supports advanced interactions such as live annotations, measurements, explode and X-ray views, and real-time user presence awareness. I handled BIM model optimization, Unreal project setup, Blueprints, PBR texturing, lighting, cross-platform deployment, and extensive VR testing on HTC Vive, delivering a robust, client-ready collaborative XR system.',
        ],
        youtubeUrl: 'https://youtu.be/JVw1Rbhvh0s?si=8yxeY773RGuttHGA',
        role: 'Project Lead',
        tools: 'Revit, Sketchup, Unreal Engine, Meta Quest VR headset',
        results: 'Enabled real-time, multi-user collaboration and design validation across platforms, transforming how stakeholders review and interact just like team calls.',
      },
    },
  ];

  const handleDownloadCV = () => {
    console.log('Download CV clicked');
  };

  const getLevelColor = (level: number) => {
    const colors = [
      'oklch(0.60 0.10 200)',
      'oklch(0.68 0.12 190)',
      'oklch(0.74 0.14 180)',
      'oklch(0.80 0.15 170)',
      'oklch(0.85 0.16 160)',
      'oklch(0.88 0.17 150)',
    ];
    return colors[level] || colors[0];
  };

  const toggleEcosystem = (index: number) => {
    setExpandedEcosystem(expandedEcosystem === index ? null : index);
  };

  return (
    <div className={`personal-mode-content-container ${isFadingOut ? 'content-fade-out' : 'content-fade-in'}`}>
      <div
        ref={scrollContainerRef}
        className="h-full overflow-y-auto overflow-x-hidden scroll-smooth px-6 sm:px-12 md:px-16 lg:px-24"
      >
        {/* Entry Section with Background Image and Branded Dark Overlay */}
        <section className={`min-h-[70vh] flex flex-col items-center justify-center text-center relative professional-mode-entry-bg ${isBackgroundLoaded ? 'mode-bg-loaded' : ''}`}>
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-5xl font-extralight tracking-wide text-foreground mb-6 sm:mb-8 relative z-10">
            Professional Work
          </h2>
          <p className="max-w-3xl text-sm sm:text-base md:text-lg lg:text-xl font-light tracking-wide text-foreground/70 leading-relaxed mb-8 relative z-10">
            XR Designer & Immersive Visualiser working at the intersection of BIM/VDC, AECO, XR, and AI-driven workflows.
          </p>
          
          {/* Download CV Button with Gradient Glow */}
          <button
            onClick={handleDownloadCV}
            className="cta-button-glow flex items-center gap-2 px-6 py-3 rounded-lg border border-foreground/20 bg-background/30 backdrop-blur-sm text-sm sm:text-base font-light tracking-wide text-foreground/80 transition-all duration-300 hover:border-accent-bright/50 hover:bg-accent-bright/10 hover:text-accent-bright hover:scale-105 relative z-10"
          >
            <Download className="h-4 w-4" />
            Download CV (PDF)
          </button>
          
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

        {/* How I See My Work Section */}
        <section
          ref={(el) => {
            sectionsRef.current[0] = el;
          }}
          className="section-fade min-h-[60vh] flex flex-col items-center justify-center py-16 sm:py-20 md:py-24"
        >
          <h3 className="text-2xl sm:text-3xl md:text-4xl font-light tracking-wide text-foreground mb-12 sm:mb-16">
            How I See My Work
          </h3>
          
          <div className="w-full overflow-x-auto overflow-y-hidden scrollbar-hide -mx-6 sm:-mx-12 md:-mx-16 lg:-mx-24 px-6 sm:px-12 md:px-16 lg:px-24">
            <div ref={(el) => { carouselRefs.current[0] = el; }} className="flex gap-6 sm:gap-8 pb-4">
              {workPhilosophy.map((item, index) => (
                <div
                  key={index}
                  className="flex-shrink-0 w-[85vw] sm:w-[70vw] md:w-[55vw] lg:w-[45vw] max-w-2xl p-6 sm:p-8 rounded-lg border border-foreground/10 bg-card/30 backdrop-blur-sm transition-all duration-300 hover:border-foreground/20 hover:bg-card/40"
                >
                  <h4 className="text-lg sm:text-xl md:text-2xl font-light tracking-wide text-foreground mb-4 sm:mb-6">
                    {item.title}
                  </h4>
                  <p className="text-sm sm:text-base md:text-lg font-light tracking-wide text-foreground/70 leading-relaxed">
                    {item.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Creative Journey & Evolution Section with Animated Vector Backgrounds */}
        <section
          ref={(el) => {
            sectionsRef.current[1] = el;
          }}
          className="section-fade min-h-[80vh] flex flex-col items-center justify-center py-16 sm:py-20 md:py-24"
        >
          <h3 className="text-2xl sm:text-3xl md:text-4xl font-light tracking-wide text-foreground mb-12 sm:mb-16">
            Creative Journey & Evolution
          </h3>
          
          <div className="max-w-4xl w-full relative">
            <div className="absolute left-0 top-0 bottom-0 w-0.5 bg-gradient-to-b from-accent-bright/20 via-accent-bright/40 to-accent-bright/20 hidden sm:block" />
            
            <div className="space-y-12 sm:space-y-16">
              {timeline.map((stage, index) => (
                <div
                  key={index}
                  ref={(el) => {
                    timelineItemsRef.current[index] = el;
                  }}
                  className="timeline-item relative pl-0 sm:pl-12 transition-all duration-500"
                >
                  <div className="hidden sm:block absolute left-0 top-0 -translate-x-[3px] w-3 h-3 rounded-full bg-accent-bright border-2 border-background shadow-lg shadow-accent-bright/30 timeline-dot" />
                  <div className="hidden sm:block absolute left-0 top-3 w-8 h-px bg-accent-bright/50 timeline-connector" />
                  
                  <div className="group relative p-6 sm:p-8 rounded-lg border border-foreground/10 bg-card/20 backdrop-blur-sm transition-all duration-500 hover:border-accent-bright/30 hover:bg-card/30 hover:shadow-lg hover:shadow-accent-bright/5 overflow-hidden">
                    {/* Animated Vector Background */}
                    <div className={`absolute inset-0 opacity-20 ${stage.animationClass}`}>
                      <img
                        src={stage.vectorBg}
                        alt=""
                        className="w-full h-full object-cover"
                      />
                    </div>
                    
                    {/* Content Layer */}
                    <div className="relative z-10">
                      <div className="inline-block px-3 py-1 mb-4 rounded-full bg-accent-bright/10 border border-accent-bright/20">
                        <p className="text-xs sm:text-sm font-light tracking-wider text-accent-bright">
                          {stage.period}
                        </p>
                      </div>
                      
                      <div className="space-y-2 mb-4">
                        <h4 className="text-xl sm:text-2xl md:text-3xl font-light tracking-wide text-foreground group-hover:text-accent-bright transition-colors duration-300">
                          {stage.title}
                        </h4>
                        <p className="text-base sm:text-lg md:text-xl font-light tracking-wide text-foreground/70">
                          {stage.subtitle}
                        </p>
                      </div>
                      
                      <p className="text-sm sm:text-base font-light tracking-wide text-foreground/80 leading-relaxed">
                        {stage.text}
                      </p>
                    </div>
                    
                    {index < timeline.length - 1 && (
                      <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 opacity-30 group-hover:opacity-60 transition-opacity duration-300 z-10">
                        <svg
                          className="w-4 h-4 text-accent-bright"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M19 14l-7 7m0 0l-7-7m7 7V3"
                          />
                        </svg>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* What I Do Section */}
        <section
          ref={(el) => {
            sectionsRef.current[2] = el;
          }}
          className="section-fade min-h-[60vh] flex flex-col items-center justify-center py-16 sm:py-20 md:py-24"
        >
          <h3 className="text-2xl sm:text-3xl md:text-4xl font-light tracking-wide text-foreground mb-12 sm:mb-16">
            What I Do
          </h3>
          <div className="max-w-5xl w-full grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
            {capabilities.map((capability, index) => (
              <div
                key={index}
                className="p-6 sm:p-8 rounded-lg border border-foreground/10 bg-card/30 backdrop-blur-sm transition-all duration-300 hover:border-foreground/20 hover:bg-card/40"
              >
                <p className="text-sm sm:text-base md:text-lg font-light tracking-wide text-foreground/80 leading-relaxed">
                  {capability}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Work Experience Section - Interactive Visualization */}
        <section
          ref={(el) => {
            sectionsRef.current[3] = el;
          }}
          className="section-fade min-h-[80vh] flex flex-col items-center justify-center py-16 sm:py-20 md:py-24"
        >
          <h3 className="text-2xl sm:text-3xl md:text-4xl font-light tracking-wide text-foreground mb-12 sm:mb-16">
            Work Experience
          </h3>
          
          <div className="max-w-5xl w-full space-y-16 sm:space-y-20">
            {workExperience.map((company, companyIndex) => (
              <div
                key={companyIndex}
                ref={(el) => {
                  workExperienceItemsRef.current[companyIndex] = el;
                }}
                className="work-experience-item relative"
              >
                {/* Company Header */}
                <div className="flex items-center gap-4 sm:gap-6 mb-8 sm:mb-12">
                  <div className="flex-shrink-0 w-20 h-20 sm:w-24 sm:h-24 rounded-xl bg-card/50 backdrop-blur-sm border border-foreground/10 p-3 sm:p-4 flex items-center justify-center transition-all duration-300 hover:border-accent-bright/30 hover:shadow-lg hover:shadow-accent-bright/10 company-logo-container">
                    <img
                      src={company.logo}
                      alt={company.company}
                      className="w-full h-full object-contain"
                    />
                  </div>
                  <div className="flex-1">
                    <h4 className="text-2xl sm:text-3xl md:text-4xl font-light tracking-wide text-foreground mb-2">
                      {company.company}
                    </h4>
                    <p className="text-sm sm:text-base font-light tracking-wide text-foreground/60">
                      {company.period} ({company.years})
                    </p>
                  </div>
                </div>

                {/* Career Progression Visualization */}
                <div className="relative pl-0 sm:pl-8 md:pl-12">
                  {/* Vertical Progress Line */}
                  <div className="hidden sm:block absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-accent-bright/20 via-accent-bright/40 to-accent-bright/20 rounded-full" />
                  
                  <div className="space-y-8 sm:space-y-10">
                    {company.roles.map((role, roleIndex) => (
                      <div
                        key={roleIndex}
                        className="relative group cursor-pointer"
                        onMouseEnter={() => setActiveRole(companyIndex * 10 + roleIndex)}
                        onMouseLeave={() => setActiveRole(null)}
                        onClick={() => setActiveRole(activeRole === companyIndex * 10 + roleIndex ? null : companyIndex * 10 + roleIndex)}
                      >
                        {/* Role Level Indicator */}
                        <div 
                          className="hidden sm:flex absolute -left-8 md:-left-12 top-6 items-center justify-center w-6 h-6 rounded-full border-2 border-background transition-all duration-300 group-hover:scale-125"
                          style={{ 
                            backgroundColor: getLevelColor(role.level),
                            boxShadow: `0 0 20px ${getLevelColor(role.level)}40`
                          }}
                        >
                          <Briefcase className="w-3 h-3 text-background" />
                        </div>

                        {/* Promotion Arrow */}
                        {roleIndex < company.roles.length - 1 && (
                          <div className="hidden sm:block absolute -left-[26px] md:-left-[42px] top-16 text-accent-bright/60 transition-all duration-300 group-hover:text-accent-bright group-hover:translate-y-1">
                            <ArrowRight className="w-4 h-4 rotate-90" />
                          </div>
                        )}

                        {/* Role Card */}
                        <div 
                          className={`relative p-6 sm:p-8 rounded-xl border transition-all duration-500 ${
                            activeRole === companyIndex * 10 + roleIndex
                              ? 'border-accent-bright/40 bg-card/50 shadow-xl shadow-accent-bright/10'
                              : 'border-foreground/10 bg-card/30 hover:border-accent-bright/20 hover:bg-card/40'
                          } backdrop-blur-sm`}
                        >
                          {/* Role Header */}
                          <div className="flex items-start justify-between gap-4 mb-6">
                            <div className="flex-1">
                              <h5 className="text-lg sm:text-xl md:text-2xl font-light tracking-wide text-foreground mb-2 group-hover:text-accent-bright transition-colors duration-300">
                                {role.title}
                              </h5>
                              <p className="text-xs sm:text-sm font-light tracking-wide text-foreground/60">
                                {role.timeline}
                              </p>
                            </div>
                            
                            {/* Level Badge */}
                            <div 
                              className="flex-shrink-0 px-3 py-1 rounded-full text-xs font-light tracking-wider border"
                              style={{
                                backgroundColor: `${getLevelColor(role.level)}20`,
                                borderColor: `${getLevelColor(role.level)}40`,
                                color: getLevelColor(role.level)
                              }}
                            >
                              Level {role.level}
                            </div>
                          </div>

                          {/* Key Responsibilities */}
                          <div className="mb-6">
                            <h6 className="text-sm sm:text-base font-light tracking-wide text-foreground/80 mb-3">
                              Key Responsibilities
                            </h6>
                            <ul className="space-y-2">
                              {role.responsibilities.map((resp, respIndex) => (
                                <li key={respIndex} className="flex gap-2 text-xs sm:text-sm font-light tracking-wide text-foreground/70 leading-relaxed">
                                  <span className="text-accent-bright/60 flex-shrink-0 mt-1">•</span>
                                  <span>{resp}</span>
                                </li>
                              ))}
                            </ul>
                          </div>

                          {/* Key Achievements - Expandable */}
                          <div 
                            className={`overflow-hidden transition-all duration-500 ${
                              activeRole === companyIndex * 10 + roleIndex ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                            }`}
                          >
                            <div className="pt-4 border-t border-foreground/10">
                              <h6 className="text-sm sm:text-base font-light tracking-wide text-accent-bright/80 mb-3">
                                Key Achievements
                              </h6>
                              <ul className="space-y-2">
                                {role.achievements.map((achievement, achIndex) => (
                                  <li key={achIndex} className="flex gap-2 text-xs sm:text-sm font-light tracking-wide text-foreground/70 leading-relaxed">
                                    <span className="text-accent-bright flex-shrink-0 mt-1">✓</span>
                                    <span>{achievement}</span>
                                  </li>
                                ))}
                              </ul>
                            </div>
                          </div>

                          {/* Expand Indicator */}
                          <div className="mt-4 flex justify-center">
                            <div className={`text-xs font-light tracking-wider text-foreground/40 transition-all duration-300 ${
                              activeRole === companyIndex * 10 + roleIndex ? 'rotate-180' : ''
                            }`}>
                              {activeRole === companyIndex * 10 + roleIndex ? '▲' : '▼'}
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Selected Professional Projects Section */}
        <section
          ref={(el) => {
            sectionsRef.current[4] = el;
          }}
          className="section-fade min-h-[60vh] flex flex-col items-center justify-center py-16 sm:py-20 md:py-24"
        >
          <h3 className="text-2xl sm:text-3xl md:text-4xl font-light tracking-wide text-foreground mb-12 sm:mb-16">
            Selected Professional Projects
          </h3>
          
          <div className="w-full overflow-x-auto overflow-y-hidden scrollbar-hide -mx-6 sm:-mx-12 md:-mx-16 lg:-mx-24 px-6 sm:px-12 md:px-16 lg:px-24">
            <div ref={(el) => { carouselRefs.current[1] = el; }} className="flex gap-6 sm:gap-8 pb-4">
              {professionalProjects.map((project, index) => (
                <ProjectCard
                  key={index}
                  title={project.title}
                  description={project.description}
                  thumbnail={project.thumbnail}
                  details={{
                    paragraphs: project.details.paragraphs,
                    youtubeUrl: project.details.youtubeUrl,
                    role: project.details.role,
                    tools: project.details.tools,
                    results: project.details.results,
                  }}
                  isProfessional={true}
                />
              ))}
            </div>
          </div>
        </section>

        {/* How I Work Section */}
        <section
          ref={(el) => {
            sectionsRef.current[5] = el;
          }}
          className="section-fade min-h-[50vh] flex flex-col items-center justify-center py-16 sm:py-20 md:py-24"
        >
          <h3 className="text-2xl sm:text-3xl md:text-4xl font-light tracking-wide text-foreground mb-12 sm:mb-16">
            How I Work
          </h3>
          <div className="max-w-4xl w-full space-y-6 sm:space-y-8">
            {workApproach.map((approach, index) => (
              <p
                key={index}
                className="text-sm sm:text-base md:text-lg font-light tracking-wide text-foreground/80 leading-relaxed text-center"
              >
                {approach}
              </p>
            ))}
          </div>
        </section>

        {/* Tools & Ecosystem Fluency Section - Refined Alignment */}
        <section
          ref={(el) => {
            sectionsRef.current[6] = el;
          }}
          className="section-fade min-h-[60vh] flex flex-col items-center justify-center py-16 sm:py-20 md:py-24"
        >
          <h3 className="text-2xl sm:text-3xl md:text-4xl font-light tracking-wide text-foreground mb-4">
            Tools & Ecosystem Fluency
          </h3>
          <p className="text-sm sm:text-base font-light tracking-wide text-foreground/60 mb-12 sm:mb-16">
            Technical proficiency across design and development platforms
          </p>
          
          <div className="max-w-6xl w-full">
            {/* Refined Compact Clustered Layout with Consistent Alignment */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
              {toolCategories.map((category, categoryIndex) => (
                <div 
                  key={categoryIndex} 
                  className="tool-category-cluster flex flex-col items-start"
                >
                  {/* Category Header Pill - Consistent Alignment */}
                  <div
                    ref={(el) => {
                      toolItemsRef.current[categoryIndex * 10] = el;
                    }}
                    className="tool-item inline-flex items-center gap-2 px-4 py-2 rounded-full border backdrop-blur-sm mb-3 transition-all duration-300 hover:scale-105"
                    style={{
                      borderColor: `${category.color}40`,
                      backgroundColor: `${category.color}15`,
                    }}
                  >
                    <div
                      className="w-2 h-2 rounded-full flex-shrink-0"
                      style={{ backgroundColor: category.color }}
                    />
                    <span
                      className="text-xs sm:text-sm font-light tracking-wider uppercase whitespace-nowrap"
                      style={{ color: category.color }}
                    >
                      {category.category}
                    </span>
                  </div>
                  
                  {/* Tool Pills - Consistent Spacing and Alignment */}
                  <div className="flex flex-wrap gap-2 w-full">
                    {category.tools.map((tool, toolIndex) => (
                      <div
                        key={toolIndex}
                        ref={(el) => {
                          toolItemsRef.current[categoryIndex * 10 + toolIndex + 1] = el;
                        }}
                        className="tool-item group relative"
                        onMouseEnter={() => setHoveredTool(`${categoryIndex}-${toolIndex}`)}
                        onMouseLeave={() => setHoveredTool(null)}
                      >
                        <div
                          className={`px-3 py-1.5 rounded-md border backdrop-blur-sm cursor-pointer transition-all duration-300 ${
                            hoveredTool === `${categoryIndex}-${toolIndex}`
                              ? 'scale-110 shadow-lg'
                              : 'hover:scale-105'
                          }`}
                          style={{
                            borderColor: hoveredTool === `${categoryIndex}-${toolIndex}` 
                              ? `${category.color}60` 
                              : `${category.color}20`,
                            backgroundColor: hoveredTool === `${categoryIndex}-${toolIndex}`
                              ? `${category.color}25`
                              : `${category.color}10`,
                            boxShadow: hoveredTool === `${categoryIndex}-${toolIndex}`
                              ? `0 4px 20px ${category.color}30`
                              : 'none',
                          }}
                        >
                          <span
                            className="text-xs sm:text-sm font-light tracking-wide transition-colors duration-300 whitespace-nowrap"
                            style={{
                              color: hoveredTool === `${categoryIndex}-${toolIndex}`
                                ? category.color
                                : 'oklch(var(--foreground) / 0.7)',
                            }}
                          >
                            {tool}
                          </span>
                        </div>
                        
                        {/* Hover Glow Effect */}
                        {hoveredTool === `${categoryIndex}-${toolIndex}` && (
                          <div
                            className="absolute inset-0 rounded-md blur-md -z-10 animate-pulse"
                            style={{
                              backgroundColor: `${category.color}20`,
                            }}
                          />
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Ecosystem Fluency Section - Fixed Desktop Visibility */}
        <section
          ref={(el) => {
            sectionsRef.current[7] = el;
          }}
          className="section-fade min-h-[80vh] flex flex-col items-center justify-center py-16 sm:py-20 md:py-24 pb-24 sm:pb-32 md:pb-40"
        >
          <div className="ecosystem-fluency-bg absolute inset-0 pointer-events-none opacity-30" />
          
          <h3 className="text-2xl sm:text-3xl md:text-4xl font-light tracking-wide text-foreground mb-4 relative z-10">
            Ecosystem Fluency
          </h3>
          <p className="text-sm sm:text-base font-light tracking-wide text-foreground/60 mb-12 sm:mb-16 relative z-10">
            Deep expertise across specialized domains
          </p>
          
          <div className="max-w-6xl w-full relative z-10">
            {/* Unified Layout for All Screen Sizes */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
              {ecosystemFluency.map((ecosystem, index) => (
                <div
                  key={index}
                  ref={(el) => {
                    ecosystemItemsRef.current[index] = el;
                  }}
                  className="ecosystem-item group relative"
                  onMouseEnter={() => toggleEcosystem(index)}
                  onMouseLeave={() => toggleEcosystem(index)}
                  onClick={() => toggleEcosystem(index)}
                >
                  <div 
                    className={`relative p-6 rounded-xl border backdrop-blur-sm cursor-pointer transition-all duration-500 ${
                      expandedEcosystem === index
                        ? 'border-accent-bright/50 bg-card/60 shadow-2xl shadow-accent-bright/20'
                        : 'border-foreground/10 bg-card/20 hover:border-accent-bright/30 hover:bg-card/40'
                    }`}
                  >
                    {/* Kinetic Lighting Effect */}
                    <div 
                      className={`absolute inset-0 rounded-xl bg-gradient-to-br from-accent-bright/0 via-accent-bright/5 to-accent-bright/0 opacity-0 transition-opacity duration-500 ${
                        expandedEcosystem === index ? 'opacity-100' : 'group-hover:opacity-50'
                      }`}
                    />
                    
                    {/* Category Header */}
                    <div className="relative z-10 flex items-center justify-between mb-4">
                      <h4 className={`text-lg sm:text-xl font-light tracking-wide transition-colors duration-300 ${
                        expandedEcosystem === index ? 'text-accent-bright' : 'text-foreground group-hover:text-accent-bright'
                      }`}>
                        {ecosystem.category}
                      </h4>
                      <ChevronDown 
                        className={`w-5 h-5 transition-all duration-500 ${
                          expandedEcosystem === index 
                            ? 'rotate-180 text-accent-bright' 
                            : 'text-foreground/40 group-hover:text-accent-bright/60'
                        }`}
                      />
                    </div>
                    
                    {/* Expandable Content */}
                    <div 
                      className={`relative z-10 overflow-hidden transition-all duration-500 ${
                        expandedEcosystem === index ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0'
                      }`}
                    >
                      <ul className="space-y-3 pt-2">
                        {ecosystem.items.map((item, itemIndex) => (
                          <li 
                            key={itemIndex}
                            className="flex gap-2 text-xs sm:text-sm font-light tracking-wide text-foreground/70 leading-relaxed"
                            style={{
                              animation: expandedEcosystem === index 
                                ? `ecosystem-item-reveal 0.4s ease-out ${itemIndex * 0.08}s both`
                                : 'none'
                            }}
                          >
                            <span className="text-accent-bright/80 flex-shrink-0 mt-1">→</span>
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    
                    {/* Collapsed Preview */}
                    <div 
                      className={`relative z-10 transition-all duration-500 ${
                        expandedEcosystem === index ? 'max-h-0 opacity-0' : 'max-h-20 opacity-100'
                      }`}
                    >
                      <p className="text-xs sm:text-sm font-light tracking-wide text-foreground/50">
                        {ecosystem.items.length} tools & technologies
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
