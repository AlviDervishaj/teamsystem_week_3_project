import { useNavigate } from "react-router"

export const Home = () => {
  const navigate = useNavigate();
  return (
    <button className="w-fit h-fit px-3 py-4 text-center bg-indigo-300 text-slate-900 tracking-wide absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-lg hover:bg-indigo-200 transition-colors duration-300 ease-in-out" onClick={() => navigate("/signup")}>Proceed to Sign Up</button>
  )
}
