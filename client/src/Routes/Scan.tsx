import React, { useState } from "react";
import { styled } from "styled-components";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  padding: 50px;
`;

const ScanBox = styled.div`
  display: flex;
  flex-direction: column;
  width: 200px;
  gap: 20px;
`;

export default function Scan() {
  const [inputValue, setInputValue] = useState("");
  const [values, setValues] = useState<string[]>([]);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (inputValue.trim()) {
      setValues([...values, inputValue.trim()]);
      setInputValue("");
    }
  };

  const handleUpload = async () => {
    const formData = new FormData();
    formData.append("file", JSON.stringify(values));
    const res = await fetch("http://127.0.0.1:8000/api/upload/", {
      method: "POST",
      body: formData,
    });
    const data = await res.json();
    console.log(res.status, data);
  };

  return <Container></Container>;
}
