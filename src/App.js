import logo from './logo.svg';
import './App.css';
import AddUser from './features/users/AddUser';
import { Route, Router, Routes } from 'react-router-dom';
import AddMoment from './features/users/AddMoment';

function App() {
  return (
    <div >
      <Routes>
        <Route path='' element={<AddUser />} />
        <Route path='moment' element={<AddMoment />} />
      </Routes>
    </div>
  );
}

export default App;
