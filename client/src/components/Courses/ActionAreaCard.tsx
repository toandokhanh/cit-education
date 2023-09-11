import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea, IconButton, Tooltip } from '@mui/material';
import { Link } from 'react-router-dom';
import DeleteIcon from '@mui/icons-material/Delete';
import PeopleIcon from '@mui/icons-material/People';
export default function ActionAreaCard({lengthStudent, thumbnail, title, description, link}: any) {
  return (
    <>  
    
        <Link to={link}>
          <div className="mx-3 mt-6 flex flex-col self-start rounded-xl bg-white shadow-[0_2px_15px_-3px_rgba(0,0,0,0.1),0_10px_20px_-2px_rgba(0,0,0,0.04)] sm:shrink-0 sm:grow sm:basis-0">
                <div  style={{width: '100%', height: 0, paddingBottom: '60%', position: 'relative'}}>
                  <img style={{objectFit: 'cover', width: '100%', height: '100%', position: 'absolute', top: 0, left: 0, borderTopLeftRadius: '0.75rem', borderTopRightRadius: '0.75rem'}} src={thumbnail} alt="Hollywood Sign on The Hill" />
                </div>
              <div className="p-6">
              <Tooltip title={title} followCursor>
                <h5 style={{overflow: 'hidden', textOverflow: 'ellipsis', display: '-webkit-box', WebkitLineClamp: 1, WebkitBoxOrient: 'vertical'}} className="mb-2 text-xl font-medium leading-tight text-neutral-800 ">
                  {title}
                </h5>
              </Tooltip>
                <p style={{overflow: 'hidden', textOverflow: 'ellipsis', display: '-webkit-box', WebkitLineClamp: 3, WebkitBoxOrient: 'vertical'}} className="mb-4 text-base text-neutral-600 text-start">
                  {description}
                </p>
                <div className='text-xs text-start flex text-[#757575]' >
                <PeopleIcon fontSize='small'/>
                <p className='mt-[3px] ml-1'>  {lengthStudent} </p>
                </div>
              </div>
              
            </div>
        </Link>
   

    {/* <Link to={link}>
        <Card sx={{ maxWidth: 345 }}>
            <CardActionArea>
                <CardMedia
                component="img"
                image={thumbnail}
                alt="green iguana"
                className='object-fill h-32 w-7 '
                />
                <CardContent className='text-start'>
                    <Typography gutterBottom variant="h6" component="div" className="h-3">
                    {title}
                    </Typography>
                </CardContent>
            </CardActionArea>
        </Card>
    </Link> */}
    </>
  );
}