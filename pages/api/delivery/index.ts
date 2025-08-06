import { API_SERVICE } from "@/shared/services/api-connection";
import { getToken } from "@/shared/services/cookie.service";

type Props = {
  deliveryId: string;
  token?: string;
};

const API_GET_DELIVERY = async ({ deliveryId, token }: Props) => {
  const _token = token ?? getToken();

  const response = await API_SERVICE(
    `v1/deliveries/origin-driver/${deliveryId}`,
    {
      headers: {
        Authorization: `Bearer ${_token}`,
      },
      method: "GET",
    },
    true
  );

  return response;
};

export default API_GET_DELIVERY;
