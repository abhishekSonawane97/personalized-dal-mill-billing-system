import { BrowserRouter as Router, Routes, Route, Link, useNavigate } from 'react-router-dom';
import Home from './components/Home';
import PrintReceipt from './components/PrintReceipt';
import SearchReceipt from './components/SearchReceipt';
import InvoiceForm from './components/InvoiceFrom';
import Analytics from './pages/Analytics';
import Sidebar from './pages/sidebar/Sidebar';
import TypeProvider from './context/TypeContext';
import UserProvider, { UserContext } from './context/UserProvider';
import Login from './pages/Login';
import { useContext } from 'react';

const App = () => {

  // const { user, setUser } = useContext(UserContext);
  
// console.log('user : ', user?.name);
  return (
    <>
    <Router>
      <UserProvider>
        <Sidebar />
      </UserProvider>
        {/* {
          user? ( */}

              <div>
                <TypeProvider>
                  <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/print-receipt" element={<PrintReceipt />} />
                    <Route path="/search-receipt" element={<SearchReceipt />} />
                    <Route path="/analytics" element={<Analytics />} />
                    <Route path="/type/:ele" element={<InvoiceForm />} />
                  </Routes>
                </TypeProvider>
              </div>
          {/* ) : navigate("/")
        } */}
    </Router>
    </>
  );
};

export default App;