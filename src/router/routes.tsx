import { ReactNode, Suspense, lazy } from "react";
import HomeSkeleton from "../pages/home/home.skeleton";
import LoginSkeleton from "../pages/login/login.skeleton";
import ErrorComponent from "../components/errorComponent/errorComponent";


type RouteType = {
  label: string;
  path: string;
  element: ReactNode,
}

const Home = lazy(() => import("../pages/home/home.page"))
const Login = lazy(() => import("../pages/login/login.page"))

const HomeElement = () => {
  return (
    <ErrorComponent>
      <Suspense fallback={<HomeSkeleton />}>
        <Home />
      </Suspense>
    </ErrorComponent>
  )
}

const LoginPage = () => {
  return (
    <ErrorComponent>
      <Suspense fallback={<LoginSkeleton />}>
        <Login />
      </Suspense>
    </ErrorComponent>
  )
}

const routes: RouteType[] = [
  {
    label: "Home",
    path: "/",
    element: <HomeElement />
  },
  {
    label: "Login",
    path: "/login",
    element: <LoginPage />
  }
];

export { routes }
