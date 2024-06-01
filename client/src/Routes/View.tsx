import React, { useState, useEffect } from 'react';
import { styled } from "styled-components";
import * as XLSX from 'xlsx';
import { google } from 'googleapis';

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

  const exportToExcel = () => {
    const worksheet = XLSX.utils.json_to_sheet(items);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Items');
    XLSX.writeFile(workbook, 'items.xlsx');
  };

  const openGoogleSheet = async () => {
    try {
      const auth = new google.auth.GoogleAuth({
        credentials: {
          client_email: 'kepc-22@sodium-task-412102.iam.gserviceaccount.com',
          private_key: '-----BEGIN PRIVATE KEY-----MIIEvAIBADANBgkqhkiG9w0BAQEFAASCBKYwggSiAgEAAoIBAQCsqQkbg/9G+DYD\nEf1jUU7DJ362s8b2zNgf7xWzvPV0a3l2Yh2sX4PHtUeiWflKLVm8falfj0o4uFhO\n9hVTah8FenvUf71PMdeLIkNN/06ZwU5j4TzURoUOicUwRtY0arz967a1yLjT8w7j\nhBPs7VWs7hLcyv24lOa8oA/BBw1+rBgzd0yikVQ7eL2Bu2llztP96vrFuSa5rCux\nu/258bowit73dcwbkElE03WPbB7qhuHIOujt47l4V4EsOey4MyjpR2r7HuTcTCb3\ncuqWMTuSRGwRswYVIzt/7/b3mNGE67McjAlwsREJGJtJOSx+X9At3/a0xkHGkmli\nXrwa91eTAgMBAAECggEABF46ZsHOIYOCCk3YNT0HWxSSthiSPggsp5Iq4GM1an6V\nkhMlYQkBknnZmBfioKfJD2W2dT5wyEKRqV28aGHU6xSQMW4R4gEGzPRO85gz6tvj\nGc/G9C/cieOeY3xHSwgwQ9REyRCM7H/HrqXWwzW15ywWuhNAm/zYYYlDHMUK6Ftz\nkoSgknkVbnuxNKVt4rRto0QZYYSZGaH7NTFdB6pKKUm8Dwzwhoq8840i8MwYnd20\niDwaCq9WfMDz4yv5xnLmX5XMlSluVrJdBYqLFFV4ZjB/4q8Bx6sqCbkw4femsfs4\n9GmRXI7QSZ2h2Vz6I5dBX21eGoflAridXVNN+0wLgQKBgQDdLCFRcS0HDn/MKPa0\nmfmIYc/daV7oQFAfkAKLzZFg9ntjHTG6ei1kOSPGkbn4ul6oQmdJNooPV9Nc5ZrQ\nODkcAlMWYg+Cu5m+Se5YbFrEDVOnOupQhgKRYBJLFavSUmuGakE1a+HssKoJsrYg\nu1lG0jvAR6NX7UjICaQoBDsPcwKBgQDH2UsBMv0s0WR0iXYv/TGTTMiQS64kzrtW\nrnOe2aTuIuqHKD1XMRg97+FTSTF3t/ti6XkZ4cCf7BsMeoWkniKvkWN5gZa3pa8O\nNmLQty+ZO05TUxhPPXUDioXggmwfXqwwdWB6wSdUc+2SDUZJvnypD0CKb+p5CiME\nLHddpWZPYQKBgGUbr3+TxYncTv/+Ggol+bUnQeduLDzwabCEHSXcLAGvrGh7CCi/\ngdC3bmtwYxwZ1vwEn0MQ87xf4fgt3sAhc7oiNemdmomhSX98PMGfhz7o+L0Sadu1\n56adzL8WgR39H7qrCHRrhTS27oTQdgIwo3eE1FvqY/nmN8d64NiKVpWRAoGAf8RZ\nIoQhvoSET8kOSXH7PuwJEc+An0GYHbvcaYNF4YVrIUvFo7fcgsSY7vFNcfeq/Tq8\n1KIyz0tYo6q1RGBhVpOB4E3MOM7xUwnMNRnYkYOL+NOYKBjndYMbQkS/sXKKbVSt\ngO16IpEXIpfgBweElWUN4zPX2Nh1OJbhHXrAJSECgYA46RykPdqvJBSVDXOYGE5e\nqho95S/TSuLjrnJnh6Q2ZOFLWZIZPBSLJc3SwIR6OLmvrE+mJ0C48ostSlX9yOnA\nO5OfTVJoB/6ubhAKnK48TKPDeNg3lvthueFf7v1ytclWcGikG7TasFosvaZ3ZAvN\ndXhh+JobJsCfDL5jKyrvWQ==\n-----END PRIVATE KEY-----',
        },
        scopes: ['https://www.googleapis.com/auth/spreadsheets'],
      });

      const sheets = google.sheets({ version: 'v4', auth });

      const spreadsheetId = '1Mo7ngf5JdB4T8FdU1CJX';
      const range = 'Sheet1!A1:Z';

      const request = {
        spreadsheetId,
        range,
        valueInputOption: 'USER_ENTERED',
        resource: {
          values: items.map((item) => Object.values(item)),
        },
      };

      const response = await sheets.spreadsheets.values.update(request);

      window.open(`https://docs.google.com/spreadsheets/d/${spreadsheetId}/edit#gid=0`);
    } catch (error) {
      console.error('Error opening Google Sheet:', error);
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
      <Button onClick={exportToExcel}>Export to Excel</Button>
      <Button onClick={openGoogleSheet}>Open Google Sheet</Button>
    </Container>
  );
};