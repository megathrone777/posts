"use client";
import React from "react";
import { useFormik } from "formik";
import { object, string } from "yup";
import { toast } from "react-toastify";
import {
  Button,
  FormControl,
  FormErrorMessage,
  Input,
  InputGroup,
  Stack,
  Textarea,
} from "@chakra-ui/react";

import { Spinner } from "~/components";
import type { TFormConfig, TFormItem } from "./CreateForm.types";

const initialValues: TFormConfig = {
  content: "",
  title: "",
};

const validationSchema = object().shape({
  content: string().required("Title is required"),
  title: string().required("Content is required"),
});

const formItems: TFormItem[] = [
  {
    name: "title",
    placeholder: "Post title",
    type: "text",
  },
  {
    name: "content",
    placeholder: "Post content",
    type: "textarea",
  },
];

const CreateForm: React.FC = () => {
  const {
    errors,
    handleBlur,
    handleChange,
    handleSubmit,
    isSubmitting,
    touched,
    values,
  } = useFormik<TFormConfig>({
    initialValues,

    onSubmit: async (values, { resetForm }): Promise<void> => {
      try {
        const response = await fetch("/api/posts", {
          body: JSON.stringify(values),
          method: "POST",
        });

        if (response && response.status === 200) {
          resetForm();
          toast("Post created successfully", { type: "success" });

          return;
        }

        if (response && response.status === 401) {
          toast("Cannot create post", { type: "error" });
        }
      } catch (error) {
        toast("Cannot create post", { type: "error" });
        console.error(error);
      }
    },

    validateOnBlur: true,
    validationSchema,
  });

  return (
    <React.Fragment>
      <form onSubmit={handleSubmit}>
        {formItems && !!formItems.length && (
          <Stack spacing={4}>
            {formItems.map(
              ({ name, placeholder, type }: TFormItem): React.ReactElement => {
                const hasError = Boolean(errors[name] && touched[name]);

                if (type === "textarea") {
                  return (
                    <FormControl isInvalid={hasError} key={`form-item-${name}`}>
                      <InputGroup>
                        <Textarea
                          {...{ name, placeholder, type }}
                          onBlur={handleBlur}
                          onChange={handleChange}
                          value={values[name]}
                        />
                      </InputGroup>

                      {hasError && <FormErrorMessage>{errors[name]}</FormErrorMessage>}
                    </FormControl>
                  );
                }

                return (
                  <FormControl isInvalid={hasError} key={`form-item-${name}`}>
                    <InputGroup>
                      <Input
                        {...{ name, placeholder, type }}
                        onBlur={handleBlur}
                        onChange={handleChange}
                        value={values[name]}
                      />
                    </InputGroup>

                    {hasError && <FormErrorMessage>{errors[name]}</FormErrorMessage>}
                  </FormControl>
                );
              }
            )}

            <Button colorScheme="green" type="submit">
              Create
            </Button>
          </Stack>
        )}
      </form>

      {isSubmitting && <Spinner />}
    </React.Fragment>
  );
};

export { CreateForm };
