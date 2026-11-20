import { ImageIcon } from 'lucide-react'
import type { Project } from '../data/profile'

/**
 * The picture at the top of a project card.
 * With `project.image` set, it shows that screenshot. Until then it draws how the project fits together,
 * with a small note that a screenshot can go here.
 */
export function ProjectVisual({ project, fill = false }: { project: Project; fill?: boolean }) {
  const size = fill ? 'aspect-[16/10] lg:aspect-auto lg:h-full lg:min-h-[420px]' : 'aspect-[16/10]'
  if (project.image) {
    return (
      <img
        src={`${import.meta.env.BASE_URL}${project.image}`}
        alt={`Screenshot of ${project.title}`}
        loading="lazy"
        className={`${size} w-full object-cover`}
      />
    )
  }
  return (
    <div className={`relative w-full bg-raised/60 ${size}`}>
      <div className="bg-grid absolute inset-0 opacity-70" aria-hidden="true" />
      <Diagram kind={project.diagram} title={project.title} />
      <span className="absolute bottom-3 right-3 hidden items-center gap-1.5 sm:inline-flex rounded-md border border-line bg-surface/80 px-2 py-1 font-mono text-[11px] text-muted backdrop-blur">
        <ImageIcon className="size-3.5" aria-hidden="true" /> screenshot coming soon
      </span>
    </div>
  )
}

type Node = { x: number; y: number; w: number; h: number; label: string; sub?: string; core?: boolean }

function Box({ n }: { n: Node }) {
  return (
    <g>
      <rect
        x={n.x} y={n.y} width={n.w} height={n.h} rx={10}
        fill={n.core ? 'var(--accent-soft)' : 'var(--surface)'}
        stroke={n.core ? 'var(--accent)' : 'var(--line)'}
        strokeWidth={1.5}
      />
      <text x={n.x + n.w / 2} y={n.y + (n.sub ? n.h / 2 - 3 : n.h / 2 + 5)} textAnchor="middle" fill="var(--ink)" fontSize={14} fontWeight={600}>{n.label}</text>
      {n.sub && <text x={n.x + n.w / 2} y={n.y + n.h / 2 + 15} textAnchor="middle" fill="var(--muted)" fontSize={12}>{n.sub}</text>}
    </g>
  )
}

const diagrams: Record<Project['diagram'], { nodes: Node[]; wires: string[]; dashed?: string[]; alt: string }> = {
  wayfinding: {
    alt: 'The touchscreen kiosk talks to a Node.js server on a Raspberry Pi, which serves the vector map and SQLite data; a QR code hands the route to a visitor’s phone.',
    nodes: [
      { x: 24, y: 40, w: 132, h: 60, label: 'Touchscreen', sub: 'kiosk browser' },
      { x: 194, y: 120, w: 132, h: 62, label: 'Node + Express', sub: 'Raspberry Pi 4', core: true },
      { x: 364, y: 40, w: 132, h: 60, label: 'Vector map', sub: 'floor plans' },
      { x: 24, y: 200, w: 132, h: 60, label: 'SQLite', sub: 'settings' },
      { x: 364, y: 200, w: 132, h: 60, label: 'Visitor’s phone', sub: 'QR + live GPS' },
    ],
    wires: ['M156 70h19v71h19', 'M326 141h19v-71h19', 'M194 162h-19v68h-19'],
    dashed: ['M326 162h19v68h19'],
  },
  parking: {
    alt: 'RFID reader and ultrasonic sensors feed an ESP32, which drives the gate servos and reports to Firebase; the web dashboard reads Firebase and can open the gate over Bluetooth.',
    nodes: [
      { x: 24, y: 34, w: 132, h: 56, label: 'RFID reader', sub: 'card check' },
      { x: 24, y: 118, w: 132, h: 56, label: 'Ultrasonic', sub: 'slot sensors' },
      { x: 194, y: 72, w: 132, h: 84, label: 'ESP32', sub: 'FreeRTOS, 2 cores', core: true },
      { x: 364, y: 34, w: 132, h: 56, label: 'Gate servos', sub: 'LCD display' },
      { x: 364, y: 118, w: 132, h: 56, label: 'Firebase', sub: 'live data' },
      { x: 194, y: 212, w: 132, h: 56, label: 'Dashboard', sub: 'web, Bluetooth' },
    ],
    wires: ['M156 62h19v35h19', 'M156 146h19v-15h19', 'M326 97h19v-35h19', 'M326 131h19v15h19', 'M430 174v66h-104'],
    dashed: ['M260 212v-56'],
  },
  trainsmart: {
    alt: 'TrainSMART’s data model: a user owns workout templates, logged workouts and body measurements; templates and workouts hold exercises and sets, stored in SQL Server.',
    nodes: [
      { x: 194, y: 24, w: 132, h: 56, label: 'User account', sub: 'validated login', core: true },
      { x: 24, y: 120, w: 132, h: 56, label: 'Templates', sub: 'custom, prebuilt' },
      { x: 194, y: 120, w: 132, h: 56, label: 'Workouts', sub: 'tracked sessions' },
      { x: 364, y: 120, w: 132, h: 56, label: 'Measurements', sub: 'body stats' },
      { x: 109, y: 216, w: 132, h: 56, label: 'Exercises', sub: 'and sets' },
      { x: 279, y: 216, w: 132, h: 56, label: 'SQL Server', sub: 'T-SQL schema' },
    ],
    wires: ['M260 80v40', 'M226 80v20H90v20', 'M294 80v20h136v20', 'M90 176v20h85v20', 'M260 176v20h-85v20', 'M326 148h19v68'],
  },
}

function Diagram({ kind, title }: { kind: Project['diagram']; title: string }) {
  const d = diagrams[kind]
  return (
    <svg viewBox="0 0 520 300" role="img" aria-label={`${title}: ${d.alt}`} className="absolute inset-0 m-auto h-full w-full p-4 sm:p-6">
      {d.wires.map(p => <path key={p} d={p} fill="none" stroke="var(--accent)" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" opacity={0.85} />)}
      {d.dashed?.map(p => <path key={p} d={p} fill="none" stroke="var(--accent)" strokeWidth={2} strokeDasharray="5 5" strokeLinecap="round" opacity={0.85} />)}
      {d.nodes.map(n => <Box key={n.label} n={n} />)}
    </svg>
  )
}
