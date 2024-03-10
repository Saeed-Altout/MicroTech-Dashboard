import { Axios } from "@/lib/axios";
import { onError } from "@/lib/error";
import { Cookie } from "@/lib/cookie";

export const Token = async () => {
  const { GET } = await Axios();
  const { deleteCookie, setCookie, hasCookie } = await Cookie();

  const clearToken = async () => {
    deleteCookie("refresh_token");
    deleteCookie("token");
  };

  const refreshToken = async (onSuccess?: () => void) => {
    const hasRefreshToken = hasCookie("refresh_token");

    if (!hasRefreshToken) {
      return null;
    }

    try {
      const res = await GET("auth/refresh_token");
      setCookie("refresh_token", res.data.data.refresh_token);
      setCookie("token", res.data.data.token);
      if (onSuccess) {
        onSuccess();
      }
    } catch (error) {
      onError(error);
    }
  };

  return { clearToken, refreshToken };
};
