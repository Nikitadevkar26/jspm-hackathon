"use client";

export default function Table({ columns, data, actions }) {
  return (
    <div className="overflow-x-auto rounded-xl shadow-md border border-gray-200">
      <table className="w-full border-collapse bg-white text-left text-sm text-gray-700">
        {/* Table Header */}
        <thead className="bg-gray-100 text-gray-900">
          <tr>
            {columns.map((col, idx) => (
              <th key={idx} className="px-6 py-3 font-semibold">
                {col}
              </th>
            ))}
            {actions && <th className="px-6 py-3 font-semibold">Actions</th>}
          </tr>
        </thead>

        {/* Table Body */}
        <tbody>
          {data.length > 0 ? (
            data.map((row, rowIndex) => (
              <tr
                key={rowIndex}
                className="border-t hover:bg-gray-50 transition"
              >
                {Object.values(row).map((value, colIndex) => (
                  <td key={colIndex} className="px-6 py-3">
                    {value}
                  </td>
                ))}

                {actions && (
                  <td className="px-6 py-3 flex gap-2">
                    {actions.map((action, actionIndex) => (
                      <button
                        key={actionIndex}
                        onClick={() => action.onClick(row)}
                        className={`px-3 py-1 rounded-md text-xs font-medium transition ${
                          action.type === "primary"
                            ? "bg-blue-600 text-white hover:bg-blue-700"
                            : action.type === "success"
                            ? "bg-green-600 text-white hover:bg-green-700"
                            : action.type === "danger"
                            ? "bg-red-600 text-white hover:bg-red-700"
                            : "bg-gray-300 text-gray-800 hover:bg-gray-400"
                        }`}
                      >
                        {action.label}
                      </button>
                    ))}
                  </td>
                )}
              </tr>
            ))
          ) : (
            <tr>
              <td
                colSpan={columns.length + (actions ? 1 : 0)}
                className="text-center px-6 py-4 text-gray-500"
              >
                No records found.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
