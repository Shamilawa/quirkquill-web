import React, { useRef, useState } from 'react';
import { ISingleMessageType, USER_ROLE } from '../App';
import EmtpyStateImage from '../assets/undraw_Typing_re_d4sq.png';
import ReactMarkdown from 'react-markdown';
import rehypeAttrs from 'rehype-attr';
import remarkGfm from 'remark-gfm';
import { Avatar } from './Avatar';
import { useSpring, animated } from 'react-spring';
import './MessageFeed.scss';

interface IMessageFeedProps {
    messageHistory: ISingleMessageType[];
}

export const MessageFeed = ({ messageHistory }: IMessageFeedProps) => {
    const messageFeedRef = useRef<any>();

    const springProps = useSpring({
        from: { opacity: 0, transform: 'translateY(100%)' },
        to: { opacity: 1, transform: 'translateY(0%)' },
    });

    return (
        <>
            {/* message feed */}
            {messageHistory.length === 0 ? (
                <div className="flex flex-col justify-center items-center sm:max-w-[95%] flex-grow">
                    <img width={300} src={EmtpyStateImage} />
                    <div className="flex items-center flex-col">
                        <h2 className="text-[18px] text-gray-900 font-[400] antialiased text-center">
                            Hi there... What you wanna talk today?
                        </h2>
                        <p className="text-sm text-gray-700 antialiased max-w-[300px] text-center">
                            Just send a chat to start conversation and let's rock and roll
                        </p>
                    </div>
                </div>
            ) : (
                <div
                    ref={messageFeedRef}
                    className="chat-body overflow-y-scroll max-w-[70%] px-12 min-w-[70%] sm:max-w-[100%] sm:min-w-[100%] sm:px-3 flex-grow"
                >
                    {messageHistory.length > 0 &&
                        messageHistory.map((userInput: ISingleMessageType, index: number) => {
                            return (
                                <div className="flex flex-col py-2" key={index}>
                                    {userInput.userType === USER_ROLE.model ? (
                                        <div className="flex items-start gap-x-2">
                                            <Avatar showStatus={false} size="22px" />
                                            <div className="slide-in-blurred-left bot_messages w-max max-w-[90%] px-3 py-2 self-start text-[#0b2f5b] font-[400] text-left antialiased text-[14px] bg-[#e7eaed] rounded-[0px_10px_10px_10px]">
                                                <ReactMarkdown
                                                    rehypePlugins={[rehypeAttrs]}
                                                    remarkPlugins={[remarkGfm]}
                                                    children={userInput.message}
                                                    className="remark flex flex-col gap-y-2"
                                                />
                                            </div>
                                        </div>
                                    ) : (
                                        <div className="slide-in-blurred-bottom  user_messages w-max max-w-[90%] px-3 py-2 self-end text-right font-[400] antialiased text-[14px] text-gray-300 bg-[#ed4f5c] rounded-[10px_10px_0px_10px]">
                                            <ReactMarkdown
                                                rehypePlugins={[rehypeAttrs]}
                                                remarkPlugins={[remarkGfm]}
                                                children={userInput.message}
                                                className="remark flex flex-col gap-y-2"
                                            />
                                        </div>
                                    )}
                                </div>
                            );
                        })}
                </div>
            )}
        </>
    );
};
