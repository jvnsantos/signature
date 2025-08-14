import { API_SERVICE } from "@/shared/services/api-connection";
import { getToken } from "@/shared/services/cookie.service";

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

  return API_SERVICE(
    `v1/deliveries/origin-driver/attachments/${deliveryId}`,
    {
      body: formData,
      isFormData: true,
      maxBodyLength: 99999999,
      headers: {
        Authorization: `Bearer ${_token}`,
      },
      method: "POST",
    },
    true
  );
};