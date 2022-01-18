import {useHistory, useLocation } from "react-router-dom";
import {useEffect, useState,useCallback} from "react";
import Modal from "react-modal";
import {useDropzone} from "react-dropzone";
import {faTimesCircle} from "@fortawesome/free-regular-svg-icons"
import { faPhotoVideo } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styled from 'styled-components';
import modalStyles from "../../components/PostUpload/sharedModalStyles";
import DetailModal from "./Detail";
import { preProcessFile } from 'typescript';


interface IselecModal{
  overlayLoc:string;
}


const Icon=styled.div<{isDragActive?:boolean}>`
  color:${(props)=>props.isDragActive?props.theme.reactionColor:"inherit"}
`;



Modal.setAppElement('#root');
function SelectModal(props:IselecModal){
  const {overlayLoc}=props;
  const history=useHistory();
  const location=useLocation();
  const [modalOpen, setmodalOpen] = useState<boolean>(false);
  const [attachment,setAttachment]=useState("");
  const [isImage, setIsImage]=useState(true);
  const onDrop = useCallback(async (acceptedFiles) => {
    
      fileToAttachment(acceptedFiles[0]);

  }, []);
  const {getRootProps, getInputProps, isDragActive} = useDropzone({onDrop});
  
  const InputProps = {
    ...getInputProps(),
    multiple: false,
    accept: "image/*,video/*"
  };
  
  const RootProps = {
    ...getRootProps(),
  };
  
  const fileToAttachment=(file:Blob)=>{

      console.log(file);
      const reader=new FileReader();
      //결과
      reader.onloadend=(finishedEvent:any)=>{
        const {
          currentTarget:{result}
        }=finishedEvent;
        if(result.indexOf("image")===-1){
          setIsImage(false);
          console.log("Its video");
        }
        else {setIsImage(true)};
        setAttachment(result);
        setmodalOpen(false)
      }
      reader.readAsDataURL(file); //여기서 파일 읽기 시작
  }
  const onFileChange=(event:React.ChangeEvent<HTMLInputElement>)=>{
    const {target:{files}}=event;
    if(files) {
      const file=files[0];
      fileToAttachment(file);
    }
  }
  useEffect(()=>{
    if(location.pathname==="/create/select"){
      setmodalOpen(true);
      console.log(overlayLoc);
      console.log(modalOpen);
    } 
  },[location]);
  return(
    <>
      <Modal 
        isOpen={modalOpen}
        onRequestClose={()=>{history.push(overlayLoc); setmodalOpen(false);}}
        style={modalStyles}
        ariaHideApp={false}
      >
      <div {...RootProps}>
      <button onClick={()=>setmodalOpen(false)}><FontAwesomeIcon icon={faTimesCircle} size='lg' /></button>
    
        <div>새 게시물 만들기</div>
        <Icon isDragActive={isDragActive}>
        <FontAwesomeIcon icon={faPhotoVideo} size='3x' />
        </Icon>
        <span>사진과 동영상을 여기에 끌어다 놓으세요</span>
        <input {...InputProps}/>
        <input type="file" accept="image/* , video/*" onChange={onFileChange}/>
        
       
      </div>
        
      </Modal>
      <DetailModal overlayLoc={overlayLoc} attachment={attachment} isImage={isImage} />
    </>
  );
}


export default SelectModal;