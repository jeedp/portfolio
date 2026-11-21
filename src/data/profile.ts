/**
 * Everything personal on the site lives in this file.
 * Edit the values here and the whole site (and the résumé section) updates.
 * See README.md, "Updating your information".
 */

export const profile = {
  name: 'Jed B. Padro',
  shortName: 'Jed Padro',
  title: 'Computer Engineering Student',
  subtitle: 'Aspiring Software Engineer',
  location: 'Southern Leyte, Philippines',
  email: 'jedpadro@gmail.com',
  github: 'https://github.com/jeedp',
  githubUser: 'jeedp',
  linkedin: 'https://www.linkedin.com/in/jed-padro-ba9563299/',
  // Put your photo at public/profile.jpg and set this to 'profile.jpg'.
  // While it is empty, the site shows a JP monogram in its place.
  photo: 'profile.jpg',
  // The PDF in public/resume.pdf. Rebuild it with `npm run resume`, or replace the file with your own.
  resume: 'resume.pdf',
  availability: 'Open to software engineering internships',

  headline: 'I build practical systems where software meets hardware.',
  intro:
    "Computer Engineering student at Southern Leyte State University, focused on software engineering. I've built desktop apps, IoT devices and web systems, and I'm looking for my first software engineering internship.",
  // Shown in the footer and on the hero spec card.
  updated: 'November 2026',
  timezone: 'Asia/Manila',
  // The words that cycle in the hero, after "Currently exploring".
  focusAreas: ['software development', 'embedded systems', 'the Internet of Things', 'artificial intelligence'],
}

export const about = {
  paragraphs: [
    "I'm a Computer Engineering student at Southern Leyte State University. I like building things that work outside a screenshot: a desktop app with a real database behind it, a gate that opens when an RFID card is tapped, a campus kiosk that keeps running when the network drops.",
    "Most of my projects cross the line between software and hardware, and that's where I'm happiest. I want to understand a system all the way down, from the interface a person taps to the database, the server and the microcontroller underneath.",
    "I learn by building, reading other people's code, and writing down what I changed and why. Right now I'm finishing my thesis and looking for an internship where I can ship real work and keep learning from experienced engineers.",
  ],
  highlights: [
    { value: '3', label: 'projects built across desktop, IoT and web' },
    { value: '14 → 3 MB', label: 'floor drawings shrunk to run on a Raspberry Pi' },
    { value: '5', label: 'bugs fixed in a production Laravel system' },
  ],
  interests: [
    'Software engineering',
    'Embedded systems',
    'Internet of Things',
    'Systems development',
    'Artificial intelligence and machine learning',
  ],
}

export type SkillGroup = { name: string; icon: 'code' | 'globe' | 'database' | 'cpu' | 'wrench'; items: string[] }

export const skills: SkillGroup[] = [
  { name: 'Languages', icon: 'code', items: ['C', 'C++', 'C#', 'Python', 'JavaScript', 'PHP'] },
  { name: 'Web development', icon: 'globe', items: ['HTML', 'CSS', 'JavaScript', 'Laravel', 'Node.js', 'Express'] },
  { name: 'Databases', icon: 'database', items: ['MySQL', 'Microsoft SQL Server', 'SQLite', 'Firebase'] },
  { name: 'Embedded systems', icon: 'cpu', items: ['Arduino', 'ESP32', 'Raspberry Pi', 'FreeRTOS'] },
  { name: 'Tools', icon: 'wrench', items: ['Git', 'GitHub', 'VS Code', 'Visual Studio', 'Arduino IDE', 'PlatformIO', 'Postman'] },
]

export type Project = {
  id: string
  title: string
  kind: string
  category: 'Desktop' | 'IoT' | 'Web'
  status?: string
  summary: string
  role?: string
  features: string[]
  result?: string
  tech: string[]
  repo?: string
  repoNote?: string
  // Put a screenshot in public/projects/ and set e.g. 'projects/trainsmart.png'.
  // Until then the card shows a diagram of how the project fits together.
  image?: string
  diagram: 'trainsmart' | 'parking' | 'wayfinding'
  year: string
  // The one number that sells the project, shown large on its row.
  metric?: { value: string; label: string }
}

export const projects: Project[] = [
  {
    id: 'wayfinding',
    title: 'SLSU Campus Wayfinding System',
    kind: 'Thesis project',
    category: 'Web',
    status: 'In development',
    summary:
      'An offline touchscreen kiosk that helps students, visitors and staff find buildings, offices and facilities across the SLSU main campus, with a 2D vector map, floor plans and walking directions.',
    role: 'Team of two. I handle performance on the Raspberry Pi, the phone hand-off and deployment.',
    features: [
      'Runs fully offline from a Raspberry Pi, so it keeps working if the campus network drops',
      'QR code hands the route to a visitor’s phone, with live GPS walking directions',
      'Setup script that turns a blank SD card into a working kiosk',
    ],
    result: 'Cut each floor drawing from 14 MB to 1.5–3 MB so the map runs smoothly on a Raspberry Pi 4.',
    tech: ['JavaScript', 'Node.js', 'Express', 'SQLite', 'Raspberry Pi'],
    repo: 'https://github.com/cymrcsm/slsu-map-navigation',
    diagram: 'wayfinding',
    year: '2026',
    metric: { value: '14 → 3 MB', label: 'per floor drawing, so the map runs smoothly on a Raspberry Pi 4' },
  },
  {
    id: 'parking',
    title: 'Smart Parking Gate System',
    kind: 'IoT project',
    category: 'IoT',
    summary:
      'An IoT parking system that checks RFID cards at the gate, tracks free slots with ultrasonic sensors and shows everything on a live web dashboard.',
    role: 'Solo project, from pin mapping and firmware to the dashboard.',
    features: [
      'RFID-based vehicle authorization and an automated servo gate',
      'Real-time slot availability from ultrasonic sensors',
      'Web dashboard with live slots, gate state and the last 20 events',
      'Manual gate control from the browser over Bluetooth, even without internet',
    ],
    result: 'Gate control and network updates run as separate FreeRTOS tasks on separate cores, so a slow connection never holds the gate.',
    tech: ['C++', 'ESP32', 'FreeRTOS', 'RFID', 'Firebase', 'JavaScript'],
    repo: 'https://github.com/jeedp/Smart-Parking-Gate-System',
    diagram: 'parking',
    year: '2026',
    metric: { value: '2 cores', label: 'gate control and networking run as separate FreeRTOS tasks' },
  },
  {
    id: 'trainsmart',
    title: 'TrainSMART',
    kind: 'Desktop application',
    category: 'Desktop',
    summary:
      'A desktop workout manager that helps users organize routines, log exercises and sets, and follow their fitness measurements over time.',
    role: 'Solo project.',
    features: [
      'Workout templates, with custom and prebuilt routines',
      'Exercise and set management',
      'Workout tracking and history',
      'Body measurement tracking',
      'User accounts with input validation',
    ],
    result: 'Backed by a relational data model I designed and wrote in T-SQL on SQL Server.',
    tech: ['C#', 'Windows Forms', '.NET Framework', 'SQL Server'],
    repo: 'https://github.com/jeedp/TrainSMARTApp',
    diagram: 'trainsmart',
    year: '2025',
    metric: { value: '5', label: 'connected features on one SQL Server data model' },
  },
]

export type TimelineItem = {
  period: string
  title: string
  org: string
  type: 'education' | 'work' | 'academic' | 'training'
  description?: string
  tech?: string[]
  placeholder?: boolean
}

export const timeline: TimelineItem[] = [
  {
    period: '2026',
    title: 'Web Developer Intern (OJT)',
    org: 'IAMS, Internal Audit Management System',
    type: 'work',
    description:
      'Worked in a production Laravel app with about 260 API routes. Traced, fixed and documented five bugs in the Internal Control Questionnaire module, across Blade views, jQuery and the JSON API.',
    tech: ['Laravel', 'PHP', 'jQuery', 'MySQL'],
  },
  {
    period: '2026 – present',
    title: 'Thesis: SLSU Campus Wayfinding System',
    org: 'Southern Leyte State University',
    type: 'academic',
    description: 'Building an offline campus navigation kiosk on a Raspberry Pi with a two-person team.',
    tech: ['Node.js', 'SQLite', 'Raspberry Pi'],
  },
  {
    period: '2025',
    title: 'International industry program',
    org: 'The Gifted Solutions and DigiHubPH, Jakarta, Indonesia',
    type: 'training',
    description: 'Took part in an international industry program in Jakarta.',
  },
  {
    period: 'Add date',
    title: 'Technical training or academic experience',
    org: 'Add a workshop, bootcamp, organization role or competition',
    type: 'training',
    placeholder: true,
  },
  {
    period: 'Present',
    title: 'BS Computer Engineering',
    org: 'Southern Leyte State University (SLSU), Philippines',
    type: 'education',
  },
]

export type Certificate = {
  title: string
  issuer: string
  date: string
  category: 'Certification' | 'Online course' | 'Seminar or workshop' | 'Achievement'
  // Put the PDF in public/certificates/ and set e.g. 'certificates/cybersecurity.pdf' to make the card open it.
  file?: string
  placeholder?: boolean
}

export const certificates: Certificate[] = [
  { title: 'Introduction to Cybersecurity', issuer: 'Cisco Networking Academy · DICT-ITU DTC Initiative', date: 'May 2026', category: 'Online course' },
  { title: 'Prompt Like an Engineer', issuer: 'Cisco Networking Academy · DICT-ITU DTC Initiative', date: 'Oct 2026', category: 'Online course' },
  { title: 'Engaging Stakeholders for Success', issuer: 'Cisco Networking Academy · DICT-ITU DTC Initiative', date: 'Oct 2026', category: 'Online course' },
  { title: 'Hardware and Upgrade Support', issuer: 'Cisco Networking Academy · DICT-ITU DTC Initiative', date: 'Oct 2026', category: 'Online course' },
  { title: 'Digital Awareness', issuer: 'Cisco Networking Academy · DICT-ITU DTC Initiative', date: 'Oct 2026', category: 'Online course' },
  { title: 'Seminar or workshop', issuer: 'Add a seminar or workshop you attended', date: '', category: 'Seminar or workshop', placeholder: true },
  { title: 'Academic achievement', issuer: 'Add an award, honor or competition result', date: '', category: 'Achievement', placeholder: true },
]

export const nav = [
  { id: 'home', label: 'Home' },
  { id: 'about', label: 'About' },
  { id: 'projects', label: 'Projects' },
  { id: 'skills', label: 'Skills' },
  { id: 'experience', label: 'Experience' },
  { id: 'resume', label: 'Resume' },
  { id: 'contact', label: 'Contact' },
]

/**
 * Contact form delivery.
 * Leave empty to open the visitor's email app with the message filled in (works with no setup).
 * To receive messages directly, create a free form at https://formspree.io,
 * then set VITE_FORMSPREE_ID in a .env file (see README).
 */
export const formspreeId: string = import.meta.env?.VITE_FORMSPREE_ID ?? ''
