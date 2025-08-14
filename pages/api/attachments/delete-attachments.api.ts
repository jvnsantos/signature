import { API_SERVICE } from "@/shared/services/api-connection";
import { getToken } from "@/shared/services/cookie.service";

// API_DELETE_ATTACHMENTS
type API_DELETE_ATTACHMENTS_PROPS = {
  deliveryAttachmentId?: string;
  token: string;
  name?: string;
};

export const API_DELETE_ATTACHMENTS = async ({
  deliveryAttachmentId,
  token,
}: API_DELETE_ATTACHMENTS_PROPS) => {
  const _token = token ?? getToken();
  const response = await API_SERVICE(
    `https://api.hml.payip.com.br/v1/deliveries/origin-driver/attachments/${deliveryAttachmentId}`,
    {
      headers: {
        Authorization: `Bearer ${_token}`,
      },
      method: "DELETE",
    },
    true
  );
  return response.data;
};
