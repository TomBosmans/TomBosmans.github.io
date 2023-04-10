/* eslint-disable @typescript-eslint/no-unused-vars */
import Code from "src/components/code.component"
import Link from "src/components/link.component"
import Typography from "src/components/typography.component"
import type { Components } from "react-markdown"

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
    <Typography level="body1" gutterBottom={true}>
      {children}
    </Typography>
  ),
  h1: ({ children }) => (
    <Typography level="h1" gutterBottom={true}>
      {children}
    </Typography>
  ),
  h2: ({ children }) => (
    <Typography level="h2" gutterBottom={true}>
      {children}
    </Typography>
  ),
  h3: ({ children }) => (
    <Typography level="h3" gutterBottom={true}>
      {children}
    </Typography>
  ),
  h4: ({ children }) => (
    <Typography level="h4" gutterBottom={true}>
      {children}
    </Typography>
  ),
  h5: ({ children }) => (
    <Typography level="h5" gutterBottom={true}>
      {children}
    </Typography>
  ),
  h6: ({ children }) => (
    <Typography level="h6" gutterBottom={true}>
      {children}
    </Typography>
  ),
}
