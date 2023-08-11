import { useNavigate } from "react-router-dom";
import Profile from "./Profile";
import styled from "styled-components";
import userService from "../services/userService";
import DisplaySalesman from "./DIsplaySalesman";
import DisplayArticle from "../article/DisplayArticle";
import DisplayArticleForCustomer from "../article/DisplayArticleForCustomer";
import ActiveOrders from "../order/ActiveOrders";
import HistoryOrders from "../order/HistoryOrders";
import AllOrders from "../order/AllOrders";

const Dashboard = () => {
  const Button = styled.button`
    padding: 10px 20px;
    background-color: #7dbbee;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    margin: 50px 0 0 400px;
  `;
  const Button1 = styled.button`
    padding: 10px 20px;
    background-color: green;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    margin: -100px 0 0 -1000px;
  `;
  const isSalesman = userService.getUserRole() === "Salesman";

  const navigation = useNavigate();
  const signout = async () => {
    localStorage.setItem("token", "");
    navigation("/login");
  };

  const addArticle = async () => {
    navigation("/addArticle");
  };

  return (
    <div>
      <Button type="button" onClick={() => signout()} className="accept-button">
        Sign out
      </Button>
      <Button1
        type="button"
        onClick={() => addArticle()}
        className="accept-button"
        disabled={!isSalesman}
      >
        Create Artical
      </Button1>

      <Profile></Profile>
      <DisplaySalesman></DisplaySalesman>
      {userService.getUserRole() === "Salesman" ? (
        <DisplayArticle></DisplayArticle>
      ) : null}
      {userService.getUserRole() === "Customer" ? (
        <DisplayArticleForCustomer></DisplayArticleForCustomer>
      ) : null}
      {userService.getUserRole() === "Customer" ||
      userService.getUserRole() === "Salesman" ? (
        <ActiveOrders></ActiveOrders>
      ) : null}
      {userService.getUserRole() === "Customer" ||
      userService.getUserRole() === "Salesman" ? (
        <HistoryOrders></HistoryOrders>
      ) : null}

      {userService.getUserRole() === "Administrator" 
      ? (
        <AllOrders></AllOrders>
      ) : null}
    </div>
  );
};

export default Dashboard;
