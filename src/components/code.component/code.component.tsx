import SyntaxHighlighter from "src/components/syntax-highlighter.component"
import Typography from "src/components/typography.component"
import { CodeProps } from "./code.component.types"

export const Code = ({ inline, ...props }: CodeProps) => {
  return inline ? (
    <Typography variant="soft" level="body2" {...props} />
  ) : (
    <SyntaxHighlighter {...props} />
  )
}
