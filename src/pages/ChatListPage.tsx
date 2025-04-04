import {ChatList} from "@/components/ChatList.tsx";

export const ChatListPage = () => {
    return (
        <div className="max-w-[100vw] md:w-lg mx-auto w-[100vw] mt-[40px] md:rounded-[15px] p-0 min-h-[calc(100vh-220px)] bg-white/10  shadow-[0_8px_32px_rgba(0,0,0,0.37)] backdrop-blur-[15px] backdrop-contrast-90 backdrop-brightness-110">
            <ChatList />
        </div>
    );
}