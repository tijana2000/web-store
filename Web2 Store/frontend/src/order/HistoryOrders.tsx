import { useEffect, useState } from "react";
import styled from "styled-components";

import "react-toastify/dist/ReactToastify.css";


import "react-toastify/dist/ReactToastify.css";

import userService from "../services/userService";


import orederService from "../services/orderService";
import { Order } from "../models/oreder";

const HistoryOrders = () => {
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

  



  const [activeOrders, setActiveOrders] = useState<Order[]>();

  useEffect(() => {
    getOrders();
  }, []);
  
  const getOrders = async () => {
    try {
      const response = await orederService.getHistory(
        userService.getUserId()
      );
      setActiveOrders(response);
    } catch (error) {
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
                
            
                </tr>
              ))}
            </tbody>
          </StyledTable>
        </TableContainer>
      ) : null}
    </div>
  );
};

export default HistoryOrders;
