import React, { useState, useEffect, useRef } from "react";
import { __ } from "@wordpress/i18n";
import galleryImage from "../../images/gallery_image.jpg";
import UserMessage from "./Chat/UserMessage";
import AIMessage from "./Chat/AIMessage";
import GeneratingImagesMessage from "./Chat/GeneratingImagesMessage";
import AIImagesMessage from "./Chat/AIImagesMessage";
import { useDispatch, useSelector } from "react-redux";
import AiImagesMessage from "./Chat/AIImagesMessage";
import { TypeAnimation } from "react-type-animation";
import { getChatting, getEditing, getId, getType, setChat, setImageLength } from "../../Store/chatSlice";
import { getHistory } from "../../Store/userSlice";
import axios from "axios";
import { toast } from "react-toastify";
var phpUnserialize = require('phpunserialize');

// const messages = [
//     {id: 1, ai: false, message: 'How did we start this conversation?'},
//     {
//         id: 2,
//         ai: true,
//         message: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut et massa mi. Aliquam in hendrerit urna. Pellentesque sit amet sapien fringilla, mattis ligula consectetur, ultrices mauris. Maecenas vitae mattis tellus. Nullam quis imperdiet augue. Vestibulum auctor ornare leo, non suscipit magna interdum eu. Curabitur pellentesque nibh nibh, at maximus ante fermentum sit amet.'
//     },
//     {id: 3, ai: false, message: 'What did we speak about after that?'},
// ];
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
const PansophyContent = ({ image, typing, getTyping, }) => {
  const url = `${pansophy_data.api_url}wprk/v1/settings`;
  const puturl = `${pansophy_data.api_url}wprk/v1/settings/images`;
  const chatGPTUrl = `${pansophy_data.api_url}wprk/v1/plugin`;
  const chatGPTImageUrl = `${pansophy_data.api_url}wprk/v1/find-image`;
  const [tooltip, setTooltip] = useState("Copy to Clipboard");
  const messages = [];
  const [file, setFile] = useState();
  const [scroll, setScroll] = useState(0);
  const messagesEndRef = React.createRef();
  const componentRef = useRef(null);
  const answerRef = React.createRef();
  const history = useSelector((state) => state.users.data);
  const setting = useSelector((state) => state.settings.data);
  const question = useSelector((state) => state.chats.data.question);
  const answer = useSelector((state) => state.chats.data.answer);
  const imagesApi = useSelector((state) => state.chats.data.images);
  const is_image = useSelector((state) => state.chats.data.is_image);
  const isChatting = useSelector((state) => state.chats.data.isChatting);
  const isEditing = useSelector((state) => state.chats.data.isEditing);
  const id = useSelector((state) => state.chats.data.id);
  const dispatch = useDispatch();
  
  history.map((item) => {
    messages.push(item);
  });
  console.log(messages)

  const [loading, setLoading] = useState(true);

  const getImageValue = (value) => {
    setFile(images.filter((item) => item.id == value));
  };
  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 3000);
  }, []);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    answerRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [typing, scroll]);

  const updaeAPIData = async (message) => {
    console.log(message)
    try {
      const payload = {
        question: message.question,
      };
      dispatch(setChat())
      dispatch(getEditing(true));
      dispatch(getId(message.id));
      // dispatch(getQuestion(promptValue));
      // getTyping(true);
      const chatGPTres = await axios.post(chatGPTUrl, payload);
      const generatedText = await chatGPTres.data.desc;
      if (chatGPTres?.data?.error === "1") {
        dispatch(getChatting(false))
        // alert()
        toast.error(chatGPTres?.data?.desc, {
          position: "bottom-center",
          autoClose: 5000,
          hideProgressBar: false,
          theme: "light"
        });
        return
      }

      const data = {

        answer: generatedText,
        chat_id: parseInt(message.id)

      };

      let headersList = {
        "Accept": "*/*",
        "Content-Type": "application/json"
      }
      // const response = await axios.put(`${url}/update`, data);
      let bodyContent = JSON.stringify({
        "answer": generatedText,
        chat_id: parseInt(message.id)
      });

      let reqOptions = {
        url: `${url}/update`,
        method: "PUT",
        headers: headersList,
        data: bodyContent,
      }

    
      let response = await axios.request(reqOptions);
      const res = await axios.get(url);
      if (res.data == "empty tables") {
        dispatch(getHistory([]));
      } else {
        dispatch(getHistory(res.data));
      }
      dispatch(getEditing(false));
      // dispatch(setChat())
    } catch (error) {
      dispatch(getEditing(false));
      console.log(error);
    } finally {
      dispatch(getEditing(false));
    }
  };
  const updateImageAPIData = async (message) => {
    console.log(message)
 
    var dataArray = phpUnserialize(message?.is_image === "1" ? message.images : 's:3:"foo";');
    // getImagePrompt(true)
    dispatch(setImageLength(dataArray.length))
    dispatch(setChat())
    dispatch(getEditing(true));
    dispatch(getId(message.id));
    try {
      const payload = {
        question: message.question,
        totalimgs: dataArray.length,
        imgSize: "Small - 256 x 256",
      };
      console.log(payload)
      // dispatch(getId(promptValue));
      // getTyping(true);
      const chatGPTImageres = await axios.post(chatGPTImageUrl, payload);
      const generatedText = chatGPTImageres.data.uploaded_wp_medias
      console.log(generatedText);
      if (generatedText?.data?.error === "1") {
        // alert()
        dispatch(getChatting(false))
        toast.error(generatedText?.data?.desc, {
          position: "bottom-center",
          autoClose: 5000,
          hideProgressBar: false,
          theme: "light"
        });
        return
      }
      const data = {
        chat_id: message.id,
        images: generatedText
      };

      const response = await axios.put(puturl, data);
      const res = await axios.get(url);
      if (res.data == "empty tables") {
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
  const ResderLatestMessage =  ()=>{
    const [animate,setAnimate] = useState(true)

    // let animate = true 
console.log(animate)
    if (!animate){
      return <AIMessage
      
      animate={animate}
      updaeAPIData={()=>updaeAPIData(messages[messages.length - 1])}
      message={{
        answer:answer,
        is_image: "0",
      }}
    />
    }else {
      return <AIMessage
      
      animate={animate}
      updaeAPIData={()=>updaeAPIData(messages[messages.length - 1])}
      message={{
        answer: (
          <TypeAnimation
            sequence={[
              answer.slice(0, 20),
              500, () => {setAnimate(false)},
              answer.slice(0, 40),
              500, () => {setAnimate(false)}
              ,
              500, () => {setAnimate(false)},
            ]}
            style={{ fontSize: "1em" }}
            // repeat={Infinity}
            speed={75}
          />
        ),
        is_image: "0",
      }}
    />
    }
   
  }
  return (
    <div
      ref={componentRef}
      className="pansophy-app-chat flex flex-col p-4 space-y-6 bg-pansophy-bg max-h-[500px] overflow-auto"
    >
      {messages.length == 0 ? <h4>{setting.header_description}</h4> : ""}

      {messages &&
        messages.map((message, index) => {

          var dataArray = phpUnserialize(message?.is_image === "1" ? message.images : 's:3:"foo";');
          console.log( message?.is_image === "0" && isEditing && id == message.id )
          if (isChatting && messages.length - 1 === index && !typing) {
            return null;
          } else {
            return (
              <div className="grid gap-4" ref={messagesEndRef}>
                <UserMessage logo = {setting?.content_mode_icon} message={message.question} />
                {/* {message?.is_image === "1" & isEditing && id === message.id && <GeneratingImagesMessage />} */}
                {message?.is_image === "1" ? <>

                  {message.id == id && isEditing ? <GeneratingImagesMessage /> :
                    <AIImagesMessage updateImageAPIData={() => updateImageAPIData(message)} data={dataArray} getImageValue={getImageValue} />}</> :


                  <>{
                    // message?.is_image === "0" && isEditing && id == message.id ?


                    //   <AIMessage
                    //     message={{
                    //       answer: (
                    //         <TypeAnimation
                    //           sequence={[".", 500, "..", 500, "...", 500]}
                    //           style={{ fontSize: "2em" }}
                    //           repeat={Infinity}
                    //           speed={75}
                    //         />
                    //       ),
                    //       is_image: "0",
                    //     }}
                    //   /> 
                      
                    //   :
                    message?.is_image === "0" && id == message.id ? (
                      <AIMessage
                      animate={true}
                      updaeAPIData={() => updaeAPIData(message)}
                        message={{
                          answer: (
                            <TypeAnimation
                              ref={answerRef}
                              sequence={[
                                message?.answer.slice(0, 20),
                                500, () => {setScroll(1)
                                  dispatch(getId(null));
                                },
                                message?.answer.slice(0, 40),
                                500, () => {setScroll(2)
                                  dispatch(getId(null));
                                },
                                message?.answer,
                                500, () => {setScroll(3)
                                  dispatch(getId(null));
                                },
                              ]}
                              style={{ fontSize: "1em" }}
                              // repeat={Infinity}
                              speed={75}
                            />
                          ),
                          is_image: "0",
                        }}
                      />
                    ) :

                      <AIMessage updaeAPIData={() => updaeAPIData(message)} message={message} />

                  }</>}

              </div>
            );
          }
        })}

      {typing && !is_image ? (
        <div>
          <UserMessage logo = {setting?.content_mode_icon} message={question} />
          <br />
          <AIMessage
             animate={true}
            message={{
              answer: (
                <TypeAnimation
                  sequence={[".", 500, "..", 500, "...", 500]}
                  style={{ fontSize: "2em" }}
                  repeat={Infinity}
                  speed={75}
                />
              ),
              is_image: "0",
            }}
          />
        </div>
      ) : (
        ""
      )}


      {answer !== "" && !typing && !is_image ? (
        <div>
          <UserMessage logo = {setting?.content_mode_icon} message={question} />
          <br />
          <ResderLatestMessage/>
        </div>
      ) : (
        ""
      )}
      {is_image ? (
        <>
          {typing && <GeneratingImagesMessage />}
          {imagesApi?.length > 0 && <AIImagesMessage updateImageAPIData={() => updateImageAPIData(messages[messages.length - 1])} data={imagesApi} getImageValue={getImageValue} />}
        </>
      ) : (
        ""
      )}
    </div>
  );
};

export default PansophyContent;
