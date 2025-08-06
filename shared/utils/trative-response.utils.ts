type Response = {
  data?: any;
  response?: any;
  status?: number;
};

type Props = {
  response: Response;
  callBackSuccess: (data?: any) => void;
  callBackError: (message: string, response?: any) => void;
};

const trativeResponseUtils = ({
  response,
  callBackSuccess,
  callBackError,
}: Props) => {
  if (
    response &&
    response?.status &&
    response?.status > 199 &&
    response?.status < 300
  ) {
    callBackSuccess(response);
  } else {
    callBackError(
      response?.response?.data?.message ?? response?.response?.data?.message[0],
      response
    );
  }
};

export default trativeResponseUtils;
