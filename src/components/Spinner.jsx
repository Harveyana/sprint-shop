function Spinner() {
  return (
    <div className="absolute w-screen h-screen bg-slate-300/20 inset-0 backdrop-blur-sm flex items-center justify-center z-[1000]">
      <div className="loader"></div>
    </div>
  );
}

export default Spinner;
