import Alert from "components/alert";
import { useState } from "react";

const ApiErrorAlert = ({ errors }: { errors: ApiError }) => {
  const [errorsAck, setErrorsAck] = useState(false);
  return !errorsAck &&
    errors &&
    (errors.__statusCode || errors.__global || errors.__stack) ? (
    <Alert
      type="danger"
      collapsible
      initialCollapse={true}
      text={`Error ${errors.__statusCode}: ${errors.__global}`}
      content={errors.__stack as string}
      className="my-4"
      onCloseClick={() => setErrorsAck(true)}
    />
  ) : null;
};

export default ApiErrorAlert;
