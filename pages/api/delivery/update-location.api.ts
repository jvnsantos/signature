import { API_SERVICE } from "@/shared/services/api-connection";
import { getToken } from "@/shared/services/cookie.service";

type API_UPDATE_LOCATION_PROPS = {
  deliveryId: string;
  payload: { longitude: number; latitude: number };
  token: string;
};
export const API_UPDATE_LOCATION = async ({
  deliveryId,
  token,
  payload,
}: API_UPDATE_LOCATION_PROPS) => {
  const _token = token ?? getToken();
  const response = await API_SERVICE(
    `v1/deliveries/origin-driver/location/${deliveryId}`,
    {
      body: payload,
      headers: {
        Authorization: `Bearer ${_token}`,
      },
      method: "PUT",
    },
    true
  );
  return response;
};
