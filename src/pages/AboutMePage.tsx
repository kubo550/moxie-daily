import {getCurrentYear} from "@/lib/utils.ts";
import {PageContainer} from "@/components/ui/PageContainer.tsx";

export const AboutMePage = () => {
    return (
        <PageContainer>
            <div className="px-5 text-white">
                <h1 className="text-2xl pt-10 font-bold mb-6 text-left py-4" color={"#222"}>About Moxie</h1>

                <div className="w-full max-w-4xl text-justify">
                    <section className="mb-8">
                        <p className="text-lg leading-relaxed">
                            Moxie exists to empower athletes to conquer their toughest opponent—their own minds. We
                            believe true strength is built through mental resilience.
                        </p>
                    </section>

                    <section className="my-18">
                        <h2 className="text-2xl font-semibold mb-4">Watch How Moxie Works</h2>
                        <div className="max-w-full">
                            <iframe className="w-full h-64" src="https://www.youtube.com/embed/"
                                    title="YouTube video player" frameBorder="0"
                                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                                    referrerPolicy="strict-origin-when-cross-origin" allowFullScreen></iframe>
                        </div>
                    </section>
                </div>

                <footer className="w-full p-4 text-center">
                    <p>© {getCurrentYear()} MoxieImpact. All Rights Reserved.</p>
                </footer>
            </div>
        </PageContainer>
    );
};

