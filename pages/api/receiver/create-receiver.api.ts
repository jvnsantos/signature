import { API_SERVICE } from "@/shared/services/api-connection";
import { getToken } from "@/shared/services/cookie.service";

interface API_CREATE_RECEIVER_PROPS {
  token?: string;
  formData: FormData;
  deliveryId: string;
  type: string;
  receiverName: string;
  receiverTaxIdentifier: string;
}

export const API_CREATE_RECEIVER = async ({
  token,
  formData,
  deliveryId,
  receiverName,
  receiverTaxIdentifier,
}: API_CREATE_RECEIVER_PROPS) => {
  const _token = token ?? getToken();

  if (!formData.has("receiverName")) formData.append("receiverName", receiverName);
  if (!formData.has("receiverTaxIdentifier")) formData.append("receiverTaxIdentifier", receiverTaxIdentifier);

  return API_SERVICE(
    `v1/deliveries/origin-driver/receiver/${deliveryId}`,
    {
      body: formData,
      isFormData: true,
      maxBodyLength: 99999999,
      headers: {
        Authorization: `Bearer ${_token}`,
      },
      method: "PUT",
    },
    true
  );
};
