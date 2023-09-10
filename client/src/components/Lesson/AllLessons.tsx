import * as React from 'react';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Divider from '@mui/material/Divider';
import SendIcon from '@mui/icons-material/Send';
import { IconButton } from '@mui/material';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { Link } from 'react-router-dom';
export default function LessonsLists() {

  return (
    <>
     <div className='bg-[#f5f5f5]'>
      <Link to=''>
          <Divider />
            <ListItemButton>
              <ListItemText primary="Bài 1 Giới thiệu về khóa học" />
              <IconButton edge="end">
                <MoreVertIcon />
              </IconButton>
            </ListItemButton>
          <Divider />
        </Link>
     </div>
    </>
  );
}