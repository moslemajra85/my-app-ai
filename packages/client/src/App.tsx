import { useState, useEffect } from "react";

function App() {
  const [message, setMessage] = useState("");

  const fecthMessage = async () => {
    try {
      const res = await fetch("/api/hello");
      const data = await res.json();
      setMessage(data.message);
    } catch (error) {}
  };
  useEffect(() => {
    fecthMessage();
  }, []);

  return <p className="p-6 text-3xl">{message}</p>;
}

export default App;
