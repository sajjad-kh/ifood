import React from 'react';
import PaginationButtons from '../PaginationButtons';
import { persion } from '../persian';

const RightColumn = ({
  t,
  healthItems,
  tableHeaders,
  tableData,
  maxPages,
  pageNumber,
  setIsModalOpen,
  setSelectedRow,
}) => {
  const openEditModal = (row) => {
    setSelectedRow(row); // برای edit
    setIsModalOpen(true);
  };

  return (
    <div className="bg-gray-100 rounded w-full md:w-[70%] p-4 flex flex-col gap-6 items-start relative">
      {/* باکس اول */}
      <div className="flex justify-start w-full md:w-1/2 self-start gap-2 mt-4 mr-0 md:mr-4 rounded">
        <button
          onClick={() => {
            setSelectedRow(null); // اضافه جدید
            setIsModalOpen(true);
          }}
          className="border border-orange-500 text-orange-500 rounded-md w-8 h-8 text-lg leading-6 flex items-center justify-center"
        >
          +
        </button>
        <span className="self-center text-sm text-black">{t("profile.healthProfile")}</span>
      </div>

      {/* باکس دوم */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-7 gap-4 w-full mt-4">
        {healthItems.map((item, index) => (
          <div key={index} className="flex flex-col items-center justify-center text-center gap-2">
            <div
              className="w-20 h-20 rounded-full bg-cover bg-center"
              style={{ backgroundImage: `url("/image/profile/${item.pic}")` }}
            />
            <div className="text-black font-bold text-[10px]">{item.label}</div>
            <div className="text-black text-sm font-bold">
              {persion(tableData.active_bmi?.[item.key]) ?? "-"}
            </div>
          </div>
        ))}
      </div>

      {/* جدول */}
      <div className="bg-white rounded-xl mt-4 w-full flex flex-col gap-3 overflow-x-auto">
        <h3 className="mx-4 my-2 text-sm text-right font-semibold">
          {t("profile.historyHealthProfile")}
        </h3>

        <table className="min-w-full text-sm text-right border-separate border-spacing-0">
          <thead>
            <tr className="bg-orange-100 bg-opacity-50">
              {tableHeaders.map((header, idx) => (
                <th key={idx} className="px-4 py-2 text-black whitespace-nowrap">
                  {header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {!tableData?.bmidata || tableData.bmidata.length === 0 ? (
              <tr>
                <td colSpan={tableHeaders.length} className="text-center py-4 text-gray-400">
                  {t("profile.noData")}
                </td>
              </tr>
            ) : (
              tableData.bmidata.map((row, i) => (
                <tr key={i} className="border-b border-gray-300">
                  {Object.keys(tableData.active_bmi).map((key, j, arr) => (
                    <td key={j} className="px-4 py-2">
                      <span className="text-xs flex items-center gap-1 flex justify-between">
                        {persion(row[key])}

                        {j === arr.length - 1 && row.is_active && (
                          <button
                            className="ml-1 p-1 border border-orange-400 hover:bg-orange-100  rounded text-orange-500 text-[10px]"
                            onClick={() => openEditModal(row)}
                          >
                            {t("edit")}
                          </button>
                        )}
                      </span>
                    </td>
                  ))}
                </tr>
              ))
            )}
          </tbody>
        </table>

        {maxPages > 1 && (
          <PaginationButtons
            maxPages={maxPages}
            pageNumber={pageNumber}
            onPageChange={(page) => console.log("change to page", page)}
          />
        )}
      </div>
    </div>
  );
};

export default RightColumn;
