import { lazy } from "react";

export const Home = lazy(() => import("./routes/Home").then(mod => ({ default: mod.Home })))
export const Edit = lazy(() => import("./routes/EditReview").then(mod => ({ default: mod.EditReview })))
export const Reviews = lazy(() => import("./routes/Reviews").then(mod => ({ default: mod.Reviews })))
export const Signup = lazy(() => import("./routes/Signup").then(mod => ({ default: mod.Signup })))
export const Review = lazy(() => import("./components/StepsForms/Review").then(mod => ({ default: mod.Review })))
export const PersonalInfo = lazy(() => import("./components/StepsForms/PersonalInfo").then(mod => ({ default: mod.PersonalInfo })))
export const Education = lazy(() => import("./components/StepsForms/Education").then(mod => ({ default: mod.Education })))
export const Skills = lazy(() => import("./components/StepsForms/Skills").then(mod => ({ default: mod.Skills })))
