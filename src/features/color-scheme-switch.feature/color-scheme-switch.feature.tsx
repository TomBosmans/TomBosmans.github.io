import Switch from "src/components/switch.component"
import { useColorScheme } from "src/hooks/use-color-scheme.hook"

export const ColorSchemeSwitch = () => {
  const { mode, setMode } = useColorScheme()
  const handleClick = () => setMode(mode === "dark" ? "light" : "dark")

  return <Switch variant="solid" color="neutral" onClick={handleClick} />
}
