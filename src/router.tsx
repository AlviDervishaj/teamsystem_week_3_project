import { Suspense } from "react";
import { createBrowserRouter } from "react-router-dom";
import { Loading } from "./components/Loading";
import { Layout } from "./components/Layout";
import { Home, Signup, Education, Skills, PersonalInfo, Review, Reviews, Edit } from "./lazy";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        index: true,
        path: "/",
        element: <Suspense fallback={<Loading />}>
          <Home />
        </Suspense>
      },
      {
        path: "reviews",
        element: <Suspense fallback={<Loading />}>
          <Reviews />
        </Suspense>
      },
      {
        path: "edit",
        element: <Suspense fallback={<Loading />}>
          <Edit />
        </Suspense>
      },
      {
        path: "/signup",
        element: <Suspense fallback={<Loading />}>
          <Signup />
        </Suspense>,
        children: [
          {
            index: true,
            path: "",
            element: <Suspense fallback={<Loading />}>
              <PersonalInfo />
            </Suspense>
          },
          {
            path: "education",
            element: <Suspense fallback={<Loading />}>
              <Education />
            </Suspense>
          },
          {
            path: "skills",
            element: <Suspense fallback={<Loading />}>
              <Skills />
            </Suspense>
          },
          {
            path: "review",
            element: <Suspense fallback={<Loading />}>
              <Review />
            </Suspense>
          },
        ]
      },
    ]
  },
]);
