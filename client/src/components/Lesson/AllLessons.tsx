import * as React from 'react';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Divider from '@mui/material/Divider';
import SendIcon from '@mui/icons-material/Send';
import { IconButton } from '@mui/material';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { Link } from 'react-router-dom';
export default function LessonsLists({lessons, index}: any) {

  return (
    <>
     <div className='bg-[#f5f5f5]'>
      <Link to={'/lesson/'+lessons?.id+'/detail'}>
          <Divider />
            <ListItemButton>
                  <p className='text-sm mr-5 font-semibold'>{index+1}</p>
                  <p className='text-sm mr-5 font-semibold w-full'>{lessons?.title}</p>
                  <div className='text-end'> 
                    <IconButton edge="end">
                      <MoreVertIcon />
                    </IconButton>
                  </div>
            </ListItemButton>
          <Divider />
        </Link>
     </div>
    </>
  );
}