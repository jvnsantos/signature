import { API_SERVICE } from "@/shared/services/api-connection";

type API_CANCEL_DELIVERY_PROPS = {
  deliveryId: string;
  payload: { observation?: string; reasonNotDelivery: string };
  token: string;
};
export const API_CANCEL_DELIVERY = async ({
  deliveryId,
  token,
  payload,
}: API_CANCEL_DELIVERY_PROPS) => {
  const response = await API_SERVICE(
    `v1/deliveries/origin-driver/not-delivery/${deliveryId}`,
    {
      body: payload,
      headers: {
        Authorization: `Bearer ${token}`,
      },
      method: "PUT",
    },
    true
  );
  return response;
};
