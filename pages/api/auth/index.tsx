import { API_SERVICE } from "@/shared/services/api-connection";

const API_AUTH_LOGIN = async (username: string, password: string, code?: string) => {
  const body = {
    grant_type: "password",
    client_id: "payip-auth-portal",
    username,
    password,
    ...(code !== undefined && { code }),
  };

  const response = await API_SERVICE(
    "auth/v2/realms/portal/protocol/openid-connect/token",
    {
      body,
      formEncoded: true,
      method: "POST",
    }
  );

  return response;
};

export { API_AUTH_LOGIN };
