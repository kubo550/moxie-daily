import {getCurrentYear} from "@/lib/utils.ts";

export const AboutMePage = () => {
    return (
        <div className="flex flex-col items-center max-w-md text-white min-h-[calc(100vh-260px)] bg-white/10 rounded-[15px] p-[20px] shadow-[0_8px_32px_rgba(0,0,0,0.37)] backdrop-blur-[15px] backdrop-contrast-90 backdrop-brightness-110 top-0">

            <div className="w-full max-w-4xl px-4 py-8 text-center">
                <section className="mb-8">
                    <p className="text-lg leading-relaxed">
                        Moxie exists to empower athletes to conquer their toughest opponent—their own minds. We believe true strength is built through mental resilience.
                    </p>
                </section>

                <section className="mb-8">
                    <h2 className="text-2xl font-semibold mb-4">Watch How Moxie Works</h2>
                    <div className="max-w-full">
                        <iframe className="w-full h-64" src="https://www.youtube.com/embed/" title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerPolicy="strict-origin-when-cross-origin" allowFullScreen></iframe>
                    </div>
                </section>
            </div>

            <footer className="w-full p-4 text-center text-gray-500">
                <p>© {getCurrentYear()} MoxieImpact. All Rights Reserved.</p>
            </footer>
        </div>
    );
};

