import { NextRouter } from "next/router"

type Props = {
  router: NextRouter
}

const RedirectUnauthorized = ({ router }: Props) => {
  router.replace("/unauthorized");

}

export default RedirectUnauthorized