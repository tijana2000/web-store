import { useEffect, useState } from "react";
import styled from "styled-components";

import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import userService from "../services/userService";
import articleService from "../services/articleService";
import { Article } from "../models/article";
import orederService from "../services/orderService";

const DisplayArticleForCustomer = () => {


  const [articles, setArticles] = useState<Article[]>();

  useEffect(() => {
    getArticles();
  }, []);

  const [acceptedQuantity, setAcceptedQuantity] = useState<number>();
  const [acceptedAddress, setAcceptedAddress] = useState<string>("a");
  const [acceptedComment, setAcceptedComment] = useState<string>("");
  const getArticles = async () => {
    try {
      const response = await articleService.getCustomerArticles();
      setArticles(response);
    } catch (error) {
      console.error(" error:", error);
    }
  };

  const CreateOrder = async (sellerId: number, articleId: number) => {
    const MakeOrder = {
      salesmanId: sellerId,
      item: {
        articleId: articleId,
        quantity: acceptedQuantity!,
      },
      address: acceptedAddress,
      comment: acceptedComment,
      userId: userService.getUserId(),
    };

    try {
      const response = await orederService.createOredr(MakeOrder);

      console.log(" successful:", response.data);

      toast.success("successful");
    } catch (error) {
      toast.error("Faild ");
    }
  };
  const TableContainer = styled.div`
  width: 60%;
  margin: 0 auto;
  background-color: white;
  border-radius: 10px; /* Zaobljene ivice spoljnog kontejnera */
  overflow: hidden; /* Skrivanje sadržaja koji prelazi okvir kontejnera */
  margin: -950px 0 0 450px;
`;

  return (
    <div style={{ marginLeft: "450px", marginTop: "-950px",    }}>
      {articles !== undefined ? (
        <div
          style={{
            background: "white",
            borderRadius: "20px",
            overflow: "hidden",
          }}
        >
          <table className="table" style={{ width: "1000px" }}>
            <thead>
              <tr>
                <th>Name</th>
                <th>Price</th>
                <th>Quantity</th>
                <th>Description</th>
                <th>Picture</th>
                <th>Quantity</th>
                <th>Address</th>
                <th>Comment</th>
                <th>create order</th>
              </tr>
            </thead>
            <tbody>
              {articles.map((article) => (
                <tr key={article.id}>
                  <td>{article.name}</td>
                  <td>{article.price}</td>
                  <td>{article.quantity}</td>
                  <td>{article.description}</td>

                  <td>
                    <img
                      src={article.picture}
                      alt="Opis slike"
                      style={{
                        width: "100px",
                        height: "100px",
                        borderRadius: "50px",
                      }}
                    />
                  </td>
                  <td>
                    <input
                      type="number"
                      style={{ width: "30px" }}
                      onChange={(e) =>
                        setAcceptedQuantity(Number(e.target.value))
                      }
                    />
                  </td>
                  <td>
                    <input
                      style={{ width: "100px" }}
                      type="text"
                      onChange={(e) => setAcceptedAddress(e.target.value)}
                    />
                  </td>
                  <td>
                    <input
                      style={{ width: "100px" }}
                      type="text"
                      onChange={(e) => setAcceptedComment(e.target.value)}
                    />
                  </td>

                  <button
                    type="button"
                    onClick={() => CreateOrder(article.salesmanId, article.id)}
                    className="accept-button"
                    style={{
                      background: "green",
                      color: "white",
                      padding: "8px 16px",
                      border: "none",
                      borderRadius: "4px",
                      cursor: "pointer",
                    }}
                  >
                    Accept
                  </button>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : null}
    </div>
  );
};

export default DisplayArticleForCustomer;
