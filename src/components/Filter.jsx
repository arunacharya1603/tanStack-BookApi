import React from "react";

const Filter = ({ year }) => {
  const currentYear = new Date().getFullYear();
  const years = [];

  for (let year = 1988; year <= currentYear; year++) {
    years.push(year.toString());
  }
 
  const handleYearChange = (e) => {
    year(e.target.value);
  };

  return (
    <>
      <div className="flex flex-col items-center justify-center w-full">
        <div className="flex items-center w-full ">
          <select
            onChange={handleYearChange}
            className="m-2 p-2 border border-gray-300 rounded-md w-full shadow-md"
          >
            <option value="">Select a year</option>
            {years.map((year, index) => (
              <option key={index} value={year}>
                {year}
              </option>
            ))}
          </select>
        </div>
      </div>
    </>
  );
};

export default Filter;
