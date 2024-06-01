import React, { useState, useEffect } from "react";
import { styled } from "styled-components";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  padding: 50px;
  overflow-x: auto;
`;

const Table = styled.table`
  border-collapse: collapse;
  width: 100vw;
  padding: 50px;
  max-width: 100%;
  font-size: 10px;
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

interface Item {
  id: number;
  item_type: string;
  tag_id: string;
  manager: string;
  name: string;
  brand: string;
  model: string;
  quantity: number;
  serial: string;
  price: string;
  tax: string;
  bought_at: string;
  status: string;
  created_at: string;
  updated_at: string;
  category: number;
  department: number;
}

export default function View() {
  const [items, setItems] = useState<Item[]>([]);

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

  return (
    <Container>
      <Table>
        <thead>
          <tr>
            <Th>태그 ID</Th>
            <Th>부서</Th>
            <Th>담당자</Th>
            <Th>이름</Th>
            <Th>카테고리</Th>
            <Th>브랜드</Th>
            <Th>모델</Th>
            <Th>단가</Th>
            <Th>구매일</Th>
            <Th>상태</Th>
          </tr>
        </thead>
        <tbody>
          {items.map((item) => (
            <tr key={item.id}>
              <Td>{item.tag_id}</Td>
              <Td>{item.department}</Td>
              <Td>{item.manager}</Td>
              <Td>{item.name}</Td>
              <Td>{item.category}</Td>
              <Td>{item.brand}</Td>
              <Td>{item.model}</Td>
              <Td>${item.price}</Td>
              <Td>{item.bought_at}</Td>
              <Td>{item.status}</Td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Container>
  );
}
