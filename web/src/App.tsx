import {
  createBrowserRouter, createRoutesFromElements, Route, RouterProvider
} from "react-router-dom"
import "./App.css"
import Home from "./pages/Home"
import ListProviders from "./pages/ListProviders"
import ListRequests from "./pages/ListRequests"
import ProvideHelp from "./pages/ProvideHelp"
import RequestHelp from "./pages/RequestHelp"
import Root from "./pages/Root"

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Root />}>
      <Route path="provide-help" element={<ProvideHelp />} />
      <Route path="request-help" element={<RequestHelp />} />
      <Route path="list-requests" element={<ListRequests />} />
      <Route path="list-providers" element={<ListProviders />} />
      <Route path="" element={<Home />} />
    </Route>
  )
);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
