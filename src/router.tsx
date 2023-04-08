import { createBrowserRouter } from "react-router-dom"
import BlogPage from "./pages/blog.page"
import PostPage from "./pages/post.page"
import posts from "./posts.json"

export const router = createBrowserRouter([
  {
    path: "*",
    element: <BlogPage />,
    loader: () => posts,
  },
  {
    path: "/:slug",
    element: <PostPage />,
    loader: ({ params }) => {
      return posts.find((post) => {
        return post.slug === params.slug
      })
    },
  },
])
