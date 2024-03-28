import { infinity } from "ldrs";

infinity.register();

type spinnerPropTypes = {
  size?: number;
  type?: string;
  className?: string;
};
const Spinner = ({ size, type, className }: spinnerPropTypes) => {
  return (
    <div
      className={` ${
        type === "fullscreen" ? "w-full h-screen fixed  top-0 left-0 " : ""
      }flex justify-center items-center z-[999999] ${className}}`}
    >
      <l-infinity
        size={size || 65}
        stroke="4"
        stroke-length="0.15"
        bg-opacity="0.1"
        speed="1.3"
        color="white"
      ></l-infinity>
    </div>
  );
};

export default Spinner;
