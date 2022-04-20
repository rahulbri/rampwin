import { Box, Button, Grid, TextField, Typography } from "@mui/material";
import React from "react";
import { useEffect, useState } from "react";
import { styled } from "@mui/material/styles";
import PublishIcon from "@mui/icons-material/Publish";
import Stack from "@mui/material/Stack";

let result, data,search;

const Input = styled("input")({
  display: "none",
});
export const Item = ({ components }) => {
  const [state, setState] = useState({}); //edit
  result = components[1].text.match(/{{.*?}}/g);

  //add
  useEffect(() => {
    components.map((resp) =>
      setState((state) => ({ ...state, [resp.text]: resp.value }))
    );
    return () => {};
  }, []);

  const handleChange = (e, field) => {
    setState({
      ...state,
      [field]: e.target.value, //edit
    });
  };
  console.log('testing 1');
  for (var r in search)
  {
    console.log('testing');
    console.log(search[r]);
  } 
  console.log('testing 2');
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("state", state);
  };
  return (
    <Box style={{ marginTop: "20px" }}>
      <form onSubmit={handleSubmit}>
        {components.slice(0, 3).map((resp, key) => (
          <>
            <Box className="mb-3" key={resp.id}>
              <Typography variant="h5" m={2}>
                Template {resp.type}
              </Typography>
              <Box
                key={key}
                sx={{
                  width: "100%",
                  maxWidth: "100%",
                  marginBottom: "10px",
                }}
              >
                {resp.format == "IMAGE" ? (
                  <>
                    <Typography variant="body2" style={{ margin: "10px 17px" }}>
                      Upload Image (Required)
                    </Typography>
                    <Stack direction="row" alignItems="center" spacing={2}>
                      <label htmlFor="contained-button-file">
                        <Input
                          accept="image/*"
                          id="contained-button-file"
                          multiple
                          type="file"
                        />
                        <Button
                          variant="contained"
                          component="span"
                          style={{
                            marginLeft: "15px",
                            textTransform: "capitalize",
                            backgroundColor: "#8922F7",
                            color: "white",
                            borderRadius: "20px",
                          }}
                        >
                          <PublishIcon style={{ color: "white" }} />
                          Choose File
                        </Button>
                      </label>
                    </Stack>
                  </>
                ) : (
                  <TextField
                    fullWidth
                    type={resp.format}
                    placeholder="Placeholder Name*"
                    id="fullWidth"
                    required
                    onChange={(e) => {
                      handleChange(e, resp.fieldName);
                    }}
                    value={[resp.text]}
                  />
                )}

                {resp.type == "BODY" ? (
                  <>
                    <Grid container mt={2}>
                     
                     
                        {result.map((item, i)=>(
                          <>
                           <Grid item md={6}>
                           <Typography m={1}>placeholder{result[i]}</Typography>
                            </Grid>
                       
                        <Grid item md={6}>
                        <TextField
                        // fullWidth
                        type={resp.format}
                        placeholder="Placeholder Name*"
                        id="fullWidth"
                        required
                        onChange={(e) => {
                          handleChange(e, resp.fieldName);
                        }}
                        value=""
                      />
                      </Grid>
                      </>
                        ))}

                  
                    </Grid>
                  </>
                ) : null}
                {resp.buttons &&
                  resp.buttons.map((items) => (
                    <Button type="submit" className="btn btn-primary">
                      {items.text}
                    </Button>
                  ))}
              </Box>
            </Box>
          </>
        ))}
      </form>
    </Box>
  );
};
