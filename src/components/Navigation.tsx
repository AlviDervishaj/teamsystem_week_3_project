import { NavLink } from "react-router-dom"

type NavLinkType = {
  title: string,
  to: string,
}

const paths: NavLinkType[] = [
  { title: "Home", to: "/" },
  { title: "Reviews", to: "/reviews" },
];

export const Navigation = () => {
  return (
    <nav className="w-dvw h-fit py-2 flex flex-row items-center content-center justify-evenly bg-indigo-500/60">
      {paths.map(path => <StyledNavLink key={path.title} {...path} />)}
    </nav>
  )
}

const StyledNavLink = ({ title, to }: { title: string, to: string }) => {
  return (
    <NavLink to={to} className={({ isActive }) => [
      isActive ? "bg-slate-100/50 !text-slate-900" : "",
      " text-lg tracking-wide p-4 text-slate-200 font-medium rounded-md"
    ].join(" ")
    }>{title}</NavLink>
  )

}
