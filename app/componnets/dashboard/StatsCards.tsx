
import { useEffect, useState } from "react";
import { fetchDashboardCount } from "../../lib/api-client";

const icons = [
  <img src="/icons/TotalWorkers.svg" key="workers" className="w-10 h-10 text-green-500" />, // Total Workers
  <img src="/icons/TotalResidents.svg" key="residents" className="w-10 h-10 text-green-500" />, // Total Residents
  <img src="/icons/TotalProperties.svg" key="properties" className="w-10 h-10 text-green-500" />, // Total Properties
];

export default function StatsCards() {
  const [counts, setCounts] = useState({
    totalWorkers: 0,
    totalResidents: 0,
    totalProperties: 0,
    totalVehicles: 0,
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchDashboardCount()
      .then((data) => {
        setCounts(data);
        setLoading(false);
      })
      .catch((err) => {
        setError("Failed to load dashboard counts");
        setLoading(false);
      });
  }, []);

  const stats = [
    { title: "Total Workers", value: counts.totalWorkers },
    { title: "Total Residents", value: counts.totalResidents },
    { title: "Total Properties", value: counts.totalProperties },
  ];

  return (
    <div
      className="bg-[#F9FAFB] rounded-2xl border border-[#f0f2f8] p-3"
      style={{
        boxShadow: "-10px -10px 20px 0 rgba(255,255,255,0.6), 3px 3px 20px 0 rgba(170,170,204,0.5)"
      }}
    >
      {loading ? (
        <div className="text-center py-6 text-gray-500">Loading dashboard counts...</div>
      ) : error ? (
        <div className="text-center py-6 text-red-500">{error}</div>
      ) : (
        <div className="grid grid-cols-3 gap-2">
          {stats.map((item, i) => (
            <div
              key={i}
              className={`flex items-center gap-4 min-h-[110px] px-6 py-5 bg-white rounded-xl shadow-md ${i !== 2 ? 'border-r border-[#f0f2f8]' : ''}`}
              style={{ boxShadow: "0 4px 24px 0 #e9eef7" }}
            >
              <div className="rounded-lg flex items-center justify-center w-16 h-16 mr-3 border border-[rgba(48,179,61,0.2)]">
                {icons[i]}
              </div>
              <div>
                <div className="font-semibold text-black text-base mb-1">{item.title}</div>
                <div className="text-green-600 text-3xl font-bold leading-tight">{item.value}</div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
