import { useLocation, useNavigate, useParams } from "react-router-dom";
import { styled } from "styled-components";
import { useForm } from "react-hook-form";
import { useState, useRef, useEffect} from "react";
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
    z-index: 1000;
    
    .list-item {
      padding-left: 10px;
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

  function convertExcelDate(serial) {
    const utc_days = Math.floor(serial - 25569);
    const utc_value = utc_days * 86400;
    const date_info = new Date(utc_value * 1000);
    const fractional_day = serial - Math.floor(serial) + 0.0000001;
    const total_seconds = Math.floor(86400 * fractional_day);
    
    const seconds = total_seconds % 60;
    const hours = Math.floor(total_seconds / (60 * 60));
    const minutes = Math.floor((total_seconds - (hours * 60 * 60)) / 60);
    
    return new Date(Date.UTC(date_info.getFullYear(), date_info.getMonth(), date_info.getDate()+2, hours, minutes, seconds));
  }

export default function ConfirmItem() {
  const navigate = useNavigate();
  const { state } = useLocation();
  const { data, totalPage } = state;
  const { id } = useParams();
  const page = Number(id);
  const { register, handleSubmit, resetField, setValue } = useForm();
  const [modifiedData, setModifiedData] = useState(data);
  
  const handleCommitteeSelect = (value) => {
    setCommitteeIdentify(value);
    setModifiedData((prevData) => {
      const newData = [...prevData];
      newData[page - 1].committee = value;
      return newData;
    });
    setCommitteeIsOpen(false);
  };

  const handleDepartmentSelect = (value) => {
    setDepartmentIdentify(value);
    setModifiedData((prevData) => {
      const newData = [...prevData];
      newData[page - 1].department = value;
      return newData;
    });
    setDepartmentIsOpen(false);
  };

  const handleLocationSelect = (value) => {
    setLocationIdentify(value);
    setModifiedData((prevData) => {
      const newData = [...prevData];
      newData[page - 1].location = value;
      return newData;
    });
    setLocationIsOpen(false);
  };

  const handlePrevPage = () => {
    resetFields();
    navigate(`/upload/${page - 1}`, { state: { modifiedData, totalPage } });
    setCommitteeIdentify(modifiedData[page-2].committee);
    setDepartmentIdentify(modifiedData[page-2].department);
    setLocationIdentify(modifiedData[page-2].location);
  };

  const handleNextPage = () => {
    resetFields();
    navigate(`/upload/${page + 1}`, { state: { modifiedData, totalPage } });
    setCommitteeIdentify(modifiedData[page].committee);
    setDepartmentIdentify(modifiedData[page].department);
    setLocationIdentify(modifiedData[page].location);
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
  
  const CommitteeDropDownRef = useRef();
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
  const [CommitteeIsOpen, setCommitteeIsOpen] = useDetectClose(CommitteeDropDownRef, false);

  const DepartmentDropDownRef = useRef();
  const [DepartmentIdentify, setDepartmentIdentify] = useState(modifiedData[page - 1].department);
  const DepartmentList = [
    '주일예배부',
    '1부 시온찬양대',
    '중보기도부',
    '상담사역부',
    '영유아부',
    '중고등부',
    '선교기획부',
    '이웃사랑부',
    '새생명전도부',
    '새가족 1부',
    '건물 관리부',
    '친교부',
    '에녹봉사부',
    '청년섬김부',
    '재정부',
    '마태평원']
  const [DepartmentIsOpen, setDepartmentIsOpen] = useDetectClose(DepartmentDropDownRef, false);

  const LocationDropDownRef = useRef();
  const [LocationIdentify, setLocationIdentify] = useState(modifiedData[page - 1].location);
  const LocationList = [
    '본당',
    'EM 예배실',
    '중고등부실',
    '초등부실',
    '유년부실',
    '유치부실',
    'AWANA실',
    '친교실',
    '소친교실',
    '당회실',
    '새가족실',
    '찬양대실']
  const [LocationIsOpen, setLocationIsOpen] = useDetectClose(LocationDropDownRef, false);

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
        
        <div ref={CommitteeDropDownRef} style={{ position: 'relative'}}>
        <InputContainer>
        
          <Label>위원회</Label>
          <div style={{  width: '101.18%' }}>
          <Input
            key={`committee-${page}`}
            value={CommitteeIdentify}
            {...register("committee")}
            onClick={() => setCommitteeIsOpen(!CommitteeIsOpen)}
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
        {CommitteeIsOpen && 
          <StyledList>
          {CommitteeList.map((value, index) => (
            <li
              key={index}
              className="list-item"
              onClick={() => {
                setCommitteeIdentify(value);
                setCommitteeIsOpen(false);
                handleCommitteeSelect(value);
              }}
            >
              {value}
            </li>
          ))}
        </StyledList>
        }
        </div>
        
        <div ref={DepartmentDropDownRef} style={{ position: 'relative'}}>
        <InputContainer>
        
          <Label>부서</Label>
          <div style={{  width: '101.18%' }}>
          <Input
            key={`departmnet-${page}`}
            value={DepartmentIdentify}
            {...register("department")}
            onClick={() => setDepartmentIsOpen(!DepartmentIsOpen)}
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
        {DepartmentIsOpen && 
          <StyledList>
          {DepartmentList.map((value, index) => (
            <li
              key={index}
              className="list-item"
              onClick={() => {
                setDepartmentIdentify(value);
                setDepartmentIsOpen(false);
                handleDepartmentSelect(value);
              }}
            >
              {value}
            </li>
          ))}
        </StyledList>
        }
        </div>

        <div ref={LocationDropDownRef} style={{ position: 'relative'}}>
        <InputContainer>
        
          <Label>장소</Label>
          <div style={{  width: '101.18%' }}>
          <Input
            key={`location-${page}`}
            value={LocationIdentify}
            {...register("location")}
            onClick={() => setLocationIsOpen(!LocationIsOpen)}
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
        {LocationIsOpen && 
          <StyledList>
          {LocationList.map((value, index) => (
            <li
              key={index}
              className="list-item"
              onClick={() => {
                setLocationIdentify(value);
                setLocationIsOpen(false);
                handleLocationSelect(value);
              }}
            >
              {value}
            </li>
          ))}
        </StyledList>
        }
        </div>

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
            defaultValue={convertExcelDate(modifiedData[page - 1].purchaseDate).toLocaleDateString('en-US')}
            {...register("purchaseDate")}
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