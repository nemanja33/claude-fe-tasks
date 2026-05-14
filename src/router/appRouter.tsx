import { BrowserRouter, Route, Routes } from "react-router";
import { Navigation } from "../components/navigation/navigation";
import { routes } from "./routes";

const AppRouter = () => {
  return (
    <BrowserRouter>
      <Navigation />
      <div className="wrap">
        <Routes>
          {
            routes.map(({ path, element, label }) => (
              <Route key={label.toLowerCase().replaceAll(' ', '-')} path={path} element={element} />
            ))
          }
        </Routes>
      </div>
    </BrowserRouter>
  )
}

export default AppRouter;

