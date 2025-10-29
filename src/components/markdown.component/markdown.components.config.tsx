/* eslint-disable @typescript-eslint/no-unused-vars */
import Code from "src/components/code.component"
import Link from "src/components/link.component"
import Typography from "src/components/typography.component"
import type { Components } from "react-markdown"
import Table from "src/components/table.component"
import Blockquote from "../blockquote.component"

export const components: Components = {
  code: ({ node: _node, ...props }) => <Code {...props} />,
  a: ({ children, href }) => (
    <Link href={href} target="_blank">
      {children}
    </Link>
  ),
  li: ({ children }) => (
    <li>
      <Typography level="body1">{children}</Typography>
    </li>
  ),
  p: ({ children }) => (
    <Typography level="body1" gutterBottom>
      {children}
    </Typography>
  ),
  h1: ({ children }) => (
    <Typography level="h1" gutterBottom>
      {children}
    </Typography>
  ),
  h2: ({ children }) => (
    <Typography level="h2" gutterBottom>
      {children}
    </Typography>
  ),
  h3: ({ children }) => (
    <Typography level="h3" gutterBottom>
      {children}
    </Typography>
  ),
  h4: ({ children }) => (
    <Typography level="h4" gutterBottom>
      {children}
    </Typography>
  ),
  h5: ({ children }) => (
    <Typography level="h5" gutterBottom>
      {children}
    </Typography>
  ),
  h6: ({ children }) => (
    <Typography level="h6" gutterBottom>
      {children}
    </Typography>
  ),
  blockquote: ({ children }) => <Blockquote>{children}</Blockquote>,
  table: ({ children }) => (
    <Table variant="plain" size="md" sx={{ marginBottom: 2, marginTop: 2 }}>
      {children}
    </Table>
  ),
}
