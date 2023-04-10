import Grid from "src/components/grid.component"
import NavLink from "src/components/nav-link.component"
import PostData from "src/types/post-data.type"
import Stack from "src/components/stack.component"
import Typography from "src/components/typography.component"
import usePageData from "src/hooks/use-page-data.hook"

export const BlogPage = () => {
  const posts = usePageData<PostData[]>()

  return (
    <Stack spacing={2}>
      {posts.map((post) => (
        <Grid key={post.slug}>
          <NavLink sx={{ fontWeight: "bold" }} to={`/${post.slug}`}>
            {post.title}
          </NavLink>
          <Typography level="body2">{post.date}</Typography>
        </Grid>
      ))}
    </Stack>
  )
}
