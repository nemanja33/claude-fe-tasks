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
            routes.map(({ path, element }) => (
              <Route path={path} element={element} />
            ))
          }
        </Routes>
      </div>
    </BrowserRouter>
  )
}

export default AppRouter;


// What is the difference between import Input from './input' and const Input = React.lazy(() => import('./input'))? What does each produce in the final bundle?
// hm so lazy returns a promise which shows the content only when it's done processing it. So I guess the final bundle is smaller with lazy? And we have another response loading afterwards.
// Suspense needs a fallback prop — what makes a good fallback vs a bad one?
// a good fallback would be a skeleton which shows what the UI will look like.
// What happens if a lazy import fails (network error)? How do you handle that?
// I guess errorboundary. I just used the package, as that's supper common. 
// Open the browser's Network tab after implementing this. Look at the JS files loaded on / vs /login. What do you see?
// Answer those four questions when you submit.