import { Outlet } from "react-router";
import { Steps } from "../components/Steps"

export const Signup = () => {
  return (
    <div className="w-full h-full">
      <div className="max-w-xl pt-12 mx-auto">
        <Steps />
        <Outlet />
      </div>
    </div>
  )
}
