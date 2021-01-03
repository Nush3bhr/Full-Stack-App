import logo from "./logo.svg";
import "./App.css";
import axios from "axios";
import { useEffect, useState } from "react";

function App() {
  const [data, setData] = useState([]);
  const [name, setName] = useState("");

  const handleChange = (event) => {
    setName(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const postedData = await axios.post("http://localhost:5000/api/items/", {
      name: name,
    });

    alert(name + " is Saved to Server");
    console.log("postedData: ", postedData);
  };

  useEffect(() => {
    const apiCall = async () => {
      try {
        const receivedData = await axios.get(
          "http://localhost:5000/api/items/"
        );

        if (receivedData && receivedData.data) {
          setData(receivedData.data);
        }
      } catch (err) {
        console.log(err);
      }
    };
    apiCall();
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <h1>Names: </h1>

        {data &&
          data.map((myData, index) => <h3 key={index}>{myData.name}</h3>)}

        <form onSubmit={handleSubmit}>
          Enter Name:
          <input value={name} onChange={handleChange} type="text" />
          <input value="Save to server" type="submit" />
        </form>
      </header>
    </div>
  );
}

export default App;
