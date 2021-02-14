import React, {useMemo, useCallback} from "react";
import axios from "axios";
import {useDropzone} from "react-dropzone";
import {API_URL} from "../consts";

const baseStyle = {
  flex: 1,
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  padding: '20px',
  borderWidth: 2,
  borderRadius: 2,
  borderColor: '#eeeeee',
  borderStyle: 'dashed',
  backgroundColor: '#fafafa',
  color: '#bdbdbd',
  outline: 'none',
  transition: 'border .24s ease-in-out'
};

const activeStyle = {
  borderColor: '#2196f3'
};

const acceptStyle = {
  borderColor: '#00e676'
};

const rejectStyle = {
  borderColor: '#ff1744'
};

const Dropzone = ({onSetImage}) => {

  const onDrop = useCallback(async (acceptedFiles) => {
    const [file] = acceptedFiles;
    const formData = new FormData();
    formData.append("image", file);

        const config = {
          headers: {
            "Content-Type" : "multipart/form-data"
          }
        }
        try {
          const {data} = await axios.post(`${API_URL}/upload`, formData, config);
          onSetImage(data);
        } catch (err) {
          console.log(err);
        }
    // acceptedFiles.forEach((file) => {
    //   const reader = new FileReader()

    //   reader.onabort = () => console.log('file reading was aborted')
    //   reader.onerror = () => console.log('file reading has failed')
    //   reader.onload = async () => {

    //   // // Do whatever you want with the file contents
    //   //   const binaryStr = reader.result
    //   //   console.log(binaryStr)
    //   }
    //   reader.readAsArrayBuffer(file)
    // });
  }, [onSetImage])

  const {
    acceptedFiles,
    getRootProps,
    getInputProps,
    isDragActive,
    isDragAccept,
    isDragReject
  } = useDropzone({
    accept: 'image/*',
    multiple: false,
    onDrop
  });

  const style = useMemo(() => ({
    ...baseStyle,
    ...(isDragActive ? activeStyle : {}),
    ...(isDragAccept ? acceptStyle : {}),
    ...(isDragReject ? rejectStyle : {})
  }), [
    isDragActive,
    isDragReject,
    isDragAccept
  ]);

  return (
    <div className="dropbox mb-3">
      <img alt=""/>
      <div {...getRootProps({style})}>
        <input {...getInputProps()} />
        <p>Drag 'n' drop some files here, or click to select files</p>
      </div>
    </div>
  );
}

export default Dropzone;
