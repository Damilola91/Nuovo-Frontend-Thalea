"use client";

const DashboardHeader = ({ title, onRefresh }) => {
  return (
    <div className="flex justify-between items-center my-4">
      <h1 className="text-2xl font-bold">{title}</h1>
      {onRefresh && (
        <button
          onClick={onRefresh}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Aggiorna
        </button>
      )}
    </div>
  );
};

export default DashboardHeader;
