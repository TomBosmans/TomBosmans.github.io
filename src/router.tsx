import BlogPage from "./pages/blog.page"
import MainPage from "./pages/main.page"
import PostPage from "./pages/post.page"
import posts from "./posts.json"
import { createHashRouter } from "react-router-dom"

export const router = createHashRouter([
  {
    path: "*",
    element: <MainPage />,
    children: [
      {
        path: "",
        element: <BlogPage />,
        loader: () => posts,
      },
      {
        path: ":slug",
        element: <PostPage />,
        loader: ({ params }) => {
          return posts.find((post) => {
            return post.slug === params.slug
          })
        },
      },
    ],
  },
])
