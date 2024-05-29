import React from "react";
import {
  Container,
  Title,
  TodoListContainer,
  SearchInput,
  Actions,
} from "./TodoList.styles";
import { useTodoList } from "./useTodoList";
import { TodoItem } from "./components/TodoItem/TodoItem";
import { StyledButton } from "../../components/StyledButton/StyledButton";
import { AddTodoModal } from "./components/AddTodoModal/AddTodoModal";

export const TodoList = () => {
  const {
    loading,
    todos,
    onAddTodo,
    onSearchChange,
    search,
    onDeleteTodo,
    onCompleteTodo,
    isAddTodoModalOpen,
    onCloseAddTodoModal,
    onOpenAddTodoModal,
    fetchTodos,
  } = useTodoList();

  return (
    <Container>
      <Title>To Do</Title>
      <Actions>
        <SearchInput
          type="text"
          placeholder="Search tasks..."
          value={search}
          onChange={onSearchChange}
        />
        <StyledButton onClick={onOpenAddTodoModal}>Add task</StyledButton>
      </Actions>
      <AddTodoModal
        addTodo={onAddTodo}
        isOpen={isAddTodoModalOpen}
        onClose={onCloseAddTodoModal}
      />
      <TodoListContainer>
        {loading && <span>Loading</span>}
        {todos &&
          todos.map((todo) => (
            <TodoItem
              refetchTodos={fetchTodos}
              key={todo.id}
              todo={todo}
              onToggle={onCompleteTodo}
              onDelete={onDeleteTodo}
            />
          ))}
      </TodoListContainer>
    </Container>
  );
};
