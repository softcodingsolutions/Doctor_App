import { Spinner } from "@material-tailwind/react";

function InsideLoader() {
  return (
    <div className="fixed inset-0 w-screen h-screen bg-white/10 bg-opacity-50 z-50 flex items-center justify-center">
      <Spinner className="size-16" color="blue" />
    </div>
  );
}

export default InsideLoader;
