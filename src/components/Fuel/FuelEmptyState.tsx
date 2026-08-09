import { FaVideoSlash } from 'react-icons/fa';

export type FuelEmptyStateProps = {
  message?: string;
};

export function FuelEmptyState({ message }: FuelEmptyStateProps) {
  return (
    <div className="h-full w-full bg-black flex flex-col items-center justify-center px-6 text-center">
      <FaVideoSlash className="w-12 h-12 text-gray-600 mb-4" />
      <h2 className="text-xl font-semibold text-white mb-3">No clips yet</h2>
      <p className="text-gray-400 text-sm max-w-xs">
        {message ||
          'Clips go in public/video/ and get registered in src/config/fuelVideos.ts'}
      </p>
    </div>
  );
}
