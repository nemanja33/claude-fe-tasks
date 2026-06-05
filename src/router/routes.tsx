import { ReactNode, Suspense, lazy } from "react";
import HomeSkeleton from "../pages/home/home.skeleton";
import LoginSkeleton from "../pages/login/login.skeleton";
import ErrorComponent from "../components/errorComponent/errorComponent";
import { PAGES } from "./pages";
import UserDetailSkeleton from "../pages/userDetail/userDetail.skeleton";

type RouteType = {
  [key: string]: {
    path: string;
    element: ReactNode,
    count?: boolean,
    protected?: boolean
  }
}

const Home = lazy(() => import("../pages/home/home.page"))
const Login = lazy(() => import("../pages/login/login.page"))
const Favourites = lazy(() => import("../pages/favourites/favourites.page"))
const UserDetail = lazy(() => import("../pages/userDetail/userDetail.page"))

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

const UserDetailPage = () => {
  return (
    <ErrorComponent>
      <Suspense fallback={<UserDetailSkeleton />}>
        <UserDetail />
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
  },
  [PAGES.USER_DETAIL]: {
    path: "/:id",
    element: <UserDetailPage />,
    protected: true
  }
}

export { ROUTES }
