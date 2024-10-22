import styled from 'styled-components';

export const Card = styled.div`
  width: 80%;
  max-width: 500px;
  padding: 20px;
  border: 2px solid #007bff;
  border-radius: 8px;
  box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.1);
  background-color: white;
  text-align: center;
  overflow: hidden;
  margin-top: 20px;
`;

export const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  margin-top: 20px;
`;

export const Th = styled.th`
  background-color: #007bff;
  color: white;
  padding: 10px;
  border: 1px solid #ccc;
`;

export const Td = styled.td`
  padding: 10px;
  border: 1px solid #ccc;
  text-align: center;
`;

export const Description = styled.div`
  margin-bottom: 10px;
  text-align: left;
  padding: 10px;
  background-color: #f9f9f9;
  border: 1px solid #ccc;
  border-radius: 5px;
`;
