import React from "react";

export interface TFormConfig {
  email: string;
  password: string;
}

export interface TFormItem {
  icon: React.ReactElement;
  name: keyof TFormConfig;
  placeholder: string;
  type: React.HTMLInputTypeAttribute;
}
