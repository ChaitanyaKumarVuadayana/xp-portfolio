// ============================================================
// CENTRALIZED PORTFOLIO PROFILE CONFIGURATION
// All personal data loads from this single file.
// ============================================================

export interface ExperienceProject {
  name: string;
  description: string;
  bullets: string[];
}

export interface Experience {
  company: string;
  location: string;
  role: string;
  period: string;
  projects: ExperienceProject[];
}

export interface Project {
  name: string;
  folder: string;
  description: string;
  techStack: string[];
  features: string[];
  award?: string;
}

export interface Achievement {
  title: string;
  subtitle: string;
  description: string;
  year: string;
  icon: string;
}

export interface ProfileConfig {
  name: string;
  shortName: string;
  initials: string;
  /** Public URL – served from /public/assets/user/profile.png */
  profileImage: string;
  /** Shown when profileImage fails to load */
  profileImageFallback: string;
  role: string;
  tagline: string;
  subTagline: string;
  location: string;
  phone: string;
  email: string;
  github: string;
  linkedin: string;
  summary: string;
  experience: Experience[];
  projects: Project[];
  skills: Record<string, string[]>;
  achievements: Achievement[];
}

export const PROFILE: ProfileConfig = {
  name: 'Vudayana Chaitanya Kumar',
  shortName: 'Chaitanya Kumar',
  initials: 'VCK',
  profileImage: '/assets/user/profile.png',
  profileImageFallback: '/assets/user/fallback.png',
  role: 'Software Engineer',
  tagline: 'Mission-Critical Backend Engineer',
  subTagline:
    'Building secure, scalable backend systems for real-world national infrastructure.',
  location: 'New Delhi, India',
  phone: '+91 9315490815',
  email: 'chaitu21072003@gmail.com',
  github: 'https://github.com/ChaitanyaKumarVuadayana',
  linkedin: 'https://www.linkedin.com/in/vudayana-chaitanya-kumar/',

  summary:
    "Software Engineer with national-level government experience building mission-critical backend systems for India's Parliament and Prime Minister's Office. Strong in OOP, DSA, REST APIs, clean architecture, debugging, and scalable backend services.",

  // ── EXPERIENCE ──────────────────────────────────────────
  experience: [
    {
      company: 'C-DAC (Centre for Development of Advanced Computing)',
      location: 'Noida, India',
      role: 'Software Engineer – Government Backend Services',
      period: 'Sep 2025 – Present',
      projects: [
        {
          name: 'PMO Real-Time Monitoring System',
          description:
            "Centralized backend integrating HF & UHF smart card readers for the Prime Minister's Office.",
          bullets: [
            'Concurrent REST APIs handling multi-device data streams',
            'Retry mechanisms ensuring 99.95% system uptime',
            'Production debugging and root cause analysis',
            'Integration with HF & UHF RFID smart card reader hardware',
          ],
        },
        {
          name: 'Parliament Access Validation Service',
          description:
            'Secure access control REST API for Indian Parliament.',
          bullets: [
            'Full CRUD REST API (GET, POST, PUT, DELETE)',
            'Authentication & Authorization with government security standards',
            'SQL indexing optimization: latency reduced from 5s → <23ms',
            'Rate limiting, pagination, and concurrent access handling',
          ],
        },
      ],
    },
  ],

  // ── PROJECTS ────────────────────────────────────────────
  projects: [
    {
      name: 'Smart Safety Helmet',
      folder: 'Smart Safety Helmet',
      description:
        'IoT-based safety monitoring system using Li-Fi, RFID & WiFi technologies for real-time worker tracking.',
      techStack: ['IoT', 'Li-Fi', 'RFID', 'WiFi', 'Embedded C', 'Python'],
      features: [
        'Real-time worker location tracking via RFID',
        'Li-Fi based data transmission in hazardous zones',
        'WiFi fallback for standard environment monitoring',
        'Emergency alert system',
        '1st Place Winner at VIT-AP Innovation Challenge',
        'Selected by DRDO Chief for national recognition',
      ],
      award: 'DRDO Chief Innovation Award – 1st Place, VIT-AP',
    },
    {
      name: 'SmartFarmAssist (CropSafe)',
      folder: 'SmartFarmAssist',
      description:
        'CNN-based crop disease detection and agricultural advisory platform.',
      techStack: ['Python', 'TensorFlow', 'CNN', 'Flask', 'REST API', 'React'],
      features: [
        'CNN-based real-time crop disease image classification',
        'AI prediction system with confidence scoring',
        'Treatment recommendation engine',
        'Multi-crop support (rice, wheat, tomato, potato)',
        'REST API backend for mobile integration',
      ],
    },
    {
      name: 'Malaria Predictor Pro',
      folder: 'Malaria Predictor Pro',
      description:
        'Environmental risk prediction system for malaria outbreaks using WHO protocol-based alerts.',
      techStack: ['Python', 'Scikit-learn', 'Pandas', 'Flask', 'WHO APIs'],
      features: [
        'Environmental risk factor analysis',
        'WHO protocol-based alert generation',
        'Predictive modeling using climate data',
        'Regional outbreak probability mapping',
        'Automated alert dispatch system',
      ],
    },
  ],

  // ── SKILLS ──────────────────────────────────────────────
  skills: {
    Programming: ['Java (Expert)', 'Python', 'C', 'SQL'],
    Backend: ['Spring Boot', 'Microservices', 'REST APIs', 'WebSockets'],
    Database: ['SQL', 'Indexing', 'Query Optimization', 'CRUD Operations', 'pgAdmin'],
    Concepts: ['OOP', 'DSA', 'System Design', 'Problem Solving'],
    Security: [
      'Authentication',
      'Authorization',
      'Session Management',
      'Government Security Standards',
    ],
    Tools: ['Git', 'GitHub', 'Docker', 'IntelliJ', 'VS Code', 'Postman'],
  },

  // ── ACHIEVEMENTS ────────────────────────────────────────
  achievements: [
    {
      title: 'DRDO Chief Innovation Award',
      subtitle: '1st Place – VIT-AP Innovation Challenge',
      description:
        'Smart Safety Helmet project recognized and awarded by the Chief of DRDO (Defence Research and Development Organisation) at the national VIT-AP Innovation Challenge.',
      year: '2023',
      icon: 'trophy',
    },
    {
      title: 'National-Level Project Recognition',
      subtitle: 'Government of India Digital Initiative',
      description:
        'Projects selected for national-level recognition under the Government of India digital infrastructure initiative.',
      year: '2024',
      icon: 'medal',
    },
    {
      title: 'Government Production System Deployment',
      subtitle: 'C-DAC – Parliament & PMO Systems',
      description:
        "Successfully deployed mission-critical backend systems for Indian Parliament and the Prime Minister's Office with 99.95% uptime guarantee.",
      year: '2025',
      icon: 'star',
    },
  ],
};

// Virtual filesystem username (matches public/fs/ directory name)
export const FS_USERNAME = 'Vudayana Chaitanya Kumar';
export const FS_USER_PATH = `/C:/Documents and Settings/${FS_USERNAME}`;
export const FS_DESKTOP_PATH = `${FS_USER_PATH}/Desktop`;

