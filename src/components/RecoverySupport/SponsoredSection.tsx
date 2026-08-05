import { APP_CONFIG } from '@/config/appConfig';
import { Phone, Users } from 'lucide-react';

export default function SponsoredSection({
  className,
}: {
  className?: string;
}) {
  const { meetingFinderUrl, sponsorContact } = APP_CONFIG.recoveryResources;
  const show = sponsorContact || meetingFinderUrl;
  return (
    <section className={!show ? 'hidden' : className}>
      {show && (
        <div className="space-y-3 mb-6">
          {sponsorContact && (
            <a
              href={`tel:${sponsorContact.phone}`}
              className="block bg-gradient-to-br from-teal-500/20 to-blue-500/20 border border-teal-400/30 rounded-xl p-4 transition-all active:scale-95"
            >
              <div className="flex items-start gap-3">
                <Phone className="w-5 h-5 text-teal-300 flex-shrink-0 mt-0.5" />
                <div>
                  <h2 className="font-semibold mb-1">{sponsorContact.label}</h2>
                  <p className="text-teal-200 text-sm">
                    {sponsorContact.phone}
                  </p>
                </div>
              </div>
            </a>
          )}

          {meetingFinderUrl && (
            <a
              href={meetingFinderUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="block bg-gradient-to-br from-teal-500/20 to-blue-500/20 border border-teal-400/30 rounded-xl p-4 transition-all active:scale-95"
            >
              <div className="flex items-start gap-3">
                <Users className="w-5 h-5 text-teal-300 flex-shrink-0 mt-0.5" />
                <div>
                  <h2 className="font-semibold mb-1">
                    Find a meeting near you
                  </h2>
                  <p className="text-teal-200 text-sm">Local meeting finder</p>
                </div>
              </div>
            </a>
          )}
        </div>
      )}
    </section>
  );
}
