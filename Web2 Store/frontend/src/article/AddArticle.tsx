import { useState } from "react";
import styled from "styled-components";


import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import userService from "../services/userService";
import articleService from "../services/articleService";
import { CreateArticle } from "../models/article";

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

const AddArticle = () => {
  const [addAricle, setAddAricle] = useState<CreateArticle>({
    name: "kola",
    price: 5,

    quantity: 10,
    description: "slatka",

    picture: "",
    salesmanId: 0,
  });

  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [selectedFileName, setSelectedFileName] = useState<string | null>(null);
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedFile(file);

      setSelectedFileName(file.name);
      setAddAricle((prevData) => ({ ...prevData, file }));
    }
  };
  const [errors, setErrors] = useState<Record<string, string>>({});




  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setAddAricle((prevData) => ({ ...prevData, [name]: value }));
  };
  const navigation = useNavigate();

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    const validationErrors: any = {};

    // Validacija za svako polje
    if (!addAricle.name) {
      validationErrors.name = "Ime je obavezno.";
    }

    if (!addAricle.price) {
      validationErrors.price = "Cena je obavezna.";
    }

    if (!addAricle.quantity) {
      validationErrors.quantity = "Quantity je obavezno.";
    }

    if (!addAricle.description) {
      validationErrors.description = "Description je obavezno.";
    }

    setErrors(validationErrors);

    try {
      console.log(localStorage.getItem("token"));

      addAricle.salesmanId = userService.getUserId();

      const formData: FormData = new FormData();

      formData.append("name", addAricle.name);
      formData.append("price", addAricle.price.toString());
      formData.append("quantity", addAricle.quantity.toString());
      formData.append("description", addAricle.description);
      formData.append("picture", "empty");
      formData.append("salesmanId", addAricle.salesmanId.toString());
      formData.append("file", selectedFile as File);

      const response = await articleService.createAricle(formData);

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
        <h3>ADD ARTICLE </h3>
        <FormGroup>
          <Label>Name:</Label>
          <Input
            type="text"
            name="name"
            value={addAricle.name}
            onChange={handleInputChange}
          />
          {errors.name && <ErrorMsg>{errors.name}</ErrorMsg>}
        </FormGroup>
        <FormGroup>
          <Label>Price:</Label>
          <Input
            type="number"
            name="price"
            value={addAricle.price}
            onChange={handleInputChange}
          />
          {errors.price && <ErrorMsg>{errors.price}</ErrorMsg>}
        </FormGroup>
        <FormGroup>
          <Label>Quantity:</Label>
          <Input
            type="number"
            name="quantity"
            value={addAricle.quantity}
            onChange={handleInputChange}
          />
          {errors.quantity && <ErrorMsg>{errors.quantity}</ErrorMsg>}
        </FormGroup>

        <FormGroup>
          <Label>Description:</Label>
          <Input
            type="text"
            name="description"
            value={addAricle.description}
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
          <Button type="submit">ADD</Button>
        </div>
      </FormWrapper>
    </div>
  );
};

export default AddArticle;
