import Chip from "src/components/chip.component"
import Container from "src/components/container.component"
import Divider from "src/components/divider.component"
import Markdown from "src/components/markdown.component"
import PostData from "src/types/post-data.type"
import Stack from "src/components/stack.component"
import Typography from "src/components/typography.component"
import usePageData from "src/hooks/use-page-data.hook"

const Tags = () => {
  const { tags } = usePageData<PostData>()

  return (
    <Stack direction="row" spacing={1}>
      {tags.map((tag) => (
        <Chip variant="outlined" size="sm" key={tag}>
          {tag}
        </Chip>
      ))}
    </Stack>
  )
}

export const PostPage = () => {
  const post = usePageData<PostData>()

  return (
    <Container sx={{ paddingBottom: 5 }}>
      <Typography level="h1">{post.title}</Typography>
      <Typography level="body2" gutterBottom={true}>
        {post.date}
      </Typography>
      <Tags />
      <Divider sx={{ marginTop: 2, marginBottom: 2 }} />
      <Markdown>{post.content}</Markdown>
    </Container>
  )
}
