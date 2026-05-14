import { BrowserRouter, Route, Routes } from "react-router";
import { ReactNode, Suspense, lazy } from "react";
import HomeSkeleton from "../pages/home/home.skeleton";
import LoginSkeleton from "../pages/login/login.skeleton";
import { Navigation } from "../components/navigation/navigation";

type RouteType = {
  label: string;
  path: string;
  element: ReactNode,
}

const HomePage = lazy(() => import("../pages/home/home.page"))
const LoginPage = lazy(() => import("../pages/login/login.page"))

const routes: RouteType[] = [
  {
    label: "Home",
    path: "/",
    element: <Suspense fallback={<HomeSkeleton />}><HomePage /></Suspense>
  },
  {
    label: "Login",
    path: "/login",
    element: <Suspense fallback={<LoginSkeleton />}><LoginPage /></Suspense>
  }
];

const AppRouter = () => {
  return (
    <BrowserRouter>
      <Navigation />
      <div className="wrap">
        <Routes>
          {
            routes.map(({ path, element }) => (
              <Route path={path} element={element} />
            ))
          }
        </Routes>
      </div>
    </BrowserRouter>
  )
}

export { routes }
export default AppRouter;