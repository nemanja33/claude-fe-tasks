import { BrowserRouter, Route, Routes } from "react-router";
import { Navigation } from "../components/navigation/navigation";
import { ROUTES } from "./routes";

const AppRouter = () => {
  return (
    <BrowserRouter>
      <Navigation />
      <div className="wrap">
        <Routes>
          {
            Object.entries(ROUTES).map((data) => {
              const label = data[0];
              const path = data[1].path;
              const element = data[1].element;
              return <Route key={label.toLowerCase().replaceAll(' ', '-')} path={path} element={element} />
            })
          }
        </Routes>
      </div>
    </BrowserRouter>
  )
}

export default AppRouter;

