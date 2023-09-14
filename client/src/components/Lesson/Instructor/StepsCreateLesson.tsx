import * as React from 'react';
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Navbar from '../../Layouts/Navbar';
import Footer from '../../Layouts/Footer';
import { Container } from '@mui/material';
import Step1CreateLesson from './Step1CreateLesson';
import Step2CreateLesson from './Step2CreateLesson';
import axios from 'axios';

const steps = ['Select campaign settings', 'Create an ad group', 'Create an ad'];

export default function StepsCreateLesson() {
  const [activeStep, setActiveStep] = React.useState(0);
  const [skipped, setSkipped] = React.useState(new Set<number>());
  const [videoFile, setvideoFile] = React.useState<any>();
  const isStepOptional = (step: number) => {
    return step === 1;
  };

  const isStepSkipped = (step: number) => {
    return skipped.has(step);
  };

  const handleNext = () => {
    let newSkipped = skipped;
    if (isStepSkipped(activeStep)) {
      newSkipped = new Set(newSkipped.values());
      newSkipped.delete(activeStep);
    }
    // setActiveStep((prevActiveStep) => prevActiveStep + 1);
    if(activeStep === 0){ // step 1 - 2
        // handle course id
        if(!courseId){
            setActiveStep((prevActiveStep) => prevActiveStep + 1);
            setSkipped(newSkipped);
            console.log(courseId)
        }
    } else if (activeStep === 1) { //step 2 - 3
        // handle video
        console.log(videoFile)
        if(videoFile){
            setActiveStep((prevActiveStep) => prevActiveStep + 1);
            setSkipped(newSkipped);
            console.log(videoFile)
        }
    } 
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleSkip = () => {
    if (!isStepOptional(activeStep)) {
      throw new Error("You can't skip a step that isn't optional.");
    }

    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    setSkipped((prevSkipped) => {
      const newSkipped = new Set(prevSkipped.values());
      newSkipped.add(activeStep);
      return newSkipped;
    });
  };

  const handleReset = () => {
    setActiveStep(0);
  };
// handle data
const [courseId, getCourseId] = React.useState()
const [data, setData] = React.useState({
    title: '',
    content: '',
    video: '',
    sourceLanguage: '',
    targetLanguage: '',
    algorithm: ''
  });

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setData((prevData) => ({
      ...prevData,
      [name]: value
    }));
  };

  // handle video in step 2
  
  const UploadForm = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append('file', videoFile);
    try {
      const response = await axios.post('http://localhost:3002/upload/video', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      console.log(response)
    //   setData((prevData: any)=> ({
    //     ...prevData,
    //     video: response?.data
    //   }));
    } catch (error) {
      console.error('Error uploading file:', error);
    }
  }
  return (
        <>
            <Box sx={{ width: '100%' }}>
                <Navbar/>
                <Container className='mt-12'>
                    <Stepper activeStep={activeStep}>
                    {steps.map((label, index) => {
                    const stepProps: { completed?: boolean } = {};
                    const labelProps: {
                        optional?: React.ReactNode;
                    } = {};
                    if (isStepOptional(index)) {
                        labelProps.optional = (
                        <Typography variant="caption">Optional</Typography>
                        );
                    }
                    if (isStepSkipped(index)) {
                        stepProps.completed = false;
                    }
                    return (
                        <Step key={label} {...stepProps}>
                        <StepLabel {...labelProps}>{label}</StepLabel>
                        </Step>
                    );
                    })}
                </Stepper>
                {activeStep === steps.length ? (
                    <React.Fragment>
                    <Typography sx={{ mt: 2, mb: 1 }}>
                        All steps completed - you&apos;re finished
                    </Typography>
                    <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
                        <Box sx={{ flex: '1 1 auto' }} />
                        <Button onClick={handleReset}>Reset</Button>
                    </Box>
                    </React.Fragment>
                ) : (
                    <React.Fragment>
                        <Typography sx={{ mt: 2, mb: 1 }}>Step {activeStep+1}
                        
                        {activeStep+1 === 1 && (
                        <div className='w-[32rem] mx-auto mt-10'>
                            Please select your course
                            <br />
                            <br />
                            <Step1CreateLesson  courseId={courseId} getCourseId={getCourseId}/>
                        </div>
                        )}
                        {activeStep+1 === 2 && (
                            <div className='w-[32rem] mx-auto mt-10'>
                            Please upload a lecture video
                            <br />
                            <br />
                            <Step2CreateLesson setData={setData} setvideoFile={setvideoFile}/>
                            </div>
                        )}
                        {activeStep+1 === 3 && (
                            <>
                            <p>Bươc3</p>
                            </>
                        )}
                    </Typography>
                    <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
                        <Button
                        color="inherit"
                        disabled={activeStep === 0}
                        onClick={handleBack}
                        sx={{ mr: 1 }}
                        >
                        Back
                        </Button>
                        <Box sx={{ flex: '1 1 auto' }} />
                        {/* {isStepOptional(activeStep) && (
                        <Button color="inherit" onClick={handleSkip} sx={{ mr: 1 }}>
                            Skip
                        </Button>
                        )} */}
                        <Button onClick={handleNext}>
                        {activeStep === steps.length - 1 ? 'Finish' : 'Next'}
                        </Button>
                    </Box>
                    </React.Fragment>
                )}
                </Container>
                <Footer/>
            </Box>
        </>
    );
}