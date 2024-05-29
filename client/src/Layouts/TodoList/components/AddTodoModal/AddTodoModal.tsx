import React, { FC } from "react";
import Modal from "react-modal";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Error, Form, Input } from "./AddTodoModal.styles";
import { StyledButton } from "../../../../components/StyledButton/StyledButton";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  addTodo: (title: string) => void;
}

export const AddTodoModal: FC<Props> = ({ addTodo, isOpen, onClose }) => {
  const formik = useFormik({
    initialValues: {
      title: "",
    },
    validationSchema: Yup.object({
      title: Yup.string()
        .required("Title is required")
        .max(100, "Title must be 100 characters or less"),
    }),
    onSubmit: async (values, { setSubmitting, setErrors, resetForm }) => {
      try {
        await addTodo(values.title);
        resetForm();
        onClose();
      } catch (error) {
        setErrors({ title: "Failed to add todo" });
      }
      setSubmitting(false);
    },
  });

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      contentLabel="Add Todo Modal"
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
        <h2>Add New Todo</h2>
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
          Add task
        </StyledButton>
        <StyledButton type="button" onClick={onClose}>
          Close
        </StyledButton>
      </Form>
    </Modal>
  );
};
