const StatCard = ({ title, value, color }: any) => {
  return (
    <div className="bg-white rounded shadow p-4 flex items-center justify-between">
      <div>
        <p className="text-gray-500">{title}</p>
        <h2 className="text-xl font-bold">{value}</h2>
      </div>

      <div className={`${color} w-12 h-12 rounded flex items-center justify-center text-white`}>
        📊
      </div>
    </div>
  );
};

export default StatCard;