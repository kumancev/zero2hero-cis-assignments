import React, { useState } from "react";
import axios from "axios";
import TextField from '@mui/material/TextField';
import LoadingButton from '@mui/lab/LoadingButton';
import Typography from "@mui/material/Typography";
import ShowerIcon from '@mui/icons-material/Shower';
import SendIcon from '@mui/icons-material/Send';
import './App.css' 

function App() {
  const [toAddress, setToAddress] = useState("");
  const [hashMessage, setHashMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsLoading(true);

    // Validate that the toAddress input matches the expected Ethereum address format
    const addressRegex = /^0x[0-9a-fA-F]{40}$/;
    if (!addressRegex.test(toAddress)) {
      setErrorMessage("Invalid Ethereum address format");
      setIsLoading(false);
      return;
    }

    try {
      const response = await axios.post("https://tbnb-faucet.onrender.com/send", { toAddress });
      setHashMessage(`https://testnet.bscscan.com/tx/${response.data}`);
      setIsLoading(false);
    } catch (error) {
      setErrorMessage(`${error.response.data}`);
      setIsLoading(false);
    }
  };

  return (
    <div className="app">
      <ShowerIcon fontSize="large" />
      <Typography variant="h5">tBNB Faucet</Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          label="To Address"
          variant="outlined"
          fullWidth
          margin="normal"
          value={toAddress}
          onChange={(event) => setToAddress(event.target.value)}
        />
        <LoadingButton
          endIcon={<SendIcon />}
          loading={isLoading}
          loadingPosition="end"
          variant="contained"
          type="submit"
          style={{ marginTop: "1rem" }}
        >
          <span>Send</span>
        </LoadingButton>
      </form>
      {hashMessage && (
        <Typography variant="body1" style={{ marginTop: "1rem", color: "rgb(148, 148, 148)"}}>
          View transaction: <a href={hashMessage} className="link">{hashMessage}</a>
        </Typography>
      )}
      {errorMessage && (
        <Typography variant="body1" style={{ marginTop: "1rem", color: "rgb(221, 55, 55)"}}>
          {errorMessage}
        </Typography>
      )}
    </div>
  );
}

export default App;
