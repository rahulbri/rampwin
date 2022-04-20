import React, { useEffect, useMemo, useState } from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { Grid, Typography } from "@mui/material";
import Paper from "@mui/material/Paper";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import CloseIcon from "@mui/icons-material/Close";
import { Item } from "./Item";

// Form
let schema = yup.object().shape({
  select: yup.string().required(),
});

var defaultSports = [
  {
    name: "auto_reply_rum_work",
    components: [
      {
        type: "HEADER",
        format: "TEXT",
        text: "Header",
      },
      {
        type: "BODY",
        text: "你好 {{1}} ，多謝你的查詢。請問有什麼幫到你 ？",
      },
      {
        type: "FOOTER",
        text: "By Rum Work",
      },
      {
        type: "BUTTONS",
        buttons: [
          {
            type: "QUICK_REPLY",
            text: "我想查詢",
          },
        ],
      },
    ],
    language: "zh_HK",
    status: "APPROVED",
    category: "AUTO_REPLY",
    id: "987784635506914",
  },
  {
    name: "sample_movie_ticket_confirmations",
    components: [
      {
        type: "HEADER",
        format: "IMAGE",
      },
      {
        type: "BODY",
        text: "Tiket Anda untuk *{{1}}*\n*Waktu* - {{2}}\n*Tempat* - {{3}}\n*Kursi* - {{4}}",
      },
      {
        type: "FOOTER",
        text: "Pesan ini berasal dari bisnis yang tidak terverifikasi.",
      },
    ],
    language: "id",
    status: "APPROVED",
    category: "TICKET_UPDATE",
    id: "908835376505811",
  },
  {
    name: "sample_movie_ticket_confirmation",
    components: [
      {
        type: "HEADER",
        format: "IMAGE",
      },
      {
        type: "BODY",
        text: "Seu ingresso para *{{1}}*\n*Horário* - {{2}}\n*Local* - {{3}}\n*Assentos* - {{4}}",
      },
      {
        type: "FOOTER",
        text: "Esta mensagem é de uma empresa não verificada.",
      },
    ],
    language: "pt_BR",
    status: "APPROVED",
    category: "TICKET_UPDATE",
    id: "913730309539846",
  },
];

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

function getStyles(name, personName, theme) {
  return {
    fontWeight:
      personName.indexOf(name) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium,
  };
}

export default function Model() {
  const axios = require("axios");
  const theme = useTheme();
  const [personName, setPersonName] = React.useState([]);
  const [apiData, setData] = React.useState([]);
  const [open, setOpen] = React.useState(false);
  const [error, setError] = React.useState(false);
console.log('API',apiData);
  const handleChange = (event) => {
    const {
      target: { value },
    } = event;
    setPersonName(value);
  };

  const fullScreen = useMediaQuery(theme.breakpoints.down("lg"));

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  React.useEffect(() => {
    axios
      .get("https://rampwintest.free.beeceptor.com/getTemplates")
      .then(function (response) {
        // handle success
        console.log("Data", response);
        setData(response.data.data);
      })
      .catch(function (error) {
        // handle error
        console.log(error);
      })
      .then(function () {
        // always executed
      });
  }, []);

  const [sportList, setSportList] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState();

  // Add default value on page load
  useEffect(() => {
    setSportList(defaultSports);
  }, []);

  // Function to get filtered list
  function getFilteredList() {
    return sportList.filter(
      (item) => item.name && item.id === selectedCategory
    );
  }

  // Avoid duplicate function calls with useMemo
  var filteredList = useMemo(getFilteredList, [selectedCategory, sportList]);

  function handleCategoryChange(event) {
    if (selectedCategory == "") {
      setError(true);
    }

    setSelectedCategory(event.target.value);
  }

  return (
    <div>
      <div className="Dialog">
        <Button variant="outlined" onClick={handleClickOpen}>
          Open Dialog
        </Button>
      </div>
      <Dialog
        fullScreen={fullScreen}
        open={open}
        onClose={handleClose}
        aria-labelledby="responsive-dialog-title"
      >
        <Grid container>
          <Grid item md={12}>
            <DialogTitle
              id="responsive-dialog-title"
              style={{ fontWeight: 500 }}
            >
              Send Template
              <span>
                {" "}
                <CloseIcon
                  onClick={handleClose}
                  style={{
                    float: "right",
                    background: "black",
                    color: "white",
                    borderRadius: "50%",
                    padding: "2px",
                    fontSize: "18px",
                    border: "none",
                  }}
                />{" "}
              </span>
            </DialogTitle>
          </Grid>

          <Grid item xs={12} md={8}>
            <DialogContent className="dialogContent">
              <FormControl sx={{ m: 1, width: "100%", mt: 2 }}>
                <Select id="demo-simple-select" onChange={handleCategoryChange}>
                  {sportList.map((name) => (
                    <MenuItem
                      key={name.name}
                      value={name.name && name.id}
                      style={getStyles(name, personName, theme)}
                      onChange={handleChange}
                    >
                      {name.name}
                    </MenuItem>
                  ))}
                </Select>
                <Typography variant="body2" style={{ color: "red" }}>
                  {error ? "*Please Select Template" : ""}
                </Typography>
              </FormControl>

              <Box className="sport-list">
                {filteredList.slice(0, 1).map((element, index) => (
                  <Item {...element} key={index} />
                ))}
              </Box>
            </DialogContent>
          </Grid>

          {selectedCategory ? (
            <Grid item xs={12} md={4}>
              <Box mx={3}>
                <Typography variant="h5">Preview</Typography>
                <Box
                  sx={{
                    display: "flex",
                    flexWrap: "wrap",
                    "& > :not(style)": {
                      width: 300,
                      height: "100%",
                    },
                  }}
                >
                  <Paper elevation={2}>
                    {filteredList.map(({ components }) => (
                      <>
                        <Box m={2}>
                          {components.map((items) => (
                            <>
                              <Typography variant="body2" gutterBottom>
                                {items.text}
                              </Typography>

                              {items.buttons &&
                                items.buttons.map((items) => (
                                  <Button
                                    variant="contained"
                                    default
                                    type="submit"
                                    style={{ backgroundColor: "grey" }}
                                  >
                                    {items.text}
                                  </Button>
                                ))}
                            </>
                          ))}
                        </Box>
                      </>
                    ))}
                  </Paper>
                </Box>
              </Box>
            </Grid>
          ) : (
            ""
          )}
          <Grid item xs={12} style={{ float: "right" }}>
            <DialogActions>
              <Button onClick={handleClose} style={{ color: "#8922F7" }}>
                Cancel
              </Button>
              <Button
                onClick={handleClose}
                style={{
                  backgroundColor: "#8922F7",
                  color: "white",
                  borderRadius: "20px",
                }}
              >
                Send
              </Button>
            </DialogActions>
          </Grid>
        </Grid>
      </Dialog>
    </div>
  );
}
