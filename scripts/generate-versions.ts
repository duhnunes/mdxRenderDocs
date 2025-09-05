// scripts/generate-versions.ts
import fs from 'fs'
import path from 'node:path'

const versionDir = path.join(process.cwd(), 'versioned')
const folders = fs.readdirSync(versionDir)

const versions = folders
  .filter((folder) => folder.startsWith('version-'))
  .sort((a, b) =>
    b
      .replace('version-', '')
      .localeCompare(a.replace('version-', ''), undefined, {
        numeric: true,
        sensitivity: 'base',
      })
  )

const outputPath = path.join(process.cwd(), 'versions.json')
fs.writeFileSync(outputPath, JSON.stringify(versions, null, 2))
