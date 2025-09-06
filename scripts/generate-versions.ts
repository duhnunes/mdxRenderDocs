// scripts/generate-versions.ts
import fs from 'fs'
import path from 'node:path'

const versionDir = path.join(process.cwd(), 'versioned')
const outputPath = path.join(process.cwd(), 'versions.json')

if (!fs.existsSync(versionDir)) {
  console.warn(
    'Folder "versioned/" not found. Creating empty folder and version.json.'
  )
  fs.mkdirSync(versionDir, { recursive: true })
  fs.writeFileSync(outputPath, JSON.stringify([], null, 2))
  process.exit(0)
}

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

fs.writeFileSync(outputPath, JSON.stringify(versions, null, 2))
