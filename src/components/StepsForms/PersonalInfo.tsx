import { FormEvent, useMemo, useState } from "react"
import { useLocation, useNavigate } from "react-router";
import { Input } from "./Input";
import { InformationType } from "../../types";

export const PersonalInfo = () => {
  const [error, setError] = useState<string>("");
  const location = useLocation();
  const navigate = useNavigate();
  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError("");
    const form = new FormData(event.currentTarget);
    const formData = {
      firstName: form.get("First Name"),
      lastName: form.get("Last Name"),
      phoneNumber: form.get("Phone Number"),
    };
    if (!formData.firstName || !formData.lastName || !formData.phoneNumber) {
      setError("Please fill in the form correctly !");
      return;
    }
    navigate("/signup/education", { state: formData });
  }
  const cachedData: InformationType = useMemo(() => location.state as InformationType, [location.state]);
  return (
    <form onSubmit={handleSubmit} className="max-w-lg mx-auto bg-slate-100 p-4 mt-20 rounded-md">
      <Input defaultValue={cachedData && cachedData.firstName} title="First Name" placeholder="First Name" />
      <Input defaultValue={cachedData && cachedData.lastName} title="Last Name" placeholder="Last Name" />
      <Input defaultValue={cachedData && cachedData.phoneNumber} title="Phone Number" placeholder="Phone Number" />
      {error && <p className="text-xl text-center text-red-500 mb-3">{error}</p>}
      <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Next Step</button>
    </form>
  )
}
