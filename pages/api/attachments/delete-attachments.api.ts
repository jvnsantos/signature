import { API_SERVICE } from "@/shared/services/api-connection";

// API_DELETE_ATTACHMENTS
type API_DELETE_ATTACHMENTS_PROPS = {
  deliveryAttachmentId?: string;
  token: string;
};

export const API_DELETE_ATTACHMENTS = async ({
  deliveryAttachmentId,
  token,
}: API_DELETE_ATTACHMENTS_PROPS) => {
  const response = await API_SERVICE(
    `v1/deliveries/origin-driver/attachments/${deliveryAttachmentId}`,
    {
      body:{},
      headers: {
        Authorization: `Bearer ${token}`,
      },
      method: "DELETE",
    },
    true
  );
  return response.data;
};
