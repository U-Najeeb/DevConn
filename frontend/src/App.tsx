import { createBrowserRouter, RouterProvider } from "react-router-dom";
import routeList from "./Routes/MainRouter";
import { UserContextProvider } from "./context/userContext";
const router = createBrowserRouter(routeList);
function App() {
  return (
    <>
      <UserContextProvider>
        <RouterProvider router={router} />
      </UserContextProvider>
    </>
  );
}

export default App;
