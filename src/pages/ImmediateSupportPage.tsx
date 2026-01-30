import { Phone, MessageSquare, Globe, AlertTriangle, Heart, Shield } from 'lucide-react';

type ResourceLink = {
  icon: typeof Phone;
  title: string;
  phone?: string;
  text?: string;
  website?: string;
  description: string;
};

type ResourceSection = {
  emoji: string;
  title: string;
  resources: ResourceLink[];
};

const SUPPORT_RESOURCES: ResourceSection[] = [
  {
    emoji: '🧠',
    title: 'Suicide & Emotional Crisis',
    resources: [
      {
        icon: Phone,
        title: '988 Suicide & Crisis Lifeline',
        phone: '988',
        website: 'https://988lifeline.org',
        description: '24/7 support for emotional distress, suicidal thoughts, crisis situations',
      },
    ],
  },
  {
    emoji: '🚨',
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
    emoji: '💬',
    title: 'Crisis Text Support',
    resources: [
      {
        icon: MessageSquare,
        title: 'Crisis Text Line',
        text: 'Text HOME to 741741',
        website: 'https://www.crisistextline.org',
        description: 'Free, confidential texting with trained crisis counselors',
      },
    ],
  },
  {
    emoji: '🧩',
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
    emoji: '❤️',
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
    emoji: '👮',
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
    emoji: '🌍',
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
    <div className="min-h-screen bg-gradient-to-b from-black via-gray-900 to-black pt-[60px] pb-[80px]">
      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-3">
            Immediate Support
          </h1>
          <p className="text-gray-300 text-sm md:text-base">
            You're not alone. Help is available 24/7.
          </p>
        </div>

        {/* Resources */}
        <div className="space-y-8">
          {SUPPORT_RESOURCES.map((section, idx) => (
            <section key={idx} className="space-y-4">
              {/* Section Header */}
              <h2 className="text-xl md:text-2xl font-semibold text-white flex items-center gap-2">
                <span>{section.emoji}</span>
                <span>{section.title}</span>
              </h2>

              {/* Resource Cards */}
              <div className="space-y-3">
                {section.resources.map((resource, resIdx) => (
                  <div
                    key={resIdx}
                    className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-lg p-4 hover:bg-white/10 transition-colors"
                  >
                    <div className="flex items-start gap-3">
                      <div className="flex-shrink-0 mt-1">
                        <resource.icon className="h-5 w-5 text-blue-400" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="text-white font-semibold text-base mb-2">
                          {resource.title}
                        </h3>

                        {/* Phone */}
                        {resource.phone && (
                          <a
                            href={`tel:${resource.phone.replace(/[^0-9]/g, '')}`}
                            className="flex items-center gap-2 text-blue-400 hover:text-blue-300 text-sm mb-1"
                          >
                            <Phone className="h-4 w-4" />
                            <span className="font-medium">{resource.phone}</span>
                          </a>
                        )}

                        {/* Text */}
                        {resource.text && (
                          <div className="flex items-center gap-2 text-green-400 text-sm mb-1">
                            <MessageSquare className="h-4 w-4" />
                            <span className="font-medium">{resource.text}</span>
                          </div>
                        )}

                        {/* Website */}
                        {resource.website && (
                          <a
                            href={resource.website}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-2 text-cyan-400 hover:text-cyan-300 text-sm mb-2"
                          >
                            <Globe className="h-4 w-4" />
                            <span className="underline break-all">
                              {resource.website.replace('https://', '')}
                            </span>
                          </a>
                        )}

                        {/* Description */}
                        <p className="text-gray-300 text-sm leading-relaxed">
                          {resource.description}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          ))}
        </div>

        {/* Footer Note */}
        <div className="mt-12 p-6 bg-red-500/10 border border-red-500/20 rounded-lg">
          <p className="text-red-200 text-sm text-center">
            <strong>If you or someone you know is in immediate danger, please call 911 or go to the nearest emergency room.</strong>
          </p>
        </div>
      </div>
    </div>
  );
};
