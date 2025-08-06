import { useRouter } from "next/router";
import { Fragment, useEffect } from "react";

const Home = () => {
  const route = useRouter()

  useEffect(()=>{
    route.push('/unauthorized')
  },[])
  return (
    <Fragment>
    </Fragment>
  );
};

export default Home;
