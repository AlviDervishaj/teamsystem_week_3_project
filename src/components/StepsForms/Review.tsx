import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom"
import { useState } from "react"
import { InformationType } from "../../types";
import { DisplayedReview } from "../DisplayReview";


export const Review = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [user, setUser] = useState<InformationType>({
    firstName: "",
    lastName: "",
    phoneNumber: "",
    university: "",
    type: "",
    startYear: "",
    graduatedYear: "",
    skills: { react: "", typescript: "", nextJs: "", }
  });

  useEffect(() => {
    if (!location.state) {
      navigate("/signup");
      return;
    }
    setUser(location.state);
    console.log({ state: location.state });
  }, [location, navigate]);

  useEffect(() => {
    function saveToStorage() {
      const prevStateLocal = JSON.parse(localStorage.getItem("reviews") as string) as InformationType[];
      console.log({ prevStateLocal });
      prevStateLocal.push(user);
      localStorage.setItem("reviews", JSON.stringify(prevStateLocal));
      return;
    };
    window.addEventListener("beforeunload", saveToStorage);
    return () => {
      window.removeEventListener("beforeunload", saveToStorage);
    }
  }, [user]);
  return (
    <DisplayedReview review={user} />
  )
}


