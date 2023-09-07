import * as React from 'react';
import Box from '@mui/material/Box';
import SpeedDial from '@mui/material/SpeedDial';
import SpeedDialIcon from '@mui/material/SpeedDialIcon';
import SpeedDialAction from '@mui/material/SpeedDialAction';
import CreateNewFolderOutlinedIcon from '@mui/icons-material/CreateNewFolderOutlined';
import FeedOutlinedIcon from '@mui/icons-material/FeedOutlined';
import { Link } from 'react-router-dom';

export default function BasicSpeedDial() {
    const [open, setOpen] = React.useState(false);

    const handleOpen = () => {
        if(open){
            setOpen(false);
        }else{
            setOpen(true);
        }
    };
  return (
    <Box sx={{ height: 0}}>
      <SpeedDial
        ariaLabel="SpeedDial basic example"
        sx={{ position: 'absolute', top: 100, right: 0 }}
        icon={<SpeedDialIcon />}
        direction="down" 
        open={open}
        onClick={handleOpen} 
      >
          <SpeedDialAction icon={
            <Link to='course/create'> <CreateNewFolderOutlinedIcon /> </Link>
          } tooltipTitle='New Course' />
          <SpeedDialAction icon={
            <Link to=':idCourse/lesson/create'> <FeedOutlinedIcon /> </Link>
          } tooltipTitle='New Lesson' />
      </SpeedDial>
    </Box>
  );
}