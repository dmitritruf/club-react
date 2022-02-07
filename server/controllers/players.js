const { Router } = require("express");
const axios = require("axios");

const token =
  "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiIsImtpZCI6IjI4YTMxOGY3LTAwMDAtYTFlYi03ZmExLTJjNzQzM2M2Y2NhNSJ9.eyJpc3MiOiJzdXBlcmNlbGwiLCJhdWQiOiJzdXBlcmNlbGw6Z2FtZWFwaSIsImp0aSI6Ijg2NmVhNmVmLTU5YWUtNGNmYy05YjdjLTFjOWMxYTFmNzUxMiIsImlhdCI6MTY0NDI2OTA2MSwic3ViIjoiZGV2ZWxvcGVyL2ZmMDY2YjI5LTU1YjctYWI5MC1jYTcxLWM1NmJjNDBiOGNjNCIsInNjb3BlcyI6WyJicmF3bHN0YXJzIl0sImxpbWl0cyI6W3sidGllciI6ImRldmVsb3Blci9zaWx2ZXIiLCJ0eXBlIjoidGhyb3R0bGluZyJ9LHsiY2lkcnMiOlsiMTI4LjEyOC4xMjguMTI4IiwiMTI4LjYuMzcuMTI0Il0sInR5cGUiOiJjbGllbnQifV19.BBO4g0JDNCwwYnLpENZH_WVDdtexeN-3wu7ByQMVZzBnttFS1cdXh8CqKgfsGsOHnDZjsrJQJNTGES__OK9Bzg";
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

  return router;
}

module.exports = eloController();
