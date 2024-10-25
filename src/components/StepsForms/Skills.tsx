import { FormEvent, useState, useEffect, useMemo } from "react"
import { useLocation, useNavigate } from "react-router-dom"
import { InformationType } from "../../types";

export const Skills = () => {
  const [error, setError] = useState<string>("");
  const navigate = useNavigate();

  const location = useLocation();
  useEffect(() => {
    if (!location.state) {
      navigate("/signup");
      return;
    }
  }, [location, navigate]);
  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError("");
    const form = new FormData(event.currentTarget);
    const formData = {
      react: form.get("react_skills"),
      typescript: form.get("typescript_skills"),
      nextJs: form.get("nextjs_skills"),
    };
    if (!formData.react || !formData.typescript || !formData.nextJs) {
      setError("Please fill in the form correctly !");
      return;
    }
    const prevState = location.state as Omit<InformationType, "skills">;
    const prevStateLocal = JSON.parse(localStorage.getItem("reviews") as string) as InformationType[];
    if (!prevStateLocal) {
      const _temp = [
        { ...location.state, skills: { ...formData } },
      ]
      localStorage.setItem("reviews", JSON.stringify(_temp));
      navigate("/signup/review", { state: { ...prevState, skills: formData } });
      return;
    }
    const itemIndex = prevStateLocal.findIndex(predicate => predicate.firstName === location.state.firstName);
    if (itemIndex === -1) {
      prevStateLocal.push({ ...prevState, skills: { ...formData as InformationType["skills"] } });
    }
    else {
      prevStateLocal.map((elem) => elem.firstName === location.state.firstName ? location.state : elem);

    }

    localStorage.setItem("reviews", JSON.stringify(prevStateLocal));
    navigate("/signup/review", { state: { ...prevState, skills: formData } });
  }

  const cachedData: InformationType = useMemo(() => location.state as InformationType, [location.state]);
  return (
    <form onSubmit={handleSubmit} className="max-w-lg mx-auto bg-slate-100 p-4 mt-20 rounded-md">
      <div className="mb-5">
        <p className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">React </p>
        <select name="react_skills" defaultValue={cachedData && cachedData.skills?.react} className="text-slate-800 rounded-md">
          <option value="">Select React Skill Level</option>
          <option value="junior">Junior</option>
          <option value="intermediate">Intermediate</option>
          <option value="senior">Senior</option>
        </select>
      </div>
      <div className="mb-5">
        <p className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Typescript </p>
        <select name="typescript_skills" defaultValue={cachedData && cachedData.skills?.typescript} className="text-slate-800 rounded-md">
          <option value="">Select Typescript Skill Level</option>
          <option value="junior">Junior</option>
          <option value="intermediate">Intermediate</option>
          <option value="senior">Senior</option>
        </select>
      </div>
      <div className="mb-5">
        <p className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">NextJs </p>
        <select name="nextjs_skills" defaultValue={cachedData && cachedData.skills?.nextJs} className="text-slate-800 rounded-md">
          <option value="">Select NextJs Skill Level</option>
          <option value="junior">Junior</option>
          <option value="intermediate">Intermediate</option>
          <option value="senior">Senior</option>
        </select>
      </div>
      {error && <p className="text-xl text-center text-red-500 mb-3">{error}</p>}
      <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Next Step</button>
    </form>
  )
}

