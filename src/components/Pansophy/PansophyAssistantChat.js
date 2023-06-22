import React, { useState, useEffect } from 'react';
import { __ } from '@wordpress/i18n';
import UserMessage from './Chat/UserMessage';
import GeneratingImagesMessage from './Chat/GeneratingImagesMessage';
import AIImagesMessage from './Chat/AIImagesMessage';
import AIMessageChat from './Chat/AIMessageChat';
import AIAssistantImagesMessage from './Chat/AIAssistantImagesMessage';
import galleryImage from '../../images/gallery_image.jpg';
import { TypeAnimation } from 'react-type-animation';
import { useDispatch, useSelector } from 'react-redux';
import {
  getChatting,
  getEditing,
  getId,
  setChat,
  setImageLength,
} from '../../Store/chatSlice';
import { getHistory } from '../../Store/userSlice';
import axios from 'axios';
import { toast } from 'react-toastify';
var phpUnserialize = require('phpunserialize');

const PansophyAssistantChat = ({ messages, image, typing }) => {
  const url = `${pansophy_data.api_url}wprk/v1/settings`;
  const puturl = `${pansophy_data.api_url}wprk/v1/settings/images`;
  const chatGPTUrl = `${pansophy_data.api_url}wprk/v1/plugin`;
  const chatGPTImageUrl = `${pansophy_data.api_url}wprk/v1/find-image`;
  const [loading, setLoading] = useState(true);
  const [file, setFile] = useState();
  const [scroll, setScroll] = useState(0);
  const messagesEndRef = React.createRef();
  const answerRef = React.createRef();
  const dispatch = useDispatch();
  const setting = useSelector((state) => state.settings.data);
  const history = useSelector((state) => state.users.data);
  const question = useSelector((state) => state.chats.data.question);
  const answer = useSelector((state) => state.chats.data.answer);
  const imagesApi = useSelector((state) => state.chats.data.images);
  const is_image = useSelector((state) => state.chats.data.is_image);
  const isChatting = useSelector((state) => state.chats.data.isChatting);
  const isEditing = useSelector((state) => state.chats.data.isEditing);
  const id = useSelector((state) => state.chats.data.id);

  const images = [
    { id: 1, url: galleryImage },
    { id: 2, url: galleryImage },
    { id: 3, url: galleryImage },
    { id: 4, url: galleryImage },
    { id: 5, url: galleryImage },
    { id: 6, url: galleryImage },
    { id: 7, url: galleryImage },
    { id: 8, url: galleryImage },
    { id: 9, url: galleryImage },
    { id: 10, url: galleryImage },
    { id: 11, url: galleryImage },
    { id: 12, url: galleryImage },
  ];
  const getImageValue = (value) => {
    if (value) {
      setFile(images.filter((item) => item.id == value));
    }
  };
  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 3000);
  }, []);
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    answerRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [typing, scroll]);

  const updateAPIData = async (message) => {
    try {
      const payload = {
        question: message.question,
      };
      dispatch(setChat());
      dispatch(getEditing(true));
      dispatch(getId(message.id));
      // dispatch(getQuestion(promptValue));
      // getTyping(true);
      const chatGPTres = await axios.post(chatGPTUrl, payload);
      const generatedText = await chatGPTres.data.desc;
      if (chatGPTres?.data?.error === '1') {
        // alert()
        dispatch(getChatting(false));
        toast.error(chatGPTres?.data?.desc, {
          position: 'bottom-center',
          autoClose: 5000,
          hideProgressBar: false,
          theme: 'light',
        });
        return;
      }

      const data = {
        answer: generatedText,
        chat_id: parseInt(message.id),
      };
      const response = await axios.put(`${url}/update`, data);
      const res = await axios.get(url);
      if (res.data == 'empty tables') {
        dispatch(getHistory([]));
      } else {
        dispatch(getHistory(res.data));
      }
      // dispatch(setChat())
    } catch (error) {
      console.log(error);
    } finally {
      dispatch(getEditing(false));
    }
  };
  const updateImageAPIData = async (message) => {
    var dataArray = phpUnserialize(
      message?.is_image === '1' ? message.images : 's:3:"foo";'
    );
    dispatch(setImageLength(dataArray.length));
    // getImagePrompt(true)
    dispatch(setChat());
    dispatch(getEditing(true));
    dispatch(getId(message.id));
    try {
      const payload = {
        question: message.question,
        totalimgs: dataArray.length,
        imgSize: 'Small - 256 x 256',
      };
      // dispatch(getId(promptValue));
      // getTyping(true);
      const chatGPTImageres = await axios.post(chatGPTImageUrl, payload);
      const generatedText = chatGPTImageres.data.uploaded_wp_medias;
      if (chatGPTImageres?.data?.error === '1') {
        // alert()
        dispatch(getChatting(false));
        toast.error(chatGPTImageres?.data?.desc, {
          position: 'bottom-center',
          autoClose: 5000,
          hideProgressBar: false,
          theme: 'light',
        });
        return;
      }
      const data = {
        chat_id: message.id,
        images: generatedText,
      };

      const response = await axios.put(puturl, data);
      const res = await axios.get(url);
      if (res.data == 'empty tables') {
        dispatch(getHistory([]));
      } else {
        dispatch(getHistory(res.data));
      }
      dispatch(getId(null));
    } catch (error) {
      console.log(error);
    } finally {
      // getTyping(false);
      dispatch(getEditing(false));
    }
  };

  const RenderLatestMessage = () => {
    const [animate, setAnimate] = useState(true);

    // let animate = true
    if (!animate) {
      return (
        <AIMessageChat
          type="chat"
          animate={animate}
          updateAPIData={() => updateAPIData(messages[messages.length - 1])}
          message={{
            answer: answer,
            is_image: '0',
            answerText: answer,
            question: question
          }}
        />
      );
    } else {
      setTimeout(() => {
        setAnimate(false);
      }, answer.length / 20 * 500);

      return (
        <AIMessageChat
          type="chat"
          animate={animate}
          updateAPIData={() => updateAPIData(messages[messages.length - 1])}
          message={{
            answer: (
              <TypeAnimation
                sequence={[
                  answer.slice(0, 20),
                  500,
                  answer.slice(0, 40),
                  500,
                  answer,
                  500
                ]}
                style={{ fontSize: '1em' }}
                // repeat={Infinity}
                speed={75}
                cursor={false}
              />
            ),
            is_image: '0',
            answerText: answer,
            question: question
          }}
        />
      );
    }
  };

  return (
    <div className="pansophy-app-chat flex flex-col p-4 space-y-6 bg-pansophy-bg max-h-[500px] overflow-auto">
      {messages.length == 0 ? <h4>Ask Anything...</h4> : ''}
      {messages &&
        messages.map((message, index) => {
          let animate = true;
          var dataArray = phpUnserialize(
            message?.is_image === '1' ? message.images : 's:3:"foo";'
          );
          if (isChatting && messages.length - 1 === index && !typing) {
            return null;
          } else {
            return (
              <div className="grid gap-4" ref={messagesEndRef}>
                <div className="max-w-[80%]">
                  <UserMessage
                    logo={setting?.assistant_mode_icon}
                    type="chat"
                    message={message.question}
                  />
                </div>
                {message?.is_image === '1' ? (
                  <>
                    {message.id == id && isEditing ? (
                      <GeneratingImagesMessage type="chat" />
                    ) : (
                      <AIAssistantImagesMessage
                        updateImageAPIData={() => updateImageAPIData(message)}
                        data={dataArray}
                        getImageValue={getImageValue}
                      />
                    )}
                  </>
                ) : (
                  <>
                    {message?.is_image === '0' && id == message.id ? (
                      <AIMessageChat
                        updateAPIData={() => updateAPIData(message)}
                        animate={true}
                        message={{
                          answer: (
                            <TypeAnimation
                              ref={answerRef}
                              sequence={[
                                message?.answer.slice(0, 20),
                                500,
                                () => {
                                  setScroll(1);
                                  dispatch(getId(null));
                                },
                                message?.answer.slice(0, 40),
                                500,
                                () => {
                                  setScroll(2);
                                  dispatch(getId(null));
                                },
                                message?.answer,
                                500,
                                () => {
                                  setScroll(3);
                                  dispatch(getId(null));
                                },
                              ]}
                              style={{ fontSize: '1em' }}
                              // repeat={Infinity}
                              speed={75}
                              cursor={false}
                            />
                          ),
                          answerText: message?.answer,
                          is_image: '0',
                        }}
                      />
                    ) : (
                      <AIMessageChat
                        animate={false}
                        updateAPIData={() => updateAPIData(message)}
                        message={{ ...message, answerText: message?.answer }}
                      />
                    )}
                  </>
                )}
              </div>
            );
          }
        })}

      {typing && !is_image ? (
        <div>
          <UserMessage logo={setting?.assistant_mode_icon} message={question} />
          <br />
          <AIMessageChat
            type="chat"
            animate={true}
            message={{
              answer: (
                <TypeAnimation
                  sequence={['.', 500, '..', 500, '...', 500]}
                  style={{ fontSize: '2em' }}
                  repeat={Infinity}
                  speed={75}
                  cursor={false}
                />
              ),
              is_image: '0',
              answerText: '...',
            }}
          />
        </div>
      ) : (
        ''
      )}

      {answer !== '' && !typing && !is_image ? (
        <div>
          <UserMessage logo={setting?.assistant_mode_icon} message={question} />
          <br />
          <RenderLatestMessage />
        </div>
      ) : (
        ''
      )}

      {is_image ? (
        <>
          {typing && (
            <div className="ml-auto">
              <GeneratingImagesMessage type="chat" />
            </div>
          )}
          {imagesApi?.length > 0 && (
            <AIAssistantImagesMessage
              updateImageAPIData={() =>
                updateImageAPIData(messages[messages.length - 1])
              }
              data={imagesApi}
              getImageValue={getImageValue}
            />
          )}
        </>
      ) : (
        ''
      )}
    </div>
  );
};

export default PansophyAssistantChat;
