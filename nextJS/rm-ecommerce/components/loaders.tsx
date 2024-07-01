// Default Loader component
export default function DefaultLoader() {
  return (
    <div className="flex items-center justify-center h-screen">
      <div className="relative flex flex-col items-center">
        {/* Spinner */}
        <div className="h-24 w-24 rounded-full border-8 border-gray-300 border-t-8 border-t-teal-500 animate-spin mb-4"></div>
        {/* Text */}
        <p className="text-gray-400">Loading...</p>
      </div>
    </div>
  );
};

// Submission Loader component
export const SubmissionLoader = () => (
  <div className="fixed top-0 left-0 z-50 w-full h-full flex items-center justify-center bg-neutral-300/25">
    <div className="relative flex flex-col items-center bg-white p-8 rounded-lg">
      {/* Spinner */}
      <div className="h-24 w-24 rounded-full border-8 border-gray-300 border-t-8 border-t-teal-500 animate-spin mb-4"></div>
      {/* Text */}
      <p className="text-gray-600">Submiting...</p>
    </div>
  </div>
);
