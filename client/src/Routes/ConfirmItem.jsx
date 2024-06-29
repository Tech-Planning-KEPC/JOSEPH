import { useLocation, useNavigate, useParams } from "react-router-dom";
import { styled } from "styled-components";
import { useForm } from "react-hook-form";
import { useState, useRef} from "react";
import { SERVER_URL } from "../api";
import useDetectClose from "../Components/useDetectClose";

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

const StyledList = styled.ul`
    position: absolute;
    list-style-type: none;
    padding: 5px;
    margin: 1px;
    background-color: white;
    width: 40%;
    right: 0;
    border: 1px solid #ccc;
    border-radius: 3px;
    font: inherit;
    font-size: 14px;
    
    .list-item {
      margin: 0px 0;
      height: 27px;
      display: flex; /* 항목을 flex로 설정하여 */
      align-items: center; /* 수직 가운데 정렬을 적용합니다 */
      cursor: pointer;
      transition: background-color 0.3s ease;
    }

    .list-item:hover {
      background-color: #f0f0f0;
    }
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

  const handleCommitteeSelect = (value) => {
    setCommitteeIdentify(value);
    setModifiedData((prevData) => {
      const newData = [...prevData];
      newData[page - 1].committee = value;
      return newData;
    });
    setIsOpen(false);
  };

  const handlePrevPage = () => {
    setCommitteeIdentify(modifiedData[page-2].committee);
    resetFields();
    navigate(`/upload/${page - 1}`, { state: { modifiedData, totalPage } });
  };

  const handleNextPage = () => {
    resetFields();
    navigate(`/upload/${page + 1}`, { state: { modifiedData, totalPage } });
    setCommitteeIdentify(modifiedData[page].committee);
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
  
  const dropDownRef = useRef();
  const [CommitteeIdentify, setCommitteeIdentify] = useState(modifiedData[page - 1].committee);
  const CommitteeList = [
    '예배위원회',
    '찬양위원회',
    '신앙위원회',
    '돌봄위원회',
    '제1교육위원회',
    '제2교육위원회',
    '선교위원회',
    '지역봉사위원회',
    '전도위원회',
    '새가족위원회',
    '관리위원회',
    '친교위원회',
    '에녹위원회',
    '비전청년위원회',
    '재정위원회',
    '가정교회 사역원']

  const [isOpen, setIsOpen] = useDetectClose(dropDownRef, false);

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
        
        <div ref={dropDownRef} style={{ position: 'relative'}}>
        <InputContainer>
        
          <Label>위원회</Label>
          <div style={{  width: '101.18%' }}>
          <Input
            key={`committee-${page}`}
            value={CommitteeIdentify}
            {...register("committee")}
            onClick={() => setIsOpen(!isOpen)}
            type='button'
            style={{ backgroundColor: 'white', textAlign: 'left' }}
          />
          <span
            style={{
            position: 'absolute',
            right: '8px',
            top: '5%',
            transform: 'translateY(-0%)',
            pointerEvents: 'none', // 텍스트에 대한 클릭 이벤트를 비활성화하여 입력 필드의 클릭 이벤트가 작동하도록 함
            }}
          >
          ⌄
          </span>
          </div> 
        </InputContainer>
        {isOpen && 
          <StyledList>
          {CommitteeList.map((value, index) => (
            <li
              key={index}
              className="list-item"
              onClick={() => {
                setCommitteeIdentify(value);
                setIsOpen(false);
                handleCommitteeSelect(value);
              }}
            >
              {value}
            </li>
          ))}
        </StyledList>
        }
        </div>
        
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