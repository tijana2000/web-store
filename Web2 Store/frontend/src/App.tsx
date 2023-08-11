import React from 'react';
import { BrowserRouter as Router, Route, Routes,  } from "react-router-dom";
import './App.css';
import Registration from './registration/Registration';
import Login from './registration/Login';
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import Profile from './users/Profile';
import Dashboard from './users/Dashboard';
import AddArticle from './article/AddArticle';
import DisplaySalesman from './users/DIsplaySalesman';
import DisplayArticle from './article/DisplayArticle';
import UpdateArticle from './article/UpdateArticle';
import DisplayArticleForCustomer from './article/DisplayArticleForCustomer';
import ActiveOrders from './order/ActiveOrders';
import HistoryOrders from './order/HistoryOrders';
import AllOrders from './order/AllOrders';


function App() {


  const router = (

    
    <Router> <div className="App"    >
   
        
        <Routes>
        <Route path="" element={<Login />} />
          <Route path="/login" element={<Login />} />
          <Route path="/registration" element={<Registration />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/addArticle" element={<AddArticle />} />
          <Route path="/displaySalesman" element={<DisplaySalesman />} />
          <Route path="/displayArticle" element={<DisplayArticle />} />
          <Route path="/updateArticle/:articleId" element={<UpdateArticle />} />
          <Route path="/displayArticleForCustomer" element={<DisplayArticleForCustomer />} />
          <Route path="/activeOrders" element={<ActiveOrders />} />
          <Route path="/historyOrders" element={<HistoryOrders />} />
          <Route path="/allOrders" element={<AllOrders />} />
         
        </Routes>
        <ToastContainer />
      </div>
    </Router>
  );

  return router;
}

export default App;
