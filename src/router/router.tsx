import { BrowserRouter, Route, Routes } from "react-router";
import { ReactNode, Suspense, lazy } from "react";
import HomeSkeleton from "../pages/home/home.skeleton";

type RouteType = {
  label: string;
  path: string;
  element: ReactNode,
}

const HomePage = lazy(() => import("../pages/home/home.page"))
const LoginPage = lazy(() => import("../pages/login/login.page"))

// ne radi suspense
const routes: RouteType[] = [
  {
    label: "Home",
    path: "/",
    element: <Suspense fallback={<HomeSkeleton />}><HomePage /></Suspense>
  },
  {
    label: "Login",
    path: "/login",
    element: <Suspense fallback={<>Loading...</>}><LoginPage /></Suspense>
  }
];

const AppRouter = () => {
  return (
    <BrowserRouter>
      <Routes>
        {
          routes.map(({ path, element }) => (
            <Route path={path} element={element} />
          ))
        }
      </Routes>
    </BrowserRouter>
  )
}

export default AppRouter;