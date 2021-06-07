import Alert from "components/alert";
import { useState } from "react";

const ErrorMessage = ({
  errors,
  field,
  message,
}: {
  errors?: { [key: string]: string | number };
  field?: string;
  message?: string;
}) => {
  if (!errors?.[field] && !message) return null;
  return <p className="text-red-500 pt-0.5 pb-2">{message || errors[field]}</p>;
};

export default ErrorMessage;
