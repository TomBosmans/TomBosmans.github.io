import Link from "../link.component"
import { NavLink as unstyledLink } from "react-router-dom"
import { NavLinkProps } from "./nav-link.component.types"

export const NavLink = ({ children, ...props }: NavLinkProps) => {
  return (
    <Link component={unstyledLink} {...props}>
      {children}
    </Link>
  )
}
