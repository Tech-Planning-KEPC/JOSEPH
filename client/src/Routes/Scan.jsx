import styled, { css } from "styled-components";
import { useDropzone } from "react-dropzone";
import { useNavigate } from "react-router-dom";
import { SERVER_URL } from "../api";
import React, { useState } from "react";

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

export default function Scan() {
  const navigate = useNavigate();
  const [missingTagIds, setMissingTagIds] = useState(null);

  const onDrop = (acceptedFiles) => {
    const reader = new FileReader();

    reader.onabort = () => console.log("File reading was aborted");
    reader.onerror = () => console.log("File reading failed");
    reader.onload = async () => {
      const data = reader.result.split("\n").slice(6);
      const res = await fetch(`${SERVER_URL}/api/scan/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      const res_data = await res.json();
      let tagIds = [];
      if (Array.isArray(res_data)) {
        tagIds = res_data;
      } else if (typeof res_data === "object" && res_data !== null) {
        tagIds = res_data.missing_tag_ids || Object.values(res_data)[0] || [];
      }

      setMissingTagIds(tagIds);
      console.log(res_data);
    };

    if (acceptedFiles.length > 0) {
      reader.readAsBinaryString(acceptedFiles[0]);
    }
  };
  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  return (
    <Container>
      <div>재고 확인</div>
      <DropZoneContainer {...getRootProps()} $isDragActive={isDragActive}>
        <input {...getInputProps()} />
        <DropZoneText>
          csv 파일을 드래그 앤 드롭하거나 클릭하여 업로드하세요.
        </DropZoneText>
      </DropZoneContainer>

      {missingTagIds && (
        <div style={{ marginTop: "20px" }}>
          <h3>스캔되지 않은 ID들:</h3>
          <ul>
            {missingTagIds.map((tagId, index) => (
              <li key={index}>{tagId}</li>
            ))}
          </ul>
        </div>
      )}
    </Container>
  );
}
