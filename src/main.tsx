import "@fontsource/public-sans"
import CssBaseline from "@mui/joy/CssBaseline"
import ReactDOM from "react-dom/client"
import { CssVarsProvider } from "@mui/joy/styles"
import { RouterProvider } from "react-router-dom"
import { StrictMode } from "react"
import { router } from "./router"

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <StrictMode>
    <CssVarsProvider defaultMode="system">
      <CssBaseline />
      <RouterProvider router={router} />
    </CssVarsProvider>
  </StrictMode>,
)
