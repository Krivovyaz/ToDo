import axiosInstance from "../axiosConfig";

export interface Todo {
  id: string;
  title: string;
  isCompleted: boolean;
}

export const todoApi = {
  getTodos: async (search: string): Promise<Todo[]> => {
    try {
      const response = await axiosInstance.get("/todos", {
        params: {
          search,
        },
      });

      return response.data;
    } catch (error) {
      console.error("Error fetching todos:", error);
      throw error;
    }
  },

  deleteTodo: async (id: string): Promise<void> => {
    try {
      await axiosInstance.delete(`/todos/${id}`);
    } catch (error) {
      console.error(`Error deleting todo with id ${id}:`, error);
      throw error;
    }
  },

  completeTodo: async (id: string): Promise<Todo> => {
    try {
      const response = await axiosInstance.patch<Todo>(`/todos/complete/${id}`);

      return response.data;
    } catch (error) {
      console.error(`Error completing todo with id ${id}:`, error);
      throw error;
    }
  },

  addTodo: async (title: string): Promise<Todo> => {
    try {
      const response = await axiosInstance.post<Todo>(`/todos`, {
        title,
      });

      return response.data;
    } catch (error) {
      console.error(`Error creating todo `, error);
      throw error;
    }
  },

  editTodo: async (id: string, title: string): Promise<Todo> => {
    try {
      const response = await axiosInstance.patch<Todo>(`/todos/${id}`, {
        title,
      });

      return response.data;
    } catch (error) {
      console.error(`Error updating todo `, error);
      throw error;
    }
  },
};
