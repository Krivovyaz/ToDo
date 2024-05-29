import styled from "@emotion/styled";

export const Container = styled.div`
  width: 100%;
  height: calc(100vh - 60px);
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-block: 30px;
`;

export const TodoListContainer = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  background-color: azure;
  width: 600px;
  overflow-y: scroll;
  scrollbar-width: none;
`;

export const Title = styled.h1`
  font-size: 40px;
  margin-bottom: 20px;
`;

export const SearchInput = styled.input`
  width: 100%;
  padding: 10px;
  margin-bottom: 20px;
  font-size: 16px;
  width: 300px;
`;

export const Actions = styled.div`
  width: 600px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-inline: 10px;
`;
