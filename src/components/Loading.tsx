const Loading = () => {
  return (
    <div className="fixed top-0 right-0 w-full h-full backdrop-blur-sm z-10 duration-300 transition-all">
      <div className="flex border border-black gap-4 w-full h-full items-center justify-center">
        <span className="sr-only">Loading...</span>
        <div className="h-8 w-8 bg-black rounded-full animate-bounce [animation-delay:-0.3s]"></div>
        <div className="h-8 w-8 bg-black rounded-full animate-bounce [animation-delay:-0.15s]"></div>
        <div className="h-8 w-8 bg-black rounded-full animate-bounce"></div>
      </div>
    </div>
  );
};

export default Loading;
