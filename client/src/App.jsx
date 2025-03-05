import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './components/Home';
import PrintReceipt from './components/PrintReceipt';
import SearchReceipt from './components/SearchReceipt';
import InvoiceForm from './components/InvoiceFrom';
import Analytics from './pages/Analytics';
import Sidebar from './pages/sidebar/Sidebar';
import { UserContext } from './context/UserProvider';
import { useContext } from 'react';
import Login from './pages/Login';
import LanguageSwitcher from './components/LanguageSwitcher';

const App = () => {
  const { user } = useContext(UserContext);
  console.log('User:', user?.name);

  return (
    <Router>
      <LanguageSwitcher />
      <Sidebar />
      <div>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/print-receipt" element={<PrintReceipt />} />
          <Route path="/search-receipt" element={<SearchReceipt isDeliveryMode={false} />} />
          <Route path="/deliver" element={<SearchReceipt isDeliveryMode={true} />} />
          <Route path="/analytics" element={<Analytics />} />
          <Route path="/type/:ele" element={<InvoiceForm isDeliveryMode={false} />} /> 
        </Routes>
      </div>
    </Router>
  );
};

export default App;
