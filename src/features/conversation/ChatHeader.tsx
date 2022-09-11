import { AiOutlineArrowLeft } from "react-icons/ai";

import { TwButton } from "components";

const DEFAULT_PROFILE_IMAGE = `https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRony1PUEAFW_rKWuriSeChlMZK05SNCoyhblOQpH5tBq1m5C_HHsKEJvveSdHRdSj_zJ4&usqp=CAU`;

const ChatHeader = () => {
  const handleBackBtn = () => {
    // setCurrentChat(null);
  };

  return (
    <header className="border-b border-muted-light/10 dark:border-muted-dark/10 w-full p-4  mb-auto bg-white dark:bg-bgmain-dark duration-300 flex gap-2">
      <TwButton
        variant="transparent"
        onClick={handleBackBtn}
        className="md:hidden px-4"
      >
        <AiOutlineArrowLeft className="text-xl" />
      </TwButton>
      <div className="flex items-center gap-4">
        <div className="relative bg-transparent h-16 w-16">
          <div className="bg-green-500 p-2 rounded-full absolute right-1 bottom-0"></div>
          <img src={DEFAULT_PROFILE_IMAGE} className="w-full rounded-full" />
        </div>
        <div className="flex flex-col gap-0">
          <h2 className="text-xl text-black dark:text-white">Ali</h2>
          <p className="text-sm text-muted-light dark:text-muted-dark">
            online
          </p>
        </div>
      </div>
    </header>
  );
};

export default ChatHeader;