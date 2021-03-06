import { v4 as uuidv4 } from 'uuid';
import { useHistory, useLocation } from 'react-router-dom';
import { useCallback, useEffect, useState } from 'react';
import Modal from 'react-modal';
import { faTimesCircle } from '@fortawesome/free-regular-svg-icons';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import useUser from '../../redux/Auth/userHooks';
import { dbService, storageService } from '../../fbase';
import modalStyles from '../../components/PostUpload/sharedModalStyles';
import Picker from 'emoji-picker-react';
import PlaceList, { position } from '../../components/PostUpload/PlaceList';

Modal.setAppElement('#root');
interface IdetailModal {
  attachment: string;
  isImage: boolean;
  overlayLoc: string;
}

function DetailModal(props: IdetailModal) {
  const { attachment, isImage, overlayLoc } = props;
  const history = useHistory();
  const location = useLocation();
  const [modalOpen, setmodalOpen] = useState<boolean>(false);
  const [alertModalOpen, setAlertModalOpen] = useState<boolean>(false);
  const [text, setText] = useState('');
  const [chosenEmoji, setChosenEmoji] = useState();
  const [emojiLoaded, setEmojiLoaded] = useState<boolean>(false);
  const [posTableLoaded, setPosTableLoaded] = useState<boolean>(false);
  const textLimit = 2000;
  const { userData } = useUser();
  const onEmojiClick = (event: React.MouseEvent<Element, MouseEvent>, emojiObject: any) => {
    setChosenEmoji(emojiObject);
    console.log(emojiObject.emoji);
    const { emoji } = emojiObject;
    setText(text + emoji);
  };
  const setFormattedText = useCallback(
    (text) => {
      setText(text);
    },
    [setText],
  );

  const openDetailModal = () => {
    setmodalOpen(true);
  };
  const closeDetailModal = () => {
    setmodalOpen(false);
    setAlertModalOpen(false);
    setText('');
    setEmojiLoaded(false);

    history.push(overlayLoc);
  };
  const goBack = () => {
    history.goBack();
  };

  const onUpload = async () => {
    try {
      let attachmentUrl = '';
      if (attachment) {
        const attachmentRef = storageService.ref().child(`${userData.uid}/${uuidv4()}`);
        const response = await attachmentRef.putString(attachment, 'data_url');
        attachmentUrl = await response.ref.getDownloadURL();
      }
      const post = {
        attachmentUrl,
        text: text.slice(0, textLimit),
        isImage,
        position,
        meta: {
          createdAt: Date.now(),
          creatorId: userData.uid,
        },
      };
      console.log(post);
      await dbService.collection('posts').add(post);
      closeDetailModal();
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    if (location.pathname === '/create/details' && attachment !== '') {
      openDetailModal();
      console.log('detial modalOpen');
    } else setmodalOpen(false);
  }, [location]);
  return (
    <>
      <Modal
        isOpen={modalOpen}
        onRequestClose={() => {
          setAlertModalOpen(true);
        }}
        style={modalStyles}
        ariaHideApp={false}
      >
        <button
          onClick={() => {
            setAlertModalOpen(true);
          }}
        >
          <FontAwesomeIcon icon={faTimesCircle} size="lg" />
        </button>
        <button
          onClick={() => {
            if (attachment) goBack();
          }}
        >
          <FontAwesomeIcon icon={faArrowLeft} size="lg" />
        </button>
        <div>??? ????????? ?????????</div>
        <button onClick={onUpload}>?????????</button>
        <img alt="" src={attachment} width="50px" height="50px" />
        <textarea
          name="postText"
          value={text}
          onChange={(event) => setFormattedText(event.target.value)}
          placeholder="?????? ??????..."
        />
        <button
          onClick={() => {
            setEmojiLoaded(!emojiLoaded);
          }}
        >
          Emoji
        </button>
        {emojiLoaded ? (
          <div>
            {chosenEmoji ? <span>You chose: </span> : <span>No emoji Chosen</span>}
            <Picker onEmojiClick={onEmojiClick} />
          </div>
        ) : null}

        <span>
          {text.length}/{textLimit}
        </span>
        <button
          onClick={() => {
            setPosTableLoaded(!posTableLoaded);
          }}
        >
          {' '}
          ??????{' '}
        </button>
        {posTableLoaded ? <PlaceList /> : null}
      </Modal>
      <Modal isOpen={alertModalOpen} style={modalStyles} ariaHideApp={false}>
        <span>???????????? ??????????????????????</span>
        <p>?????? ????????? ?????? ????????? ???????????? ????????????.</p>
        <button onClick={closeDetailModal}>??????</button>
        <button onClick={() => setAlertModalOpen(false)}>??????</button>
      </Modal>
    </>
  );
}

export default DetailModal;
