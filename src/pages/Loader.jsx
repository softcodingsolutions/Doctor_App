import { Spinner } from "@material-tailwind/react";

const Loader = () => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-white/10 bg-opacity-50 z-50">
      <Spinner className="size-16" color="blue" />
    </div>
  );
};

export default Loader;
