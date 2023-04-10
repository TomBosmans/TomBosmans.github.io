import type { LinkProps } from "src/components/link.component"
import type { NavLinkProps as BaseNavLinkProps } from "react-router-dom"

export type NavLinkProps = BaseNavLinkProps & LinkProps
