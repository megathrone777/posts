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
import { AtSignIcon, LockIcon, createIcon } from "@chakra-ui/icons";

import { Spinner } from "~/components";
import type { TFormConfig, TFormItem } from "./SignupForm.types";

const UserIcon = createIcon({
  d: `M304 128a80 80 0 1 0 -160 0 80 80 0 1 0 160 0zM96 128a128 128 0 
    1 1 256 0A128 128 0 1 1 96 128zM49.3 464l349.5 0c-8.9-63.3-63.3-112-129-112l-91.4 
    0c-65.7 0-120.1 48.7-129 112zM0 482.3C0 383.8 79.8 304 178.3 
    304l91.4 0C368.2 304 448 383.8 448 482.3c0 16.4-13.3 29.7-29.7 
    29.7L29.7 512C13.3 512 0 498.7 0 482.3z`,
  displayName: "UserIcon",
  viewBox: "0 0 448 512",
});

const initialValues: TFormConfig = {
  email: "",
  firstname: "",
  lastname: "",
  password: "",
};

const validationSchema = object().shape({
  email: string().email("Invalid email").required("Email is required"),
  firstname: string().required("Firstname is required"),
  lastname: string().required("Lastname is required"),
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
  {
    icon: <UserIcon />,
    name: "firstname",
    placeholder: "First Name",
    type: "text",
  },
  {
    icon: <UserIcon />,
    name: "lastname",
    placeholder: "Last Name",
    type: "text",
  },
];

const SignupForm: React.FC = () => {
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
        const response = await fetch("/api/signup", {
          body: JSON.stringify(values),
          method: "POST",
        });

        if (response && response.status === 200) {
          toast("New user successfully registered", { type: "success" });
          router.push("/signin");
        }
      } catch (error) {
        toast("Please check credentials", { type: "error" });
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
              Sign Up
            </Button>
          </Stack>
        )}
      </form>

      {isSubmitting && <Spinner />}
    </React.Fragment>
  );
};

export { SignupForm };
