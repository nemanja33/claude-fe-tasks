import { ReactNode, Suspense, lazy } from "react";
import HomeSkeleton from "../pages/home/home.skeleton";
import LoginSkeleton from "../pages/login/login.skeleton";
import ErrorComponent from "../components/errorComponent/errorComponent";
import { PAGES } from "./pages";

type RouteType = {
  [key: string]: {
    path: string;
    element: ReactNode,
    count?: boolean
  }
}

const Home = lazy(() => import("../pages/home/home.page"))
const Login = lazy(() => import("../pages/login/login.page"))
const Favourites = lazy(() => import("../pages/favourites/favouritespage"))

const HomePage = () => {
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

const FavouritesPage = () => {
  return (
    <ErrorComponent>
      <Suspense fallback={<LoginSkeleton />}>
        <Favourites />
      </Suspense>
    </ErrorComponent>
  )
}

const ROUTES: RouteType = {
  [PAGES.HOME]: {
    path: "/",
    element: <HomePage />
  },
  [PAGES.LOGIN]: {
    path: "/login",
    element: <LoginPage />
  },
  [PAGES.FAVOURITES]: {
    path: "/favourites",
    element: <FavouritesPage />,
    count: true
  }
}

export { ROUTES }
