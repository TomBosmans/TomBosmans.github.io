import SyntaxHighlighter from "../syntax-highlighter.component"
import { CodeProps } from "./code.component.types"

export const Code = ({ inline, ...props }: CodeProps) => {
  return inline ? <code {...props} /> : <SyntaxHighlighter {...props} />
}
