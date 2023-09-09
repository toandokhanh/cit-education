import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';
import { Link } from 'react-router-dom';

export default function ActionAreaCard({thumbnail, title, description, link}: any) {
  return (
    <>  
    <Link to={link}>
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
    </Link>
    </>
  );
}