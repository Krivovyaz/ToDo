import { useCallback, useEffect, useState } from "react";
import { Todo, todoApi } from "../../api/todoApi";
import { debounce } from "lodash";

export const useTodoList = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [search, setSearch] = useState<string>("");
  const [debounceSearch, setDebounceSearch] = useState<string>("");
  const [isAddTodoModalOpen, setIsAddTodoModalOpen] = useState<boolean>(false);

  const fetchTodos = useCallback(async () => {
    try {
      const todos = await todoApi.getTodos(debounceSearch);
      setTodos(todos);
      setLoading(false);
    } catch (error) {
      setError("Failed to fetch todos");
      setLoading(false);
    }
  }, [setTodos, setLoading, setError, debounceSearch]);

  const onDebounceSearch = useCallback(
    debounce((term) => {
      setDebounceSearch(term);
    }, 500),
    []
  );

  useEffect(() => {
    onDebounceSearch(search);
  }, [search, setDebounceSearch]);

  useEffect(() => {
    fetchTodos();
  }, [debounceSearch]);

  const onDeleteTodo = useCallback(
    async (id: string) => {
      try {
        await todoApi.deleteTodo(id);
        fetchTodos();
      } catch (error) {
        console.error("Failed to complete todo:", error);
      }
    },
    [todoApi.deleteTodo]
  );

  const onCompleteTodo = useCallback(
    async (id: string) => {
      try {
        await todoApi.completeTodo(id);
        fetchTodos();
      } catch (error) {
        console.error("Failed to complete todo:", error);
      }
    },
    [todoApi.deleteTodo]
  );

  const onAddTodo = useCallback(
    async (title: string) => {
      try {
        await todoApi.addTodo(title);
        fetchTodos();
      } catch (error) {
        console.error("Failed to add todo:", error);
      }
    },
    [todoApi.addTodo]
  );

  const onSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  const onOpenAddTodoModal = () => {
    setIsAddTodoModalOpen(true);
  };

  const onCloseAddTodoModal = () => {
    setIsAddTodoModalOpen(false);
  };

  return {
    loading,
    todos,
    error,
    onDeleteTodo,
    onCompleteTodo,
    onSearchChange,
    search,
    isAddTodoModalOpen,
    onCloseAddTodoModal,
    onOpenAddTodoModal,
    onAddTodo,
    fetchTodos,
  };
};
