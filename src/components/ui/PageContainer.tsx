import React from "react";

export const PageContainer = ({children}: {children: React.ReactNode}) => {
    return (
        <div className="max-w-[100vw] md:w-lg mx-auto w-[100vw] md:rounded-[15px] p-0 min-h-[calc(100vh-140px)] bg-white/10  shadow-[0_8px_32px_rgba(0,0,0,0.37)] backdrop-blur-[15px] backdrop-contrast-90 backdrop-brightness-110">
            {children}
        </div>
    );
}