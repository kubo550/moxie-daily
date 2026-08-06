import CollapsibleAboutSection from '@/components/AboutMe/CollapsibleAboutSection';
import MessagesSection from '@/components/AboutMe/MessagesSection';
import VideoSection from '@/components/AboutMe/VideoSection';
import HeaderSection from '@/components/Common/HeaderSection';
import PageFooter from '@/components/Footer';

export const AboutMePage = () => {
  return (
    <main className="flex items-center justify-center">
      <section className="max-w-md text-white p-2 text-justify flex flex-col gap-10">
        <HeaderSection
          title="About Moxie"
          desc="A Bridge of Support. A Badge of Strength. A Daily Reminder That You Matter."
        />
        <VideoSection className="" />
        <CollapsibleAboutSection className="" />
        <MessagesSection className="" />
        <PageFooter />
      </section>
    </main>
  );
};
