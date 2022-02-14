import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import { HashLink as Link } from "react-router-hash-link";

function withCommas(x) {
  if (!x) return;
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

function capitalize(str) {
  if (str === "MR. P") return "Mr.P";
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

function Home({ club, members, mobileView, home = true }) {
  // if (club.length === 0) return;

  const brawlerArray = [];
  const brawlerMap = new Map();

  for (const member of members) {
    for (const brawler of member.brawlers) {
      brawlerArray.push(brawler);
    }
  }

  for (const brawler of brawlerArray) {
    if (brawlerMap.get(brawler.name)) {
      const newTrophies = brawlerMap.get(brawler.name)[0] + brawler.trophies;
      const newCount = brawlerMap.get(brawler.name)[1] + 1;
      brawlerMap.set(brawler.name, [newTrophies, newCount]);
    } else {
      brawlerMap.set(brawler.name, [brawler.trophies, 1]);
    }
  }

  const topBrawlers = [...brawlerMap.entries()].sort(
    (a, b) => b[1][0] - a[1][0]
  );

  const brawlerList = (reverse = false) => {
    let topBrawlersAverage = topBrawlers
      .map((i) => [i[0], i[1][0] / i[1][1]])
      .sort((a, b) => b[1] - a[1]);
    if (reverse) topBrawlersAverage = topBrawlersAverage.reverse();

    const max = mobileView ? 3 : 10;

    return (
      <div
        style={{
          display: "flex",
          gap: 10,
          alignItems: "center",
          justifyContent: "space-evenly",
        }}
      >
        {topBrawlersAverage.slice(0, max).map((i) => (
          <div>
            <img
              src={`https://cdn.brawlify.com/brawler/${capitalize(i[0])}.png`}
              alt="badge"
              style={{ height: "5em" }}
            />
            <br />
            <img
              src="https://cdn.brawlify.com/icon/trophy.png"
              alt="trophy"
              style={{ height: "1.2em" }}
            />
            <span class="mx-1" style={{ color: "gold", fontWeight: "bold" }}>
              {withCommas(Math.round(i[1]))}
            </span>
          </div>
        ))}
      </div>
    );
  };

  const memberTable = () => {
    const roleMap = {
      member: "Member",
      senior: "Senior",
      vicePresident: "Vice President",
      president: "President",
    };

    return (
      <table
        class="text-left"
        style={{ fontSize: "20px", width: "100%", color: "#c0c0c0" }}
      >
        <thead>
          <tr style={{ color: "white" }}>
            {mobileView || <th class="text-center">Rank</th>}
            <th>Member</th>
            {mobileView || <th>Role</th>}
            <th>Trophies</th>
          </tr>
        </thead>
        <tbody>
          {club?.members?.map((i, count) => (
            <tr key={count} class="hoverRow">
              {mobileView || <td class="text-center">{count + 1}</td>}
              <td>
                <Link
                  style={{ textDecoration: "none" }}
                  to={`/members/${i.tag.substring(1)}`}
                >
                  <img
                    src={`https://cdn.brawlify.com/profile-low/${i.icon.id}.png`}
                    alt="badge"
                    style={{ height: "1.3em" }}
                  />
                  <span
                    class="mx-2"
                    style={{
                      color: `#${i.nameColor.substring(4)}`,
                      fontWeight: "bold",
                    }}
                  >
                    {i.name}
                  </span>{" "}
                </Link>
              </td>
              {mobileView || (
                <td style={{ fontWeight: "bold" }}>{roleMap[i.role]}</td>
              )}
              <td>
                <img
                  src="https://cdn.brawlify.com/icon/trophy.png"
                  alt="trophy"
                  style={{ height: "1.2em" }}
                />
                <span
                  class="mx-1"
                  style={{ color: "gold", fontWeight: "bold" }}
                >
                  {withCommas(i.trophies)}
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
                  src={`https://cdn.brawlify.com/club/${club.badgeId}.png`}
                  alt="badge"
                  style={{ height: "1.1em" }}
                />
                <span
                  class="mx-2"
                  style={{ color: "white", fontSize: mobileView && "33px" }}
                >
                  {club.name}
                </span>

                {mobileView || (
                  <span style={{ fontSize: "25px", color: "darkgray" }}>
                    {club.tag}
                  </span>
                )}
              </div>
              <Button
                variant="contained"
                style={{
                  marginBottom: mobileView && 10,
                  width: mobileView && "100%",
                  backgroundColor: "#5865F2",
                  color: "#ffffff",
                }}
                href={`https://discord.com/invite/uUjSVjFxjU`}
              >
                Join the Discord
              </Button>
            </div>
          </div>

          {home && (
            <>
              <br />
              <div
                style={{
                  borderRadius: "20px",
                  backgroundImage:
                    "url(https://preview.redd.it/iapqmzd3zu721.jpg?auto=webp&s=d70e6a1f8d6a9b4cfc8bb210d3438ce9a0478169)",
                }}
              >
                <div style={{ padding: 10 }}>
                  <h3
                    style={{
                      color: "gold",
                      fontWeight: "bold",
                    }}
                  >
                    OUR TOP BRAWLERS!{" "}
                    {mobileView || <small>(AVG. TROPHIES)</small>}
                  </h3>
                  {brawlerList()}
                </div>
              </div>
            </>
          )}
          <br />
          {memberTable()}
        </div>
      </Paper>
    </div>
  );
}

export default Home;
