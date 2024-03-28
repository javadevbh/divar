function Loader({ height }) {
  return (
    <div className={`text-center mt-36 min-h-[${height}]`}>
      <span className="w-8 h-8 m-auto border-4 border-[#ffc5c5] border-b-primary-red rounded-full inline-block box-border animate-loader"></span>
    </div>
  );
}

export default Loader;
