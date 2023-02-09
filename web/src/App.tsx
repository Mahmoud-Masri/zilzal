import { createTheme, ThemeProvider } from "@mui/material/styles"
import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from "react-router-dom"
import "./App.css"
import Home from "./pages/Home"
import ListProviders from "./pages/ListProviders"
import ListRequests from "./pages/ListRequests"
import ProvideHelp from "./pages/ProvideHelp"
import RequestHelp from "./pages/RequestHelp"
import Root from "./pages/Root"
import Success from "./pages/success"
import MapPage from "./pages/MapPage";

const theme = createTheme({
    direction: "rtl",
});

const router = createBrowserRouter(
    createRoutesFromElements(
        <Route path="/" element={<Root />}>
            <Route path="success" element={<Success />} />
            <Route path="provide-help" element={<ProvideHelp />} />
            <Route path="request-help" element={<RequestHelp />} />
            <Route path="list-requests" element={<ListRequests />} />
            <Route path="list-providers" element={<ListProviders />} />
            <Route path="map" element={<MapPage />} />
            <Route path="" element={<Home />} />
        </Route>
    )
);

function App() {
    return (
        <ThemeProvider theme={theme}>
            <RouterProvider router={router} />
        </ThemeProvider>
    );
}

export default App;
