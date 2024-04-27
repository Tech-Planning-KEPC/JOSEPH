import { useState } from "react";
import { styled } from "styled-components";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  padding: 50px;
`;

const UploadBox = styled.div`
  display: flex;
  flex-direction: column;
  width: 200px;
  gap: 20px;
`;

export default function Upload() {
  const [file, setFile] = useState<File | null>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      setFile(event.target.files[0]);
    }
  };

  const handleUpload = () => {
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        const csvData = reader.result as string;
        const rows = csvData.split("\n");

        console.log(rows);
      };
      reader.readAsText(file);
    }
  };

  return (
    <Container>
      <UploadBox>
        <h1>CSV 파일 업로드</h1>
        <input type="file" accept=".csv" onChange={handleFileChange} />
        <button onClick={handleUpload} disabled={!file}>
          업로드
        </button>
      </UploadBox>
    </Container>
  );
}
