import {
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from 'react-router-dom';
import RootLayout from './layout/RootLayout';
// import Home from './pages/Home';
import LoadSite from './components/loading/LoadSite';

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<RootLayout />}>
      <Route index element={<LoadSite />} />
    </Route>
  )
);

function App() {
  return <RouterProvider router={router} fallbackElement={<LoadSite />} />;
}

export default App;
