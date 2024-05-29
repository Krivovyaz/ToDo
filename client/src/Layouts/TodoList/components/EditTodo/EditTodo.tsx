import React from "react";
import Modal from "react-modal";
import { useFormik } from "formik";
import * as Yup from "yup";
import { StyledButton } from "../../../../components/StyledButton/StyledButton";
import { Error, Form, Input } from "./EditTodo.styles";

interface EditTodoModalProps {
  isOpen: boolean;
  onClose: () => void;
  todoId: string;
  initialTitle: string;
  editTodo: (id: string, title: string) => void;
}

const EditTodoModal: React.FC<EditTodoModalProps> = ({
  isOpen,
  onClose,
  todoId,
  initialTitle,
  editTodo,
}) => {
  const formik = useFormik({
    initialValues: {
      title: initialTitle,
    },
    validationSchema: Yup.object({
      title: Yup.string()
        .required("Title is required")
        .max(100, "Title must be 100 characters or less"),
    }),
    onSubmit: async (values, { setSubmitting, setErrors, resetForm }) => {
      try {
        await editTodo(todoId, values.title);
        resetForm();
        onClose();
      } catch (error) {
        setErrors({ title: "Failed to edit todo" });
      }
      setSubmitting(false);
    },
  });

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      contentLabel="Edit Todo Modal"
      style={{
        content: {
          top: "50%",
          left: "50%",
          right: "auto",
          bottom: "auto",
          marginRight: "-50%",
          transform: "translate(-50%, -50%)",
        },
      }}
    >
      <Form onSubmit={formik.handleSubmit}>
        <h2>Edit Todo</h2>
        <Input
          id="title"
          name="title"
          type="text"
          placeholder="Enter todo title"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.title}
        />
        {formik.touched.title && formik.errors.title ? (
          <Error>{formik.errors.title}</Error>
        ) : null}
        <StyledButton type="submit" disabled={formik.isSubmitting}>
          Save Changes
        </StyledButton>
        <StyledButton type="button" onClick={onClose}>
          Cancel
        </StyledButton>
      </Form>
    </Modal>
  );
};

export default EditTodoModal;
