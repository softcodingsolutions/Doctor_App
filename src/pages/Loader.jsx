const Loader = () => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50 z-50">
      <div className="w-16 h-16 border-4 border-t-transparent border-green-500 border-solid rounded-full animate-spin"></div>
    </div>
  );
};

export default Loader;
