import { useCallback, useState } from "react";
import { todoApi } from "../../../../api/todoApi";

export const useTodoItem = (refetchTodos: () => void) => {
  const [isEditTodoModalOpen, setIsEditTodoModalOpen] =
    useState<boolean>(false);

  const onEditTodo = useCallback(
    async (id: string, title: string) => {
      try {
        await todoApi.editTodo(id, title);
        refetchTodos();
      } catch (error) {
        console.error("Failed to edit todo:", error);
      }
    },
    [todoApi.addTodo]
  );

  const onOpenEditTodoModal = () => {
    setIsEditTodoModalOpen(true);
  };

  const onCloseEditTodoModal = () => {
    setIsEditTodoModalOpen(false);
  };

  return {
    onOpenEditTodoModal,
    onCloseEditTodoModal,
    isEditTodoModalOpen,
    onEditTodo,
  };
};
