import { createBrowserRouter, RouterProvider } from "react-router-dom";
import routeList from "./Routes/MainRouter";
const router = createBrowserRouter(routeList);
function App() {
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
