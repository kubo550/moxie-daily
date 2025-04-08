import {getCurrentYear} from "@/lib/utils.ts";

export const AboutMePage = () => {
    return (
        <div className="md:rounded-[15px] shadow-[0_8px_32px_rgba(0,0,0,0.37)] backdrop-blur-[15px] backdrop-contrast-90 backdrop-brightness-110">
            <div className="px-5 text-white max-w-md">
                <h1 className="text-2xl md:pt-10 font-bold mb-6 text-left md:py-4" color={"#222"}>About Moxie</h1>

                <div className="w-full max-w-4xl text-justify">
                    <section className="mb-8">
                        <p className="text-lg leading-relaxed">
                            Moxie exists to empower athletes to conquer their toughest opponent—their own minds. We
                            believe true strength is built through mental resilience.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-semibold mb-4">Watch How Moxie Works</h2>

                        <iframe
                            className="w-full"
                            src="https://player.vimeo.com/video/1072654894?badge=0&amp;autopause=0&amp;player_id=0&amp;app_id=58479"
                            frameBorder="0"
                            allow="autoplay; fullscreen; picture-in-picture; clipboard-write; encrypted-media"
                            title="Moxie"></iframe>
                    </section>
                </div>

                <footer className="w-full p-10  text-center">
                    <p>© {getCurrentYear()} MoxieImpact. All Rights Reserved.</p>
                </footer>
            </div>
        </div>
    );
};

