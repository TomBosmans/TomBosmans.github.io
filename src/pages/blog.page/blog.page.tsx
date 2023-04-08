import { Link, useLoaderData } from "react-router-dom"
import PostData from "src/types/post-data.type"
import { useBlogPageStyles } from "./blog.page.styles"

export const BlogPage = () => {
  const posts = useLoaderData() as PostData[]
  const classes = useBlogPageStyles()

  return (
    <div className={classes.container}>
      {posts.map((post) => (
        <div key={post.slug} className={classes.post}>
          <Link to={`/${post.slug}`} className={classes.title}>
            {post.title}
          </Link>
          <div className={classes.date}>{post.date}</div>
        </div>
      ))}
    </div>
  )
}
