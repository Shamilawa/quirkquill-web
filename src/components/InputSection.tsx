import React from 'react';
import { ISingleMessageType, USER_ROLE } from '../App';
import classNames from 'classnames';
import RobotImg from '../assets/robot_new.png';
import './InputSection.scss';

interface IInputSectionProps {
    userInput: ISingleMessageType | undefined;
    setUserInput: Function;
    isLoading: boolean;
    handleSubmit: any;
}

export const InputSection = ({ userInput, setUserInput, isLoading, handleSubmit }: IInputSectionProps) => {
    return (
        <div>
            {isLoading && (
                <div className="absolute bottom-[70px] left-[20px] slide-in-blurred-bottom">
                    <img width={40} src={RobotImg} />
                    <div className="jello-horizontal absolute top-[-20px] left-[40px] flex gap-x-1">
                        <i className="ri-questionnaire-fill text-[#ed4f5c] text-[25px]" />
                    </div>
                </div>
            )}
            <div className="bg-[#e7eaed] rounded-md focus:outline-none flex relative w-[95vw] mb-4 py-2 justify-between gap-x-2 min-h-[64px]">
                <textarea
                    disabled={isLoading}
                    value={userInput?.message}
                    onChange={e => setUserInput({ userType: USER_ROLE.user, message: e.target.value })}
                    className="bg-[#e7eaed] focus:outline-none py-2 w-full px-4 text-sm"
                    placeholder="Type your message"
                    rows={1}
                    draggable={'false'}
                />
                {userInput?.message && (
                    <div
                        onClick={handleSubmit}
                        className={classNames(
                            'items-center justify-center self-center pl-1 h-full w-[60px] transition-all bg-[#ed4f5c] hover:bg-blue-700 text-white rounded-md mr-2'
                        )}
                    >
                        <i className="ri-send-plane-2-line flex items-center justify-center h-12" />
                    </div>
                )}
            </div>
        </div>
    );
};
