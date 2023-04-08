import { Prism } from "react-syntax-highlighter"
import { ghcolors as style } from "react-syntax-highlighter/dist/esm/styles/prism"
import { SyntaxHighlighterProps } from "./syntax-highlighter.component.types"

export const SyntaxHighlighter = ({ children, className, ...props }: SyntaxHighlighterProps) => {
  const match = /language-(\w+)/.exec(className || "")
  const language = match?.[1]

  return (
    <Prism {...props} style={style} language={language}>
      {String(children).replace(/\n$/, "")}
    </Prism>
  )
}
