import React, { useState, useEffect } from "react";
import axios from "axios";

import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import { Button, TextField, Typography } from "@material-ui/core";

const BondCalculator = () => {
  const [string1, setString1] = useState("");
  const [string2, setString2] = useState("");
  const [value, setValue] = useState("");
  const [disabled, setDisabled] = useState(false);

  const handleChange = (event) => {
    if (event.target.name === "string1") {
      setString1(event.target.value);
    } else if (event.target.name === "string2") {
      setString2(event.target.value);
    }
  };
  const percent = parseInt(Math.random() * 100);

  const handleSubmit = async (event) => {
    event.preventDefault();

    const valueNeeded =
      string1 + " is " + percent + " % " + "compatible with " + string2 + ".";

    const postedData = await axios.post("http://localhost:5000/api/bonds/", {
      name: string1.trim(),
      message: valueNeeded,
      partner: string2.trim(),
    });

    const delay = (ms) => new Promise((res) => setTimeout(res, ms));
    setValue("Wait!!");
    setDisabled(true);
    await delay(1000);
    setValue("Testing your compatibility.......");
    await delay(1500);
    setValue("Calculating........");
    await delay(1000);
    setValue("Finally!!!");
    await delay(1500);
    setValue(valueNeeded);
    setDisabled(false);
  };

  const handleReset = () => {
    setString1("");
    setString2("");
    setValue("");
    setDisabled(false);
  };

  return (
    <div>
      <div style={{ textAlign: "center", marginTop: "100px" }}>
        <Typography variant="h3">Test Your BOND!</Typography>
      </div>
      <Card
        style={{
          marginTop: "50px",
          width: "30%",
          marginLeft: "35%",
          padding: "20px",
          backgroundColor: "rgb(238, 255, 252)",
          boxShadow: "0 8px 8px 0 rgba(0, 0, 0, 0.4)",
        }}
      >
        <CardContent style={{ fontWeight: "bold" }}>
          <form onSubmit={handleSubmit}>
            <Typography style={{ fontWeight: "bold" }}>Your Name:</Typography>

            <TextField
              required
              variant="outlined"
              type="text"
              placeholder="Name"
              name="string1"
              value={string1}
              onChange={handleChange}
              style={{ margin: "10px" }}
              disabled={disabled}
            />
            <Typography style={{ fontWeight: "bold" }}>
              Partner's Name:
            </Typography>

            <TextField
              fullwidth
              required
              variant="outlined"
              type="text"
              placeholder="Test your bond with"
              name="string2"
              value={string2}
              onChange={handleChange}
              style={{ margin: "10px" }}
              disabled={disabled}
            />
            <br />
            <Button
              variant="outlined"
              color="secondary"
              type="submit"
              style={{ margin: "10px" }}
              disabled={disabled}
            >
              Check
            </Button>
            <Button
              variant="outlined"
              color="secondary"
              style={{ margin: "10px" }}
              // disabled={disableReset}
              onClick={handleReset}
            >
              Reset
            </Button>

            <Typography
              style={{
                margin: "25px",
                fontFamily: "revert",
                color: "brown",
                fontWeight: "bold",
              }}
            >
              {value}
            </Typography>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};
export default BondCalculator;
