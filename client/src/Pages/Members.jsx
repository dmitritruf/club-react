// import Box from "@mui/material/Box";

import { useParams } from "react-router-dom";
import Paper from "@mui/material/Paper";
import Home from "./Home";

function capitalize(str) {
  const splitStr = str.toLowerCase().split(" ");
  for (let i = 0; i < splitStr.length; i++) {
    // You do not need to check if i is larger than splitStr length, as your for does that for you
    // Assign it back to the array
    splitStr[i] =
      splitStr[i].charAt(0).toUpperCase() + splitStr[i].substring(1);
  }
  // Directly return the joined string
  return splitStr.join(" ").replace(" ", "-");
}

function Members({ members, club, mobileView }) {
  const { id } = useParams();
  const player = members.find((i) => i.tag.substring(1) === id);

  if (!id || !player) {
    return <Home club={club} mobileView={mobileView} />;
  }

  const highestBrawler = () => {
    const brawlers = player.brawlers;
    return brawlers.sort((a, b) => b.trophies - a.trophies)[0];
  };

  const powerElevens = () => {
    let pEl = player.brawlers;
    pEl = pEl.filter((i) => {
      return i.power === 11;
    });
    return pEl;
  };

  // return specific player page
  return (
    <div className="container my-4">
      <Paper variant="outlined" style={{ background: "#121212AF" }}>
        <div style={{ padding: 15 }}>
          <div class="clubHeader text-left">
            <div
              style={{
                display: mobileView || "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <div>
                <img
                  src={`https://cdn.brawlify.com/profile-low/${player.icon.id}.png`}
                  alt="badge"
                  style={{ height: "1.1em" }}
                />
                <span
                  class="mx-2"
                  style={{
                    color: `#${player.nameColor?.substring(4)}`,
                    fontWeight: "bold",
                  }}
                >
                  {player.name}
                </span>
                {mobileView || (
                  <span style={{ fontSize: "25px", color: "darkgray" }}>
                    {player.tag}
                  </span>
                )}
              </div>
            </div>
          </div>
          <div class="my-2 text-left">
            <span style={{ fontSize: "20px", color: "darkgray" }}>
              Brawlers: {player.brawlers.length} / 54
            </span>
            <br />
            <span style={{ fontSize: "20px", color: "darkgray" }}>
              Trophies: {player.trophies}
            </span>
            <br />
            <span style={{ fontSize: "20px", color: "darkgray" }}>
              Highest Trophies: {player.highestTrophies}
            </span>
            <br />
            <span style={{ fontSize: "20px", color: "white" }}>
              Current Top Trophy Brawler: <br />
            </span>
            <span style={{ marginLeft: 25, fontSize: "20px", color: "white" }}>
              {highestBrawler().name} [Trophies: {highestBrawler().trophies}]
              [Power Level: {highestBrawler().power}] [Rank:{" "}
              {highestBrawler().rank}]
            </span>{" "}
            <img
              src={`https://cdn.brawlify.com/brawler/${capitalize(
                highestBrawler().name
              )}.png`}
              alt="badge"
              style={{ height: "3em" }}
            />
          </div>
          <span style={{ fontSize: "20px", color: "cyan" }}>
            Number of Power 11s: {powerElevens().length} <br />
            {powerElevens().map((i) => (
              <span style={{ fontSize: "20px", color: "yellow" }}>
                {i.name} [Rank: {i.rank}]{" "}
                <img
                  src={`https://cdn.brawlify.com/brawler/${capitalize(
                    i.name
                  )}.png`}
                  alt="badge"
                  style={{ height: "1em" }}
                />{" "}
                <br />
              </span>
            ))}
          </span>
        </div>
      </Paper>
    </div>
  );
}

export default Members;
