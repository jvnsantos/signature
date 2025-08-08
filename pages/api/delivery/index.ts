import { API_SERVICE } from "@/shared/services/api-connection";
import { getToken } from "@/shared/services/cookie.service";

type API_GET_DELIVERY_PROPS = {
  deliveryId: string;
  token?: string;
};
const API_GET_DELIVERY = async ({
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

// API_DELETE_ATTACHMENTS
type API_DELETE_ATTACHMENTS_PROPS = {
  deliveryAttachmentId: string;
  token: string;
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

// API_CREATE_ATTACHMENTS
interface API_CREATE_ATTACHMENTS_PROPS extends API_DELETE_ATTACHMENTS_PROPS {
  formData: FormData;
}
export const API_CREATE_ATTACHMENTS = async ({
  deliveryAttachmentId,
  token,
  formData,
}: API_CREATE_ATTACHMENTS_PROPS) => {
  const _token = token ?? getToken();
  const response = await API_SERVICE(
    `v1/deliveries/origin-driver/attachments/${deliveryAttachmentId}`,
    {
      body: formData,
      isFormData: true,
      maxBodyLength: "Infinity",
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${_token}`,
      },
      method: "POST",
    },
    true
  );
  return response;
};

export default API_GET_DELIVERY;
