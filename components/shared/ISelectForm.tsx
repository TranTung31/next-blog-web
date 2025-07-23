/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { Form, Select, SelectProps } from "antd";
import { Rule } from "antd/es/form";
import React from "react";

// Định nghĩa các props tùy chỉnh cho SelectForm
interface ISelectFormProps extends SelectProps {
  name: string | any[];
  label?: string;
  rules?: Rule[];
  required?: boolean;
  formItemClassName?: string;
  options: { value: string | number; label: string | number }[];
  placeholder?: string;
  selectClassName?: string;
}

const ISelectForm = ({
  name,
  label,
  rules,
  required,
  formItemClassName,
  options,
  placeholder,
  selectClassName,
  ...rests
}: ISelectFormProps) => {
  const formItemProps = {
    name,
    label,
    rules,
    required,
    className: `!mb-0 ${formItemClassName}`,
  };

  return (
    <Form.Item {...formItemProps}>
      <Select
        options={options}
        placeholder={
          placeholder || `Chọn ${label ? label.trim().toLowerCase() : ""}`
        }
        className={selectClassName}
        {...rests}
      />
    </Form.Item>
  );
};

export default ISelectForm;
