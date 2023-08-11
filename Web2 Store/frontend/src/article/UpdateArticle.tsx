import { useEffect, useState } from "react";
import styled from "styled-components";

import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import userService from "../services/userService";
import articleService from "../services/articleService";
import { Article, } from "../models/article";
import { useParams } from "react-router-dom";

const FormWrapper = styled.form`
  width: 350px; /* Promenjeno na 300px */
  margin: 50px auto 0;
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 5px;
  background-color: #7dbbee;
`;

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 20px;
`;

const Label = styled.label`
  margin-bottom: 5px;
  font-weight: bold;
`;

const Input = styled.input`
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
`;

const ErrorMsg = styled.span`
  color: #ff0000;
  margin-top: 5px;
`;

const Button = styled.button`
  padding: 10px 20px;
  background-color: #4caf50;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
`;

const UpdateArticle = () => {
//   const [article, setArticle] = useState<Article>({
//     name: "kola",
//     price: 5,

//     quantity: 10,
//     description: "slatka",

//     picture: "",
//     salesmanId: 0,
//   });

  const [article, setArticle] = useState<Article>({
    id : 0,
    name: "",
    price: 0,
    quantity: 0,
    description: "",
    picture: "",
    salesmanId: 0,
    
  });

  const { articleId } = useParams();

  useEffect(() => {
    getArticleInfo();
  }, []);

  const getArticleInfo = async () => {
    try {
      const response = await articleService.getArticle(Number(articleId));

      setArticle(response);
    } catch (error) {
      toast.error("Registration error");
      console.error("Registration error:", error);
    }
  };

  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [selectedFileName, setSelectedFileName] = useState<string | null>(null);
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedFile(file);

      setSelectedFileName(file.name);
      setArticle((prevData) => ({ ...prevData, file }));
    }
  };
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setArticle((prevData) => ({ ...prevData, [name]: value }));
  };
  const navigation = useNavigate();

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    const validationErrors: any = {};

    // Validacija za svako polje
    if (!article.name) {
      validationErrors.name = "Ime je obavezno.";
    }

    if (!article.price) {
      validationErrors.price = "Cena je obavezna.";
    }

    if (!article.quantity) {
      validationErrors.quantity = "Quantity je obavezno.";
    }

    if (!article.description) {
      validationErrors.description = "Description je obavezno.";
    }

    setErrors(validationErrors);

    try {
      article.salesmanId = userService.getUserId();

      const formData: FormData = new FormData();

    formData.append('id' , article.id.toString());
    formData.append('name' , article.name);
    formData.append('price' , article.price.toString());
    formData.append('quantity',article.quantity.toString());
    formData.append('description',article.description);
    formData.append('picture',article.picture);
    formData.append('salesmanId',article.salesmanId.toString());
    formData.append("file", selectedFile as File);

      const response = await articleService.updateArticle(formData);

      toast.success(" successful");
      console.log(" successful:", response.data);
      navigation("/dashboard");
    } catch (error) {
      toast.error(" error");
      console.error(" error:", error);
    }
  };

  return (
    <div>
      <FormWrapper onSubmit={handleSubmit}>
        <h3>UPDATE ARTICLE </h3>

        <td>
        <img
          src={article!.picture}
          alt="User"
          style={{ width: "100px", height: "100px", borderRadius: "50%" }}
        />
        </td>
        <FormGroup>
          <Label>Name:</Label>
          <Input
            type="text"
            name="name"
            value={article.name}
            onChange={handleInputChange}
          />
          {errors.name && <ErrorMsg>{errors.name}</ErrorMsg>}
        </FormGroup>
        <FormGroup>
          <Label>Price:</Label>
          <Input
            type="number"
            name="price"
            value={article.price}
            onChange={handleInputChange}
          />
          {errors.price && <ErrorMsg>{errors.price}</ErrorMsg>}
        </FormGroup>
        <FormGroup>
          <Label>Quantity:</Label>
          <Input
            type="number"
            name="quantity"
            value={article.quantity}
            onChange={handleInputChange}
          />
          {errors.quantity && <ErrorMsg>{errors.quantity}</ErrorMsg>}
        </FormGroup>

        <FormGroup>
          <Label>Description:</Label>
          <Input
            type="text"
            name="description"
            value={article.description}
            onChange={handleInputChange}
          />
          {errors.description && <ErrorMsg>{errors.description}</ErrorMsg>}
        </FormGroup>

        <FormGroup>
          <Label>Picture:</Label>
          <Input type="file" name="file" onChange={handleFileChange} />
          {selectedFileName && <div>{selectedFileName}</div>}
          {errors.address && <ErrorMsg>{errors.address}</ErrorMsg>}
        </FormGroup>
        <div style={{ display: "flex", justifyContent: "center", gap: "10px" }}>
          <Button type="submit">UPDATE</Button>
        </div>
      </FormWrapper>
    </div>
  );
};

export default UpdateArticle;
