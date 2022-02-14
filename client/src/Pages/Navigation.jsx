import React from "react";
import { HashLink as Link } from "react-router-hash-link";

import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import MenuItem from "@mui/material/MenuItem";

const pages = ["Home", "Club League", "Members", "Brawlers"];

function withCommas(x) {
  if (!x) return;
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

function Navigation({ club, mobileView }) {
  const [anchorElNav, setAnchorElNav] = React.useState(null);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const logo = (
    <img
      style={{ height: "50px" }}
      src="https://www.brawler.gg/_next/image?url=https%3A%2F%2Fstatic.brawler.gg%2Fimages%2Fgadgets%2Fsilver-bullet-colt-gadget-2.c14294a62c.png&w=128&q=75"
      alt="logo"
      component={Link}
      to="/"
    />
  );

  return (
    <div className="Navigation">
      <AppBar position="static">
        <Container maxWidth="xl">
          <Toolbar disableGutters>
            <Typography
              variant="h6"
              noWrap
              component="div"
              sx={{
                mr: 2,
                display: { xs: "none", md: "flex" },
              }}
            >
              {logo}
            </Typography>

            <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
              <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleOpenNavMenu}
                color="inherit"
              >
                <MenuIcon />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorElNav}
                anchorOrigin={{
                  vertical: "bottom",
                  horizontal: "left",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "left",
                }}
                open={Boolean(anchorElNav)}
                onClose={handleCloseNavMenu}
                sx={{
                  display: { xs: "block", md: "none" },
                }}
              >
                {pages.map((page) => (
                  <MenuItem
                    key={page}
                    onClick={handleCloseNavMenu}
                    component={Link}
                    to={`/${page.toLowerCase().replace(/\s/g, "")}`}
                  >
                    <Typography textAlign="center">{page}</Typography>
                  </MenuItem>
                ))}
              </Menu>
            </Box>
            <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
              {pages.map((page) => (
                <Button
                  key={page}
                  onClick={handleCloseNavMenu}
                  sx={{ my: 2, color: "white", display: "block" }}
                  component={Link}
                  to={`/${page.toLowerCase().replace(/\s/g, "")}`}
                >
                  {page}
                </Button>
              ))}
            </Box>
            <Box sx={{ flexGrow: 0 }}>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: 15,
                }}
              >
                <div style={{ display: "flex", alignItems: "center" }}>
                  <span style={{ color: "lightgray" }}>
                    <img
                      src="https://cdn.brawlify.com/icon/trophy.png"
                      alt="trophy"
                      style={{ height: "1.2em" }}
                    />{" "}
                    <b>{withCommas(club?.trophies)}</b>
                  </span>
                </div>
                <div style={{ display: "flex", alignItems: "center" }}>
                  <img
                    src="https://cdn.brawlify.com/league/League6.png"
                    alt="mythic"
                    style={{ height: "1.6em" }}
                  />
                  <span style={{ marginLeft: 4, color: "lightgray" }}>
                    <b>MYTHIC II</b>
                  </span>
                </div>
                <span style={{ color: "lightgray" }}>
                  {mobileView || "MEMBERS: "}
                  <b>{club?.members?.length}/30</b>
                </span>
              </div>
            </Box>
          </Toolbar>
        </Container>
      </AppBar>
    </div>
  );
}

export default Navigation;
