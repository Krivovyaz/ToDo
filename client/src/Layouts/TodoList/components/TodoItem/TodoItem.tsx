import React, { FC } from "react";
import { Todo } from "../../../../api/todoApi";
import { Container, Checkbox, Title, ButtonContainer } from "./TodoItem.styles";
import { StyledButton } from "../../../../components/StyledButton/StyledButton";
import EditTodoModal from "../EditTodo/EditTodo";
import { useTodoItem } from "./useTodoItem";

interface Props {
  todo: Todo;
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
  refetchTodos: () => void;
}

export const TodoItem: FC<Props> = ({
  todo,
  onToggle,
  onDelete,
  refetchTodos,
}) => {
  const {
    onOpenEditTodoModal,
    onCloseEditTodoModal,
    isEditTodoModalOpen,
    onEditTodo,
  } = useTodoItem(refetchTodos);

  return (
    <Container>
      <Checkbox
        type="checkbox"
        checked={todo.isCompleted}
        onChange={() => onToggle(todo.id)}
      />
      <Title>{todo.title}</Title>
      <ButtonContainer>
        <StyledButton onClick={onOpenEditTodoModal}>Edit</StyledButton>
        <StyledButton onClick={() => onDelete(todo.id)}>Delete</StyledButton>
      </ButtonContainer>
      <EditTodoModal
        editTodo={onEditTodo}
        isOpen={isEditTodoModalOpen}
        todoId={todo.id}
        initialTitle={todo.title}
        onClose={onCloseEditTodoModal}
      />
    </Container>
  );
};
