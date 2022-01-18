import {v4 as uuidv4} from "uuid";
import {useHistory, useLocation} from "react-router-dom";
import {useCallback, useEffect, useState} from "react";
import Modal from "react-modal";
import {faTimesCircle} from "@fortawesome/free-regular-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import useUser from "../../redux/Auth/userHooks";
import { dbService, storageService } from '../../fbase';
import modalStyles from "../../components/PostUpload/sharedModalStyles";

Modal.setAppElement('#root');
interface IdetailModal{
  attachment:string;
  isImage:boolean;
  overlayLoc:string;
  
}

function DetailModal(props:IdetailModal){

  const {attachment,isImage,overlayLoc}=props;
  const history=useHistory();
  const location=useLocation();
  const [modalOpen, setmodalOpen] = useState<boolean>(false);
  const [text,setText]=useState<String>("");
  const textLimit=20000;
  const {userData}=useUser();
  
  const setFormattedText=useCallback(
    text=>{
      setText(text.slice(0,textLimit));
    },[setText]
  );

  const openDetailModal=()=>{
    setmodalOpen(true);
    history.push("/create/details");
  }
  const closeDetailModal=()=> {
    setmodalOpen(false);
    console.log(overlayLoc);
    history.push(overlayLoc);
   
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
    if(attachment){
      openDetailModal();
      console.log(modalOpen);
    } 
  },[attachment]);
  return(
    <>
      <Modal
        isOpen={modalOpen}
        onRequestClose={closeDetailModal}
        style={modalStyles}
        ariaHideApp={false}
      >
        <button onClick={closeDetailModal}><FontAwesomeIcon icon={faTimesCircle} size='lg' /></button>
        <div>새 게시물 만들기</div>
        <button onClick={onUpload}>업로드</button>
        <img alt="" src={attachment} width="50px" height="50px"/>
        <textarea name="postText" onChange={event => setFormattedText(event.target.value)} placeholder="문구 입력..."/>
        <span>{text.length}/{textLimit}</span>
      
      
      </Modal>
    </>
  );
}


export default DetailModal;