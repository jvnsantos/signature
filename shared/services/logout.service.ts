import { removeCookie } from "../utils/remove-cookie.util";

interface logoutServiceProps {
  href: string;
}

const logoutService = ({ href = "/" }: logoutServiceProps) => {
  removeCookie("token");
  removeCookie("refreshToken");
  removeCookie("cid");
  removeCookie("cname");
  window.location.href = href;
};

export default logoutService;
