import fs from "fs"
import path from "path"
import matter from "gray-matter"

const POSTS_DIR = "./posts"
const OUTPUT_FILE = "./src/posts.json"

const getPostsData = () => {
  const filenames = fs.readdirSync(POSTS_DIR)

  const posts = filenames.map((filename) => {
    const filePath = path.join(POSTS_DIR, filename)
    const fileContent = fs.readFileSync(filePath, "utf-8")
    const { data, content } = matter(fileContent)

    const slug = filename.replace(/\.md$/, "")

    return {
      ...data,
      content,
      date: formatDate(data.date),
      tags: data.tags?.split(",") || [],
      slug,
    }
  })

  return posts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
}

const formatDate = (date: string) => {
  return new Date(date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  })
}

const postsData = JSON.stringify(getPostsData(), null, 2)
fs.writeFileSync(OUTPUT_FILE, postsData, "utf-8")
