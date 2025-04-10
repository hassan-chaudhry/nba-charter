import { TailSpin } from "react-loader-spinner";

import React from "react";

const Loader = () => {
  // loader component: https://www.npmjs.com/package/react-loader-spinner

  return (
    <div className="flex items-center justify-center py-20">
      <TailSpin
        visible={true}
        height="80"
        width="80"
        color="purple"
        ariaLabel="tail-spin-loading"
        radius="1"
        wrapperStyle={{}}
        wrapperClass=""
      />
    </div>
  );
};

export default Loader;
