import { useEffect, useMemo } from "react";
import { useLocation, useNavigate } from "react-router-dom"
import { FormEvent, useState } from "react"
import { Input } from "./Input";
import { InformationType } from "../../types";

export const Education = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [error, setError] = useState<string>("");

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
      university: form.get("University Name"),
      startYear: form.get("Start Year"),
      graduatedYear: form.get("Graduated Year"),
      type: form.get("Type"),
    };
    if (!formData.university || !formData.startYear || !formData.graduatedYear || !formData.type) {
      setError("Please fill in the form correctly !");
      return;
    }
    const prevState: Pick<InformationType, "firstName" | "lastName" | "phoneNumber"> = location.state;
    navigate("/signup/skills", { state: { ...prevState, ...formData } });
  }

  const cachedData: InformationType = useMemo(() => location.state as InformationType, [location.state]);
  return (
    <form onSubmit={handleSubmit} className="max-w-lg mx-auto bg-slate-100 p-4 mt-20 rounded-md">
      <Input defaultValue={cachedData && cachedData.university} title="University Name" placeholder="University Name" />
      <Input defaultValue={cachedData && cachedData.startYear} title="Start Year" placeholder="Start Year" />
      <Input defaultValue={cachedData && cachedData.graduatedYear} title="Graduated Year" placeholder="Graduated Year" />
      <Input defaultValue={cachedData && cachedData.type} title="Type" placeholder="Bachelor or Master" />
      {error && <p className="text-xl text-center text-red-500 mb-3">{error}</p>}
      <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Next Step</button>
    </form>
  )
}

