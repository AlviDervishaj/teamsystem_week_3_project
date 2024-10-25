import { FormEvent, useEffect, useMemo, useState } from "react";
import { useLocation, useNavigate } from "react-router";
import { InformationType } from "../types";

export const EditReview = () => {
  const location = useLocation();
  const [error, setError] = useState<string>("");
  const [message, setMessage] = useState<string>("");
  const navigate = useNavigate();
  const [review, setReview] = useState<InformationType>({
    university: "",
    lastName: "",
    firstName: "",
    graduatedYear: "",
    startYear: "",
    phoneNumber: "",
    type: "",
    skills: { react: "", nextJs: "", typescript: "", },
  });

  useEffect(() => {
    if (!location.state) return;
    setReview(location.state);
  }, [location.state]);

  const skills = useMemo(() => Object.entries(review.skills), [review.skills]);

  const saveChanges = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setMessage("");
    setError("");
    const fd = new FormData(event.currentTarget);

    const data = {
      firstName: fd.get("first_name"),
      lastName: fd.get("last_name"),
      phoneNumber: fd.get("phone_number"),
      university: fd.get("university"),
      type: fd.get("type"),
      startYear: fd.get("start_year"),
      graduatedYear: fd.get("graduated_year"),
    }


    if (!data.firstName || !data.lastName || !data.graduatedYear || !data.university || !data.phoneNumber || !data.type) {
      setError("Please fill in the fields before saving !");
      return;
    }

    console.log({ data });
    const localState: InformationType[] = JSON.parse(localStorage.getItem("reviews") as string) as InformationType[];
    const results = localState.map(predicate => predicate.firstName === location.state.firstName && predicate.lastName === location.state.lastName ? { ...predicate, ...data } : predicate);
    localStorage.setItem("reviews", JSON.stringify(results));
    setMessage("Review Edited Successfully ! Redirecting to Reviews...")

    setTimeout(() => {
      navigate("/reviews");
    }, 5000);
  };
  return (
    <form onSubmit={saveChanges} className="p-4 border-b-2 border-indigo-500/50">
      <div className="text-xl p-2">Full Name:
        <EditInput name={"first_name"} value={review.firstName} />
        <EditInput name={"last_name"} value={review.lastName} />
      </div>
      <div className="text-xl p-2">Phone Number:

        <EditInput name={"phone_number"} value={review.phoneNumber} />
      </div>
      <div className="text-xl p-2">University:
        <EditInput name={"university"} value={review.university} />
        <EditInput name={"type"} value={review.type} />
        <EditInput name={"start_year"} value={review.startYear} />
        <EditInput name={"graduated_year"} value={review.graduatedYear} />
      </div>
      <div className="text-xl p-2">Skills: {
        skills.map((skill) => {
          const lang: string = skill[0];
          const level: string = skill[1];
          return <p key={lang} className="capitalize pl-3 text-xl">{lang}: {level}</p>
        })
      }</div>
      {error && <p className="pt-4 text-xl text-red-400 tracking-wide">{error}</p>}
      {message && <p className="pt-4 text-xl text-green-400 tracking-wide">{message}</p>}
      <button className="w-fit h-fit px-3 py-2 m-2 text-center bg-indigo-300 text-slate-900 tracking-wide rounded-lg hover:bg-indigo-200 transition-colors duration-300 ease-in-out">Save</button>
    </form >
  );
}

const EditInput = ({ name, value }: { name: string, value: string }) => {
  return (
    <input name={name} defaultValue={value} className="bg-transparent border-t-0 border-x-0 border-b-2 !border-b-indigo-500 w-36 mr-4" />
  )
}
