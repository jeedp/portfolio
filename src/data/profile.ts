/**
 * Everything personal on the site lives in this file.
 * Edit the values here and the whole site (and the résumé section) updates.
 * See README.md, "Updating your information".
 */

export const profile = {
  name: 'Jed B. Padro',
  shortName: 'Jed Padro',
  title: 'Computer Engineering Student',
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
  availability: 'Open to internships',

  headline: 'Building ideas into practical technology.',
  intro:
    "Computer Engineering student at Southern Leyte State University, focused on software engineering. I've built desktop apps, IoT devices and web systems.",
  // Shown in the footer and on the hero spec card.
  updated: 'November 2026',
  timezone: 'Asia/Manila',
  // The words that cycle in the hero, after "Currently exploring".
  focusAreas: ['software development', 'embedded systems', 'the Internet of Things', 'artificial intelligence'],
}

export const about = {
  paragraphs: [
    "I'm a Computer Engineering student at Southern Leyte State University. I like figuring out how things work and building things that solve real problems.",
    "My projects range from user interfaces to circuit boards. I've built desktop applications and web-based systems, and I've worked with microcontrollers, embedded systems and IoT devices. Moving between them has taught me to keep the whole system in mind while paying close attention to the small details that decide whether it actually works.",
    "I'm comfortable with problems I haven't seen before. I'd rather learn a new tool and get an idea working than stay in one lane.",
    "Right now I'm going deeper into software engineering, AI and machine learning, and data engineering. My goal is to build systems that people actually use and that hold up as they grow.",
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

/** Education, as on the résumé. The website shows the degree on the timeline; the PDF shows all of it. */
export const education = {
  degree: 'Bachelor of Science in Computer Engineering',
  school: 'Southern Leyte State University',
  location: 'Southern Leyte, Philippines',
  period: 'Aug 2023 – Present',
  expected: 'Expected May 2027',
  coursework: [
    'Data Structures and Algorithms', 'Object-Oriented Programming', 'Database Management Systems',
    'Software Engineering', 'Digital Logic Design', 'Microprocessor Systems', 'Computer Networks',
    'Operating Systems', 'Embedded Systems',
  ],
}

/** Scholarship, shown with the degree on the site and the résumé. */
export const scholarship = {
  name: 'DOST-SEI Undergraduate Scholar',
  law: 'RA 7687',
  period: '2023 – present',
}

/** Senior high school, shown under the degree on the site and the résumé. */
export const seniorHigh = {
  level: 'Senior High School, STEM strand',
  school: 'Saint Joseph College',
  location: 'Maasin City, Southern Leyte',
  period: '2021 – 2023',
  honors: 'Graduated With Honors',
}

/** Shown on the résumé only. */
export const softSkills = ['Analytical problem solving', 'Critical thinking', 'Time management', 'Continuous learning']

export type SkillGroup = { name: string; icon: 'code' | 'globe' | 'database' | 'cpu' | 'wrench'; items: string[] }

export const skills: SkillGroup[] = [
  { name: 'Programming', icon: 'code', items: ['C', 'C++', 'C#', 'Java', 'Python', 'JavaScript', 'PHP'] },
  { name: 'Web development', icon: 'globe', items: ['HTML', 'CSS', 'Laravel', 'Node.js', 'Express'] },
  { name: 'Databases', icon: 'database', items: ['MySQL', 'SQL Server', 'SQLite', 'Firebase'] },
  { name: 'Embedded systems', icon: 'cpu', items: ['Arduino', 'ESP32', 'Raspberry Pi', 'FreeRTOS'] },
  { name: 'Development tools', icon: 'wrench', items: ['Git', 'GitHub', 'VS Code', 'Visual Studio', 'Arduino IDE', 'Laragon', 'Postman'] },
]

export type Project = {
  id: string
  title: string
  kind: string
  category: 'Desktop' | 'IoT' | 'Web'
  status?: string
  year: string
  summary: string
  problem: string
  objective: string
  // What *you* did. On team projects, name your part.
  contributions: string[]
  features: string[]
  // Only real challenges you solved. Leave out if there's nothing true to say.
  challenges?: { challenge: string; solution: string }[]
  result?: { value: string; label: string }
  tech: string[]
  repo?: string
  availability: string
  // Real screenshots of the running system, in public/projects/. 'wide' for desktop/web views, 'phone' for tall app windows.
  shots: { src: string; alt: string }[]
  shotLayout: 'wide' | 'phone'
}

/** Shown in this order on the page. Add screenshots by setting `image`. */
export const projects: Project[] = [
  {
    id: 'wayfinding',
    title: 'SLSU Campus Wayfinding System',
    kind: 'Undergraduate thesis',
    category: 'Web',
    status: 'In development',
    year: '2026',
    summary: 'An offline touchscreen kiosk that helps students, visitors and staff find buildings, offices and facilities on the SLSU main campus, with a 2D vector map, floor plans and walking directions.',
    problem: 'First-time students and visitors struggle to find buildings, offices and facilities on the main campus.',
    objective: 'Help students, visitors and other campus users locate university buildings, offices, facilities and other important destinations.',
    contributions: ['Performance on the Raspberry Pi 4', 'The QR hand-off that continues a route on a visitor’s phone with live GPS', 'The setup script and guide that turn a blank SD card into a working kiosk'],
    features: ['Runs fully offline from a Raspberry Pi, so it keeps working when the campus network drops', '2D vector campus map with floor plans and walking directions', 'Routes continue on a visitor’s phone through a QR code'],
    challenges: [
      { challenge: 'Floor drawings were 14 MB each, too heavy for a Raspberry Pi 4.', solution: 'Optimised them to 1.5–3 MB per floor so the map pans smoothly.' },
      { challenge: 'Browsers only allow live GPS over HTTPS.', solution: 'The kiosk serves the phone page over a trusted certificate.' },
    ],
    result: { value: '14 → 3 MB', label: 'per floor drawing, so the map runs smoothly on a Raspberry Pi 4' },
    tech: ['JavaScript', 'Node.js', 'Express', 'SQLite', 'Raspberry Pi'],
    repo: 'https://github.com/cymrcsm/slsu-map-navigation',
    availability: 'Team of two · thesis in development · team repository on GitHub',
    shots: [{ src: 'projects/wayfinding-kiosk.webp', alt: 'The SLSU campus kiosk: search and quick-find on the left, the campus vector map with floor switcher in the centre, and the building directory on the right' }],
    shotLayout: 'wide',
  },
  {
    id: 'parking',
    title: 'Smart Parking Gate System',
    kind: 'IoT system',
    category: 'IoT',
    year: '2026',
    summary: 'An IoT parking system that checks RFID cards at the gate, counts free spaces as cars enter and leave, and shows everything on a live web dashboard.',
    problem: 'A manual gate can’t tell drivers how many spaces are free, or check who is allowed in.',
    objective: 'Automate entry for authorised cards and show live space availability on a web dashboard.',
    contributions: ['Wrote the ESP32 firmware, from pin mapping to the FreeRTOS tasks', 'Built the web dashboard on my own', 'Wrote unit tests for the gate and RFID logic and set up the PlatformIO build'],
    features: ['RFID-based vehicle authorisation with servo gates at the entry and exit', 'A live free-space count that updates as cars enter and leave; ultrasonic sensors close each gate once a car has passed', 'Web dashboard with live spaces, gate state and the last 20 events'],
    challenges: [
      { challenge: 'A slow Firebase connection could stall the gate.', solution: 'Gate control and network updates run as separate FreeRTOS tasks on separate ESP32 cores.' },
      { challenge: 'Operators need control even when the internet is down.', solution: 'Manual open and close from the browser, sent straight to the ESP32 over Bluetooth LE.' },
    ],
    result: { value: '2 cores', label: 'gate control and networking kept apart, so the gate never waits on the network' },
    tech: ['C++', 'ESP32', 'FreeRTOS', 'Firebase', 'JavaScript', 'PlatformIO'],
    repo: 'https://github.com/jeedp/Smart-Parking-Gate-System',
    availability: 'Team project: I wrote the firmware and the dashboard, my teammates built the hardware · source on GitHub',
    shots: [{ src: 'projects/parking-dashboard.webp', alt: 'Smart Parking Gate web dashboard showing 5 of 6 spaces free, entries and exits today, gate status, a 24-hour vehicle chart, Bluetooth controls and the access log' }],
    shotLayout: 'wide',
  },
  {
    id: 'trainsmart',
    title: 'TrainSMART',
    kind: 'Desktop application',
    category: 'Desktop',
    year: '2025',
    summary: 'A desktop workout manager that helps users organise routines, track exercises and sets, and follow their fitness measurements over time.',
    problem: 'Routines, workout logs and body measurements are hard to follow when they live in separate notes.',
    objective: 'One desktop app to plan routines, log workouts and track measurements over time.',
    contributions: ['Built the whole application solo', 'Designed the relational data model in T-SQL', 'Implemented user accounts with input validation'],
    features: ['Workout templates, with custom and prebuilt routines', 'Exercise and set management, with workout tracking and history', 'Body measurement tracking'],
    result: { value: '5', label: 'connected features on one SQL Server data model' },
    tech: ['C#', 'Windows Forms', '.NET Framework', 'SQL Server'],
    repo: 'https://github.com/jeedp/TrainSMARTApp',
    availability: 'Solo project · Windows desktop app · source on GitHub',
    shots: [
      { src: 'projects/trainsmart-login.webp', alt: 'TrainSMART welcome screen with Register and Log in buttons' },
      { src: 'projects/trainsmart-workout.webp', alt: 'TrainSMART Workout tab: start an empty workout, your templates and sample templates' },
      { src: 'projects/trainsmart-exercises.webp', alt: 'TrainSMART exercise library listing 122 exercises by muscle group' },
    ],
    shotLayout: 'phone',
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
    period: '2026 – present',
    title: 'Thesis: SLSU Campus Wayfinding System',
    org: 'Southern Leyte State University',
    type: 'academic',
    description: 'Building an offline campus navigation kiosk on a Raspberry Pi with a two-person team.',
    tech: ['Node.js', 'SQLite', 'Raspberry Pi'],
  },
  {
    period: '2026',
    title: 'Web Developer Intern (Summer Internship)',
    org: 'IAMS, Internal Audit Management System',
    type: 'work',
    description:
      'Worked in a production Laravel app with about 260 API routes. Traced, fixed and documented five bugs in the Internal Control Questionnaire module, across Blade views, jQuery and the JSON API.',
    tech: ['Laravel', 'PHP', 'jQuery', 'MySQL'],
  },
  {
    period: 'Add date',
    title: 'Technical training or academic experience',
    org: 'Add a workshop, bootcamp, organization role or competition',
    type: 'training',
    placeholder: true,
  },
  {
    period: 'Aug 2023 – May 2027',
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
  // A thumbnail of the certificate (public/certificates/<name>.jpg). Rebuild them from the PDFs with `npm run thumbs`.
  image?: string
  placeholder?: boolean
}

export const certificates: Certificate[] = [
  { title: 'Introduction to Cybersecurity', issuer: 'Cisco Networking Academy · DICT-ITU DTC Initiative', date: 'May 2026', category: 'Online course', file: 'certificates/introduction-to-cybersecurity.pdf', image: 'certificates/introduction-to-cybersecurity.jpg' },
  { title: 'Prompt Like an Engineer', issuer: 'Cisco Networking Academy · DICT-ITU DTC Initiative', date: 'Oct 2026', category: 'Online course', file: 'certificates/prompt-like-an-engineer.pdf', image: 'certificates/prompt-like-an-engineer.jpg' },
  { title: 'Engaging Stakeholders for Success', issuer: 'Cisco Networking Academy · DICT-ITU DTC Initiative', date: 'Oct 2026', category: 'Online course', file: 'certificates/engaging-stakeholders-for-success.pdf', image: 'certificates/engaging-stakeholders-for-success.jpg' },
  { title: 'Hardware and Upgrade Support', issuer: 'Cisco Networking Academy · DICT-ITU DTC Initiative', date: 'Oct 2026', category: 'Online course', file: 'certificates/hardware-and-upgrade-support.pdf', image: 'certificates/hardware-and-upgrade-support.jpg' },
  { title: 'Digital Awareness', issuer: 'Cisco Networking Academy · DICT-ITU DTC Initiative', date: 'Oct 2026', category: 'Online course', file: 'certificates/digital-awareness.pdf', image: 'certificates/digital-awareness.jpg' },
  { title: 'Seminar or workshop', issuer: 'Add a seminar or workshop you attended', date: '', category: 'Seminar or workshop', placeholder: true },
  { title: 'Academic achievement', issuer: 'Add an award, honor or competition result', date: '', category: 'Achievement', placeholder: true },
]

export const nav = [
  { id: 'work', label: 'Work' },
  { id: 'about', label: 'About' },
  { id: 'contact', label: 'Contact' },
]

/** How I work: Jed's own three principles (title, tagline, explanation). */
export const philosophy = [
  {
    title: 'Practical Learning',
    tagline: 'Turning knowledge into experience.',
    body: 'I learn by applying what I study, through hands-on projects and experiments.',
  },
  {
    title: 'Analytical Problem-Solving',
    tagline: 'Understanding problems before building solutions.',
    body: 'I break challenges down and understand the requirements before choosing the right tools.',
  },
  {
    title: 'Continuous Development',
    tagline: 'Staying curious. Building forward.',
    body: 'I keep learning, strengthening my foundations and looking for ways to grow as an engineer.',
  },
]

/**
 * Contact form delivery.
 * Leave empty to open the visitor's email app with the message filled in (works with no setup).
 * To receive messages directly, create a free form at https://formspree.io,
 * then set VITE_FORMSPREE_ID in a .env file (see README).
 */
export const formspreeId: string = import.meta.env?.VITE_FORMSPREE_ID ?? ''
