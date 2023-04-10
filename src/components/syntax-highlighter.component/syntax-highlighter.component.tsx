import { Prism } from "react-syntax-highlighter"
import { SyntaxHighlighterProps } from "./syntax-highlighter.component.types"
import { useColorScheme } from "src/hooks/use-color-scheme.hook"
import {
  oneLight as lightStyle,
  oneDark as darkStyle,
} from "react-syntax-highlighter/dist/esm/styles/prism"

export const SyntaxHighlighter = ({ children, className, ...props }: SyntaxHighlighterProps) => {
  const { colorScheme } = useColorScheme()
  const match = /language-(\w+)/.exec(className || "")
  const language = match?.[1]
  const style = colorScheme === "dark" ? darkStyle : lightStyle

  return (
    <Prism {...props} style={style} language={language}>
      {String(children).replace(/\n$/, "")}
    </Prism>
  )
}
