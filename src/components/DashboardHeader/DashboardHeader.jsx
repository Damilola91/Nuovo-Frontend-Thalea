"use client";

const DashboardHeader = ({ title, onRefresh }) => {
  return (
    <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2 my-4">
      <h1 className="text-xl sm:text-2xl font-bold">{title}</h1>
      {onRefresh && (
        <button
          onClick={onRefresh}
          className="bg-blue-500 text-white px-3 py-2 rounded hover:bg-blue-600 text-sm sm:text-base"
        >
          Aggiorna
        </button>
      )}
    </div>
  );
};

export default DashboardHeader;
