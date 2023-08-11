import { useEffect, useState } from "react";
import styled from "styled-components";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


import "react-toastify/dist/ReactToastify.css";

import userService from "../services/userService";

import { CancelOrder, Order } from "../models/oreder";
import orederService from "../services/orderService";

const ActiveOrders = () => {
  const TableContainer = styled.div`
    width: 60%;
    margin: 0 auto;
    background-color: white;
    border-radius: 10px; /* Zaobljene ivice spoljnog kontejnera */
    overflow: hidden; /* Skrivanje sadržaja koji prelazi okvir kontejnera */
    margin: 100px 0 0 450px;
  `;

  const StyledTable = styled.table`
    width: 100%;
    border-collapse: collapse;
    background-color: blue;
    th,
    td {
      border: 1px solid white;
      padding: 8px;
      text-align: center;
    }
  `;

  

  const DisapproveButton = styled.button`
    background-color: red;
    color: white;
    border: none;
    padding: 5px 10px;
    cursor: pointer;
    border-radius: 5px;
  `;

  const [activeOrders, setActiveOrders] = useState<Order[]>();

  useEffect(() => {
    getOrders();
  }, []);
  
  const getOrders = async () => {
    try {
      const response = await orederService.getActive(
        userService.getUserId()
      );
      setActiveOrders(response);
    } catch (error) {
      console.error(" error:", error);
    }
  };
  
  const Cancel = async (articleId: number) => {
    const ordercancelation: CancelOrder = {
        userId: userService.getUserId(),
        orderId: articleId
      }

    try {
        const response = await orederService.cancel(ordercancelation );
        console.log("Registration successful:", response);
        toast.success(" successful");
      } catch (error) {
        toast.error(" error");
        console.error(" error:", error);
      }
  };

  return (
    <div>
      {activeOrders !== undefined ? (
        <TableContainer>
          <StyledTable className="table">
            <thead>
              <tr>
              <th>ArticleName</th>
                <th>comment</th>
                <th>address</th>
                <th>price</th>
                <th>status</th>
                <th>Quantity</th>
                <th>time</th>
                { userService.getUserRole() === "Customer" ?  ( <th>delete</th>    ):null}
              </tr>
            </thead>
            <tbody>
              {activeOrders!.map((activeOrder) => (
                <tr key={activeOrder.id}>
                     <td>{activeOrder.item.articleName}</td>
                  <td>{activeOrder.comment}</td>
                  <td>{activeOrder.address}</td>
                  <td>{activeOrder.price}</td>
                  <td>{activeOrder.status}</td>
                  <td>{activeOrder.item.quantity}</td>
                  <td>
                  {Math.round(
                    (new Date(activeOrder.delivery).getTime() -
                      new Date().getTime()) /
                      (1000 * 60)
                  )}{" "}
                  minutes
                </td>
                { userService.getUserRole() === "Customer" ?  (
                  <td>
                    <DisapproveButton
                      type="button"
                      onClick={() => Cancel(activeOrder.id)}
                    >
                      Delete
                    </DisapproveButton>
                  </td>
                ):null}
                </tr>
              ))}
            </tbody>
          </StyledTable>
        </TableContainer>
      ) : null}
    </div>
  );
};

export default ActiveOrders;
