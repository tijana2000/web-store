
import styled from "styled-components";
import userService from "../services/userService";
import { useEffect, useState } from "react";
import { Salesman } from "../models/user";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const DisplaySalesman = () => {

  
  const TableContainer = styled.div`
  width: 60%;
  margin: 0 auto;
  background-color: white;
  border-radius: 10px; /* Zaobljene ivice spoljnog kontejnera */
  overflow: hidden; /* Skrivanje sadržaja koji prelazi okvir kontejnera */
  margin: -950px 0 0 490px; 
`;

const StyledTable = styled.table`
  width: 100%;
  border-collapse: collapse;
  background-color: blue; 
  th, td {
    border: 1px solid white;
    padding: 8px;
    text-align: center;
  }
`;

const ApproveButton = styled.button`
  background-color: green;
  color: white;
  border: none;
  padding: 5px 10px;
  cursor: pointer;
  margin-right: 5px;
  border-radius: 5px;
`;

const DisapproveButton = styled.button`
  background-color: red;
  color: white;
  border: none;
  padding: 5px 10px;
  cursor: pointer;
  border-radius: 5px;
`;

  const [salesmans, setSalesmans] = useState<Salesman[]>();

  useEffect(() => {
 
    getSalesmans();
  }, []);

  const getSalesmans = async () => {
    try {
      

     
      if (userService.getUserRole() === "Administrator") {
        const response = await userService.getSalesmans();
        setSalesmans(response);

        console.log(salesmans)
        console.log(salesmans)
      }
    } catch (error) {
      console.error(" error:", error);
    }
  };

  const Verify = async (id: string, status: string) => {
    try {
          const response = await userService.verify(id,status);

      toast.success(" successful");
      console.log(" successful:", response);
      
    } catch (error) {
      toast.error(" error");
      console.error(" error:", error);
    }
  };

  return (
    <div>
      {salesmans !== undefined ? (
        <TableContainer>
          <StyledTable className="table">
            <thead>
              <tr>
                <th>FirstName</th>
                <th>LastName</th>
                <th>Email</th>
                <th>Address</th>
                <th>Verification</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {salesmans!.map((salesman) => (
                <tr key={salesman.id}>
                  <td>{salesman.firstName}</td>
                  <td>{salesman.lastName}</td>
                  <td>{salesman.email}</td>
                  <td>{salesman.address}</td>
                  <td>{salesman.verification}</td>
                  <td>
                    {salesman.verification === "Pending" ? (
                      <>
                        <ApproveButton type="button" onClick={() => Verify(salesman.id,"Verified")}>
                          Approve
                        </ApproveButton>
                        <DisapproveButton type="button" onClick={() => Verify(salesman.id,"Denied")}>
                          Disapprove
                        </DisapproveButton>
                      </>
                    ) : null}
                  </td>
                </tr>
              ))}
            </tbody>
          </StyledTable>
        </TableContainer>
      ) : null}
    </div>
  );
 
};

export default DisplaySalesman;
