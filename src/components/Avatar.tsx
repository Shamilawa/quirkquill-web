import React from 'react';
import BotAvatar from '../assets/robot_new.png';

interface IAvatarProps {
    showStatus: boolean;
    size?: string;
}

export const Avatar = ({ showStatus, size = '40px' }: IAvatarProps) => {
    return (
        <div
            style={{ width: size, height: size }}
            className="relative avatar rounded-full flex items-center justify-center text-sm shadow-sm"
        >
            {showStatus && (
                <div className="h-[10px] w-[10px] bg-green-600 z-40 absolute rounded-full bottom-0 right-0"></div>
            )}
            <img src={BotAvatar} alt="bot_avatar" className="shadow-sm rounded-full border-green-600" />
        </div>
    );
};
