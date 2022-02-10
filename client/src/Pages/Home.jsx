import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
// import { HashLink as Link } from "react-router-hash-link";

function withCommas(x) {
  if (!x) return;
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

function Home({ club, mobileView }) {
  // if (club.length === 0) return;
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
                </span>
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
          <br />
          {memberTable()}
        </div>
      </Paper>
    </div>
  );
}

export default Home;
