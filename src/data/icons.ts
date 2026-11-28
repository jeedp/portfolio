import {
  siArduino, siC, siCplusplus, siCss, siDotnet, siEspressif, siExpress, siFirebase, siGit, siGithub, siHtml5,
  siJavascript, siJquery, siJupyter, siLaravel, siMysql, siNodedotjs, siPandas, siPhp, siPlatformio, siPostman, siPython, siRaspberrypi,
  siScikitlearn, siSqlite,
} from 'simple-icons'

/**
 * Real brand marks from Simple Icons (CC0). Brands that Simple Icons doesn't carry
 * (Microsoft's, FreeRTOS) get a lettermark instead of a drawn imitation.
 */
export type Brand = { title: string; hex: string; path?: string; letters?: string }

const si = (icon: { title: string; hex: string; path: string }): Brand => ({ title: icon.title, hex: `#${icon.hex}`, path: icon.path })

export const brands: Record<string, Brand> = {
  'C': si(siC),
  'C++': si(siCplusplus),
  'C#': { title: 'C#', hex: '#9b4f96', letters: 'C#' },
  'Python': si(siPython),
  'Jupyter': si(siJupyter),
  'pandas': si(siPandas),
  'scikit-learn': si(siScikitlearn),
  'NetworkX': { title: 'NetworkX', hex: '#2C7FB8', letters: 'NX' },
  'JavaScript': si(siJavascript),
  'PHP': si(siPhp),
  'HTML': si(siHtml5),
  'CSS': si(siCss),
  'Laravel': si(siLaravel),
  'Node.js': si(siNodedotjs),
  'Express': si(siExpress),
  'jQuery': si(siJquery),
  'MySQL': si(siMysql),
  'Microsoft SQL Server': { title: 'SQL Server', hex: '#cc2927', letters: 'SQL' },
  'SQL Server': { title: 'SQL Server', hex: '#cc2927', letters: 'SQL' },
  'SQLite': si(siSqlite),
  'Firebase': si(siFirebase),
  'Arduino': si(siArduino),
  'ESP32': { ...si(siEspressif), title: 'ESP32' },
  'Raspberry Pi': si(siRaspberrypi),
  'FreeRTOS': { title: 'FreeRTOS', hex: '#3ba552', letters: 'RT' },
  'Git': si(siGit),
  'GitHub': si(siGithub),
  'VS Code': { title: 'VS Code', hex: '#2f80ed', letters: 'VS' },
  'Visual Studio': { title: 'Visual Studio', hex: '#865fc5', letters: 'VS' },
  'Arduino IDE': { ...si(siArduino), title: 'Arduino IDE' },
  'PlatformIO': si(siPlatformio),
  'Postman': si(siPostman),
  '.NET Framework': si(siDotnet),
  'Windows Forms': { ...si(siDotnet), title: 'Windows Forms' },
}

/** Near-black marks (GitHub, Express, SQLite) would vanish on a dark page; they take the text colour instead. */
export function isDark(hex: string) {
  const n = parseInt(hex.slice(1), 16)
  const [r, g, b] = [(n >> 16) & 255, (n >> 8) & 255, n & 255]
  return 0.2126 * r + 0.7152 * g + 0.0722 * b < 70
}
