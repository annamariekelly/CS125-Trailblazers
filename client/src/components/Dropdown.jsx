import React from "react";

const Dropdown = ({ label, items, handleChange }) => {

    return (
        <div>
            <label>
                {label}
                <select onChange={handleChange}>
                    {items.map((item) => 
                        <option key={item} value={item}>{item}</option>
                    )}
                </select>
            </label>
        </div>
    );
};

export default Dropdown;