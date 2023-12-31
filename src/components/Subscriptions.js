import React from 'react'
import {__} from '@wordpress/i18n'

const Subscriptions = () => {
    return (
        <div className="my-10">
            <div className="space-y-10">
                <p className="text-sm text-text-300">You need an API key for this website in order to access the
                    disabled tabs. <a href="#" className="text-primary hover:text-primary hover:underline">Click
                        Here</a> to get API key.</p>


                <div className="flex flex-wrap lg:flex-nowrap items-center p-6 bg-app-blackish border border-app-border rounded-lg">

                    <div className="flex items-center space-x-4">
                        <div className="flex items-center justify-center w-[56px] h-[56px] bg-iconBlue rounded-full">
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M22 9.25H2C1.59 9.25 1.25 8.91 1.25 8.5C1.25 8.09 1.59 7.75 2 7.75H22C22.41 7.75 22.75 8.09 22.75 8.5C22.75 8.91 22.41 9.25 22 9.25Z" fill="white"/>
                                <path d="M8 17.25H6C5.59 17.25 5.25 16.91 5.25 16.5C5.25 16.09 5.59 15.75 6 15.75H8C8.41 15.75 8.75 16.09 8.75 16.5C8.75 16.91 8.41 17.25 8 17.25Z" fill="white"/>
                                <path d="M14.5 17.25H10.5C10.09 17.25 9.75 16.91 9.75 16.5C9.75 16.09 10.09 15.75 10.5 15.75H14.5C14.91 15.75 15.25 16.09 15.25 16.5C15.25 16.91 14.91 17.25 14.5 17.25Z" fill="white"/>
                                <path d="M17.56 21.25H6.44C2.46 21.25 1.25 20.05 1.25 16.11V7.89C1.25 3.95 2.46 2.75 6.44 2.75H17.55C21.53 2.75 22.74 3.95 22.74 7.89V16.1C22.75 20.05 21.54 21.25 17.56 21.25ZM6.44 4.25C3.3 4.25 2.75 4.79 2.75 7.89V16.1C2.75 19.2 3.3 19.74 6.44 19.74H17.55C20.69 19.74 21.24 19.2 21.24 16.1V7.89C21.24 4.79 20.69 4.25 17.55 4.25H6.44Z" fill="white"/>
                            </svg>
                        </div>

                        <div className="flex flex-col space-y-1">
                            <span className="text-xs text-text-300">{__('Subscription Status', 'pansophy')}</span>
                            <span className="text-xl text-white">{__('Expiring in 2 days', 'pansophy')}</span>
                        </div>

                    </div>

                    <button type="button" className="flex items-center justify-center mt-4 w-full lg:w-auto lg:mt-0 lg:ml-auto py-4 px-6 bg-app-blackish border border-app-border rounded-lg text-sm text-white hover:bg-app-black/80">
                        {__('Renew Subscription', 'pansophy')}
                    </button>

                </div>

            </div>
        </div>
    );
}

export default Subscriptions;