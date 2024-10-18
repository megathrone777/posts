import React from "react";

export interface TFormConfig {
  content: string;
  title: string;
}

export interface TFormItem {
  name: keyof TFormConfig;
  placeholder: string;
  type: React.HTMLInputTypeAttribute | "textarea";
}
