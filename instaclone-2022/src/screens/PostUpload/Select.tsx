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
  const [isImage,setIsImage]=useState<boolean>(true);
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [attachment,setAttachment]=useState("");

  const onDrop = useCallback(async (acceptedFiles) => {
    
      fileToAttachment(acceptedFiles[0]);

  }, []);
  const {getRootProps,isDragActive} = useDropzone({onDrop});
  
;
  
  const RootProps = {
    ...getRootProps(),
  };
  

  const fileToAttachment=async (file:Blob)=>{
   
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
      
        closeSelectModal();
       
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
  const openSelectModal=()=>{
    setModalOpen(true);
  }
  const closeSelectModal=()=>{
   
    if(attachment && attachment!==""){
      history.push("/create/details");
    }else{
      history.push(overlayLoc);
      
    }
    setModalOpen(false);
  }


  useEffect(()=>{
    if(location.pathname==="/create/select"){
      openSelectModal();
      console.log(overlayLoc);
      console.log(modalOpen);
    }
  },[location]);
  return(
    <>
      <Modal 
        isOpen={modalOpen}
        onRequestClose={closeSelectModal}
        style={modalStyles}
        ariaHideApp={false}
      >
      <div {...RootProps}>
      <button onClick={closeSelectModal}><FontAwesomeIcon icon={faTimesCircle} size='lg' /></button>
    
        <div>새 게시물 만들기</div>
        <Icon isDragActive={isDragActive}>
        <FontAwesomeIcon icon={faPhotoVideo} size='3x' />
        </Icon>
        <span>사진과 동영상을 여기에 끌어다 놓으세요</span>
       
        <input type="file" accept="image/* , video/*" onChange={onFileChange}/>
        
       
      </div>
        
      </Modal>
      <DetailModal overlayLoc={overlayLoc} attachment={attachment} isImage={isImage} />
    </>
  );
}


export default SelectModal;