import { useEffect, useState } from "react";
import styled from "styled-components";

import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import userService from "../services/userService";
import articleService from "../services/articleService";
import { Article } from "../models/article";

const DisplayArticle = () => {
  const TableContainer = styled.div`
    width: 60%;
    margin: 0 auto;
    background-color: white;
    border-radius: 10px; /* Zaobljene ivice spoljnog kontejnera */
    overflow: hidden; /* Skrivanje sadržaja koji prelazi okvir kontejnera */
    margin: -950px 0 0 450px;
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

  const [articles, setArticles] = useState<Article[]>();

  useEffect(() => {
    getArticles();
  }, []);
  const navigation = useNavigate();
  const getArticles = async () => {
    try {
      const response = await articleService.getSalesmanArticles(
        userService.getUserId()
      );
      setArticles(response);
    } catch (error) {
      console.error(" error:", error);
    }
  };
  const Update = async (articleId: number) => {
    navigation("/updateArticle/" + articleId);
  };
  const Delete = async (articleId: number) => {
    try {
      const response = await articleService.deleteArticle(
        articleId,
        userService.getUserId()
      );
      toast.success(" successful");
      console.log(" successful:", response);
    } catch (error) {
      toast.error(" error");
      console.error(" error:", error);
    }
  };

  return (
    <div>
      {articles !== undefined ? (
        <TableContainer>
          <StyledTable className="table">
            <thead>
              <tr>
                <th>name</th>
                <th>price</th>
                <th>quantity</th>
                <th>description</th>
                <th>picture</th>
                <th>update</th>
                <th>delete</th>
              </tr>
            </thead>
            <tbody>
              {articles!.map((article) => (
                <tr key={article.id}>
                  <td>{article.name}</td>
                  <td>{article.price}</td>
                  <td>{article.quantity}</td>
                  <td>{article.description}</td>
                  <td>
                    <img
                      src={article!.picture}
                      alt="Article"
                      style={{
                        width: "100px",
                        height: "100px",
                        borderRadius: "50%",
                      }}
                    />
                  </td>
                  {/* (userService.getUserRole() === "Salesman" ?              */}

                  <td>
                    <ApproveButton
                      type="button"
                      onClick={() => Update(article.id)}
                    >
                      Update
                    </ApproveButton>
                  </td>

                  <td>
                    <DisapproveButton
                      type="button"
                      onClick={() => Delete(article.id)}
                    >
                      Delete
                    </DisapproveButton>
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

export default DisplayArticle;
