import { getCurrentYear } from '@/lib/utils.ts';

type AboutMeElement = {
  title: string;
  content: string;
  bulletPoints: string[];
};

const aboutMeElements: AboutMeElement[] = [
  {
    title: 'Our Mission',
    content:
      'To inspire bold reflection, intentional living, and personal growth through clothing and tools that break the stigma around mental health, addiction, and identity struggles.',
    bulletPoints: [],
  },
  {
    title: 'Our Vision',
    content:
      'To become a global movement that helps people own their story, rediscover their purpose, and unlock the resilience within. We envision a world where healing is celebrated, not hidden — and where every piece of clothing becomes a bridge to strength, connection, and transformation.',
    bulletPoints: [],
  },
  {
    title: 'Our Purpose',
    content:
      'MOXIE was born from real pain and real passion. From overcoming addiction, mental illness, and a broken past — to helping others do the same. Our purpose is to serve as a daily reminder that:',
    bulletPoints: [
      'You are not alone.',
      'Growth is possible.',
      'The journey is worth it.',
    ],
  },
  {
    title: 'What We Believe',
    content: 'At MOXIE, we believe that:',
    bulletPoints: [
      'Mental health is just as important as physical health.',
      'Addiction is not a weakness — it’s a battle that requires strength and support.',
      'Faith, mindset, and community are powerful tools for transformation.',
      'Every human being has the ability to rise, refocus, and take action.',
    ],
  },
  {
    title: 'Our Approach',
    content:
      'MOXIE isn’t just a clothing brand — it’s a personal development platform. Every product we create has a purpose beyond style. With updatable QR codes and NFC technology, we deliver motivation, support, and meaning to your everyday life.\n\n Our products include:',
    bulletPoints: [
      'Motivational QR Code Clothing',
      'NFC Wristbands with daily encouragement',
      'The Moxie Journal & Moxie Playbook',
      'Portable saunas & ice baths for physical & mental resilience',
      'The MOXIE App for daily growth, community, and mentorship',
    ],
  },
  {
    title: 'Who It’s For',
    content: 'MOXIE is for anyone who’s ever battled something alone.',
    bulletPoints: [
      'The athlete struggling with pressure',
      'The teen searching for identity',
      'The addict finding their way back',
      'The creator healing in silence',
      'The leader who needs to refill their own cup',
    ],
  },
  {
    title: 'Our Founder’s Story',
    content:
      'Hi my name is Jake Young. I’m not famous. I’m not a pro athlete and I’m not a celebrity. I’m just a small-town guy who went through a storm—and decided to build something to help others. If MOXIE could help me, I know it can help millions.\n\n I’m not here to say ‘poor me.’ I’m here to say: me too. I know what it feels like to be broken, to feel invisible, not good enough, to carry trauma and keep going. MOXIE wasn’t born in a boardroom—it was built from rock bottom. I left home at 15. I lost my brother to mental illness and addiction. I battled addiction myself and at one point I had nothing but a garbage bag half full of dirty clothes. But I found something that helped me rise—and I built MOXIE so others could do the same.',
    bulletPoints: [],
  },
];

const messages = [
  'Join the Movement',
  'Wear your strength.',
  'Speak your truth.',
  'Own your story.',
  'This is MOXIE.',
];

const renderContent = (content: string) => {
  return content.split('\n\n').map((paragraph, index) => (
    <p key={index} className="text-sm text-gray-200 text-justify mb-3">
      {paragraph}
    </p>
  ));
};

export const AboutMePage = () => {
  return (
    <div className="md:rounded-[15px] shadow-[0_8px_32px_rgba(0,0,0,0.37)] backdrop-blur-[15px] backdrop-contrast-90 backdrop-brightness-110 my-8">
      <div className="min-h-[calc(100vh-140px)] px-5 text-white max-w-md">
        <h1 className="text-2xl md:pt-8 font-bold mb-4 text-left pt-3 md:py-4 text-white">
          About Moxie
        </h1>
        <div className="w-full max-w-4xl text-justify h-[calc(100vh-270px)] overflow-y-auto pr-2 custom-scrollbar">
          <section className="mb-8">
            <p className="text-lg leading-relaxed">
              A Bridge of Support. A Badge of Strength. A Daily Reminder That
              You Matter.
            </p>
          </section>
          <section>
            <h2 className="text-2xl font-semibold mb-4">
              Watch How Moxie Works
            </h2>
            <iframe
              className="w-full"
              src="https://player.vimeo.com/video/1072654894?badge=0&amp;autopause=0&amp;player_id=0&amp;app_id=58479"
              allow="autoplay; fullscreen; picture-in-picture; clipboard-write; encrypted-media"
              title="Moxie"
            ></iframe>
          </section>
          <section>
            <div className="grid divide-y divide-neutral-200 max-w-xl mx-auto mt-8">
              {aboutMeElements.map((aboutMeElement) => (
                <div className="py-5" key={aboutMeElement.title}>
                  <details className="group">
                    <summary className="flex justify-between items-center font-medium cursor-pointer list-none text-l">
                      <span className="text-white font-semibold">
                        {aboutMeElement.title}
                      </span>
                      <span className="transition group-open:rotate-180">
                        <svg
                          fill="none"
                          height="24"
                          shapeRendering="geometricPrecision"
                          stroke="currentColor"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="1.5"
                          viewBox="0 0 24 24"
                          width="24"
                        >
                          <path d="M6 9l6 6 6-6"></path>
                        </svg>
                      </span>
                    </summary>
                    <div className="text-gray-200 mt-3 group-open:animate-fadeIn">
                      {renderContent(aboutMeElement.content)}
                    </div>
                    <div>
                      {aboutMeElement.bulletPoints.length > 0 && (
                        <ul className="list-disc pl-5 mt-2 text-sm text-gray-200">
                          {aboutMeElement.bulletPoints.map((point, index) => (
                            <li key={index}>{point}</li>
                          ))}
                        </ul>
                      )}
                    </div>
                  </details>
                </div>
              ))}
            </div>
          </section>
          <section className="max-w-2xl mx-auto flex flex-col items-center">
            {messages.map((message, index) => (
              <p
                key={index}
                className={`
              text-l font-medium tracking-wide py-2
              ${index === 0 ? 'text-l font-bold text-white mb-4' : 'text-white'}
              ${index === messages.length - 1 ? 'mt-2 font-bold text-white' : ''}
            `}
              >
                {message}
              </p>
            ))}
          </section>
        </div>
        <footer className="w-full mt-2 p-3 text-center ">
          <p>© {getCurrentYear()} MoxieImpact. All Rights Reserved.</p>
        </footer>
      </div>
    </div>
  );
};
