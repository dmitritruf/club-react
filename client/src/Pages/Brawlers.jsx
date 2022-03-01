import React from "react";
import Paper from "@mui/material/Paper";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";

import { TailSpin } from "react-loader-spinner";
import { HashLink as Link } from "react-router-hash-link";

function capitalize(str) {
  if (str === "MR. P") return "Mr.P";
  if (str === "8-BIT") return "8-Bit";

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

async function fetchBrawlers() {
  const response = await fetch("/api/brawlers");
  const players = await response.json();
  return players;
}

function Brawlers({ members, club, mobileView }) {
  const [display, setDisplay] = React.useState("brawlers");
  const [brawlers, setBrawlers] = React.useState([]);

  const handleChange = (event, value) => {
    setDisplay(value);
  };

  React.useEffect(() => {
    async function boot() {
      const brawlers = await fetchBrawlers();
      setBrawlers(brawlers);
    }
    boot();
  }, []);

  const bestMember = (brawler) => {
    const membersWithBrawler = members.filter((i) =>
      i.brawlers.find((i) => i.name === brawler)
    );
    let sorted = membersWithBrawler.sort((a, b) => {
      const memberA = a.brawlers.find((i) => i.name === brawler);
      const memberB = b.brawlers.find((i) => i.name === brawler);
      return memberB.trophies - memberA.trophies;
    });
    return sorted[0];
  };

  let leaders = [];
  let leaderCounts = new Map();
  let leaderboard = [];
  if (brawlers.items && members.length !== 0) {
    leaders = brawlers.items?.map((i) => ({
      player: bestMember(i.name),
      brawler: i.name,
    }));

    leaders.forEach((i) => {
      leaderCounts.set(i.player, (leaderCounts.get(i.player) ?? 0) + 1);
    });
    leaderboard = [...leaderCounts.entries()]
      .sort((a, b) => b[1] - a[1])
      .filter((i) => i[0]);
  }

  if (!brawlers.items || brawlers.items.length === 0 || members.length === 0) {
    return (
      <div className="container my-4">
        <Paper variant="outlined" style={{ background: "#121212AF" }}>
          <div
            class="my-3"
            style={{ display: "flex", justifyContent: "center" }}
          >
            <TailSpin color="#00BFFF" height={50} width={50} />
          </div>
        </Paper>
      </div>
    );
  }

  const leaderTable = () => {
    return (
      <table
        class="text-left"
        style={{ fontSize: "20px", width: "100%", color: "#c0c0c0" }}
      >
        <thead>
          <tr style={{ color: "white" }}>
            {mobileView || (
              <th class="text-center" style={{ width: "10%" }}>
                Rank
              </th>
            )}
            <th style={{ width: "25%" }}>Member</th>
            <th>Brawlers</th>
          </tr>
        </thead>
        <tbody>
          {leaderboard?.map((i, count) => (
            <tr key={count} class="hoverRow">
              {mobileView || <td class="text-center">{count + 1}</td>}
              <td>
                <Link
                  style={{ textDecoration: "none" }}
                  to={`/members/${i[0].tag.substring(1)}`}
                >
                  <img
                    src={`https://cdn.brawlify.com/profile-low/${i[0].icon.id}.png`}
                    alt="badge"
                    style={{ height: "1.3em" }}
                  />
                  <span
                    class="mx-2"
                    style={{
                      color: `#${i[0].nameColor.substring(4)}`,
                      fontWeight: "bold",
                    }}
                  >
                    {i[0].name}
                  </span>
                </Link>
              </td>
              <td>
                {leaders
                  .filter((x) => x.player?.name === i[0].name)
                  .map((b) => (
                    <img
                      src={`https://cdn.brawlify.com/brawler/${capitalize(
                        b.brawler
                      )}.png`}
                      alt="badge"
                      style={{ height: "2em" }}
                    />
                  ))}{" "}
                <span style={{ color: "gold", fontWeight: "bold" }}>
                  {leaders.filter((x) => x.player?.name === i[0].name).length}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    );
  };

  return (
    <div className="container my-4">
      <Paper variant="outlined" style={{ background: "#121212AF" }}>
        <div style={{ padding: 15 }}>
          <div
            class="text-left"
            style={{
              display: mobileView || "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <span
              style={{ color: "white", fontWeight: "bold", fontSize: "30px" }}
            >
              BRAWLER SPECIALISTS
            </span>
            <ToggleButtonGroup
              size="small"
              value={display}
              exclusive
              onChange={handleChange}
            >
              <ToggleButton value="brawlers">BRAWLERS</ToggleButton>
              <ToggleButton value="leaders">LEADERS</ToggleButton>
            </ToggleButtonGroup>
          </div>
          {display === "brawlers" && (
            <div class="my-3 brawlerGallery">
              {brawlers.items
                ?.sort((a, b) => a.name.localeCompare(b.name))
                .map((i) => (
                  <div>
                    <div>
                      <img
                        src="https://cdn.brawlify.com/icon/trophy.png"
                        alt="trophy"
                        style={{ height: "1.2em" }}
                      />
                      <span
                        class="mx-1"
                        style={{
                          textOverflow: "ellipsis",
                          overflow: "hidden",
                          color: "gold",
                          fontWeight: "bold",
                          whiteSpace: "nowrap",
                        }}
                      >
                        {
                          bestMember(i.name)?.brawlers.find(
                            (x) => x.name === i.name
                          )?.trophies
                        }
                      </span>
                    </div>
                    <img
                      src={`https://cdn.brawlify.com/brawler/${capitalize(
                        i.name
                      )}.png`}
                      alt="badge"
                      style={{ height: "5em" }}
                    />
                    <br />
                    <Link
                      to={`/members/${bestMember(i.name)?.tag.substring(1)}`}
                      style={{ textDecoration: "none" }}
                    >
                      <span
                        style={{
                          color: `#${bestMember(i.name)?.nameColor.substring(
                            4
                          )}`,
                          fontWeight: "bold",
                          whiteSpace: "nowrap",
                        }}
                      >
                        {bestMember(i.name)?.name.substring(0, 10)}
                      </span>
                    </Link>
                  </div>
                ))}
            </div>
          )}
          {display === "leaders" && <div class="my-3">{leaderTable()}</div>}
        </div>
      </Paper>
    </div>
  );
}

export default Brawlers;
