import {getCurrentYear} from "@/lib/utils.ts";

export const AboutMePage = () => {
    return (
        <div className="flex flex-col items-center max-w-md text-white min-h-screen mt-40">

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

            <footer className="w-full bottom-[90px] absolute p-4 text-center text-gray-500">
                <p>© {getCurrentYear()} MoxieImpact. All Rights Reserved.</p>
            </footer>
        </div>
    );
};

