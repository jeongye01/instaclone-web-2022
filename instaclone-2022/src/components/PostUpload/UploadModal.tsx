import {v4 as uuidv4} from "uuid";
import {useHistory, useLocation } from "react-router-dom";
import {useEffect, useState} from "react";
import Modal from "react-modal";
import {faPlusSquare,faTimesCircle} from "@fortawesome/free-regular-svg-icons"
import { faPhotoVideo } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import useUser from "../../redux/Auth/userHooks";
import { dbService, storageService } from '../../fbase';
import { createFFmpeg,fetchFile } from '@ffmpeg/ffmpeg';
import modalStyles from "./sharedModalStyles";

Modal.setAppElement('#root');

interface IUpload{
  modalOpen:boolean;
};

function UploadModal(){

  const history=useHistory();
  const location = useLocation();
  const [isSelectModal, setSelectModal] = useState(false);
  const [isDetailModal, setDetailModal] = useState(false);
  const [attachment,setAttachment]=useState();
  const [thumnail,setThumbnail]=useState();
  const [isImage, setIsImage]=useState(true);
  const [text,setText]=useState<String>("");
  const {userData}=useUser();
  
  const openSelectModal=()=> {
    console.log("open modal");
    setSelectModal(true);
    
  } 
  const closeSelectModal=()=> {
    setSelectModal(false);
    console.log("close modal");
    history.goBack();
  }
  const openDetailModal=()=>{
    setDetailModal(true);
    history.push("/create/details");
  }
  const closeDetailModal=()=> {
    setDetailModal(false);
    history.push("/");
  }
  const onFileChange=(event:React.ChangeEvent<HTMLInputElement>)=>{
    const {target:{files}}=event;
   
  
    if(files) {
      const file=files[0];
      const reader=new FileReader();
      //결과
      reader.onloadend=(finishedEvent:any)=>{
        const {
          currentTarget:{result}
        }=finishedEvent;
        if(result.indexOf("image")===-1){
          setIsImage(false);
          console.log("Its video");
         // extractThumnail();
        }
        else setIsImage(true);
      
        setAttachment(result);
        setSelectModal(false);
        openDetailModal();
      }
      reader.readAsDataURL(file); //여기서 파일 읽기 시작
    }
  }
  const onUpload=async ()=>{
    try{
    let attachmentUrl="";
    if(attachment){
      const attachmentRef=storageService.ref().child(`${userData.uid}/${uuidv4()}`);
      const response=await attachmentRef.putString(attachment,"data_url");
      attachmentUrl=await response.ref.getDownloadURL();
     }
     const post={
      attachmentUrl,
      text,
      isImage,
      meta:{
        createdAt:Date.now(),
        creatorId:userData.uid
      }
     };

    await dbService.collection("posts").add(post);
    closeDetailModal();
    }catch(error){
    console.log(error);
    }
  };
  useEffect(()=>{
    if("/create/select"===location.pathname){
      openSelectModal();
      console.log(isSelectModal);
    }
  },[location]);
  return(
    <>
      <Modal
        isOpen={isSelectModal}
        onRequestClose={closeSelectModal}
        style={modalStyles}
        ariaHideApp={false}
      >
      <button onClick={closeSelectModal}><FontAwesomeIcon icon={faTimesCircle} size='lg' /></button>
    
        <div>새 게시물 만들기</div>
        <FontAwesomeIcon icon={faPhotoVideo} size='3x' />
        <span>사진과 동영상을 여기에 끌어다 놓으세요</span>
        
        <input  type="file" accept="image/* , video/*" onChange={onFileChange}/>
      
    
      </Modal>
      <Modal
        isOpen={isDetailModal}
        onRequestClose={closeDetailModal}
        style={modalStyles}
        ariaHideApp={false}
      >
        <button onClick={closeDetailModal}><FontAwesomeIcon icon={faTimesCircle} size='lg' /></button>
        <div>새 게시물 만들기</div>
        <button onClick={onUpload}>업로드</button>
        <img alt="" src={attachment} width="50px" height="50px"/>
        <textarea name="postText" onChange={event=>setText(event.target.value)} placeholder="문구 입력..."/>
          
      
      
      </Modal>
    </>
  );
}


export default UploadModal;