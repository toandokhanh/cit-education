import { TextField } from '@mui/material';
import RichTextEditor from '../../RichTextEditor';

const Step3CreateLesson = ({ data, setData } : any) => {
  const handleInputChange = (event: any) => {
    const { name, value } = event.target;
    setData((prevData: any) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleQuillChange = (value: String) => {
    setData((prevData: any) => ({
      ...prevData,
      content: value,
    }));
  };

  return (
    <div>
      <TextField
        autoFocus
        margin="dense"
        id="title"
        label="Title *"
        name="title"
        type="text"
        autoComplete="title"
        fullWidth
        variant="standard"
        value={data.title}
        onChange={handleInputChange}
      />
      <p className="text-start">Contents</p>
      <RichTextEditor
        className="h-64"
        value={data.content}
        onChange={handleQuillChange}
      />
    </div>
  );
};

export default Step3CreateLesson;
