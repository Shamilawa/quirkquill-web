import { useState } from 'react';
import './App.scss';
import Drawer from 'react-modern-drawer';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeAttrs from 'rehype-attr';
import 'react-modern-drawer/dist/index.css';
import 'remixicon/fonts/remixicon.css';
import { MessageFeed } from './components/MessageFeed';
import { InputSection } from './components/InputSection';
import { Avatar } from './components/Avatar';
import RobotImg from './assets/robot_new.png';

export enum USER_ROLE {
    model = 'model',
    user = 'user',
}

export interface ISingleMessageType {
    userType: USER_ROLE;
    message: string;
}

function App() {
    const [userInput, setUserInput] = useState<ISingleMessageType>();
    const [messageHistory, setMessageHistory] = useState<ISingleMessageType[]>([
        // { userType: USER_ROLE.user, message: 'Hi there' },
        // { userType: USER_ROLE.model, message: 'How can I help you?' },
        // { userType: USER_ROLE.user, message: 'List Five games for me' },
        // { userType: USER_ROLE.model, message: 'okay, He five games...' },
    ]);
    const [payloadMessageHistory, setPayLoadMessageHistory] = useState<ISingleMessageType[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [isOpen, setIsOpen] = useState(false);

    const [isGrammarErrors, setIsGrammarErrors] = useState<boolean>(false);
    const [grammerError, setGrammerError] = useState<string | undefined>();

    const toggleDrawer = () => {
        setIsOpen(prevState => !prevState);
    };

    const handleSubmit = async () => {
        setMessageHistory([...messageHistory, userInput as ISingleMessageType]);
        setIsLoading(true);
        setUserInput({ userType: USER_ROLE.user, message: '' });
        try {
            const response = await fetch('http://localhost:8000/prompt', {
                headers: {
                    'Content-Type': 'application/json',
                },
                method: 'POST',
                body: JSON.stringify({
                    userInput: userInput,
                    messageHistory: messageHistory,
                }),
            });

            const json = await response.json();

            // setMessageHistory([...(messageHistory as ISingleMessageType[]), json as ISingleMessageType]);
            setMessageHistory(prevMsg => {
                return [...prevMsg, json as ISingleMessageType];
            });
            // setPayLoadMessageHistory([...messageHistory, userInput, json]);
            setIsGrammarErrors(json.grammarCheck.isGrammarErrors);
            setGrammerError(json.grammarCheck.errorDescription);
            setIsLoading(false);

            if (json.grammarCheck.isGrammarErrors) {
                setIsOpen(true);
            }
        } catch (error) {
            console.log(error);
            setIsLoading(false);
        }
    };

    return (
        <div>
            {/* chat section */}
            <div className="w-full h-[screen] sm:h-screen shadow-lg flex flex-col items-center gap-y-8 sm:gap-y-4">
                {/* header part */}
                <div className="border-b w-full flex items-center justify-center py-3 shadow-sm">
                    <div className="flex justify-between items-center w-full sm:max-w-[95%]">
                        <p className="text-[18px] font-[600] text-[#0b2f5b] font-poppins">QuirkQuill</p>
                        <Avatar showStatus />
                    </div>
                </div>

                <MessageFeed messageHistory={messageHistory} />
                <InputSection
                    userInput={userInput}
                    setUserInput={setUserInput}
                    isLoading={isLoading}
                    handleSubmit={handleSubmit}
                />
            </div>

            {/* grammar error section */}
            {isGrammarErrors && (
                <Drawer
                    open={isOpen}
                    onClose={toggleDrawer}
                    direction="bottom"
                    style={{ borderRadius: '15px 15px 0px 0px', height: 'fit-content' }}
                >
                    <div className="text-left px-4 text-[16px] py-5 flex flex-col gap-y-4">
                        <div className="border-b pb-1 flex flex-col gap-y-1">
                            <p className="text-red-500 font-[700] text-[20px]">Opps... Grammar mistake!</p>
                            <p className="text-sm text-gray-500">
                                We found a grammatical error in your last response. Please review them and continue
                            </p>
                        </div>
                        <ReactMarkdown
                            rehypePlugins={[rehypeAttrs]}
                            remarkPlugins={[remarkGfm]}
                            className="remark flex flex-col gap-y-2 bg-blue-100 px-2 py-2 rounded text-sm"
                            children={grammerError as string}
                        />
                    </div>
                </Drawer>
            )}
        </div>
    );
}

export default App;
