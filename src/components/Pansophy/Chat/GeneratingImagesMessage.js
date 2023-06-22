import React, { useState,useEffect } from "react";
import { __ } from "@wordpress/i18n";
import avatar from "../../../images/avatar.svg";
import illustration from "../../../images/illustration.svg";
import { useSelector } from "react-redux";
import Countdown from "react-countdown";

const GeneratingImagesMessage = ({ type, message }) => {
  const imagesLength = useSelector((state) => state.chats.data.imagesLength);
  const [timer, setTimer] = useState(0)
  const [seconds, setSeconds] = useState(10*(imagesLength===1?imagesLength:imagesLength===3?2:6 ))
  const setting = useSelector((state) => state.settings.data);
  // const renderer = ({ hours, minutes, seconds, completed }) => {
  
  //   if (completed) {
  //     // Render a completed state
  //     return <span className="text-app-green"> {seconds} Seconds</span>;

  //   } else {
    
  //     // Render a countdown
  //     return <span className="text-app-green"> {seconds} Seconds</span>;
  //   }
  // };

  useEffect(() => {
    const interval = setInterval(() => {
      setTimer(timer + 1)
      setSeconds(seconds-1)
      if (timer === 400) {
        clearInterval(interval);
      }
    }, 1000); // Half a second (500 milliseconds)

    return () => {
      clearInterval(interval);
    };
  }, );
  function calculatePercentage(partialValue, totalValue) {
    console.log(partialValue,totalValue, (partialValue / totalValue) * 100)
    return (partialValue / totalValue) * 100;
  }
  useEffect(() => {
    setSeconds(10*(imagesLength===1?imagesLength:imagesLength===3?2:6 ))
  }, [imagesLength])
  console.log(imagesLength,"imagesLength")
  return (
    <div
      className={`flex w-full ${type && type === "chat" ? "items-center space-x-2" : "md:space-x-4"
        }`}
    >
      {!type && (
        <div className="hidden relative items-center justify-center min-w-[32px] w-8 h-8 bg-app-green rounded-full md:flex">
          {setting?.responses_avatar ?
            <img src={setting?.responses_avatar} alt="Dall-e-2 Icon" /> :
            <svg
              width="16"
              height="17"
              viewBox="0 0 16 17"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M14.9387 7.03827C15.2991 5.95185 15.179 4.74691 14.5982 3.75926C13.7171 2.23827 11.9349 1.4679 10.1927 1.82346C9.43177 0.974074 8.31037 0.5 7.14892 0.5C5.36669 0.5 3.80474 1.62593 3.24404 3.28519C2.10261 3.52222 1.12139 4.21358 0.54066 5.22099C-0.340441 6.74198 -0.140191 8.63827 1.04129 9.94198C0.680835 11.0481 0.82101 12.2333 1.40174 13.221C2.28284 14.742 4.06507 15.5321 5.80724 15.1568C6.58822 16.0062 7.6896 16.5 8.85105 16.5C10.6333 16.5 12.1952 15.3741 12.7559 13.7148C13.8974 13.4778 14.8786 12.7864 15.4593 11.779C16.3404 10.258 16.1402 8.34198 14.9387 7.03827ZM8.85105 15.4531C8.13015 15.4531 7.4493 15.216 6.90862 14.7617C6.92864 14.742 6.98872 14.7222 7.00874 14.7025L10.2328 12.8654C10.393 12.7667 10.4931 12.6086 10.4931 12.4111V7.92716L11.8548 8.69753C11.8748 8.69753 11.8748 8.71728 11.8748 8.73704V12.4506C11.8949 14.1099 10.5332 15.4531 8.85105 15.4531ZM2.32289 12.7074C1.96244 12.0951 1.84229 11.384 1.96244 10.6926C1.98246 10.7123 2.02251 10.7321 2.06256 10.7519L5.28659 12.5889C5.44679 12.6877 5.64704 12.6877 5.80724 12.5889L9.75217 10.337V11.8975C9.75217 11.9173 9.75217 11.937 9.73215 11.937L6.46807 13.7938C5.02627 14.6235 3.16394 14.1296 2.32289 12.7074ZM1.48184 5.75432C1.84229 5.14198 2.40299 4.68765 3.06381 4.43086V8.22346C3.06381 8.40123 3.16394 8.57901 3.32414 8.67778L7.26907 10.9296L5.90737 11.7C5.88734 11.7 5.86732 11.7198 5.86732 11.7L2.60324 9.84321C1.12139 9.01358 0.640785 7.17654 1.48184 5.75432ZM12.6959 8.32222L8.75092 6.07037L10.1126 5.3C10.1326 5.3 10.1527 5.28025 10.1527 5.3L13.4168 7.15679C14.8786 7.98642 15.3592 9.82346 14.5181 11.2457C14.1577 11.858 13.597 12.3123 12.9362 12.5494V8.77654C12.9562 8.59877 12.8561 8.42099 12.6959 8.32222ZM14.0375 6.30741C14.0175 6.28765 13.9775 6.2679 13.9374 6.24815L10.7134 4.41111C10.5532 4.31235 10.3529 4.31235 10.1927 4.41111L6.24779 6.66296V5.10247C6.24779 5.08272 6.24779 5.06296 6.26782 5.06296L9.5319 3.20617C10.9937 2.37654 12.836 2.87037 13.6771 4.31235C14.0375 4.90494 14.1577 5.61605 14.0375 6.30741ZM5.50687 9.07284L4.14517 8.30247C4.12514 8.30247 4.12514 8.28272 4.12514 8.26296V4.54938C4.12514 2.89012 5.48684 1.54691 7.16894 1.54691C7.88985 1.54691 8.5707 1.78395 9.11137 2.23827C9.09135 2.25802 9.0513 2.27778 9.01125 2.29753L5.78722 4.13457C5.62702 4.23333 5.52689 4.39136 5.52689 4.58889V9.07284H5.50687ZM6.24779 7.49259L8.01 6.48519L9.7722 7.49259V9.48765L8.01 10.4951L6.24779 9.48765V7.49259Z"
                fill="white"
              />
            </svg>}
        </div>
      )}

      <div className="flex flex-col space-y-4 self-center w-full leading-7 text-sm text-white">
        <span className="font-medium text-base">
          {__("Generating Images", "pansophy")}
        </span>

        <div className="relative flex h-[4px] w-full bg-pansophy-bgDark rounded-xl">
          <span
            className="absolute left-0 h-[4px] bg-app-green rounded-xl"
            style={{ width: `${calculatePercentage(timer,10*(imagesLength===1?imagesLength:imagesLength===3?2:6 ))}%` }}
          ></span>
        </div>

        <div className="flex items-center space-x-2">
          <svg
            width="24"
            height="25"
            viewBox="0 0 24 25"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M12 23.25C6.07 23.25 1.25 18.43 1.25 12.5C1.25 6.57 6.07 1.75 12 1.75C17.93 1.75 22.75 6.57 22.75 12.5C22.75 18.43 17.93 23.25 12 23.25ZM12 3.25C6.9 3.25 2.75 7.4 2.75 12.5C2.75 17.6 6.9 21.75 12 21.75C17.1 21.75 21.25 17.6 21.25 12.5C21.25 7.4 17.1 3.25 12 3.25Z"
              fill="#10B981"
            />
            <path
              d="M15.71 16.43C15.58 16.43 15.45 16.4 15.33 16.32L12.23 14.47C11.46 14.01 10.89 13 10.89 12.11V8.01C10.89 7.6 11.23 7.26 11.64 7.26C12.05 7.26 12.39 7.6 12.39 8.01V12.11C12.39 12.47 12.69 13 13 13.18L16.1 15.03C16.46 15.24 16.57 15.7 16.36 16.06C16.21 16.3 15.96 16.43 15.71 16.43Z"
              fill="#10B981"
            />
          </svg>

          <span className="text-pansophy-text">
            {__("Time Remaining", "pansophy")} -{" "}
            <span className="text-app-green"> {seconds} Seconds</span>;
            {/* <Countdown
              date={Date.now() + 10000}
              renderer={renderer}
            /> */}
          </span>
        </div>
      </div>

      {type && type === "chat" && (
        <div className="relative items-center justify-center min-w-[32px] w-8 h-8 bg-app-green rounded-full flex">
          {setting?.responses_avatar ? <img src={setting?.responses_avatar} alt="Dall-E-2 Logo" className="w-6" /> : <img src={illustration} alt="Dall-E-2 Logo" className="w-6" />}
        </div>
      )}
    </div>
  );
};

export default GeneratingImagesMessage;
