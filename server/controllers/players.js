const { Router } = require("express");
const { GoogleSpreadsheet } = require("google-spreadsheet");
const axios = require("axios");

const creds = {
  type: "service_account",
  project_id: "adroit-weaver-282202",
  private_key_id: "7f41a3ce968934c4613931525ac8c0f32799fbc0",
  private_key:
    "-----BEGIN PRIVATE KEY-----\nMIIEvgIBADANBgkqhkiG9w0BAQEFAASCBKgwggSkAgEAAoIBAQDc8rM9XHohU0w1\nI03sA6um8pFqWzzmxWo8DNc+7u0lpI11tng9HaDRqHPfhYItgXktEhBc0LvUN7DO\nDM0FuovKht+RwBtQTmdWCpDl+myZAuyGOYXnqE8NhMh/0QVRkKLnaCGGnNs30RG6\ndgwPz+EJhYviVzN4pYsKwrVteW2LdES012SWuD+FszohqS+E5JzqMj+yk0hkwDiQ\n+B9cbHgq5O66i6uupskzxporjiIoAblEXfB5kAJ7YQ77wJacEdRtX4B/y5fCdruZ\nyVgtXTaSfYzd4a+bXoH9yEyRds8Ya1R8UTKIc1J5kfRoXwFnCBpIl8wZp7NC3i29\n3D5N6kjzAgMBAAECggEAHtBqVwByt/saAb8uut+4LMxfo2meEMEvk7hmvIwt3rYY\nVHZiRoO/Tf4kSuQfx6Dq+XIvfgJOb8ZkjhgS792YaWJuA7G7HXQRzVoj4y8Nvjk+\nK2oSVsCOZeBC5jCMgVeeoI9RPajameo6grq76+ieBenuHF70+rp7rcCB9QaeVHhc\nUbGE4ZjG9MSNcGVfZ30g1Qnibv2fSZwmyJVPbZguZdA/TlmwbTSckI1QF2WTERbZ\nU7zbGDZuGun5DVnvDTKhD9n3cAYAiss1dMyDyoWisCkzQe33cLp2/ixPkM98gMgY\nZLDSodvUfnAFT2tvnk4dSSLcwULOrzpx2wF36UoXIQKBgQDzXOQDsdQBCHVg7hIY\nxRcG9i2qE23qmME990uH8bsjR6P6n5d4JzMAEWWa7FoXYNzNwfhhHAzmls95fDOj\n/bPpdWW5JRxtwaQyX858wUiegKz/ozgk2u0Ktwny2VH05c4Ny33DWdmPW7yD3YLs\nrFj7oidOmX2jNXeDYazsryQk/wKBgQDoa9do35RY/41U3JKAQxfbIVDlJFqhmXvj\nDWdagBoyUzbzeOxkoaOv5NGvrqGnxsEkIGq/D/DzTGxG+wqjxTIpMM3+MhZVHUlJ\nQRhOSPk5PNbXiGFaY5/33+o4MH8A9E5e3kcveJY5I08d4FJOCtpDwTYt1x2g20ot\nn9932+OYDQKBgQDmVSjKBmktgR/3Wdxu7TtaL24Q5srFm0Zqq8AlLrl8LrYY4yut\nYQx4J/8Only2e8sAQ3IeFzpulJZR2SfXMqwxbheVIHbDut75fowkr5tXyVnzqjvd\nRgfMeGlGHEHhlA9uJwck+clcUeses2zTLFwb7eFeFxA+hMBU7QGKEkoXaQKBgQC/\nkCL7TUv4DqluSF53WNVQxyTluBD7IIX7nhCRhwQQdoXUJtawGonPb8lkA4s5vZdz\nL0TMNVdjMJoN5tveH6o4SQF/gcjmXj0JI53k6ECB7KMnAkE7PuGaa/OgXFhRcQsn\nJg2GEt2+Olv7Q+iSal97eMQvBB5ndlatRBfrslDkAQKBgH9iLA66sEoyDm1ZIF0X\nBVgeYc4wjTqQJ0cQMGibi6H5VHB3RQwdAa/stwxWdYFgs5lsIQy0wN/vVecOncWW\njqjymLjuAb943wpuz3JVEnpyqG/q+Av1TON1vA61eUJFPsVy+2C1+bvrkgEID9XR\n5VOMAGkVu/sTNxSDXeO94pnh\n-----END PRIVATE KEY-----\n",
  client_email: "sheets@adroit-weaver-282202.iam.gserviceaccount.com",
  client_id: "107783137884938258744",
  auth_uri: "https://accounts.google.com/o/oauth2/auth",
  token_uri: "https://oauth2.googleapis.com/token",
  auth_provider_x509_cert_url: "https://www.googleapis.com/oauth2/v1/certs",
  client_x509_cert_url:
    "https://www.googleapis.com/robot/v1/metadata/x509/sheets%40adroit-weaver-282202.iam.gserviceaccount.com",
};

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
    const doc = new GoogleSpreadsheet(
      "18Ep_8xlQW91c32dtiS1Lt5-QiXS4PFvnamjs27LzR5Q"
    );
    await doc.useServiceAccountAuth(creds);
    await doc.loadInfo();

    const sheet = doc.sheetsByTitle["Data"];
    const rows = await sheet.getRows();
    const data = rows.map((i) => i._rawData);

    const response = [];
    data.forEach(async (row, count) => {
      const [name, tag, ...stats] = row;
      if (count === 0) return;
      try {
        response.push({ name, tag, stats });
      } catch (e) {
        console.error(e);
      }
    });
    res.json(response);
  });

  router.get("/clubleagueteams", async (req, res) => {
    // fetch google spreadsheet table
    const doc = new GoogleSpreadsheet(
      "18Ep_8xlQW91c32dtiS1Lt5-QiXS4PFvnamjs27LzR5Q"
    );
    await doc.useServiceAccountAuth(creds);
    await doc.loadInfo();

    const sheet = doc.sheetsByTitle["Teams"];
    const rows = await sheet.getRows();
    const data = rows.map((i) => i._rawData);

    const response = [];
    data.forEach(async (row, count) => {
      const [team, name, tag] = row;
      try {
        response.push({ team, name, tag });
      } catch (e) {
        console.error(e);
      }
    });
    res.json(response);
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
