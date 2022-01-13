import {useState,useEffect} from "react";
import { dbService } from '../fbase';


function Home(){

  const [posts,setPosts]=useState<Array<any>>([]);
  

  
 useEffect(()=>{
    dbService.collection("posts").onSnapshot((snapshot)=>{
       const postArray=snapshot.docs.map(doc=>({
         id:doc.id,
         ...doc.data()
       }));
       setPosts(postArray);
    });
  
  },[]);
  


  
 
  return(
    <>
    <div>
    {posts.map(post=>
      <div key={post.id}>
         <img src={post.attachment} alt="" width="50px" height="50px"/>
         <span>{post.text}</span>
      </div>)}
    </div>
    
    
      <h1>Home!</h1>
    </>
  );
}

export default Home;