import styled from 'styled-components';

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

export const Td = styled.td<{ highlighted?: boolean }>`
  padding: 10px;
  border: 1px solid #ccc;
  text-align: center;
  background-color: ${({ highlighted }) => (highlighted ? '#ffd700' : 'white')};
  border: ${({ highlighted }) => (highlighted ? '2px solid red' : '1px solid #ccc')};
`;

export const TrashIconImg = styled.img`
  width: 20px;
  height: 20px;
  cursor: pointer;
  &:hover {
    opacity: 0.7;
  }
`;
