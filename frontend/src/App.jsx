import {
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from 'react-router-dom';
import RootLayout from './layout/RootLayout';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import SearchDoctors from './pages/SearchDoctors';
import Profile from './pages/Profile';
import Appointment from './pages/Appointment';
import LoadSite from './components/loading/LoadSite';
import requireAuth from './utils/requireAuth';
import { checkLogin } from './utils/helperFuntions';
import { getData } from './utils/fetchData';

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<RootLayout />}>
      <Route index element={<Home />} loader={() => getData('/api/v1/doc-info/get-all-areas')} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/search-doctors" element={<SearchDoctors />} />
      <Route path="/doctor/:id" element={<Profile />} />
      <Route
        path="/doctor/:id/new-appointment"
        element={requireAuth(<Appointment />, checkLogin())}
      />
    </Route>
  )
);

function App() {
  return <RouterProvider router={router} fallbackElement={<LoadSite />} />;
}

export default App;
