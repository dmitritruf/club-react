import React from "react";
import Paper from "@mui/material/Paper";
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";

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
  const [brawlers, setBrawlers] = React.useState([]);

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

  if (!brawlers.items || brawlers.items.length === 0) {
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
            {/* {mobileView && <br />}
            <Autocomplete
              disablePortal
              options={club.members?.map((i) => i.name)}
              sx={{ width: 300 }}
              renderInput={(params) => (
                <TextField {...params} size="small" label="Search Member" />
              )}
            /> */}
          </div>
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
                        color: `#${bestMember(i.name)?.nameColor.substring(4)}`,
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
        </div>
      </Paper>
    </div>
  );
}

export default Brawlers;
