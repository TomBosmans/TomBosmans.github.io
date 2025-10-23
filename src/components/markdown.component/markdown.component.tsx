import ReactMarkdown from "react-markdown"
import { components } from "./markdown.components.config"
import remarkGfm from "remark-gfm"

export const Markdown = ({ children }: { children: string }) => {
  return (
    <ReactMarkdown components={components} remarkPlugins={[remarkGfm]}>
      {children}
    </ReactMarkdown>
  )
}
