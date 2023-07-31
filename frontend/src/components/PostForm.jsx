import  React from 'react';
import {useStyles }from './styling';
import  Typography  from '@mui/material/Typography';
import { useSelector } from 'react-redux';
import FileBase from 'react-file-base64';
import {useDispatch} from 'react-redux'
import Paper from '@mui/material/Paper';
import Card from '@mui/material/Card'
import TextField from '@mui/material/TextField';
// import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
// import CardHeader from '@mui/material/CardHeader';
import { Box, Container } from '@material-ui/core';
import {createPost} from '../features/Posts/postSlice'
import{useState} from 'react'
import FlexBetween from './FlexBetween';



function PostForm() {

const { user } = useSelector((state) => state.auth);
const classes=useStyles()

   const [postData, setPostData] = useState({
  
  title:'',
  message: '',
  selectedFile:'',
   location:'',
   owner:''
   });


const {  title, message, selectedFile,location,owner} =
  postData;

const dispatch=useDispatch()










 
   




const handleSubmit=(e)=>{
 e.preventDefault();
  // console.log("clicked submit button")
const Data = {

  title,
  message,
  owner:user.name,
  selectedFile,
  
  location,
};
// console.log(Data);


  dispatch(createPost(Data))
  
  setPostData({
    
    title: '',
    message: '',
    selectedFile: '',
    location:'',
    owner:""
  });
};

  return (
    <>
      <form
        autoComplete='off'
        noValidate
        className={` ${classes.form}`}
        onSubmit={handleSubmit}
      >
        <TextField
          name='title'
          variant='outlined'
          label='Caption'
          fullWidth
          multiline
          value={postData.title}
          className={classes.textField}
          inputProps={classes.textField}
          onChange={(e) => setPostData({ ...postData, title: e.target.value })}
        />

        <TextField
          name='message'
          variant='outlined'
          label='Message'
          multiline
          fullWidth
          rows={1}
          value={postData.message}
          className={classes.textField}
          onChange={(e) =>
            setPostData({ ...postData, message: e.target.value })
          }
        />

        <TextField
          name='location'
          variant='outlined'
          label='Location'
          fullWidth
          multiline
          value={postData.location}
          className={classes.textField}
          onChange={(e) =>
            setPostData({ ...postData, location: e.target.value })
          }
        />

        {/* <TextField
          name='tags'
          variant='outlined'
          label='Tags (coma separated)'
          fullWidth
          value={postData.tags}
          onChange={(e) =>
            setPostData({ ...postData, tags: e.target.value.split(',') })
          }
        /> */}
        <div className={classes.fileInput}>
          <FileBase
            type='file'
            multiple={false}
            onDone={({ base64 }) =>
              setPostData({ ...postData, selectedFile: base64 })
            }
          />
        </div>
        {/* <Button
          className={classes.buttonSubmit}
          variant='contained'
          color='secondary'
          size='large'
          type='submit'
          fullWidth
        >
          Submit
        </Button> */}
        <button className='form-button'>submit</button>
        {/* <Button
          className={classes.buttonClear}
          variant='contained'
          color='secondary'
          // size='small'
          // onClick={clear}
          fullWidth
        >
          Clear
        </Button> */}
      </form>
    </>
  );
}
export default PostForm



