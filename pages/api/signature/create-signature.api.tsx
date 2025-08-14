import { API_SERVICE } from "@/shared/services/api-connection";
import { getToken } from "@/shared/services/cookie.service";

interface API_CREATE_SIGNATURE_PROPS {
  token?: string;
  formData: FormData;
  deliveryId: string;
}

export const API_CREATE_SIGNATURE = async ({
  token,
  formData,
  deliveryId,
}: API_CREATE_SIGNATURE_PROPS) => {
  const _token = token ?? getToken();

  return API_SERVICE(
    `v1/deliveries/origin-driver/finish/${deliveryId}`,
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
