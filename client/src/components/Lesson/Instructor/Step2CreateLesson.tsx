import React from 'react'
import Button from '@mui/material/Button';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { styled } from '@mui/material';

const Step2CreateLesson = ({setData, setvideoFile} : any) => {
    
    const VisuallyHiddenInput = styled('input')`
    clip: rect(0 0 0 0);
    clip-path: inset(50%);
    height: 1px;
    overflow: hidden;
    position: absolute;
    bottom: 0;
    left: 0;
    white-space: nowrap;
    width: 1px;
    `;

    const handleVideoFile = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files && event.target.files[0]) {
            setvideoFile(event.target.files[0])
            console.log(event.target.files[0])
        }
      }
    
  return (
    <>
        <Button
                className='w-full'
                component="label"
                variant="contained"
                startIcon={<CloudUploadIcon />}
                href="#file-upload"
              >
                Upload a lecture video
                <VisuallyHiddenInput type="file" onChange={handleVideoFile} name='thumbnail' />
              </Button>
    </>
  )
}

export default Step2CreateLesson