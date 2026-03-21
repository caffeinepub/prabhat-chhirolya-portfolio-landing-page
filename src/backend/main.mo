import Map "mo:core/Map";
import List "mo:core/List";
import Text "mo:core/Text";
import Iter "mo:core/Iter";
import Principal "mo:core/Principal";
import Runtime "mo:core/Runtime";
import MixinStorage "blob-storage/Mixin";
import MixinAuthorization "authorization/MixinAuthorization";
import AccessControl "authorization/access-control";

actor {
  type Project = {
    id : Text;
    title : Text;
    thumbnailBlobId : ?Text;
    oneLiner : Text;
    role : Text;
    tools : Text;
    description : Text;
    youtubeUrl : ?Text;
    order : Nat;
  };

  type WorkExperience = {
    id : Text;
    companyName : Text;
    logoBlobId : ?Text;
    roles : [JobRole];
    order : Nat;
  };

  type JobRole = {
    id : Text;
    title : Text;
    dateRange : Text;
    responsibilities : [Text];
    achievements : [Text];
  };

  type ToolCategory = {
    id : Text;
    categoryName : Text;
    tools : [Text];
    order : Nat;
  };

  type WorkCard = {
    id : Text;
    title : Text;
    description : Text;
    order : Nat;
  };

  type HowIThinkItem = {
    id : Text;
    content : Text;
    order : Nat;
  };

  type Curiosity = {
    id : Text;
    content : Text;
    order : Nat;
  };

  public type UserProfile = {
    name : Text;
  };

  let accessControlState = AccessControl.initState();
  include MixinAuthorization(accessControlState);
  include MixinStorage();

  let userProfiles = Map.empty<Principal, UserProfile>();

  var categories = List.fromArray<{ id : Text; categoryName : Text; tools : [Text]; order : Nat }>([
    {
      id = "bimModelling";
      categoryName = "BIM Modelling";
      tools = ["Revit", "SketchUp", "AutoCAD", "BIM360 & ACC", "3ds Max"];
      order = 0;
    },
    {
      id = "xrViz";
      categoryName = "XR Viz";
      tools = ["Unity", "Unreal Engine", "WebXR", "Enscape", "D5 Render", "Twinmotion", "Workshop XR", "Omniverse"];
      order = 1;
    },
    {
      id = "graphicsVideo";
      categoryName = "Graphics & Video";
      tools = ["Adobe Creative Suite", "Photoshop", "Premiere Pro", "After Effects", "InDesign"];
      order = 2;
    },
    {
      id = "uiux";
      categoryName = "UI/UX";
      tools = ["Figma", "Adobe XD", "Miro"];
      order = 3;
    },
    {
      id = "productivity";
      categoryName = "Productivity";
      tools = ["Notion", "Slack", "Microsoft 365", "Gen AI Tools"];
      order = 4;
    },
    {
      id = "genAI";
      categoryName = "Generative AI";
      tools = [
        "Midjourney",
        "Stable Diffusion",
        "ComfyUI",
        "Higgsfield",
        "Gen AI Models – ChatGPT, Claude, Midjourney, Google AI Studio",
      ];
      order = 5;
    },
    {
      id = "programming";
      categoryName = "Programming";
      tools = ["Python", "OpenUSD", "Vibe Coding"];
      order = 6;
    },
  ]);

  let professionalProjects = Map.empty<Text, Project>();
  let personalProjects = Map.empty<Text, Project>();
  let workExperiences = Map.empty<Text, WorkExperience>();
  let toolCategories = Map.empty<Text, ToolCategory>();
  let workCards = Map.empty<Text, WorkCard>();
  let howIThinkItems = Map.empty<Text, HowIThinkItem>();
  let curiosities = Map.empty<Text, Curiosity>();

  // Seed Professional Projects
  do {
    let projects = [
      {
        id = "googleRandall";
        title = "Google Randall – VR & Advanced Visualisation";
        thumbnailBlobId = null;
        oneLiner = "Ultra-realistic VR chalk walk and advanced visualization optimized for high-fidelity design review and executive walkthroughs";
        role = "Project Lead";
        tools = "Revit, Sketchup, Enscape, Premierer Pro, Photoshop, HTC Vive VR headset";
        description = "This project focused on delivering a high-fidelity VR chalk walk and advanced visualisation experience for Google. I coordinated with multiple BIM teams to secure and optimise the project model, ensuring high LOD accuracy through detailed grouping, layering, and model refinement. The workflow combined Revit, SketchUp, and Enscape, enhanced with 4K PBR textures, custom IES lighting based on real illumination data, and drone-captured 360° HDR surroundings. The final output delivered ultra-realistic rendering and a smooth VR experience optimized for HTC Vive, supporting immersive design reviews and executive-level walkthroughs.";
        youtubeUrl = ?"https://youtu.be/Sjwes7IX0ns";
        order = 1;
      },
      {
        id = "arizonaVipLounge";
        title = "University of Arizona, VIP Lounge- Adv Interactive VR";
        thumbnailBlobId = null;
        oneLiner = "Fully interactive VR experience with advanced user interactions, realistic lighting, and immersive spatial storytelling";
        role = "Project Lead";
        tools = "Revit, Sketchup, Unreal Engine, Advanced Core Framework, Meta Quest VR headset";
        description = "This project involved developing a fully interactive VR experience for a VIP Lounge environment using Unreal Engine. I handled BIM model optimization, XR project setup, and advanced interaction design. Models prepared from Revit and SketchUp were enhanced with realistic lighting, PBR materials, and a 360° HDR backdrop to match real-world site conditions. A custom VR framework was implemented with motion controller mapping and rich interactions including teleportation, object manipulation, material swapping, physics-based actions, animations, and spatial audio. The experience was extensively tested on HTC Vive to ensure performance, realism, and intuitive interaction, delivering a highly immersive, client-ready VR solution.";
        youtubeUrl = ?"https://youtu.be/EbOqIsLLMv8?si=-9Qj_0JRhocqJ8fW";
        order = 2;
      },
      {
        id = "genesisRAndDCenter";
        title = "Genesis R&D Center – Durham";
        thumbnailBlobId = null;
        oneLiner = "Complete immersive visualization package combining cloud presentations, real-time rendering, and VR exploration.";
        role = "Project Lead";
        tools = "Revit, Sketchup, Twinmotion & Web Presenter, Meta Quest VR headset";
        description = "For the Genesis R&D Center, I delivered a comprehensive immersive visualization package combining real-time rendering, VR, and cloud-based presentations. I managed BIM modeling, asset preparation, PBR texturing, lighting, and media setup using Revit, SketchUp, and Twinmotion. The project leveraged Twinmotion Cloud Presenter for remote stakeholder access, alongside VR experiences deployed on Meta Quest Pro and HTC Vive. My role covered end-to-end delivery, from model optimization to VR testing and deployment. The result was a flexible visualization ecosystem supporting design review, stakeholder engagement, and immersive exploration across multiple platforms.";
        youtubeUrl = ?"https://youtu.be/ktL9OBo5_T8?si=ErphIltj_gevE_Gb";
        order = 3;
      },
      {
        id = "asuCollabVR";
        title = "ASU CFL multiplayer collaborative VR";
        thumbnailBlobId = null;
        oneLiner = "Realistic, cross-platform collaborative XR enabling multi-user VR and non-VR design review across devices.";
        role = "Project Lead";
        tools = "Revit, Sketchup, Unreal Engine, Meta Quest VR headset";
        description = "This project involved designing and delivering a large-scale, multi-user, cross-platform collaborative XR experience for the ASU CFL Recreation Studio. I led the development of a shared virtual environment that supports both VR and non-VR users, enabling up to 100 participants to join a single session across VR headsets, desktop (Windows, macOS), and mobile devices (iOS and Android). The solution allows one user to host a session while others join via IP-based or network access, creating a fully synchronized collaborative space. Built using Revit, SketchUp, and Unreal Engine, the experience supports advanced interactions such as live annotations, measurements, explode and X-ray views, and real-time user presence awareness. I handled BIM model optimization, Unreal project setup, Blueprints, PBR texturing, lighting, cross-platform deployment, and extensive VR testing on HTC Vive, delivering a robust, client-ready collaborative XR system.";
        youtubeUrl = ?"https://youtu.be/JVw1Rbhvh0s?si=8yxeY773RGuttHGA";
        order = 4;
      },
    ];

    for (project in projects.values()) {
      professionalProjects.add(project.id, project);
    };
  };

  // Seed Personal Projects
  do {
    let projects = [
      {
        id = "civicReport";
        title = "CivicReport.xyz";
        thumbnailBlobId = null;
        oneLiner = "A civic tech platform that turns community observations into action.";
        role = "Creator & Builder";
        tools = "Vibe Coding, AI-assisted development, Web technologies";
        description = "CivicReport.xyz is a platform I built to make civic reporting simple, accessible, and actually useful. The idea came from a frustration: most civic issues go unreported or unresolved because reporting feels complicated or pointless. I wanted to create something that removes that friction — a clean, fast way for anyone to document and share what they observe in their community, from infrastructure problems to safety concerns. The build was intentional: minimal, mobile-first, and designed around the person reporting, not the bureaucracy receiving it.";
        youtubeUrl = null;
        order = 1;
      },
      {
        id = "manitBhopal";
        title = "MANIT BHOPAL: it's a feeling";
        thumbnailBlobId = null;
        oneLiner = "A visual and emotional tribute to an architectural institution and the memories it holds.";
        role = "Visualiser & Storyteller";
        tools = "Photography, Video, Post-production";
        description = "This wasn't a project brief — it was something I had to make. MANIT Bhopal shaped how I see space, design, and people. After graduating, I wanted to document what the campus actually feels like — not its structures, but its atmosphere. The quiet mornings, the specific quality of light through trees, the way certain spaces hold memory. It became a personal documentary about place and belonging, made entirely from observation.";
        youtubeUrl = null;
        order = 2;
      },
      {
        id = "arPersonalCard";
        title = "AR Personal Card (Web AR)";
        thumbnailBlobId = null;
        oneLiner = "An augmented reality business card that brings identity into spatial computing.";
        role = "XR Designer & Builder";
        tools = "WebXR, A-Frame, Web technologies";
        description = "I built this as an experiment in personal branding through spatial computing. Instead of a static card, I created a Web AR experience that layers my identity over physical space — accessible from any device, no app required. It was a way to push the boundaries of how a personal introduction can work in an immersive context, and to explore what presence means when it extends beyond a screen.";
        youtubeUrl = null;
        order = 3;
      },
    ];

    for (project in projects.values()) {
      personalProjects.add(project.id, project);
    };
  };

  // Seed Work Experience
  do {
    let jacobsRoles : [JobRole] = [
      {
        id = "bimArchitectXrDesigner";
        title = "BIM Architect & XR Designer";
        dateRange = "Mar 2023 – Present";
        responsibilities = [
          "Led VR-driven project delivery while working closely with XR teams and serving as the primary point of responsibility for immersive outputs.",
          "Managed multidisciplinary coordination, ensuring BIM models were optimized for XR, VR, and AR deliverables.",
          "Engaged directly with clients to present work, incorporate feedback, and provide regular project updates.",
          "Provided team leadership, training, and workflow development, streamlining BIM and XR processes to improve efficiency.",
        ];
        achievements = [
          "Successfully led and delivered 10+ major projects with consistently high-quality outputs.",
          "Developed strong XR capabilities within the AECO domain by adopting tools such as Unreal Engine and Unity.",
          "Implemented new advanced visualization and XR workflows that reduced delivery timelines by approximately 35%.",
        ];
      },
      {
        id = "bimArchitectVdc";
        title = "BIM Architect – VDC";
        dateRange = "Mar 2022 – Mar 2023";
        responsibilities = [
          "Supported proposal and delivery teams through architectural modeling using Revit and SketchUp, collaborating closely with senior architects.",
          "Produced high-quality renders and visualizations using Enscape and Twinmotion for client presentations and RFP submissions.",
          "Worked directly with the DPR US team and project managers to deliver RFP visuals, logistics planning, and construction phasing outputs.",
          "Developed 3D and 4D construction sequence visuals, flythroughs, walkthroughs, and custom 360-degree experiences bridging design and execution.",
        ];
        achievements = [
          "Delivered 20+ successful project proposals supporting winning bids.",
          "Recognized for strong design quality, visualization clarity, and technical attention to detail.",
          "Promoted to BIM Architect & XR Designer within 12 months based on performance and impact.",
        ];
      },
      {
        id = "internGetVdc";
        title = "Intern – GET VDC";
        dateRange = "Sep 2021 – Mar 2022";
        responsibilities = [
          "Gained hands-on experience in real-world BIM and VDC project delivery through live project involvement.",
          "Supported proposal modeling and architectural package development under senior team guidance.",
          "Produced BIM and 3D models using Revit and SketchUp based on plans, elevations, and sections.",
          "Assisted with BIM coordination, standards compliance, and rendering using Enscape and Lumion.",
        ];
        achievements = [
          "Completed intensive training in Revit, BIM standards, and coordination workflows.",
          "Contributed to 10+ successful project deliveries during the internship period.",
          "Converted to a full-time VDC Proposal Architect role based on performance.",
        ];
      },
    ];

    let drpRoles : [JobRole] = [
      {
        id = "architecturalVisualiser";
        title = "Architectural Visualiser";
        dateRange = "Jan 2021 – Aug 2021";
        responsibilities = [
          "Produced high-quality architectural renders, animations, and visualizations for residential and commercial projects.",
          "Worked closely with the design team to translate architectural concepts into compelling visual narratives.",
          "Managed rendering pipelines and post-production workflows for client deliverables.",
          "Contributed to proposal packages and marketing materials with visualization content.",
        ];
        achievements = [
          "Delivered visualization content for 15+ projects across residential and commercial sectors.",
          "Recognized for quality and turnaround speed in a fast-paced studio environment.",
          "Expanded visualization capabilities by introducing new rendering techniques and workflows.",
        ];
      },
      {
        id = "juniorArchitect";
        title = "Junior Architect";
        dateRange = "Jun 2020 – Jan 2021";
        responsibilities = [
          "Supported senior architects in design development, documentation, and project coordination.",
          "Produced architectural drawings, models, and presentations using Revit and AutoCAD.",
          "Assisted with client presentations, site visits, and design reviews.",
          "Contributed to concept development and design exploration for multiple live projects.",
        ];
        achievements = [
          "Contributed to design and documentation across 8+ active projects.",
          "Developed strong foundational skills in architectural practice and project delivery.",
          "Promoted to Architectural Visualiser role based on emerging specialization in visualization.",
        ];
      },
      {
        id = "internArchitect";
        title = "Intern Architect";
        dateRange = "Jan 2020 – Jun 2020";
        responsibilities = [
          "Assisted with design development and architectural documentation under senior supervision.",
          "Produced 2D drawings and 3D models using AutoCAD, Revit, and SketchUp.",
          "Supported the team with research, reference gathering, and concept presentation preparation.",
          "Gained exposure to professional architectural practice across residential and mixed-use typologies.",
        ];
        achievements = [
          "Completed a structured internship with exposure to full project lifecycle.",
          "Developed proficiency in core architectural software tools.",
          "Offered a full-time Junior Architect role at the end of the internship.",
        ];
      },
    ];

    let experiences = [
      {
        id = "jacobs";
        companyName = "Jacobs";
        logoBlobId = null;
        roles = jacobsRoles;
        order = 1;
      },
      {
        id = "drp";
        companyName = "DRP (Design Research Practice)";
        logoBlobId = null;
        roles = drpRoles;
        order = 2;
      },
    ];

    for (experience in experiences.values()) {
      workExperiences.add(experience.id, experience);
    };
  };

  // Seed Tool Categories
  do {
    for (category in categories.values()) {
      toolCategories.add(category.id, category);
    };
  };

  // Seed Work Cards
  do {
    let cards = [
      {
        id = "bimLanguage";
        title = "BIM as a Language";
        description = "I don't see BIM as a software skill — it's a shared language for coordination, communication, and precision across disciplines.";
        order = 1;
      },
      {
        id = "xrDesignTool";
        title = "XR as a Design Tool";
        description = "Immersive experiences aren't just deliverables for me — they're thinking tools. VR changes how you evaluate space before it's built.";
        order = 2;
      },
      {
        id = "visualizationEmpathy";
        title = "Visualization as Empathy";
        description = "A render isn't just pretty — it's a translation. My job is to help people feel a space before it exists.";
        order = 3;
      },
      {
        id = "processOverOutput";
        title = "Process Over Output";
        description = "The most valuable thing I bring isn't just the final file — it's the thinking, coordination, and craft that gets it there.";
        order = 4;
      },
    ];

    for (card in cards.values()) {
      workCards.add(card.id, card);
    };
  };

  // Seed How I Think Items
  do {
    let items = [
      {
        id = "systemsThinking";
        content = "I think in systems — how things connect, what breaks when one part shifts, and where the invisible dependencies are.";
        order = 1;
      },
      {
        id = "interdisciplinary";
        content = "I'm drawn to the space between disciplines — where architecture meets technology, where design meets data.";
        order = 2;
      },
      {
        id = "toolsNeutrality";
        content = "I believe most tools are neutral — it's the intention and craft behind them that determines the outcome.";
        order = 3;
      },
      {
        id = "tangibleMaking";
        content = "I default to making things tangible — if I can't see it or walk through it, I build a prototype.";
        order = 4;
      },
    ];

    for (item in items.values()) {
      howIThinkItems.add(item.id, item);
    };
  };

  // Seed Curiosities
  do {
    let curiositiesList = [
      {
        id = "spatialComputingCollab";
        content = "How spatial computing will change the way we collaborate on buildings — not just visualize them.";
        order = 1;
      },
      {
        id = "genAiArchitecture";
        content = "The intersection of generative AI and architectural design — where does authorship sit?";
        order = 2;
      },
      {
        id = "buildingInPublic";
        content = "Building in public: what it means to share work-in-progress in a field that typically hides process.";
        order = 3;
      },
      {
        id = "toolsPhilosophy";
        content = "The philosophy of tools — why certain technologies shape how we think, not just what we make.";
        order = 4;
      },
    ];

    for (curiosity in curiositiesList.values()) {
      curiosities.add(curiosity.id, curiosity);
    };
  };

  // User Profile Functions
  public query ({ caller }) func getCallerUserProfile() : async ?UserProfile {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can access profiles");
    };
    userProfiles.get(caller);
  };

  public query ({ caller }) func getUserProfile(user : Principal) : async ?UserProfile {
    if (caller != user and not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Can only view your own profile");
    };
    userProfiles.get(user);
  };

  public shared ({ caller }) func saveCallerUserProfile(profile : UserProfile) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can save profiles");
    };
    userProfiles.add(caller, profile);
  };

  // Professional Projects CRUD
  public query func getProfessionalProjects() : async [Project] {
    professionalProjects.values().toArray();
  };

  public query func getProfessionalProject(id : Text) : async ?Project {
    professionalProjects.get(id);
  };

  public shared ({ caller }) func createProfessionalProject(project : Project) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can create content");
    };
    professionalProjects.add(project.id, project);
  };

  public shared ({ caller }) func updateProfessionalProject(project : Project) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can update content");
    };
    professionalProjects.add(project.id, project);
  };

  public shared ({ caller }) func deleteProfessionalProject(id : Text) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can delete content");
    };
    professionalProjects.remove(id);
  };

  // Personal Projects CRUD
  public query func getPersonalProjects() : async [Project] {
    personalProjects.values().toArray();
  };

  public query func getPersonalProject(id : Text) : async ?Project {
    personalProjects.get(id);
  };

  public shared ({ caller }) func createPersonalProject(project : Project) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can create content");
    };
    personalProjects.add(project.id, project);
  };

  public shared ({ caller }) func updatePersonalProject(project : Project) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can update content");
    };
    personalProjects.add(project.id, project);
  };

  public shared ({ caller }) func deletePersonalProject(id : Text) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can delete content");
    };
    personalProjects.remove(id);
  };

  // Work Experience CRUD
  public query func getWorkExperiences() : async [WorkExperience] {
    workExperiences.values().toArray();
  };

  public query func getWorkExperience(id : Text) : async ?WorkExperience {
    workExperiences.get(id);
  };

  public shared ({ caller }) func createWorkExperience(experience : WorkExperience) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can create content");
    };
    workExperiences.add(experience.id, experience);
  };

  public shared ({ caller }) func updateWorkExperience(experience : WorkExperience) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can update content");
    };
    workExperiences.add(experience.id, experience);
  };

  public shared ({ caller }) func deleteWorkExperience(id : Text) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can delete content");
    };
    workExperiences.remove(id);
  };

  // Tool Categories CRUD
  public query func getToolCategories() : async [ToolCategory] {
    toolCategories.values().toArray();
  };

  public query func getToolCategory(id : Text) : async ?ToolCategory {
    toolCategories.get(id);
  };

  public shared ({ caller }) func createToolCategory(category : ToolCategory) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can create content");
    };
    toolCategories.add(category.id, category);
  };

  public shared ({ caller }) func updateToolCategory(category : ToolCategory) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can update content");
    };
    toolCategories.add(category.id, category);
  };

  public shared ({ caller }) func deleteToolCategory(id : Text) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can delete content");
    };
    toolCategories.remove(id);
  };

  // Work Cards CRUD
  public query func getWorkCards() : async [WorkCard] {
    workCards.values().toArray();
  };

  public query func getWorkCard(id : Text) : async ?WorkCard {
    workCards.get(id);
  };

  public shared ({ caller }) func createWorkCard(card : WorkCard) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can create content");
    };
    workCards.add(card.id, card);
  };

  public shared ({ caller }) func updateWorkCard(card : WorkCard) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can update content");
    };
    workCards.add(card.id, card);
  };

  public shared ({ caller }) func deleteWorkCard(id : Text) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can delete content");
    };
    workCards.remove(id);
  };

  // How I Think Items CRUD
  public query func getHowIThinkItems() : async [HowIThinkItem] {
    howIThinkItems.values().toArray();
  };

  public query func getHowIThinkItem(id : Text) : async ?HowIThinkItem {
    howIThinkItems.get(id);
  };

  public shared ({ caller }) func createHowIThinkItem(item : HowIThinkItem) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can create content");
    };
    howIThinkItems.add(item.id, item);
  };

  public shared ({ caller }) func updateHowIThinkItem(item : HowIThinkItem) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can update content");
    };
    howIThinkItems.add(item.id, item);
  };

  public shared ({ caller }) func deleteHowIThinkItem(id : Text) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can delete content");
    };
    howIThinkItems.remove(id);
  };

  // Curiosities CRUD
  public query func getCuriosities() : async [Curiosity] {
    curiosities.values().toArray();
  };

  public query func getCuriosity(id : Text) : async ?Curiosity {
    curiosities.get(id);
  };

  public shared ({ caller }) func createCuriosity(curiosity : Curiosity) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can create content");
    };
    curiosities.add(curiosity.id, curiosity);
  };

  public shared ({ caller }) func updateCuriosity(curiosity : Curiosity) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can update content");
    };
    curiosities.add(curiosity.id, curiosity);
  };

  public shared ({ caller }) func deleteCuriosity(id : Text) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can delete content");
    };
    curiosities.remove(id);
  };

  // Reordering functions
  public shared ({ caller }) func reorderProfessionalProjects(newOrder : [Text]) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can reorder content");
    };
    var order = 1;
    for (id in newOrder.values()) {
      switch (professionalProjects.get(id)) {
        case (null) {};
        case (?project) {
          let updatedProject = { project with order };
          professionalProjects.add(id, updatedProject);
          order += 1;
        };
      };
    };
  };

  public shared ({ caller }) func reorderPersonalProjects(newOrder : [Text]) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can reorder content");
    };
    var order = 1;
    for (id in newOrder.values()) {
      switch (personalProjects.get(id)) {
        case (null) {};
        case (?project) {
          let updatedProject = { project with order };
          personalProjects.add(id, updatedProject);
          order += 1;
        };
      };
    };
  };

  public shared ({ caller }) func reorderWorkExperiences(newOrder : [Text]) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can reorder content");
    };
    var order = 1;
    for (id in newOrder.values()) {
      switch (workExperiences.get(id)) {
        case (null) {};
        case (?experience) {
          let updatedExperience = { experience with order };
          workExperiences.add(id, updatedExperience);
          order += 1;
        };
      };
    };
  };

  public shared ({ caller }) func reorderToolCategories(newOrder : [Text]) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can reorder content");
    };
    var order = 1;
    for (id in newOrder.values()) {
      switch (toolCategories.get(id)) {
        case (null) {};
        case (?category) {
          let updatedCategory = { category with order };
          toolCategories.add(id, updatedCategory);
          order += 1;
        };
      };
    };
  };

  public shared ({ caller }) func reorderWorkCards(newOrder : [Text]) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can reorder content");
    };
    var order = 1;
    for (id in newOrder.values()) {
      switch (workCards.get(id)) {
        case (null) {};
        case (?card) {
          let updatedCard = { card with order };
          workCards.add(id, updatedCard);
          order += 1;
        };
      };
    };
  };

  public shared ({ caller }) func reorderHowIThinkItems(newOrder : [Text]) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can reorder content");
    };
    var order = 1;
    for (id in newOrder.values()) {
      switch (howIThinkItems.get(id)) {
        case (null) {};
        case (?item) {
          let updatedItem = { item with order };
          howIThinkItems.add(id, updatedItem);
          order += 1;
        };
      };
    };
  };

  public shared ({ caller }) func reorderCuriosities(newOrder : [Text]) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can reorder content");
    };
    var order = 1;
    for (id in newOrder.values()) {
      switch (curiosities.get(id)) {
        case (null) {};
        case (?curiosity) {
          let updatedCuriosity = { curiosity with order };
          curiosities.add(id, updatedCuriosity);
          order += 1;
        };
      };
    };
  };
};
