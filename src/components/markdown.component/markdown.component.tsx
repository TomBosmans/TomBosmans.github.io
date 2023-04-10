import ReactMarkdown from "react-markdown"
import { components } from "./markdown.components.config"

export const Markdown = ({ children }: { children: string }) => {
  return <ReactMarkdown components={components}>{children}</ReactMarkdown>
}
