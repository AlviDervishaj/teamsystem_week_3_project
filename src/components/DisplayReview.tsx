import { memo, useMemo } from "react";
import { InformationType } from "../types";
import { useNavigate } from "react-router";
export const DisplayedReview = memo(function DisplayedReview({ review }: { review: InformationType }) {
  const navigate = useNavigate();
  const skills = useMemo(() => {
    return Object.entries(review.skills)
  }, [review.skills]);
  return (
    <div className="p-4 border-b-2 border-indigo-500/50">
      <p className="text-xl p-2">Full Name: {review.firstName} {review.lastName}</p>
      <p className="text-xl p-2">Phone Number: {review.phoneNumber}</p>
      <p className="text-xl p-2">University: {review.university} ( {review.type} {review.startYear} ~ {review.graduatedYear} )</p>
      <div className="text-xl p-2">Skills: {
        skills.map((skill) => {
          const lang: string = skill[0];
          const level: string = skill[1];
          return <p key={lang} className="capitalize pl-3 text-xl">{lang}: {level}</p>
        })
      }</div>
      <button className="w-fit h-fit px-3 py-2 m-2 text-center bg-indigo-300 text-slate-900 tracking-wide rounded-lg hover:bg-indigo-200 transition-colors duration-300 ease-in-out" onClick={() => navigate("/signup", { state: review })}>Edit</button>
    </div>
  )
}, (prevProps, nextProps) => {
  return prevProps.review.firstName === nextProps.review.firstName;
})
