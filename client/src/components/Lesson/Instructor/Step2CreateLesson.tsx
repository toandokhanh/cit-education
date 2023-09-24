import React, { useState } from 'react'
import Button from '@mui/material/Button';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { Menu, MenuItem, TextField, styled } from '@mui/material';

const Step2CreateLesson = ({data ,setData, setvideoFile} : any) => {
    const [sourceLanguage, setSourceLanguage] = useState();
    const [targetLanguage, setTargetLanguage] = useState();
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
        }
      }
      const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        setData((prevData: any) => ({
          ...prevData,
          [name]: value
        }));
      };
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
            <VisuallyHiddenInput type="file" onChange={handleVideoFile} name='video' />
        </Button>
        <TextField
          margin="dense" 
          fullWidth
          id="standard-select-currency"
          select
          label="Select source language"
          defaultValue="EUR"
          helperText="Please select source language"
          variant="standard"
          name="sourceLanguage"
          value={data?.sourceLanguage}
          onChange={handleInputChange}
          required 
        >
          {/* {categories.map((option, index) => ( */}
            <MenuItem  value='vi'>
              Vietnamese
            </MenuItem>
            <MenuItem  value='en'>
              English
            </MenuItem>
          {/* ))} */}
        </TextField>
        <TextField
          margin="dense" 
          fullWidth
          id="standard-select-currency"
          select
          label="Select target language"
          defaultValue="EUR"
          helperText="Please select target language"
          variant="standard"
          name="targetLanguage"
          value={data?.targetLanguage}
          onChange={handleInputChange}
          required 
        >
          <MenuItem  value='vi'>
              Vietnamese
            </MenuItem>
            <MenuItem  value='en'>
              English
            </MenuItem>
        </TextField>

        <TextField
          margin="dense" 
          fullWidth
          id="standard-select-currency"
          select
          label="Select noise reduction algorithm"
          defaultValue="sdsd"
          helperText="Please select noise reduction algorithm"
          variant="standard"
          name="algorithm"
          value={data?.algorithm}
          onChange={handleInputChange}
          required 
        >
          {/* {categories.map((option, index) => ( */}
            <MenuItem  value='no'>
              Do not use algorithms
            </MenuItem>
            <MenuItem  value='noise'>
              Noise reduce
            </MenuItem>
            <MenuItem  value='deep'>
              DeepFilterNet
            </MenuItem>
          {/* ))} */}
        </TextField>
    </>
  )
}

export default Step2CreateLesson