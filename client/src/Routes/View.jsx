import React, { useState, useEffect } from "react";
import { styled } from "styled-components";
import * as XLSX from "xlsx";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  padding: 50px;
  overflow-x: auto;
`;

const Table = styled.table`
  border-collapse: collapse;
  width: 100%;
  padding: 50px;
  max-width: 100%;
`;

const Td = styled.td`
  padding: 8px;
  text-align: left;
  border: 1px solid #ddd;
  border-bottom: 1px solid #ddd;
`;

const Th = styled.th`
  padding: 8px;
  text-align: left;
  border: 1px solid #ddd;
  border-bottom: 1px solid #ddd;
  background-color: gray;
  color: white;
`;

const Button = styled.button`
  margin-top: 20px;
  padding: 10px;
  background-color: gray;
  color: white;
  border: none;
  cursor: pointer;
`;

export default function View() {
  const [items, setItems] = useState([]);

  useEffect(() => {
    fetchItems();
  }, []);

  const fetchItems = async () => {
    try {
      const response = await fetch("http://127.0.0.1:8000/api/items/");
      const data = await response.json();
      setItems(data);
    } catch (error) {
      console.error("Error fetching:", error);
    }
  };

  const exportToExcel = () => {
    const worksheet = XLSX.utils.json_to_sheet(items);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Items");
    XLSX.writeFile(workbook, "items.xlsx");
  };

  const exportToGoogleSheet = async () => {
    try {
      const response = await fetch("http://127.0.0.1:8000/api/export/");
      console.log(response);
    } catch (error) {
      console.error("Error fetching:", error);
    }

    const googleSheetsUrl =
      "https://docs.google.com/spreadsheets/d/1o9OqsjPJZz4UI9z77e9bd6W-03cLiyN_pUVxyogZZFo/edit?gid=0#gid=0";
    window.open(googleSheetsUrl, "_blank");
  };

  return (
    <Container>
      <Table>
        <thead>
          <tr>
            <Th>ID</Th>
            <Th>Type</Th>
            <Th>Tag ID</Th>
            <Th>Name</Th>
            <Th>Brand</Th>
            <Th>Model</Th>
            <Th>Quantity</Th>
            <Th>Serial</Th>
            <Th>Price</Th>
            <Th>Tax</Th>
            <Th>Bought At</Th>
            <Th>Status</Th>
            <Th>Created At</Th>
            <Th>Updated At</Th>
            <Th>Category</Th>
            <Th>Department</Th>
            <Th>Location</Th>
          </tr>
        </thead>
        <tbody>
          {items.map((item) => (
            <tr key={item.id}>
              <Td>{item.id}</Td>
              <Td>{item.item_type}</Td>
              <Td>{item.tag_id}</Td>
              <Td>{item.name}</Td>
              <Td>{item.brand}</Td>
              <Td>{item.model}</Td>
              <Td>{item.quantity}</Td>
              <Td>{item.serial}</Td>
              <Td>{item.price}</Td>
              <Td>{item.tax}</Td>
              <Td>{item.bought_at}</Td>
              <Td>{item.status}</Td>
              <Td>{item.created_at}</Td>
              <Td>{item.updated_at}</Td>
              <Td>{item.category}</Td>
              <Td>{item.department}</Td>
              <Td>{item.location}</Td>
            </tr>
          ))}
        </tbody>
      </Table>
      <Button onClick={exportToExcel}>Export to Excel</Button>
      <Button onClick={exportToGoogleSheet}>Export to Google Sheet</Button>
    </Container>
  );
}
