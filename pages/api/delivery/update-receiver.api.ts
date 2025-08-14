import { API_SERVICE } from "@/shared/services/api-connection";
import { getToken } from "@/shared/services/cookie.service";

type API_UPDATE_RECEIVER_PROPS = {
  deliveryId: string;
  payload: { receiverName: string; receiverTaxIdentifier: string };
  token: string;
};
export const API_UPDATE_RECEIVER = async ({
  deliveryId,
  token,
  payload,
}: API_UPDATE_RECEIVER_PROPS) => {
  const _token = token ?? getToken();
  const response = await API_SERVICE(
    `v1/deliveries/origin-driver/${deliveryId}`,
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
