import ColorSchemeSwitch from "src/features/color-scheme-switch.feature"
import Grid from "src/components/grid.component"
import Header from "src/components/header.component"
import NavLink from "src/components/nav-link.component"
import Stack from "src/components/stack.component"
import Typograpy from "src/components/typography.component"
import { AppLayoutProps } from "./app.layout.types"

export const AppLayout = ({ children }: AppLayoutProps) => {
  return (
    <Stack spacing={2}>
      <Header>
        <Typograpy component={NavLink} to={"/"} level="h5">
          Tom Bosmans
        </Typograpy>
        <ColorSchemeSwitch />
      </Header>
      <Grid sx={{ display: "flex", justifyContent: "center" }}>{children}</Grid>
    </Stack>
  )
}
