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
import Step3CreateLesson from './Step3CreateLesson';
import lessonsApi from '../../../apis/lessonsApi';
import Snackbar from '@mui/material/Snackbar';
import Progress from '../../Layouts/Progress';
import {useNavigate} from 'react-router-dom'
const steps = ['Select course', 'Upload lecture video', 'Lecture information'];

export default function StepsCreateLesson() {
  const navigate = useNavigate();
  const [callCoursesApi, setcallCoursesApi] = React.useState(false);
  const [activeStep, setActiveStep] = React.useState(0);
  const [skipped, setSkipped] = React.useState(new Set<number>());
  const [videoFile, setvideoFile] = React.useState<any>();
  const [open, setOpen] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const [message, setMessage] = React.useState('Error message');
  // handle data
  const [courseId, getCourseId] = React.useState(0)
  const [data, setData] = React.useState({
      title: '', // step3
      content: '', // step 3
      video: '', // step 2
      sourceLanguage: 'vi', // step 2
      targetLanguage: 'vi', // step 2
      algorithm: 'no' // step 2
    });

    const isStepOptional = (step: number) => {
      return step === 1;
    };

    const isStepSkipped = (step: number) => {
      return skipped.has(step);
    };

    const handleNext = async () => {
      
      let newSkipped = skipped;
      if (isStepSkipped(activeStep)) {
        newSkipped = new Set(newSkipped.values());
        newSkipped.delete(activeStep);
      }
      // setActiveStep((prevActiveStep) => prevActiveStep + 1);
      if(activeStep === 0){ // step 1 - 2
          // handle course id
          if(courseId){
              setActiveStep((prevActiveStep) => prevActiveStep + 1);
              setSkipped(newSkipped);
              // console.log(courseId)
          }
      } else if (activeStep === 1) { //step 2 - 3
        // handle video
        if(videoFile){
            setActiveStep((prevActiveStep) => prevActiveStep + 1);
            setSkipped(newSkipped);
            const formData = new FormData();
            formData.append('file', videoFile);
            try {
              const response = await axios.post('http://localhost:3003/upload/video', formData, {
                headers: {
                  'Content-Type': 'multipart/form-data',
                },
              });
              setData((prevData: any)=> ({
                ...prevData,
                video: response?.data
              }));
            } catch (error) {
              console.error('Error uploading file:', error);
            }
          }else{
            setMessage('Error uploading file')
            setOpen(true)
          }
        } else if (activeStep === 2) {
          if(data.title && data.content){
            // all good
            // call apis to new video creation
            setcallCoursesApi(true);
          }
        }
    };

    React.useEffect(() => {
      const createLesson = async () => {
        try {
          setLoading(true);
          const response : any = await lessonsApi.createLesson(courseId, data);
          navigate(`/course/${response?.id}`)
        } catch (error) {
          console.error('Error fetching categories:', error);
          setLoading(false);
        }
      };
      if (callCoursesApi) {
        createLesson();
        setcallCoursesApi(false);
      }
    }, [callCoursesApi]);
  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };


  const handleReset = () => {
    setActiveStep(0);
  };
  const handleClose = (event: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  };
  return (
        <>
            <Box sx={{ width: '100%' }}>
                <Navbar/>
                {loading && (<Progress/>)}
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
                            <Step2CreateLesson data={data} setData={setData} setvideoFile={setvideoFile}/>
                            </div>
                        )}
                        {activeStep+1 === 3 && (
                            <>
                            <div className='w-[40rem]  mx-auto mt-10'>
                            Lesson contents
                            <br />
                            <br />
                            <Step3CreateLesson data={data} setData={setData}/>
                            </div>
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
                <Snackbar
                  open={open}
                  autoHideDuration={6000}
                  onClose={handleClose}
                  message={message}
                />
                <Footer/>
            </Box>
        </>
    );
}