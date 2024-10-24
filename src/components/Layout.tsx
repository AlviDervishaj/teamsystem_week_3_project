import { Outlet } from "react-router"
import { Navigation } from "./Navigation"

export const Layout = () => {
  return (
    <>
      <Navigation />
      <Outlet />
    </>
  )
}
