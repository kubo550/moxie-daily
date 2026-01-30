import {
  Phone,
  MessageSquare,
  Globe,
  AlertTriangle,
  Heart,
  Shield,
  Brain,
  Siren,
} from 'lucide-react';

type ResourceLink = {
  icon: typeof Phone;
  title: string;
  phone?: string;
  text?: string;
  website?: string;
  description: string;
};

type ResourceSection = {
  icon?: typeof Phone;
  title: string;
  resources: ResourceLink[];
};

const SUPPORT_RESOURCES: ResourceSection[] = [
  {
    icon: Brain,
    title: 'Suicide & Emotional Crisis',
    resources: [
      {
        icon: Phone,
        title: '988 Suicide & Crisis Lifeline',
        phone: '988',
        website: 'https://988lifeline.org',
        description:
          '24/7 support for emotional distress, suicidal thoughts, crisis situations',
      },
    ],
  },
  {
    icon: Siren,
    title: 'Emergency Situations',
    resources: [
      {
        icon: AlertTriangle,
        title: 'Emergency Services',
        phone: '911',
        description: 'For immediate danger or medical emergencies',
      },
    ],
  },
  {
    icon: MessageSquare,
    title: 'Crisis Text Support',
    resources: [
      {
        icon: MessageSquare,
        title: 'Crisis Text Line',
        text: 'Text HOME to 741741',
        website: 'https://www.crisistextline.org',
        description:
          'Free, confidential texting with trained crisis counselors',
      },
    ],
  },
  {
    icon: Heart,
    title: 'Addiction & Recovery Support',
    resources: [
      {
        icon: Phone,
        title: 'SAMHSA National Helpline',
        phone: '1-800-662-HELP (4357)',
        website: 'https://www.samhsa.gov/find-help/national-helpline',
        description: 'Treatment referrals for substance use & mental health',
      },
      {
        icon: Globe,
        title: 'Alcoholics Anonymous (AA)',
        website: 'https://www.aa.org',
        description: 'Find local meetings & support groups',
      },
      {
        icon: Globe,
        title: 'Narcotics Anonymous (NA)',
        website: 'https://www.na.org',
        description: 'Recovery support for drug addiction',
      },
      {
        icon: Phone,
        title: 'Never Use Alone Hotline',
        phone: '800-484-3731',
        website: 'https://neverusealoneinc.org',
        description: 'Life-saving resource for drug users',
      },
    ],
  },
  {
    icon: Heart,
    title: 'Mental Health & Emotional Support',
    resources: [
      {
        icon: Phone,
        title: 'NAMI Helpline',
        phone: '1-800-950-NAMI (6264)',
        website: 'https://www.nami.org',
        description: 'National Alliance on Mental Illness support',
      },
      {
        icon: Globe,
        title: 'Mental Health America',
        website: 'https://www.mhanational.org',
        description: 'Screening tools, resources, education',
      },
    ],
  },
  {
    icon: Shield,
    title: 'First Responders & Veterans',
    resources: [
      {
        icon: Shield,
        title: 'First Responder Support Network',
        website: 'https://www.frsn.org',
        description: 'Support for first responders',
      },
      {
        icon: Shield,
        title: 'Firefighter Behavioral Health Alliance',
        website: 'https://www.ffbha.org',
        description: 'Mental health support for firefighters',
      },
      {
        icon: Phone,
        title: 'Veterans Crisis Line',
        phone: '988 (press 1)',
        website: 'https://www.veteranscrisisline.net',
        description: 'Crisis support for veterans',
      },
    ],
  },
  {
    icon: Globe,
    title: 'International Support',
    resources: [
      {
        icon: Globe,
        title: 'Find A Helpline',
        website: 'https://findahelpline.com',
        description: 'Crisis lines by country worldwide',
      },
    ],
  },
];

export const ImmediateSupportPage = () => {
  return (
    <div className="min-h-screen bg-[#050608] pt-[60px] pb-[80px] relative">
      {/* Subtle vignette */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,rgba(0,0,0,0.4)_100%)] pointer-events-none" />

      <div className="max-w-4xl mx-auto px-4 py-8 relative z-10">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-semibold text-white mb-3">
            Immediate Support
          </h1>
          <p className="text-gray-300/80 text-sm md:text-base leading-[1.6]">
            You're not alone. Help is available 24/7.
          </p>
        </div>

        {/* Resources */}
        <div className="space-y-10">
          {SUPPORT_RESOURCES.map((section, idx) => {
            const isEmergency = section.title === 'Emergency Situations';

            return (
              <section key={idx} className="space-y-5">
                {/* Section Header */}
                <h2
                  className={`text-xl md:text-2xl font-semibold flex items-center gap-3 ${isEmergency ? 'text-[#FF6B6B]' : 'text-white'}`}
                >
                  <span>{section.title}</span>
                </h2>

                {/* Resource Cards */}
                <div className="space-y-3">
                  {section.resources.map((resource, resIdx) => (
                    <div
                      key={resIdx}
                      className="bg-[#0E1117] border border-white/[0.06] rounded-[20px] p-5 hover:border-white/[0.12] transition-colors"
                    >
                      <div className="flex items-start gap-3">
                        <div className="flex-shrink-0 mt-1">
                          <resource.icon
                            className={`h-5 w-5 ${isEmergency ? 'text-[#FF6B6B]' : 'text-white/60'}`}
                            strokeWidth={1.75}
                          />
                        </div>
                        <div className="flex-1 min-w-0">
                          <h3 className="text-white font-semibold text-base mb-3 text-left">
                            {resource.title}
                          </h3>

                          {/* Phone */}
                          {resource.phone && (
                            <a
                              href={`tel:${resource.phone.replace(/[^0-9]/g, '')}`}
                              className="flex items-center gap-2 text-[#4DA3FF] hover:text-[#6BB5FF] text-sm mb-2"
                            >
                              <Phone className="h-4 w-4" strokeWidth={1.75} />
                              <span className="font-medium">
                                {resource.phone}
                              </span>
                            </a>
                          )}
                          {/* Text */}
                          {resource.text && (
                            <div className="flex items-center gap-2 text-[#5FD6A5] text-sm mb-2">
                              <MessageSquare
                                className="h-4 w-4"
                                strokeWidth={1.75}
                              />
                              <span className="font-medium">
                                {resource.text}
                              </span>
                            </div>
                          )}

                          {/* Website */}
                          {resource.website && (
                            <a
                              href={resource.website}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="flex items-center gap-2 text-[#9BB0FF] hover:text-[#B3C4FF] text-sm mb-3"
                            >
                              <Globe className="h-4 w-4" strokeWidth={1.75} />
                              <span className="underline break-all">
                                {resource.website.replace('https://', '')}
                              </span>
                            </a>
                          )}

                          {/* Description */}
                          <p className="text-gray-300/80 text-sm leading-[1.6]">
                            {resource.description}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            );
          })}
        </div>

        {/* Footer Note */}
        <div className="mt-12 p-6 bg-[#0E1117] border border-[#FF6B6B]/20 rounded-[20px]">
          <p className="text-[#FF6B6B] text-sm text-center leading-[1.6]">
            <strong>
              If you or someone you know is in immediate danger, please call 911
              or go to the nearest emergency room.
            </strong>
          </p>
        </div>
      </div>
    </div>
  );
};
