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

async function fetchClubLeague() {
  const response = await fetch(`/api/clubleague`);
  const players = await response.json();
  return players;
}
async function fetchClubLeagueTeams() {
  const response = await fetch(`/api/clubleagueteams`);
  const players = await response.json();
  return players;
}

function ClubLeague({ club, mobileView }) {
  const [data, setData] = React.useState([]);
  const [teams, setTeams] = React.useState([]);
  const [display, setDisplay] = React.useState("totals");

  const totals = data
    .map((i) => ({
      ...i,
      total: i.stats
        .filter((x) => x !== "")
        .reduce((a, b) => parseInt(a) + parseInt(b), 0),
      count: i.stats.filter((x) => x !== "").length,
    }))
    .sort((a, b) => b.total - a.total);

  const handleChange = (event, value) => {
    setDisplay(value);
  };

  const getPlayerByTag = (tag) => {
    return club.members?.find((i) => i.tag === tag);
  };

  React.useEffect(() => {
    async function boot() {
      const data = await fetchClubLeague();
      const teams = await fetchClubLeagueTeams();

      setData(
        data
          .map((i) => ({ ...i, stats: i.stats.reverse() }))
          .sort((a, b) => b.stats[0] - a.stats[0])
      );
      setTeams(teams);
    }
    boot();
  }, []);

  const historyTable = () => {
    const trophyRow = (i) => {
      return (
        <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
          {i.stats.map((x, count) =>
            x === "" ? (
              <></>
            ) : (
              <div>
                <img
                  src="https://cdn.brawlify.com/icon/trophy.png"
                  alt="trophy"
                  style={{ height: "0.9em" }}
                />
                <span
                  class="mx-1"
                  style={{ color: "gold", fontWeight: "bold" }}
                >
                  {x}
                </span>
              </div>
            )
          )}
        </div>
      );
    };
    const dataRow = (i, count) => {
      const player = getPlayerByTag(i.tag);
      if (!player) {
        return (
          <tr>
            <td>{i.name}</td>
            <td>{trophyRow(i)}</td>
          </tr>
        );
      }
      return (
        <tr key={count} class="hoverRow">
          <td>
            <Link
              style={{ textDecoration: "none" }}
              to={`/members/${player.tag.substring(1)}`}
            >
              <img
                src={`https://cdn.brawlify.com/profile-low/${player.icon.id}.png`}
                alt="badge"
                style={{ height: "1.3em" }}
              />
              <span
                class="mx-2"
                style={{
                  color: `#${player.nameColor.substring(4)}`,
                  fontWeight: "bold",
                }}
              >
                {player.name}
              </span>
            </Link>
          </td>
          <td>{trophyRow(i)}</td>
        </tr>
      );
    };

    return (
      <span class="mx-2" style={{ color: "white" }}>
        <table
          class="text-left"
          style={{ fontSize: "20px", width: "100%", color: "#c0c0c0" }}
        >
          <thead>
            <tr style={{ color: "white" }}>
              <th style={{ width: "25%" }}>Member</th>
              <th>Trophies Earned [Most Recent First]</th>
            </tr>
          </thead>
          <tbody>{data?.map((i, count) => dataRow(i, count))}</tbody>
        </table>
      </span>
    );
  };
  const totalsTable = () => {
    const dataRow = (i, count) => {
      const player = getPlayerByTag(i.tag);
      if (!player)
        return (
          <tr>
            <td>{i.name}</td>
            <td class="text-center">
              <div>
                <img
                  src="https://cdn.brawlify.com/icon/trophy.png"
                  alt="trophy"
                  style={{ height: "0.9em" }}
                />
                <span
                  class="mx-1"
                  style={{ color: "gold", fontWeight: "bold" }}
                >
                  {i.total}
                </span>
              </div>
            </td>
            <td class="text-center">
              <div>
                <img
                  src="https://cdn.brawlify.com/icon/trophy.png"
                  alt="trophy"
                  style={{ height: "0.9em" }}
                />
                <span
                  class="mx-1"
                  style={{ color: "gold", fontWeight: "bold" }}
                >
                  {i.count > 0
                    ? Math.round((i.total / i.count) * 100) / 100
                    : "-"}
                </span>
              </div>
            </td>
          </tr>
        );
      return (
        <tr key={count} class="hoverRow">
          <td>
            <Link
              style={{ textDecoration: "none" }}
              to={`/members/${player.tag.substring(1)}`}
            >
              <img
                src={`https://cdn.brawlify.com/profile-low/${player.icon.id}.png`}
                alt="badge"
                style={{ height: "1.3em" }}
              />
              <span
                class="mx-2"
                style={{
                  color: `#${player.nameColor.substring(4)}`,
                  fontWeight: "bold",
                }}
              >
                {player.name}
              </span>
            </Link>
          </td>
          <td class="text-center">
            <div>
              <img
                src="https://cdn.brawlify.com/icon/trophy.png"
                alt="trophy"
                style={{ height: "0.9em" }}
              />
              <span class="mx-1" style={{ color: "gold", fontWeight: "bold" }}>
                {i.total}
              </span>
            </div>
          </td>
          <td class="text-center">
            <div>
              <img
                src="https://cdn.brawlify.com/icon/trophy.png"
                alt="trophy"
                style={{ height: "0.9em" }}
              />
              <span class="mx-1" style={{ color: "gold", fontWeight: "bold" }}>
                {i.count > 0
                  ? Math.round((i.total / i.count) * 100) / 100
                  : "-"}
              </span>
            </div>
          </td>
        </tr>
      );
    };
    return (
      <span class="mx-2" style={{ color: "white" }}>
        <table
          class="text-left"
          style={{ fontSize: "20px", width: "100%", color: "#c0c0c0" }}
        >
          <thead>
            <tr style={{ color: "white" }}>
              <th>Member</th>
              <th class="text-center">Total</th>
              <th class="text-center">Average</th>
            </tr>
          </thead>
          <tbody>{totals?.map((i, count) => dataRow(i, count))}</tbody>
        </table>
      </span>
    );
  };

  const groupBy = (items, key) =>
    items.reduce(
      (result, item) => ({
        ...result,
        [item[key]]: [...(result[item[key]] || []), item],
      }),
      {}
    );

  const teamsTable = () => {
    const groupedTeamsObj = groupBy(teams, "team");
    const groupedTeams = [];

    for (const key in groupedTeamsObj) {
      let totalTrophies = 0;
      let count = 0;

      for (const player of groupedTeamsObj[key]) {
        if (!player.tag) continue;
        totalTrophies += totals.find((t) => t.tag === player.tag)?.total;
        count += totals.find((t) => t.tag === player.tag)?.count;
      }

      let avg = Number.isNaN(totalTrophies / count)
        ? "-"
        : Math.round((totalTrophies / count) * 100) / 100;

      let total = Number.isNaN(totalTrophies) ? 0 : totalTrophies;

      groupedTeams.push([key, groupedTeamsObj[key], total, avg]);
    }

    const dataRow = (i) => {
      const player = getPlayerByTag(i.tag);

      return (
        <tr class="hoverRow">
          <td style={{ fontWeight: "bold" }}>Team {i[0]}</td>
          <td>
            <div
              style={{
                display: "flex",
                gap: 15,
                alignItems: "center",
              }}
            >
              {i[1].map((x) => {
                const player = getPlayerByTag(x.tag);
                if (!player) return <></>;
                return (
                  <Link
                    style={{ textDecoration: "none" }}
                    to={`/members/${player.tag.substring(1)}`}
                  >
                    <img
                      src={`https://cdn.brawlify.com/profile-low/${player.icon.id}.png`}
                      alt="badge"
                      style={{ height: "1.3em" }}
                    />
                    <span
                      class="mx-1"
                      style={{
                        color: `#${player.nameColor.substring(4)}`,
                        fontWeight: "bold",
                      }}
                    >
                      {player.name}
                    </span>
                  </Link>
                );
              })}
            </div>
          </td>
          <td class="text-center">
            <div>
              <img
                src="https://cdn.brawlify.com/icon/trophy.png"
                alt="trophy"
                style={{ height: "0.9em" }}
              />
              <span class="mx-1" style={{ color: "gold", fontWeight: "bold" }}>
                {i[2]}
              </span>
            </div>
          </td>
          <td class="text-center">
            <div>
              <img
                src="https://cdn.brawlify.com/icon/trophy.png"
                alt="trophy"
                style={{ height: "0.9em" }}
              />
              <span class="mx-1" style={{ color: "gold", fontWeight: "bold" }}>
                {i[3]}
              </span>
            </div>
          </td>
        </tr>
      );
    };
    return (
      <span class="mx-2 table-responsive" style={{ color: "white" }}>
        <table
          class="text-left"
          style={{ fontSize: "20px", width: "100%", color: "#c0c0c0" }}
        >
          <thead>
            <tr style={{ color: "white" }}>
              <th>Team #</th>
              <th>Members</th>
              <th class="text-center">Total</th>
              <th class="text-center">Average</th>
            </tr>
          </thead>
          <tbody>
            {groupedTeams.sort((a, b) => b[2] - a[2]).map((i) => dataRow(i))}
          </tbody>
        </table>
      </span>
    );
  };

  if (data.length === 0) {
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
              CLUB LEAGUE
            </span>
            <ToggleButtonGroup
              size="small"
              value={display}
              exclusive
              onChange={handleChange}
            >
              <ToggleButton value="totals">TOTALS</ToggleButton>
              <ToggleButton value="history">HISTORY</ToggleButton>
              <ToggleButton value="teams">TEAMS</ToggleButton>
            </ToggleButtonGroup>
          </div>
          {display === "history" && historyTable()}
          {display === "totals" && totalsTable()}
          {display === "teams" && teamsTable()}
        </div>
      </Paper>
    </div>
  );
}

export default ClubLeague;
