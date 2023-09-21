import * as React from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import DOMPurify from 'dompurify';

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function CustomTabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

export default function LessonTab({content} : any) {
  const [value, setValue] = React.useState(0);
  const cleanHtml = DOMPurify.sanitize(content);
  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: '100%' }}>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
          <Tab label="lesson contents" {...a11yProps(0)} />
          <Tab label="Take notes" {...a11yProps(1)} disabled  />
          <Tab label="Q&A" {...a11yProps(2)} />
        </Tabs>
      </Box>
      <CustomTabPanel value={value} index={0}>
        <span className='text-start' dangerouslySetInnerHTML={{ __html: cleanHtml }}></span>
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
      </CustomTabPanel>
      <CustomTabPanel value={value} index={1}>
        Take notes
      </CustomTabPanel>
      <CustomTabPanel value={value} index={2}>
        <span className='text-start'>Q&A</span>
      </CustomTabPanel>
    </Box>
  );
}
