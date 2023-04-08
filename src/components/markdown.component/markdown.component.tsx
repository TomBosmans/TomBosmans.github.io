import Code from "../code.component"
import ReactMarkdown, { Components } from "react-markdown"

const components: Components = {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  code: ({ node: _node, ...props }) => {
    return <Code {...props} />
  },
}

export const Markdown = ({ children }: { children: string }) => {
  return <ReactMarkdown components={components}>{children}</ReactMarkdown>
}
