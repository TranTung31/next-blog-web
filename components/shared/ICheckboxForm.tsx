/* eslint-disable @typescript-eslint/no-unused-vars */
import { Checkbox, CheckboxProps } from "antd";
import Form, { Rule } from "antd/es/form";
import React from "react";

interface ICheckboxFormProps extends CheckboxProps {
  name: string;
  label?: string;
  rules?: Rule[];
  required?: boolean;
  formItemClassName?: string;
  checkboxClassName?: string;
}

const ICheckboxForm = ({
  name,
  label,
  rules,
  required,
  formItemClassName,
  checkboxClassName,
  ...rests
}: ICheckboxFormProps) => {
  const formItemProps = {
    name,
    label,
    rules,
    required,
    className: `!mb-0 ${formItemClassName}`,
  };

  return (
    <Form.Item {...formItemProps} valuePropName="checked">
      <Checkbox className={`${checkboxClassName}`} {...rests} />
    </Form.Item>
  );
};

export default ICheckboxForm;
