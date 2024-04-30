import { useState } from "react";
import CommandPanel from "./components/CommandPanel";
function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <CommandPanel />
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  );
}

export default App;
