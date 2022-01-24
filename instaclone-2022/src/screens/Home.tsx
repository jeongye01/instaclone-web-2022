import { useState, useEffect } from 'react';
import { dbService } from '../fbase';
import styled from 'styled-components';
import PlaceList from '../components/PostUpload/PlaceList';
const Video = styled.video`
  width: 600px;
  max-width: 100%;
  height: 300px;
  object-fit: cover;
`;

const VideoContainer = styled.div`
  width: 300px;
  height: 300px;
`;
const Post = styled.div``;
function Home() {
  const [posts, setPosts] = useState<Array<any>>([]);
  const [posTableLoaded, setPosTableLoaded] = useState<boolean>(false);

  useEffect(() => {
    console.log('useEffect home');
    dbService.collection('posts').onSnapshot((snapshot) => {
      const postArray = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setPosts(postArray);
    });
  }, []);

  return (
    <>
      <button
        onClick={() => {
          setPosTableLoaded(!posTableLoaded);
        }}
      >
        {' '}
        위치{' '}
      </button>
      {posTableLoaded ? <PlaceList /> : null}
      <div>
        {posts.map((post) => (
          <Post key={post.id}>
            {post.isImage ? <img src={post.attachmentUrl} alt="" width="100px" height="100px" /> : null}
            <VideoContainer>
              <Video>
                <source src={post.attachmentUrl} type="video/mp4" />
              </Video>
            </VideoContainer>
          </Post>
        ))}
      </div>
    </>
  );
}

export default Home;
