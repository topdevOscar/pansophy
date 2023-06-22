import React, { useState, useEffect } from "react";
import axios from "axios";
import AppButtons from "./components/Pansophy/AppButtons";
import PansophyModal from "./components/Pansophy/Partials/PansophyModal";
import { __ } from "@wordpress/i18n";
import PansophySubmit from "./components/Pansophy/PansophySubmit";
import PansophyContent from "./components/Pansophy/PansophyContent";
import PansophyAssistant from "./components/Pansophy/PansophyAssistant";
import { useDispatch, useSelector } from "react-redux";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useFetcher } from "react-router-dom";
import { getSettings } from "./Store/settingSlice";
const App = () => {
  const url = `${pansophy_data.api_url}wprk/v1/general`;

  const currentURL = window.location.pathname.split("/");
  const [open, setOpen] = useState(null);
  const [image, setImage] = useState(false);
  const [typing, setTyping] = useState(false);
  const setting = useSelector((state) => state?.settings?.data?.header_message);
  
  const [pages, setPages] = useState([]);
  const page_setting = useSelector((state) => state?.settings?.data?.pages);
  console.log(page_setting,window.location.href)
  console.log(currentURL)
  const getImagePrompt = (imagePrompt) => {
    setImage(imagePrompt);
  };
  const dispatch = useDispatch();
  const getTyping = (typing) => {
    setTyping(typing);
  };
  const getAPIData = async () => {
    try {
      const res = await axios.get(url);
      console.log(res);
      dispatch(getSettings(res.data));
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAPIData()
  }, []);
  return (
    <div className="relative z-[999999]">
      <PansophyModal
        open={open === "modal"}
        onClose={() => setOpen(null)}
        title={__(setting, "pansophy")}
      >
        <PansophyContent image={image} typing={typing} />
        <div className="p-4">
          <PansophySubmit
            onClose={() => setOpen(null)}
            getImagePrompt={getImagePrompt}
            getTyping={getTyping}
          />
        </div>
      </PansophyModal>
      {open && open === "chat" && (
        <PansophyAssistant onClose={() => setOpen(null)} />
      )}

      {/* {currentURL[1] === "wp-admin" || page_setting?.includes("home-page")&&currentURL[1] === ""&&window.location.search==="" ||page_setting?.includes(window.location.href) ? ( */}
        <AppButtons
          open={open}
          handleOpen={(type) => setOpen(type)}
          handleClose={(type) => setOpen(type)}
        />
      {/* ) : (
        ""
      )} */}

      <ToastContainer
      // position="top-center"
      // autoClose={5000}
      // hideProgressBar={false}
      // newestOnTop={false}
      // closeOnClick
      // rtl={false}
      // pauseOnFocusLoss
      // draggable
      // pauseOnHover
      // theme="light"
      />
    </div>
  );
};

export default App;
