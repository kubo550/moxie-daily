import CollapsibleAboutSection from '@/components/AboutMe/CollapsibleAboutSection';
import HeaderSection from '@/components/AboutMe/HeaderSection';
import MessagesSection from '@/components/AboutMe/MessagesSection';
import VideoSection from '@/components/AboutMe/VideoSection';
import PageFooter from '@/components/Footer';

export const AboutMePage = () => {
  return (
    <main className="min-h-full flex flex-1 items-center justify-center md:rounded-[15px] shadow-[0_8px_32px_rgba(0,0,0,0.37)] backdrop-blur-[15px] backdrop-contrast-90 backdrop-brightness-110">
      <section className="max-w-md text-white p-2 text-justify flex flex-col gap-10">
        <HeaderSection className="" />
        <VideoSection className="" />
        <CollapsibleAboutSection className="" />
        <MessagesSection className="" />
        <PageFooter />
      </section>
    </main>
  );
};
