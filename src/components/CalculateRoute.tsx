import Button from "./Button";
const CalculateRoute = () => {
  return (
    <div className="w-full flex cursor-pointer items-center gap-2">
      <Button scale="medium" text="Calculate route" />
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={5}
        stroke={"#a8a29e"}
        className="w-8 h-8"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M6 18 18 6M6 6l12 12"
        />
      </svg>
    </div>
  );
};

export default CalculateRoute;