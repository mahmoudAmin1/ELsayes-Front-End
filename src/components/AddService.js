import React from "react";
const AddService = ({ Services, value, onChange }) => {
  return (
    <>
      <div className="form-group col-md-6">
        <label htmlFor="service">service</label>
        <select
          id="service"
          name="service"
          className="form-control"
          value={value}
          onChange={(e) => onChange && onChange(e.target.value)}
        >
          {Services.map((data) => (
            <option key={data.id} value={data.id}>
              {data.name}
            </option>
          ))}
        </select>
      </div>
    </>
  );
};

export default AddService;
