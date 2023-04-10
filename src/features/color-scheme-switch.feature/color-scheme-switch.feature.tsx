import Switch from "src/components/switch.component"
import { useColorScheme } from "src/hooks/use-color-scheme.hook"

export const ColorSchemeSwitch = () => {
  const { setMode, colorScheme } = useColorScheme()
  const handleClick = () => setMode(colorScheme === "dark" ? "light" : "dark")

  return <Switch variant="solid" color="neutral" onClick={handleClick} />
}
