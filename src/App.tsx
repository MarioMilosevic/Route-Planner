import Input from "./components/Input";
import Button from "./components/Button";
import TravelOption from "./components/TravelOption";
function App() {
  return (
    <>
      <div className="grid grid-cols-[450px,1fr]">
        <aside className="bg-black flex flex-col items-center max-h-screen p-4 text-green-50">
          <h1 className="flex items-center gap-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="#22c55e"
              className="w-8 h-8"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z"
              />
            </svg>
            <span className="text-2xl font-medium">Route planner</span>
          </h1>
        <Input text="Starting point"/>
          <Input text="Destination" />
          <Button text="Add stop" />
          <TravelOption/>
        </aside>

        <main className=""></main>
      </div>
    </>
  );
}

export default App;
