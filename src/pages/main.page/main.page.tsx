import { Outlet } from "react-router-dom"
import AppLayout from "src/layouts/app.layout"

export const MainPage = () => {
  return (
    <AppLayout>
      <Outlet />
    </AppLayout>
  )
}
