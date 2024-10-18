"use client";
import React from "react";
import { useRouter } from "next/navigation";
import { useFormik } from "formik";
import { object, string } from "yup";
import { toast } from "react-toastify";
import {
  Button,
  FormControl,
  FormErrorMessage,
  Input,
  InputGroup,
  InputLeftElement,
  Stack,
} from "@chakra-ui/react";
import { AtSignIcon, LockIcon } from "@chakra-ui/icons";

import { Spinner } from "~/components";
import type { TFormConfig, TFormItem } from "./SigninForm.types";

const initialValues: TFormConfig = {
  email: "",
  password: "",
};

const validationSchema = object().shape({
  email: string().email("Invalid email").required("Email is required"),
  password: string().required("Password is required"),
});

const formItems: TFormItem[] = [
  {
    icon: <AtSignIcon />,
    name: "email",
    placeholder: "Email",
    type: "email",
  },
  {
    icon: <LockIcon />,
    name: "password",
    placeholder: "Password",
    type: "password",
  },
];

const SigninForm: React.FC = () => {
  const router = useRouter();
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

    onSubmit: async (values): Promise<void> => {
      try {
        const response = await fetch("/api/signin", {
          body: JSON.stringify(values),
          method: "POST",
        });

        if (response && response.status === 200) {
          toast("Successfully logged in", { type: "success" });
          router.push("/posts");

          return;
        }

        if (response && response.status === 401) {
          toast("Please check email or password", { type: "error" });
        }
      } catch (error) {
        toast("Please check email or password", { type: "error" });
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
              ({ icon, name, placeholder, type }: TFormItem): React.ReactElement => {
                const hasError = Boolean(errors[name] && touched[name]);

                return (
                  <FormControl isInvalid={hasError} key={`form-item-${name}`}>
                    <InputGroup>
                      <InputLeftElement color="gray.400" pointerEvents="none">
                        {icon}
                      </InputLeftElement>

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
              Sign In
            </Button>
          </Stack>
        )}
      </form>

      {isSubmitting && <Spinner />}
    </React.Fragment>
  );
};

export { SigninForm };
