
const SkeletonCard = () => {
  return (
    <div className="animate-pulse bg-white rounded-xl shadow p-4">
      <div className="h-48 bg-gray-200 rounded-md mb-4" />
      <div className="space-y-2">
        <div className="h-4 bg-gray-200 rounded w-3/4" />
        <div className="h-3 bg-gray-200 rounded w-1/2" />
        <div className="h-3 bg-gray-200 rounded w-2/3" />
        <div className="h-10 bg-gray-200 rounded-md mt-3" />
      </div>
    </div>
  );
};

export default SkeletonCard;
