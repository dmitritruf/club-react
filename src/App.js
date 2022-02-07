import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import React from "react";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import "./App.css";

import Navigation from "./Pages/Navigation";
import Home from "./Pages/Home";

const theme = createTheme({
  palette: {
    mode: "dark",
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <div className="App">
        <Router>
          <Navigation />
          <Switch>
            <Route path="/" exact component={() => <Home />} />
          </Switch>
        </Router>
      </div>
    </ThemeProvider>
  );
}

export default App;
