import { API_SERVICE } from "@/shared/services/api-connection";
import { getToken } from "@/shared/services/cookie.service";

// API_GET_ATTACHMENTS
type API_GET_ATTACHMENTS_PROPS = {
  deliveryId: string;
  token: string;
};
type API_GET_ATTACHMENTS_RESPONSE = {
  deliveryAttachmentId: string;
  urlAttachment: string;
  name: string;
  description: string;
};
export const API_GET_ATTACHMENTS = async ({
  deliveryId,
  token,
}: API_GET_ATTACHMENTS_PROPS): Promise<API_GET_ATTACHMENTS_RESPONSE[]> => {
  const _token = token ?? getToken();
  const response = await API_SERVICE(
    `https://api.hml.payip.com.br/v1/deliveries/origin-driver/attachments/${deliveryId}`,
    {
      headers: {
        Authorization: `Bearer ${_token}`,
      },
      method: "GET",
    },
    true
  );
  return response.data;
};
