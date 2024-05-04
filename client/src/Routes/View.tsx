import React, { useState, useEffect } from 'react';
import { styled } from "styled-components";

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

interface Item {
  id: number;
  item_type: string;
  tag_id: string;
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
      const response = await fetch('http://127.0.0.1:8000/api/items/');
      const data = await response.json();
      setItems(data);
    } catch (error) {
      console.error('Error fetching:', error);
    }
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
    </tr>
  ))}
</tbody>
    </Table>
    </Container>
  );
};