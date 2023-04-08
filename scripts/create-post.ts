import * as fs from "fs"
import * as path from "path"

const POSTS_DIR = "./posts"

function formatDate(date: Date): string {
  const year = date.getFullYear().toString()
  const month = (date.getMonth() + 1).toString().padStart(2, "0")
  const day = date.getDate().toString().padStart(2, "0")
  return `${year}-${month}-${day}`
}

function kebabCase(str: string): string {
  return str
    .replace(/[A-Z]/g, (match) => `-${match.toLowerCase()}`)
    .replace(/[\s_-]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .toLowerCase()
}

function createFile(title: string, tags: string[] = []) {
  const currentDate = new Date()
  const formattedDate = formatDate(currentDate)
  const fileName = `${formattedDate}-${kebabCase(title)}.md`
  const filePath = path.join(POSTS_DIR, fileName)
  const fileContent = `---
title: ${title}
date: ${formattedDate}
${`tags: ${tags.join(", ")}`}
---

Write your content here...
`
  fs.writeFileSync(filePath, fileContent)
  console.log(`File ${fileName} has been created!`)
}

const args = process.argv.slice(2)
const title = args[0]
const tagsIndex = args.indexOf("--tags")
const tags = tagsIndex !== -1 ? args[tagsIndex + 1].split(",") : []

createFile(title, tags)
