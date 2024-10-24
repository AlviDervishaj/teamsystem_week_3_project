import { useMemo } from "react";
import { NavLink } from "react-router-dom"

type StepsType = {
  step: number,
  title: string,
  to: string,
}

const StepsTitles = [
  "Personal Info",
  "Education",
  "Skills",
  "Review",
] as const;


const StepsLocations = [
  "/signup",
  "/signup/education",
  "/signup/skills",
  "/signup/review",
] as const;

export const Steps = () => {
  const allItems: StepsType[] = useMemo(() => new Array(StepsLocations.length).fill(0).map((_, index) => {
    const title = StepsTitles[index];
    const _href = StepsLocations[index];
    return { title: title, to: _href, step: index };
  }), []);
  return (
    <ol className="flex items-center w-full p-3 space-x-2 text-sm font-medium text-center text-gray-500 bg-white border border-gray-200 rounded-lg shadow-sm dark:text-gray-400 sm:text-base dark:bg-gray-800 dark:border-gray-700 sm:p-4 sm:space-x-4 rtl:space-x-reverse">
      {allItems.map((item) => {
        return <NavLink key={item.title} to={item.to} className={({ isActive }) => [
          isActive && "text-blue-600 dark:text-blue-500 group",
          "flex items-center"
        ].join(" ")}>
          <span className="flex items-center group-aria-[current=page]:border-blue-600 justify-center w-5 h-5 me-2 text-xs border border-gray-500 rounded-full shrink-0 dark:border-blue-500">
            {item.step + 1}
          </span>
          {item.title}
          {item.step !== allItems.length - 1 &&
            <svg className="w-3 h-3 ms-2 sm:ms-4 rtl:rotate-180" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 12 10">
              <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m7 9 4-4-4-4M1 9l4-4-4-4" />
            </svg>
          }
        </NavLink>
      })}
    </ol>
  )
}
