import type { Project } from '../data/profile'

/**
 * The picture for a project, framed like an app window.
 * With `project.image` set it shows that screenshot. Until then it draws how the project fits together.
 */
export function ProjectVisual({ project }: { project: Project }) {
  const slug = project.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '')
  return (
    <figure className="overflow-hidden rounded-xl border border-line bg-surface">
      <div className="flex items-center gap-3 border-b border-line px-4 py-2.5">
        <span className="flex gap-1.5" aria-hidden="true">
          <i className="size-2.5 rounded-full bg-line-strong" /><i className="size-2.5 rounded-full bg-line-strong" /><i className="size-2.5 rounded-full bg-line-strong" />
        </span>
        <span className="truncate font-mono text-xs text-muted">~/{slug}{project.image ? '' : ' — how it fits together'}</span>
      </div>
      {project.image ? (
        <img
          src={`${import.meta.env.BASE_URL}${project.image}`}
          alt={`Screenshot of ${project.title}`}
          loading="lazy"
          className="aspect-[16/9] w-full object-cover object-top"
        />
      ) : (
        <div className="dots relative aspect-[16/10] w-full sm:aspect-[7/3]">
          <Diagram kind={project.diagram} title={project.title} />
        </div>
      )}
    </figure>
  )
}

type Node = { x: number; y: number; w: number; h: number; label: string; sub?: string; core?: boolean }

function Box({ n }: { n: Node }) {
  return (
    <g>
      <rect x={n.x} y={n.y} width={n.w} height={n.h} rx={8} fill="var(--bg)" stroke={n.core ? 'var(--accent)' : 'var(--line-strong)'} strokeWidth={1.25} />
      <text x={n.x + n.w / 2} y={n.y + (n.sub ? n.h / 2 - 2 : n.h / 2 + 5)} textAnchor="middle" fill="var(--ink)" fontSize={14} fontWeight={500} fontFamily="var(--font-sans)">{n.label}</text>
      {n.sub && <text x={n.x + n.w / 2} y={n.y + n.h / 2 + 16} textAnchor="middle" fill="var(--muted)" fontSize={11.5} fontFamily="var(--font-mono)">{n.sub}</text>}
    </g>
  )
}

const diagrams: Record<Project['diagram'], { nodes: Node[]; wires: string[]; dashed?: string[]; alt: string }> = {
  wayfinding: {
    alt: 'The touchscreen kiosk talks to a Node.js server on a Raspberry Pi, which serves the vector map and SQLite data; a QR code hands the route to a visitor’s phone.',
    nodes: [
      { x: 40, y: 50, w: 150, h: 62, label: 'Touchscreen', sub: 'kiosk browser' },
      { x: 265, y: 132, w: 170, h: 66, label: 'Node + Express', sub: 'raspberry pi 4', core: true },
      { x: 510, y: 50, w: 150, h: 62, label: 'Vector map', sub: 'floor plans' },
      { x: 40, y: 218, w: 150, h: 62, label: 'SQLite', sub: 'settings' },
      { x: 510, y: 218, w: 150, h: 62, label: 'Visitor’s phone', sub: 'qr + live gps' },
    ],
    wires: ['M190 81h37v73h38', 'M435 154h37v-73h38', 'M265 176h-37v73h-38'],
    dashed: ['M435 176h37v73h38'],
  },
  parking: {
    alt: 'RFID reader and ultrasonic sensors feed an ESP32, which drives the gate servos and reports to Firebase; the web dashboard reads Firebase and can open the gate over Bluetooth.',
    nodes: [
      { x: 40, y: 40, w: 150, h: 58, label: 'RFID reader', sub: 'card check' },
      { x: 40, y: 124, w: 150, h: 58, label: 'Ultrasonic', sub: 'slot sensors' },
      { x: 265, y: 74, w: 170, h: 74, label: 'ESP32', sub: 'freertos · 2 cores', core: true },
      { x: 510, y: 40, w: 150, h: 58, label: 'Gate servos', sub: 'lcd display' },
      { x: 510, y: 124, w: 150, h: 58, label: 'Firebase', sub: 'live data' },
      { x: 265, y: 230, w: 170, h: 58, label: 'Web dashboard', sub: 'bluetooth control' },
    ],
    wires: ['M190 69h37v31h38', 'M190 153h37v-31h38', 'M435 100h37v-31h38', 'M435 122h37v31h38', 'M585 182v77H435'],
    dashed: ['M350 230v-82'],
  },
  trainsmart: {
    alt: 'TrainSMART’s data model: a user owns workout templates, logged workouts and body measurements; templates and workouts hold exercises and sets, all stored in SQL Server.',
    nodes: [
      { x: 265, y: 26, w: 170, h: 58, label: 'User account', sub: 'validated login', core: true },
      { x: 40, y: 128, w: 160, h: 58, label: 'Templates', sub: 'custom · prebuilt' },
      { x: 270, y: 128, w: 160, h: 58, label: 'Workouts', sub: 'tracked sessions' },
      { x: 500, y: 128, w: 160, h: 58, label: 'Measurements', sub: 'body stats' },
      { x: 155, y: 232, w: 160, h: 58, label: 'Exercises', sub: 'and sets' },
      { x: 385, y: 232, w: 160, h: 58, label: 'SQL Server', sub: 't-sql schema' },
    ],
    wires: ['M350 84v44', 'M300 84v22H120v22', 'M400 84v22h180v22', 'M120 186v23h115v23', 'M350 186v23H235v23', 'M580 186v23H465v23'],
  },
}

function Diagram({ kind, title }: { kind: Project['diagram']; title: string }) {
  const d = diagrams[kind]
  return (
    <svg viewBox="0 0 700 320" role="img" aria-label={`${title}: ${d.alt}`} className="absolute inset-0 h-full w-full p-3 sm:px-10 sm:py-6">
      {d.wires.map(p => <path key={p} d={p} fill="none" stroke="var(--accent)" strokeOpacity={0.7} strokeWidth={1.5} strokeLinejoin="round" />)}
      {d.dashed?.map(p => <path key={p} d={p} fill="none" stroke="var(--accent)" strokeOpacity={0.7} strokeWidth={1.5} strokeDasharray="4 5" />)}
      {d.nodes.map(n => <Box key={n.label} n={n} />)}
    </svg>
  )
}
