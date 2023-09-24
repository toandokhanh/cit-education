import { TextField } from '@mui/material';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

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
      <ReactQuill
        className="h-64"
        theme="snow"
        value={data.content}
        onChange={handleQuillChange}
        modules={Step3CreateLesson.modules}
        formats={Step3CreateLesson.formats}
      />
    </div>
  );
};

Step3CreateLesson.modules = {
  toolbar: [
    [{ header: [1, 2, false] }],
    ['bold', 'italic', 'underline', 'strike', 'blockquote'],
    [{ list: 'ordered' }, { list: 'bullet' }, { indent: '-1' }, { indent: '+1' }],
    ['link', 'image'],
    ['clean'],
  ],
};

Step3CreateLesson.formats = [
  'header',
  'bold',
  'italic',
  'underline',
  'strike',
  'blockquote',
  'list',
  'bullet',
  'indent',
  'link',
  'image'
];

export default Step3CreateLesson;
