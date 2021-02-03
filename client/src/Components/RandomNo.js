import {
  Button,
  Card,
  CardContent,
  TextField,
  Typography,
} from "@material-ui/core";
import React, { useState } from "react";

const RandomNo = () => {
  const [randomNo, setRandomNo] = useState(parseInt(Math.random() * 100));
  const [input, setInput] = useState();
  const [ans, setAns] = useState("");
  const [chances, setChances] = useState(7);
  const [disabled, setDisabled] = useState(false);
  const [disableReset, setDisableReset] = useState(false);

  const handleChange = (event) => {
    setInput(event.target.value);
  };
  const handleReset = () => {
    setInput("");
    setAns("");
    setChances(7);
    setDisabled(false);
    setRandomNo(parseInt(Math.random() * 100));
  };

  const handleClear = () => {
    setInput("");
  };

  const message = (guessInput) => {
    let random = Number(randomNo);
    guessInput = Number(guessInput);
    console.log("guessInput:", guessInput, "randomNumber:", random);
    if (chances === 1 && guessInput !== random) {
      return (
        "Oops, U have lost all ur CHANCES :(   Can't u even guess '" +
        random +
        "' ??"
      );
    }
    if (guessInput === random - 1) {
      return guessInput + " is LOW but u r almost there!!";
    } else if (guessInput === random + 1) {
      return guessInput + " is HIGH but u r almost there!!";
    } else if (guessInput === random) {
      return "Hurray!! It's a correct guess.";
    } else if (guessInput < random - 1 && guessInput >= random - 5) {
      return "low but very close!!";
    } else if (guessInput > random + 1 && guessInput <= random + 5) {
      return "High butvery  close!!";
    } else if (guessInput < random - 5 && guessInput >= random - 10) {
      return "low but near!!";
    } else if (guessInput > random + 5 && guessInput <= random + 10) {
      return "High but near!!";
    } else if (guessInput < random - 10) {
      return "Too Low!!";
    } else if (guessInput > random + 10) {
      return "Too High!!";
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const delay = (ms) => new Promise((res) => setTimeout(res, ms));
    setDisabled(true);
    await delay(1000);
    setAns(message(input));

    if (chances === 1 || Number(input) === Number(randomNo)) {
      setDisabled(true);
      setChances(0);
    } else {
      setChances(chances - 1);
      setDisabled(false);
    }
  };

  return (
    <div>
      <div style={{ textAlign: "center", marginTop: "150px" }}>
        <Typography variant="h4">Guess the NUMBER!</Typography>
      </div>
      {/* {randomNo} */}
      <Card
        style={{
          marginTop: "50px",
          width: "30%",
          marginLeft: "35%",
          boxShadow: "0 8px 8px 0 rgba(0, 0, 0, 0.4)",
          padding: "10px",
        }}
      >
        <CardContent style={{ fontWeight: "bold" }}>
          <form onSubmit={handleSubmit}>
            <Typography>
              <strong> Enter your Guess no (0-100) :</strong>{" "}
            </Typography>
            <TextField
              required
              variant="outlined"
              type="number"
              placeholder="Type your No"
              value={input}
              onChange={handleChange}
              style={{ margin: "10px" }}
            />
            <br />
            <br />
            <br />
            {chances + " chances u have!!"}
            <br />
            <br />
            <br />
            {ans} <br />
            <Button
              variant="outlined"
              color="secondary"
              type="submit"
              style={{ margin: "30px" }}
              disabled={disabled}
            >
              Check
            </Button>
            <Button
              onClick={handleClear}
              variant="outlined"
              color="secondary"
              style={{ margin: "30px" }}
              disabled={disabled}
            >
              Clear
            </Button>
            <Button
              variant="outlined"
              color="secondary"
              style={{ margin: "30px" }}
              disabled={disableReset}
              onClick={handleReset}
            >
              Reset
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};
export default RandomNo;
