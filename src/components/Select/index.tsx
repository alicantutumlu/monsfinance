import React from "react";

export const Select = ({ item, title, createFormik, value }: any) => {
    return (
        <>
            {title && (
                <p className="thick16 w300 trText py-2">{title}</p>
            )}
            <select onChange={(e) => {
                createFormik.setFieldValue(value, e.target.value);

            }} className="form-select" aria-label="Default select example">
                <option selected>Select</option>
                {item?.map((item: any, index: Number) => (
                    <option value={item.value}>
                        {item.text}
                    </option>

                ))}

            </select>
        </>

    )
}

export default Select