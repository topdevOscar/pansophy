import React, { useState, useEffect } from 'react';
import illustration from '../../images/illustration.svg'
import { useSelector } from 'react-redux';

const AppButtons = ({ handleOpen, handleClose, ...props }) => {

    let positions = [
        "bottom-10 right-10",
        "bottom-10 left-10",
        "top-10 right-10",
        "top-10 left-10"
    ]
    const url = `${pansophy_data.api_url}wprk/v1/general`;

    const setting = useSelector((state) => state.settings.data);
    const [position, setPosition] = useState(positions[0])
    console.log("buttons showed")
   
    const { open } = props;

    useEffect(() => { console.log("setting: =====> ", setting);  console.log("open: =====> ", open);  }, [])

    useEffect(() => {

        if (setting?.chatgpt_popup_position === "bottom-right") {
            setPosition(positions[0])

        } else if (setting?.chatgpt_popup_position === "bottom-left") {
            setPosition(positions[1])

        } else if (setting?.chatgpt_popup_position === "top-right") {
            setPosition(positions[2])

        } else if (setting?.chatgpt_popup_position === "top-left") {
            setPosition(positions[3])
        }

    }, [setting])

    const renderButton = () => {
 

        if (setting.user_types === "all") {
            return <button type="button"
                className="flex items-center justify-center w-16 h-16 bg-app-green rounded-full text-white"
                onClick={() => handleOpen('modal')}
            >
                {/* popup */}
                {setting?.logo ? <img src={setting?.logo} alt="Dall-e-2 Icon" /> : <svg width="24" height="24" viewBox="0 0 24 24" fill="none"
                    xmlns="http://www.w3.org/2000/svg">
                    <path
                        d="M17.8701 21.87C17.5601 21.87 17.2501 21.79 16.9701 21.62L12.9601 19.24C12.5401 19.23 12.1201 19.2 11.7201 19.14C11.4501 19.1 11.2201 18.92 11.1201 18.66C11.0201 18.4 11.0701 18.12 11.2501 17.91C11.9101 17.14 12.2501 16.22 12.2501 15.24C12.2501 12.82 10.1201 10.85 7.50008 10.85C6.52008 10.85 5.58007 11.12 4.79007 11.64C4.57007 11.78 4.30007 11.8 4.06007 11.69C3.83007 11.58 3.66008 11.36 3.63008 11.1C3.60008 10.82 3.58008 10.54 3.58008 10.25C3.58008 5.29 7.88008 1.26001 13.1601 1.26001C18.4401 1.26001 22.7401 5.29 22.7401 10.25C22.7401 12.97 21.4801 15.47 19.2601 17.18L19.6001 19.9C19.6801 20.58 19.3801 21.22 18.8101 21.59C18.5301 21.77 18.2001 21.87 17.8701 21.87ZM13.1501 17.73C13.2901 17.72 13.4301 17.76 13.5501 17.84L17.7401 20.33C17.8501 20.4 17.9401 20.37 18.0001 20.33C18.0501 20.3 18.1301 20.22 18.1101 20.08L17.7201 16.92C17.6901 16.64 17.8101 16.37 18.0301 16.21C20.0701 14.78 21.2401 12.6 21.2401 10.23C21.2401 6.09998 17.6201 2.73999 13.1601 2.73999C8.87008 2.73999 5.35007 5.86003 5.09007 9.78003C5.84007 9.49003 6.65008 9.33002 7.49008 9.33002C10.9401 9.33002 13.7401 11.97 13.7401 15.22C13.7501 16.1 13.5401 16.95 13.1501 17.73Z"
                        fill="white" />
                    <path
                        d="M4.57977 22.7501C4.31977 22.7501 4.06977 22.6801 3.83977 22.5301C3.38977 22.2401 3.14978 21.7401 3.20978 21.2101L3.40977 19.67C2.05977 18.57 1.25977 16.94 1.25977 15.23C1.25977 13.28 2.27978 11.4601 3.98978 10.3701C5.01978 9.70006 6.23977 9.34009 7.50977 9.34009C10.9598 9.34009 13.7598 11.98 13.7598 15.23C13.7598 16.55 13.2798 17.8501 12.3998 18.8801C11.2698 20.2501 9.57977 21.05 7.71977 21.11L5.27977 22.5601C5.05977 22.6901 4.81977 22.7501 4.57977 22.7501ZM7.49977 10.8401C6.51977 10.8401 5.57976 11.1101 4.78976 11.6301C3.50976 12.4501 2.74977 13.79 2.74977 15.23C2.74977 16.62 3.42978 17.8901 4.62978 18.7101C4.85978 18.8701 4.97977 19.14 4.94977 19.42L4.72977 21.1301L7.11977 19.7101C7.23977 19.6401 7.36977 19.6 7.49977 19.6C8.96977 19.6 10.3598 18.9701 11.2398 17.9001C11.8998 17.1201 12.2498 16.2 12.2498 15.22C12.2498 12.81 10.1198 10.8401 7.49977 10.8401Z"
                        fill="white" />
                </svg>}

            </button>
        } else if (setting.user_types === "members") {
     
            if (pansophy_data?.user_status == "1") {
                return <button type="button"
                    className="flex items-center justify-center w-16 h-16 bg-app-green rounded-full text-white"
                    onClick={() => handleOpen('modal')}
                >
                    {/* popup */}
                    {setting?.logo ? <img src={setting?.logo} alt="Dall-e-2 Icon" /> : <svg width="24" height="24" viewBox="0 0 24 24" fill="none"
                        xmlns="http://www.w3.org/2000/svg">
                        <path
                            d="M17.8701 21.87C17.5601 21.87 17.2501 21.79 16.9701 21.62L12.9601 19.24C12.5401 19.23 12.1201 19.2 11.7201 19.14C11.4501 19.1 11.2201 18.92 11.1201 18.66C11.0201 18.4 11.0701 18.12 11.2501 17.91C11.9101 17.14 12.2501 16.22 12.2501 15.24C12.2501 12.82 10.1201 10.85 7.50008 10.85C6.52008 10.85 5.58007 11.12 4.79007 11.64C4.57007 11.78 4.30007 11.8 4.06007 11.69C3.83007 11.58 3.66008 11.36 3.63008 11.1C3.60008 10.82 3.58008 10.54 3.58008 10.25C3.58008 5.29 7.88008 1.26001 13.1601 1.26001C18.4401 1.26001 22.7401 5.29 22.7401 10.25C22.7401 12.97 21.4801 15.47 19.2601 17.18L19.6001 19.9C19.6801 20.58 19.3801 21.22 18.8101 21.59C18.5301 21.77 18.2001 21.87 17.8701 21.87ZM13.1501 17.73C13.2901 17.72 13.4301 17.76 13.5501 17.84L17.7401 20.33C17.8501 20.4 17.9401 20.37 18.0001 20.33C18.0501 20.3 18.1301 20.22 18.1101 20.08L17.7201 16.92C17.6901 16.64 17.8101 16.37 18.0301 16.21C20.0701 14.78 21.2401 12.6 21.2401 10.23C21.2401 6.09998 17.6201 2.73999 13.1601 2.73999C8.87008 2.73999 5.35007 5.86003 5.09007 9.78003C5.84007 9.49003 6.65008 9.33002 7.49008 9.33002C10.9401 9.33002 13.7401 11.97 13.7401 15.22C13.7501 16.1 13.5401 16.95 13.1501 17.73Z"
                            fill="white" />
                        <path
                            d="M4.57977 22.7501C4.31977 22.7501 4.06977 22.6801 3.83977 22.5301C3.38977 22.2401 3.14978 21.7401 3.20978 21.2101L3.40977 19.67C2.05977 18.57 1.25977 16.94 1.25977 15.23C1.25977 13.28 2.27978 11.4601 3.98978 10.3701C5.01978 9.70006 6.23977 9.34009 7.50977 9.34009C10.9598 9.34009 13.7598 11.98 13.7598 15.23C13.7598 16.55 13.2798 17.8501 12.3998 18.8801C11.2698 20.2501 9.57977 21.05 7.71977 21.11L5.27977 22.5601C5.05977 22.6901 4.81977 22.7501 4.57977 22.7501ZM7.49977 10.8401C6.51977 10.8401 5.57976 11.1101 4.78976 11.6301C3.50976 12.4501 2.74977 13.79 2.74977 15.23C2.74977 16.62 3.42978 17.8901 4.62978 18.7101C4.85978 18.8701 4.97977 19.14 4.94977 19.42L4.72977 21.1301L7.11977 19.7101C7.23977 19.6401 7.36977 19.6 7.49977 19.6C8.96977 19.6 10.3598 18.9701 11.2398 17.9001C11.8998 17.1201 12.2498 16.2 12.2498 15.22C12.2498 12.81 10.1198 10.8401 7.49977 10.8401Z"
                            fill="white" />
                    </svg>}

                </button>
            }
        } else if (setting.user_types === "admins") {
            //   const isAdmin = true; // Replace this with your actual admin status
            if (pansophy_data?.loggedin_user_roles?.includes("administrator")) {
                return <button type="button"
                    className="flex items-center justify-center w-16 h-16 bg-app-green rounded-full text-white"
                    onClick={() => handleOpen('modal')}
                >
                    {/* popup */}
                    {setting?.logo  ? <img src={setting?.logo } alt="Dall-e-2 Icon" /> : <svg width="24" height="24" viewBox="0 0 24 24" fill="none"
                        xmlns="http://www.w3.org/2000/svg">
                        <path
                            d="M17.8701 21.87C17.5601 21.87 17.2501 21.79 16.9701 21.62L12.9601 19.24C12.5401 19.23 12.1201 19.2 11.7201 19.14C11.4501 19.1 11.2201 18.92 11.1201 18.66C11.0201 18.4 11.0701 18.12 11.2501 17.91C11.9101 17.14 12.2501 16.22 12.2501 15.24C12.2501 12.82 10.1201 10.85 7.50008 10.85C6.52008 10.85 5.58007 11.12 4.79007 11.64C4.57007 11.78 4.30007 11.8 4.06007 11.69C3.83007 11.58 3.66008 11.36 3.63008 11.1C3.60008 10.82 3.58008 10.54 3.58008 10.25C3.58008 5.29 7.88008 1.26001 13.1601 1.26001C18.4401 1.26001 22.7401 5.29 22.7401 10.25C22.7401 12.97 21.4801 15.47 19.2601 17.18L19.6001 19.9C19.6801 20.58 19.3801 21.22 18.8101 21.59C18.5301 21.77 18.2001 21.87 17.8701 21.87ZM13.1501 17.73C13.2901 17.72 13.4301 17.76 13.5501 17.84L17.7401 20.33C17.8501 20.4 17.9401 20.37 18.0001 20.33C18.0501 20.3 18.1301 20.22 18.1101 20.08L17.7201 16.92C17.6901 16.64 17.8101 16.37 18.0301 16.21C20.0701 14.78 21.2401 12.6 21.2401 10.23C21.2401 6.09998 17.6201 2.73999 13.1601 2.73999C8.87008 2.73999 5.35007 5.86003 5.09007 9.78003C5.84007 9.49003 6.65008 9.33002 7.49008 9.33002C10.9401 9.33002 13.7401 11.97 13.7401 15.22C13.7501 16.1 13.5401 16.95 13.1501 17.73Z"
                            fill="white" />
                        <path
                            d="M4.57977 22.7501C4.31977 22.7501 4.06977 22.6801 3.83977 22.5301C3.38977 22.2401 3.14978 21.7401 3.20978 21.2101L3.40977 19.67C2.05977 18.57 1.25977 16.94 1.25977 15.23C1.25977 13.28 2.27978 11.4601 3.98978 10.3701C5.01978 9.70006 6.23977 9.34009 7.50977 9.34009C10.9598 9.34009 13.7598 11.98 13.7598 15.23C13.7598 16.55 13.2798 17.8501 12.3998 18.8801C11.2698 20.2501 9.57977 21.05 7.71977 21.11L5.27977 22.5601C5.05977 22.6901 4.81977 22.7501 4.57977 22.7501ZM7.49977 10.8401C6.51977 10.8401 5.57976 11.1101 4.78976 11.6301C3.50976 12.4501 2.74977 13.79 2.74977 15.23C2.74977 16.62 3.42978 17.8901 4.62978 18.7101C4.85978 18.8701 4.97977 19.14 4.94977 19.42L4.72977 21.1301L7.11977 19.7101C7.23977 19.6401 7.36977 19.6 7.49977 19.6C8.96977 19.6 10.3598 18.9701 11.2398 17.9001C11.8998 17.1201 12.2498 16.2 12.2498 15.22C12.2498 12.81 10.1198 10.8401 7.49977 10.8401Z"
                            fill="white" />
                    </svg>}

                </button>
            }
        }

        return null; // Render nothing if the conditions are not met
    }


      const renderButtonAssistant = () => {
 

        if (setting.user_types === "all") {
            return <button type="button"
            className="flex items-center justify-center w-16 h-16 bg-app-green rounded-full text-white"
            onClick={() => handleOpen('chat')}
        >
            {setting?.logo  ? <img src={setting?.logo } alt="Dall-e-2 Icon" /> : <img src={illustration} alt="Dall-e-2 Icon" />}
        </button>
        } else if (setting.user_types === "members") {
            
            if (pansophy_data.user_status == "1") {
                return <button type="button"
                className="flex items-center justify-center w-16 h-16 bg-app-green rounded-full text-white"
                onClick={() => handleOpen('chat')}
            >
                {setting?.logo ? <img src={setting?.logo } alt="Dall-e-2 Icon" /> : <img src={illustration} alt="Dall-e-2 Icon" />}
            </button>
            }
        } else if (setting.user_types === "admins") {
            //   const isAdmin = true; // Replace this with your actual admin status
            if (pansophy_data?.loggedin_user_roles?.includes("administrator")) {
                return <button type="button"
                className="flex items-center justify-center w-16 h-16 bg-app-green rounded-full text-white"
                onClick={() => handleOpen('chat')}
            >
                {setting?.logo  ? <img src={setting?.logo } alt="Dall-e-2 Icon" /> : <img src={illustration} alt="Dall-e-2 Icon" />}
            </button>
            }
        }

        return null; // Render nothing if the conditions are not met
    }
    return (
        <div className={`fixed ${position} z-[99999]`}>

            <div className="flex items-center space-x-4">
                {!open &&
                    <>
                        {setting?.mode === "content" &&renderButton()
                              }
                        {setting?.mode === "assistant" && renderButtonAssistant()}
                    </>
                }
            </div>

        </div>
    );
}

export default AppButtons;