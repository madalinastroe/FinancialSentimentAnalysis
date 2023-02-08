import { Fragment } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Dashboard from './components/Dashboard';
import Login from './components/Login';
import NoMatch from './components/NoMatch';
import Profile from './components/Profile';
import Register from './components/Register';
import { UserContextProvider } from './context/UserContext';
import './index.css';
import AuthenticatedRoute from './shared/routes/AuthenticatedRoute';
import UnauthenticatedRoute from './shared/routes/UnauthenticatedRoute';
import PersonalHistory from './components/PersonalHistory';
import Manage from './components/Manage';
import ReadOnlyDashboard from './components/ReadOnlyDashboard';

const App = () => {
  return (
    <UserContextProvider>
      <Router>
        <Fragment>
          <Routes>

            <Route path='/' element={<AuthenticatedRoute />}>
              <Route index element={<Dashboard />} />
              <Route path="profile" element={<Profile />} />
              <Route path='/history' element={<PersonalHistory />} />
              <Route path='/manage' element={<Manage />} />
              <Route path='/show-info/:id' element={<ReadOnlyDashboard />} />

            </Route>

            <Route path='/' element={<UnauthenticatedRoute />}>
              <Route path='/register' element={<Register />} />
              <Route path='/login' element={<Login />} />
            </Route>

            <Route path="*" element={<NoMatch />} />
          </Routes>
        </Fragment>
      </Router>
    </UserContextProvider>

  );
};


export default App;
