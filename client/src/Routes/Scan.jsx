import styled, { css } from "styled-components";
import { useDropzone } from "react-dropzone";
import { SERVER_URL } from "../api";
import React, { useState } from "react";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  padding: 50px;
`;

const LocationButtonContainer = styled.div`
  display: flex;
  flex-direction: row;
  overflow-x: auto;
  padding: 5px 0;
`;

const LocationButton = styled.div`
  display: flex;
  margin-right: 5px;
  width: fit-content;
  padding: 5px;
  overflow-x: auto;
  border: 2px;
  cursor: pointer;
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
  const [missingItems, setMissingItems] = useState(null);
  const [selectedLocation, setSelectedLocation] = useState("");

  const locations = [
    "본당",
    "EM 예배실",
    "중고등부실",
    "초등부실",
    "유년부실",
    "유치부실",
    "AWANA실",
    "친교실",
    "소친교실",
    "당회실",
    "새가족실",
    "찬양대실",
  ];

  const handleLocationSelect = (location) => {
    setSelectedLocation(location);
  };

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
        body: JSON.stringify({
          csvData: data,
          location: selectedLocation,
        }),
      });
      const res_data = await res.json();

      setMissingItems(res_data.missing_items);
      console.log(res_data.missing_items);
    };

    if (acceptedFiles.length > 0) {
      reader.readAsBinaryString(acceptedFiles[0]);
    }
  };
  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  return (
    <Container>
      <div>재고 확인</div>

      <h2>스캔 장소 선택</h2>
      <LocationButtonContainer>
        {locations.map((location) => (
          <LocationButton
            key={location}
            onClick={() => handleLocationSelect(location)}
            style={{
              backgroundColor: location === selectedLocation ? "gray" : "white",
              color: location === selectedLocation ? "white" : "black",
            }}
          >
            {location}
          </LocationButton>
        ))}
      </LocationButtonContainer>
      {selectedLocation && <p>현재 선택된 장소: {selectedLocation}</p>}

      {selectedLocation && (
        <DropZoneContainer {...getRootProps()} $isDragActive={isDragActive}>
          <input {...getInputProps()} />
          <DropZoneText>
            csv 파일을 드래그 앤 드롭하거나 클릭하여 업로드하세요.
          </DropZoneText>
        </DropZoneContainer>
      )}

      {missingItems &&
        (missingItems.length > 0 ? (
          <div>
            <p>스캔되지 않은 물품들:</p>
            <ul>
              {missingItems.map((item, index) => (
                <li key={index}>
                  Tag ID: {item.tag_id}, Item Name: {item.name}
                </li>
              ))}
            </ul>
          </div>
        ) : (
          <p>모두 스캔 성공!</p>
        ))}
    </Container>
  );
}
