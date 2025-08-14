import { API_SERVICE } from "@/shared/services/api-connection";
import { getToken } from "@/shared/services/cookie.service";

type API_GET_DELIVERY_PROPS = {
  deliveryId: string;
  token?: string;
};
export const API_GET_DELIVERY = async ({
  deliveryId,
  token,
}: API_GET_DELIVERY_PROPS) => {
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
