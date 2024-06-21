import { useLocation, useNavigate, useParams } from "react-router-dom";
import { styled } from "styled-components";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { SERVER_URL } from "../api";

const Container = styled.div`
  display: grid;
  place-content: center;
  height: 100vh;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  width: 500px;
  margin: 10px auto;
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 5px;
  gap: 10px;
`;

const InputContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Label = styled.label`
  display: block;
  margin-bottom: 5px;
  font-weight: bold;
  width: 200px;
`;

const Input = styled.input`
  width: 100%;
  padding: 5px;
  border: 1px solid #ccc;
  border-radius: 3px;
`;

const PageContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const excelSerialDateToJSDate = (serial) => {
  const utc_days = Math.floor(serial - 25569);
  const date_info = new Date(utc_days * 86400 * 1000);
  const year = date_info.getFullYear();
  const month = String(date_info.getMonth() + 1).padStart(2, "0");
  const day = String(date_info.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
};

export default function ConfirmItem() {
  const navigate = useNavigate();
  const { state } = useLocation();
  const { data, totalPage } = state;
  const { id } = useParams();
  const page = Number(id);
  const { register, handleSubmit, resetField } = useForm();
  const [modifiedData, setModifiedData] = useState(data);

  const handlePrevPage = () => {
    resetFields();
    navigate(`/upload/${page - 1}`, { state: { modifiedData, totalPage } });
  };

  const handleNextPage = () => {
    resetFields();
    navigate(`/upload/${page + 1}`, { state: { modifiedData, totalPage } });
  };

  const onSubmit = (values) => {
    setModifiedData((prevData) => {
      const newData = [...prevData];
      newData[page - 1] = values;
      return newData;
    });
    if (page !== totalPage) handleNextPage();
  };

  const resetFields = () => {
    resetField("brand");
    resetField("category");
    resetField("committee");
    resetField("department");
    resetField("email");
    resetField("inspectionDate");
    resetField("location");
    resetField("manager");
    resetField("model");
    resetField("name");
    resetField("note");
    resetField("phone");
    resetField("purchaseDate");
    resetField("tagId");
    resetField("unitPrice");
  };

  const handleSave = async () => {
    console.log(modifiedData);
    const res = await fetch(`${SERVER_URL}/api/upload/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(modifiedData),
    });

    const data = await res.json();

    console.log(data, res.status);
  };

  console.log(modifiedData[page - 1]);
  return (
    <Container>
      <h2>
        아이템 {page} / {totalPage}
      </h2>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <InputContainer>
          <Label>태그 ID</Label>
          <Input
            key={`tagId-${page}`}
            value={modifiedData[page - 1].tagId}
            {...register("tagId")}
          />
        </InputContainer>
        <InputContainer>
          <Label>품명</Label>
          <Input
            key={`name-${page}`}
            value={modifiedData[page - 1].name}
            {...register("name")}
          />
        </InputContainer>
        <InputContainer>
          <Label>위원회</Label>
          <Input
            key={`committee-${page}`}
            value={modifiedData[page - 1].committee}
            {...register("committee")}
          />
        </InputContainer>
        <InputContainer>
          <Label>부서</Label>
          <Input
            key={`department-${page}`}
            value={modifiedData[page - 1].department}
            {...register("department")}
          />
        </InputContainer>
        <InputContainer>
          <Label>장소</Label>
          <Input
            key={`location-${page}`}
            value={modifiedData[page - 1].location}
            {...register("location")}
          />
        </InputContainer>
        <InputContainer>
          <Label>담당자</Label>
          <Input
            key={`manager-${page}`}
            value={modifiedData[page - 1].manager}
            {...register("manager")}
          />
        </InputContainer>
        <InputContainer>
          <Label>이메일</Label>
          <Input
            key={`email-${page}`}
            value={modifiedData[page - 1].email}
            {...register("email")}
          />
        </InputContainer>
        <InputContainer>
          <Label>전화번호</Label>
          <Input
            key={`phone-${page}`}
            value={modifiedData[page - 1].phone}
            {...register("phone")}
          />
        </InputContainer>
        <InputContainer>
          <Label>카테고리</Label>
          <Input
            key={`category-${page}`}
            value={modifiedData[page - 1].category}
            {...register("category")}
          />
        </InputContainer>
        <InputContainer>
          <Label>브랜드</Label>
          <Input
            key={`brand-${page}`}
            value={modifiedData[page - 1].brand}
            {...register("brand")}
          />
        </InputContainer>
        <InputContainer>
          <Label>모델</Label>
          <Input
            key={`model-${page}`}
            value={modifiedData[page - 1].model}
            {...register("model")}
          />
        </InputContainer>
        <InputContainer>
          <Label>단가</Label>
          <Input
            key={`unitPrice-${page}`}
            value={modifiedData[page - 1].unitPrice}
            {...register("unitPrice")}
          />
        </InputContainer>
        <InputContainer>
          <Label>구매일자</Label>
          <Input
            key={`purchaseDate-${page}`}
            defaultValue={modifiedData[page - 1].purchaseDate}
            {...register("purchaseDate")}
          />
        </InputContainer>
        <InputContainer>
          <Label>검수일자</Label>
          <Input
            key={`inspectionDate-${page}`}
            type="date"
            defaultValue={new Date().toLocaleDateString("en-US")}
            {...register("inspectionDate")}
          />
        </InputContainer>
        <InputContainer>
          <Label>비고</Label>
          <Input
            key={`memo-${page}`}
            value={modifiedData[page - 1].note}
            {...register("note")}
          />
        </InputContainer>
        <button>저장하기</button>
      </Form>
      <PageContainer>
        <button disabled={page === 1} onClick={handlePrevPage}>
          이전
        </button>
        <span>
          {page} / {totalPage}
        </span>
        <button disabled={page === totalPage} onClick={handleNextPage}>
          다음
        </button>
        {page === totalPage && <button onClick={handleSave}>제출</button>}
      </PageContainer>
    </Container>
  );
}