const { Router } = require("express");
const axios = require("axios");

const token =
  "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiIsImtpZCI6IjI4YTMxOGY3LTAwMDAtYTFlYi03ZmExLTJjNzQzM2M2Y2NhNSJ9.eyJpc3MiOiJzdXBlcmNlbGwiLCJhdWQiOiJzdXBlcmNlbGw6Z2FtZWFwaSIsImp0aSI6IjZlYzgyNGJmLWM5NGYtNGNiNC05YzJlLTA5NDJkMzZmYTk4NyIsImlhdCI6MTY0NDUwOTExNSwic3ViIjoiZGV2ZWxvcGVyL2ZmMDY2YjI5LTU1YjctYWI5MC1jYTcxLWM1NmJjNDBiOGNjNCIsInNjb3BlcyI6WyJicmF3bHN0YXJzIl0sImxpbWl0cyI6W3sidGllciI6ImRldmVsb3Blci9zaWx2ZXIiLCJ0eXBlIjoidGhyb3R0bGluZyJ9LHsiY2lkcnMiOlsiNDUuNzkuMjE4Ljc5Il0sInR5cGUiOiJjbGllbnQifV19.A_qsDLlh15cNCSQlV51JUtszyANBLDSv7hmk9tz0greOmrJNswuSSGAR_xQzMpp4k3CiTuv1RRvAGNQ7mgZ1bg";
function eloController() {
  const router = Router();

  router.get("/clubs/:id", async (req, res) => {
    try {
      axios
        .get(`https://bsproxy.royaleapi.dev/v1/clubs/%23${req.params.id}`, {
          headers: {
            Accept: "application/json",
            Authorization: `Bearer ${token}`,
          },
        })
        .then((data) => {
          res.json(data.data);
        })
        .catch((error) => {
          console.log(error);
        });
    } catch (e) {
      console.error(e);
    }
  });
  router.get("/clubs/:id/members", async (req, res) => {
    try {
      axios
        .get(
          `https://bsproxy.royaleapi.dev/v1/clubs/%23${req.params.id}/members`,
          {
            headers: {
              Accept: "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        )
        .then((data) => {
          res.json(data.data);
        })
        .catch((error) => {
          console.log(error);
        });
    } catch (e) {
      console.error(e);
    }
  });

  router.get("/players/:id", async (req, res) => {
    try {
      axios
        .get(`https://bsproxy.royaleapi.dev/v1/players/%23${req.params.id}`, {
          headers: {
            Accept: "application/json",
            Authorization: `Bearer ${token}`,
          },
        })
        .then((data) => {
          res.json(data.data);
        })
        .catch((error) => {
          console.log(error);
        });
    } catch (e) {
      console.error(e);
    }
  });

  router.get("/clubleague", async (req, res) => {
    // fetch google spreadsheet table
  });

  router.get("/brawlers", async (req, res) => {
    try {
      axios
        .get(`https://bsproxy.royaleapi.dev/v1/brawlers`, {
          headers: {
            Accept: "application/json",
            Authorization: `Bearer ${token}`,
          },
        })
        .then((data) => {
          res.json(data.data);
        })
        .catch((error) => {
          console.log(error);
        });
    } catch (e) {
      console.error(e);
    }
  });

  return router;
}

module.exports = eloController();
