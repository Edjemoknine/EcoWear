import React from "react";

const Success = () => {
  return (
    <div className="grid place-items-center h-screen ">
      <div className="max-w-xl grid place-items-center  min-h-[50vh] text-center w-full p-6 rounded-md bg-teal-300">
        <h1 className="text-4xl font-bold text-teal-50">Congartulations</h1>
        <p className="text-2xl  text-gray-200">
          Your Payment is Done Successfully!
        </p>
      </div>
    </div>
  );
};

export default Success;
