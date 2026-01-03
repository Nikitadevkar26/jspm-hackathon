"use client";

export default function Card({ title, value, icon, color = "bg-gray-800" }) {
  return (
    <div
      className={`p-5 rounded-xl shadow-lg transition duration-300 hover:shadow-2xl hover:scale-[1.02] transform 
                 flex items-center justify-between text-white cursor-default ${color}`}
    >
      <div>
        <h3 className="text-sm font-medium opacity-80">{title}</h3>
        <p className="text-3xl font-bold mt-1">{value}</p>
      </div>
      <div className="text-white opacity-90 flex-shrink-0">
        {icon}
      </div>
    </div>
  );
}