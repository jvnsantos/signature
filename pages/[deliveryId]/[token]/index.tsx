// /pages/[deliveryId]/[token]/index.tsx

import API_GET_DELIVERY from "@/pages/api/delivery";
import LoadingPage from "@/shared/components/loading-page";
import RedirectUnauthorized from "@/shared/utils/redirect-unauthorized.util";
import trativeResponseUtils from "@/shared/utils/trative-response.utils";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

const DeliveryPage = () => {
  const router = useRouter();
  const { deliveryId, token } = router.query;

  const [authorized, setAuthorized] = useState<boolean | null>(null);

  const validate = async () => {
    try {
      if (!deliveryId || !token) {
        RedirectUnauthorized({ router })
        return
      }
      const response = await API_GET_DELIVERY({ deliveryId: deliveryId as string, token: token as string })

      trativeResponseUtils({
        response,
        callBackError: () => { router.replace("/unauthorized"); },
        callBackSuccess: () => { setAuthorized(true) }
      })

    } catch (err) {
      console.error("Erro ao validar:", err);
      router.replace("/unauthorized");
    }
  };

  useEffect(() => {
    if (!deliveryId || !token) return;
    validate();
  }, [deliveryId, token]);

  if (authorized === null) {
    return <LoadingPage />;
  }

  return (
    <div>
      <h1>Bem-vindo ao delivery {deliveryId}</h1>
      {/* Conteúdo da página */}
    </div>
  );
};

export default DeliveryPage;
