import Input from "./components/Input";
import Button from "./components/Button";
import TravelOption from "./components/TravelOption";
import Title from "./components/Title";
import CalculateRoute from "./components/CalculateRoute";

function App() {
  return (
    <>
      <div className="grid grid-cols-[450px,1fr]">
        <aside className="bg-black flex flex-col items-center max-h-screen p-4 text-green-50">
          <Title />
          <Input text="Starting point" />
          <Input text="Destination" />
          <Button scale="big" text="Add stop" />
          <TravelOption />
          <CalculateRoute />
        </aside>
        <main className=""></main>
      </div>
    </>
  );
}

export default App;
