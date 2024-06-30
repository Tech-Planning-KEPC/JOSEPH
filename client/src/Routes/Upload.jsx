import styled, { css } from "styled-components";
import * as XLSX from "xlsx";
import { useDropzone } from "react-dropzone";
import { useNavigate } from "react-router-dom";

const Container = styled.div`
  display: grid;
  place-content: center;
  height: 100vh;
`;

const DropZoneContainer = styled.div`
  display: grid;
  place-content: center;
  border: 2px dashed #ccc;
  height: 300px;
  border-radius: 10px;
  margin: 20px;
  padding: 20px;
  text-align: center;
  cursor: pointer;
  transition: all 0.3s ease-in-out;
  ${({ isDragActive }) =>
    isDragActive &&
    css`
      border-color: #2196f3;
      border-style: solid;
    `}

  &:hover {
    background-color: #f5f5f5;
  }
`;

const DropZoneText = styled.p`
  font-size: 16px;
  color: #777;
`;

export default function Upload() {
  const navigate = useNavigate();

  const onDrop = (acceptedFiles) => {
    const reader = new FileReader();

    reader.onabort = () => console.log("File reading was aborted");
    reader.onerror = () => console.log("File reading failed");
    reader.onload = () => {
      const binaryStr = reader.result;
      const workbook = XLSX.read(binaryStr, { type: "binary" });
      const worksheetName = workbook.SheetNames[0];
      const worksheet = workbook.Sheets[worksheetName];
      const data = XLSX.utils
        .sheet_to_json(worksheet, { header: 1, raw: true })
        .slice(1, 41)
        .filter((row) => Array.isArray(row) && row.length !== 1);

      const newData = [];
      data.forEach((row) => {
        console.log(convertExcelDate(row[11]));
        newData.push({
          tagId: row[1],
          committee: row[2],
          department: row[3],
          manager: row[4],
          email: row[5],
          phone: row[6],
          category: row[7],
          name: row[8],
          brand: row[9],
          model: row[10],
          purchaseDate: convertExcelDate(row[11]),
          unitPrice: row[12],
          location: row[13],
          note: row[14],
        });
      });
      navigate("/upload/1", {
        state: { data: newData, totalPage: data.length },
      });

      function convertExcelDate(serial) {
        const utc_days = Math.floor(serial - 25568);
        const utc_value = utc_days * 86400;
        const date_info = new Date(utc_value * 1000);
        return new Date(date_info).toLocaleDateString("en-US");
      }
    };

    if (acceptedFiles.length > 0) {
      reader.readAsBinaryString(acceptedFiles[0]);
    }
  };
  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  return (
    <Container>
      <DropZoneContainer {...getRootProps()} $isDragActive={isDragActive}>
        <input {...getInputProps()} />
        <DropZoneText>
          엑셀 파일을 드래그 앤 드롭하거나 클릭하여 업로드하세요.
        </DropZoneText>
      </DropZoneContainer>
    </Container>
  );
}
