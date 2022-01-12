import {faPlusSquare,faTimesCircle} from "@fortawesome/free-regular-svg-icons"
import { faPhotoVideo } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {useState,useEffect} from "react";
import {useHistory} from "react-router-dom";
import Modal from "react-modal";
import { dbService } from '../fbase';
interface Styles{
  overlay:any;
  content:any;
}
const customStyles:Styles = {
  overlay: {
		position: "fixed",
		top: 0,
		left: 0,
		right: 0,
		bottom: 0,
		backgroundColor: "rgba(0, 0, 0, 0.83)",
		zIndex: 10,
	},
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    
  },
};
Modal.setAppElement('#root');
function Home(){
  const history=useHistory();
  const [posts,setPosts]=useState<Array<any>>([]);
  const [isSelectModal, setSelectModal] = useState(false);
  const [isDetailModal, setDetailModal] = useState(false);
  const [attachment,setAttachment]=useState();
  const getPosts=async()=>{
  
  try{
    const dbPosts=await dbService.collection("posts").get();
     dbPosts.forEach((document:any)=>{
       const postObject={
         ...document.data(),
         id:document.id
       }
        setPosts((prev)=>[postObject,...prev]); 
    });
  
  }catch(error){
    console.log(error);
  }
  };
  
  useEffect(()=>{
    getPosts();
  },[]);
  
  const openSelectModal=()=> {
    setSelectModal(true);
    history.push("/create/select");

  }

  const closeSelectModal=()=> {
    setSelectModal(false);
    history.goBack();
  }
  const closeDetailModal=()=> {
    setDetailModal(false);
    history.goBack();
  }
  const onSubmit=()=>{
    console.log();
  }
  const onFileChange=(event:React.ChangeEvent<HTMLInputElement>)=>{
    const {target:{files}}=event;
    console.log(files);
    if(files) {
      const file=files[0];
      const reader=new FileReader();
      reader.onloadend=(finishedEvent:any)=>{
        const {
          currentTarget:{result}
        }=finishedEvent;
        setAttachment(result);
        setSelectModal(false);
        setDetailModal(true);
        history.push("/create/details");
      }//결과
      reader.readAsDataURL(file); //여기서 파일 읽기 시작
    }
}
  const onUpload=async ()=>{
    const post="";
    await dbService.collection("posts").add({
      post,
      createdAt:Date.now()
    });
  };
  return(
    <>
    <div>
      {posts.map(post=>
      <div key={post.id}>
         {post}
      </div>)}
    </div>
     <button onClick={openSelectModal}>Open Modal</button>
    
     <Modal
        isOpen={isSelectModal}
        onRequestClose={closeSelectModal}
        style={customStyles}
        ariaHideApp={false}
      >
        <button onClick={closeSelectModal}><FontAwesomeIcon icon={faTimesCircle} size='lg' /></button>
        <form onSubmit={onSubmit}>
          <div>새 게시물 만들기</div>
          <FontAwesomeIcon icon={faPhotoVideo} size='3x' />
          <span>사진과 동영상을 여기에 끌어다 놓으세요</span>
        
          <input  type="file" accept="image/* , video/*" onChange={onFileChange}/>
        </form>
        
    </Modal>
    <Modal
        isOpen={isDetailModal}
        onRequestClose={closeDetailModal}
        style={customStyles}
        ariaHideApp={false}
      >
        <button onClick={closeDetailModal}><FontAwesomeIcon icon={faTimesCircle} size='lg' /></button>
        <div>새 게시물 만들기</div>
        <button onClick={onUpload}>업로드</button>
        <img src={attachment} width="50px" height="50px"/>
        <form>
          <textarea name="postText" placeholder="문구 입력..."/>
          
        </form>
       
    </Modal>
      <h1>Home!</h1>
    </>
  );
}

export default Home;