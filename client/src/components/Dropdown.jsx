import React from "react";

const Dropdown = ({ label, items, handleChange, isEnum }) => {

    // If the dropdown items are treated as enums, still show the value of the item, but store the index as the value
    return (
        <div>
            <label>
                {label}
                <select onChange={handleChange}>
                    {isEnum ?
                        items.map((item, index) => 
                            <option key={index} value={index}>{item}</option>
                        ) :
                        items.map((item) => 
                            <option key={item} value={item}>{item}</option>
                        )
                    }
                </select>
            </label>
        </div>
    );
};

export default Dropdown;