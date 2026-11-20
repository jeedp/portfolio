import type { Project } from '../data/profile'

/**
 * The picture for a project. With `project.image` set it shows that screenshot;
 * until then it draws how the project fits together.
 */
export function ProjectVisual({ project, tall = false }: { project: Project; tall?: boolean }) {
  const ratio = tall ? 'aspect-[16/11] lg:aspect-auto lg:h-full lg:min-h-[380px]' : 'aspect-[16/10]'
  if (project.image) {
    return <img src={`${import.meta.env.BASE_URL}${project.image}`} alt={`Screenshot of ${project.title}`} loading="lazy" className={`${ratio} w-full object-cover object-top`} />
  }
  return (
    <div className={`dots relative w-full bg-raised/50 ${ratio}`}>
      <Diagram kind={project.diagram} title={project.title} />
    </div>
  )
}

type Node = { x: number; y: number; w: number; h: number; label: string; sub?: string; core?: boolean }

function Box({ n }: { n: Node }) {
  return (
    <g>
      <rect x={n.x} y={n.y} width={n.w} height={n.h} rx={12} fill={n.core ? 'var(--accent)' : 'var(--surface)'} stroke={n.core ? 'none' : 'var(--line-strong)'} strokeWidth={1.25} />
      <text x={n.x + n.w / 2} y={n.y + (n.sub ? n.h / 2 - 2 : n.h / 2 + 5)} textAnchor="middle" fill={n.core ? 'var(--on-accent)' : 'var(--ink)'} fontSize={15} fontWeight={500} fontFamily="var(--font-sans)">{n.label}</text>
      {n.sub && <text x={n.x + n.w / 2} y={n.y + n.h / 2 + 17} textAnchor="middle" fill={n.core ? 'var(--on-accent)' : 'var(--muted)'} fillOpacity={n.core ? 0.8 : 1} fontSize={12} fontFamily="var(--font-sans)">{n.sub}</text>}
    </g>
  )
}

const diagrams: Record<Project['diagram'], { nodes: Node[]; wires: string[]; dashed?: string[]; alt: string }> = {
  wayfinding: {
    alt: 'The touchscreen kiosk talks to a Node.js server on a Raspberry Pi, which serves the vector map and SQLite data; a QR code hands the route to a visitor’s phone.',
    nodes: [
      { x: 40, y: 50, w: 150, h: 62, label: 'Touchscreen', sub: 'Kiosk browser' },
      { x: 265, y: 130, w: 170, h: 70, label: 'Node + Express', sub: 'Raspberry Pi 4', core: true },
      { x: 510, y: 50, w: 150, h: 62, label: 'Vector map', sub: 'Floor plans' },
      { x: 40, y: 218, w: 150, h: 62, label: 'SQLite', sub: 'Settings' },
      { x: 510, y: 218, w: 150, h: 62, label: 'Visitor’s phone', sub: 'QR + live GPS' },
    ],
    wires: ['M190 81h37v73h38', 'M435 154h37v-73h38', 'M265 176h-37v73h-38'],
    dashed: ['M435 176h37v73h38'],
  },
  parking: {
    alt: 'RFID reader and ultrasonic sensors feed an ESP32, which drives the gate servos and reports to Firebase; the web dashboard reads Firebase and can open the gate over Bluetooth.',
    nodes: [
      { x: 40, y: 40, w: 150, h: 58, label: 'RFID reader', sub: 'Card check' },
      { x: 40, y: 124, w: 150, h: 58, label: 'Ultrasonic', sub: 'Slot sensors' },
      { x: 265, y: 72, w: 170, h: 78, label: 'ESP32', sub: 'FreeRTOS, 2 cores', core: true },
      { x: 510, y: 40, w: 150, h: 58, label: 'Gate servos', sub: 'LCD display' },
      { x: 510, y: 124, w: 150, h: 58, label: 'Firebase', sub: 'Live data' },
      { x: 265, y: 230, w: 170, h: 58, label: 'Web dashboard', sub: 'Bluetooth control' },
    ],
    wires: ['M190 69h37v31h38', 'M190 153h37v-31h38', 'M435 100h37v-31h38', 'M435 122h37v31h38', 'M585 182v77H435'],
    dashed: ['M350 230v-80'],
  },
  trainsmart: {
    alt: 'TrainSMART’s data model: a user owns workout templates, logged workouts and body measurements; templates and workouts hold exercises and sets, all stored in SQL Server.',
    nodes: [
      { x: 265, y: 26, w: 170, h: 58, label: 'User account', sub: 'Validated login', core: true },
      { x: 40, y: 128, w: 160, h: 58, label: 'Templates', sub: 'Custom, prebuilt' },
      { x: 270, y: 128, w: 160, h: 58, label: 'Workouts', sub: 'Tracked sessions' },
      { x: 500, y: 128, w: 160, h: 58, label: 'Measurements', sub: 'Body stats' },
      { x: 155, y: 232, w: 160, h: 58, label: 'Exercises', sub: 'And sets' },
      { x: 385, y: 232, w: 160, h: 58, label: 'SQL Server', sub: 'T-SQL schema' },
    ],
    wires: ['M350 84v44', 'M300 84v22H120v22', 'M400 84v22h180v22', 'M120 186v23h115v23', 'M350 186v23H235v23', 'M580 186v23H465v23'],
  },
}

function Diagram({ kind, title }: { kind: Project['diagram']; title: string }) {
  const d = diagrams[kind]
  return (
    <svg viewBox="0 0 700 320" role="img" aria-label={`${title}: ${d.alt}`} className="absolute inset-0 h-full w-full p-5 sm:p-8">
      {d.wires.map(p => <path key={p} d={p} fill="none" stroke="var(--accent)" strokeOpacity={0.6} strokeWidth={1.5} strokeLinejoin="round" />)}
      {d.dashed?.map(p => <path key={p} d={p} fill="none" stroke="var(--accent)" strokeOpacity={0.6} strokeWidth={1.5} strokeDasharray="4 5" />)}
      {d.nodes.map(n => <Box key={n.label} n={n} />)}
    </svg>
  )
}
