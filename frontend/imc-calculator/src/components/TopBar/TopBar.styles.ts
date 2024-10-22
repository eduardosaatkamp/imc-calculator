import styled from 'styled-components';

export const TopBarContainer = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #007bff;
  padding: 10px 20px;
  color: white;
  position: fixed;
  top: 0;
  z-index: 1000;
`;

export const TopBarContent = styled.div`
  display: flex;
  align-items: center;
  gap: 20px;
`;

export const LanguageSwitcher = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;

export const FlagButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
`;

export const Flag = styled.img`
  width: 30px;
  height: 30px;
  border-radius: 50%;
  border: 2px solid white;
`;

export const AppTitle = styled.h1`
  font-size: 1.5em;
  color: white;
  margin: 0;
`;
