import { useEffect, useMemo, useState } from "react"
import { DisplayedReview } from "../components/DisplayReview";
import { useNavigate } from "react-router";
import { Filters } from "../components/Filters";
import { useSearchParams } from "react-router-dom";

type InformationType = {
  firstName: string,
  lastName: string,
  phoneNumber: string,
  graduatedYear: string,
  startYear: string,
  type: string,
  university: string,
  skills: {
    react: string,
    typescript: string,
    nextJs: string,
  }
};

export const Reviews = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const filteredReviews = useMemo(() => {
    const term: string | null = searchParams.get("term");
    const localState: InformationType[] = JSON.parse(localStorage.getItem("reviews") as string) as InformationType[];
    if (!localState) return [];
    if (!term) return localState;
    const _filteredReviews = localState.filter(predicate => predicate.firstName.includes(term) || predicate.lastName.includes(term) || predicate.university.includes(term));
    return _filteredReviews;
  }, [searchParams.get("term")]);


  return (
    <div>
      <Filters />
      {filteredReviews.length === 0 && <div>
        <p className="text-2xl text-center pt-12">No reviews yet.</p>
        <section className="mx-auto w-fit h-fit pt-8">
          <button className="w-fit h-fit px-3 py-4 text-center bg-indigo-300 text-slate-900 tracking-wide rounded-lg hover:bg-indigo-200 transition-colors duration-300 ease-in-out" onClick={() => navigate("/signup")}>Create one</button>
        </section>
      </div>}
      {filteredReviews.map(review => <DisplayedReview key={review.firstName} review={review} />)}
    </div>
  )
}
