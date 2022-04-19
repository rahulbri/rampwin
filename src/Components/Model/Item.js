import { Box, Button, TextField, Typography } from '@mui/material';
import React from 'react'
import { useEffect, useState } from "react"; //add
// import "./itemStyles.css";






export const Item = ({components}) => {
    const [state, setState] = useState({}); //edit

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
      [field]: e.target.value //edit
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('state',state);
  };
  return (

    <Box style={{marginTop:'20px'}}>
    <form onSubmit={handleSubmit}>
      {components.slice(0,3).map((resp,key) => (
       
       <Box className="mb-3" key={resp.id}>
        <Typography variant='h5' m={2}>Template {resp.type}</Typography>
        <Box
        key={key}
        sx={{
          width: '100%',
          maxWidth: "100%",
          marginBottom: "10px",
        }}
      >
        <TextField
          fullWidth
          type={resp.formate}
          placeholder="Placeholder Name*"
          id="fullWidth"
          required
          onChange={(e) => {
            handleChange(e, resp.fieldName);
          }}
          value={[resp.text]}
        />
         {resp.buttons&&resp.buttons.map((items)=>(
               <Button type="submit" className="btn btn-primary">
              {items.text}
             </Button>

          ))}
        </Box>
        </Box>
      ))}
    </form>
  </Box>
  )
}





