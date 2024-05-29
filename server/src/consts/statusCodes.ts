export const STATUS_CODES = {
  INTERNAL_SERVER_ERROR: 500,
};

export const ERROR_MESSAGES = {
  TODO: {
    INTERNAL_SERVER_ERROR: 'Internal server error',
    SAVE: 'Failed to save todo',
    GET_TODOS: 'Failed to get todos',
    DELETE: 'Failed to delete todo',
    NO_TODO: `To do with id doesn't exst`,
  },
};

export const SUCCESS_MESSAGES = {
  DELETE_TODO: 'Todo was deleted',
  COMPLETE_TODO: 'Todo was completed',
  UPDATE_TODO: 'Todo was successfully updated',
};
