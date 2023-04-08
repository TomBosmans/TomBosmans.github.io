import Markdown from "src/components/markdown.component"
import PostData from "src/types/post-data.type"
import { useLoaderData } from "react-router-dom"
import { usePostPageStyles } from "./post.page.styles"

export const PostPage = () => {
  const post = useLoaderData() as PostData
  const classes = usePostPageStyles()

  return (
    <div className={classes.container}>
      <h1 className={classes.title}>{post.title}</h1>
      <div className={classes.date}>{post.date}</div>
      <div className={classes.content}>
        <Markdown>{post.content}</Markdown>
      </div>
    </div>
  )
}
