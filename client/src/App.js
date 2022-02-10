import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import React from "react";

import { createTheme, ThemeProvider } from "@mui/material/styles";
import "./App.css";

import Navigation from "./Pages/Navigation";
import Home from "./Pages/Home";
import ClubLeague from "./Pages/ClubLeague";
import Members from "./Pages/Members";

const theme = createTheme({
  palette: {
    mode: "dark",
  },
});

// async function fetchPlayer(id) {
//   const response = await fetch(`/api/players/${id}`);
//   const players = await response.json();
//   return players;
// }

async function fetchClub() {
  const response = await fetch("/api/clubs/8VYP02GR");
  const players = await response.json();
  return players;
}

function App() {
  const [club, setClub] = React.useState([]);
  // const [players, setPlayers] = React.useState([]);
  const [state, setState] = React.useState({
    mobileView: false,
  });

  React.useEffect(() => {
    return window.innerWidth < 1000
      ? setState((prevState) => ({ ...prevState, mobileView: true }))
      : setState((prevState) => ({
          ...prevState,
          mobileView: false,
        }));
  }, []);

  const { mobileView } = state;

  React.useEffect(() => {
    async function boot() {
      const club = await fetchClub();
      setClub(club);

      // const players = [];
      // club?.members?.map(async (i) => {
      //   const guy = await fetchPlayer(i.tag.substring(1));
      //   players.push(guy);
      // });
      // setPlayers(players);
    }
    boot();
  }, []);

  // console.log(players);

  return (
    <ThemeProvider theme={theme}>
      <div className="App">
        <Router>
          <Navigation club={club} mobileView={mobileView} />
          <Routes>
            <Route
              path="/"
              exact
              element={<Home club={club} mobileView={mobileView} />}
            />
            <Route
              path="/home"
              exact
              element={<Home club={club} mobileView={mobileView} />}
            />
            <Route
              path="/clubleague"
              exact
              element={<ClubLeague club={club} mobileView={mobileView} />}
            />
            <Route
              path="/members"
              exact
              element={<Members club={club} mobileView={mobileView} />}
            />
          </Routes>
        </Router>
      </div>
    </ThemeProvider>
  );
}

export default App;
