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

// API_CREATE_ATTACHMENTS
interface API_CREATE_ATTACHMENTS_PROPS {
  token?: string;
  formData: FormData;
  deliveryId: string;
}

export const API_CREATE_ATTACHMENTS = async ({
  token,
  formData,
  deliveryId
}: API_CREATE_ATTACHMENTS_PROPS) => {
  const _token = token ?? getToken();

  // garante que 'name' está no formData
  if (!formData.has("name")) formData.append("name", "receiver_delivery");

  return API_SERVICE(
    `v1/deliveries/origin-driver/attachments/${deliveryId}`,
    {
      body: formData,
      isFormData: true,
      maxBodyLength: 999999999999999999999999999999999,
      headers: {
        Authorization: `Bearer ${_token}`,
      },
      method: "POST",
    },
    true
  );
};

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
