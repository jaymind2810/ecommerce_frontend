import React, { useState } from "react";


interface SelectFormikFieldProps {
    labelClassName: string | any;
    labelName:string | any;
    selectClassName:string | any;
    selectOptionData: [] | any;
    handleChange?: any;
    selectedSelectValue: any;
    // isRequired: Boolean | any;
    onChange?: any;
    onBlur?: any;
    value?: any;
}


const SelectFormikField: React.FC<SelectFormikFieldProps> = ({
    labelClassName,
    labelName,
    selectClassName,
    selectOptionData,
    handleChange,
    selectedSelectValue,
    // handleChange,
    // isRequired,
    onChange,
    onBlur,
    value,
}) => {

    return (
        <>
            <div key={labelName}>
                <label key={labelName} className={labelClassName}> {labelName} </label>
                <select 
                    className={selectClassName}
                    onChange={(e)=> handleChange(e)}
                    // onChange={onChange}
                    value={selectedSelectValue}
                >
                <option value="Select">-- Select {labelName} --</option>
                {selectOptionData && selectOptionData?.map((item: any) => {
                    return (
                    <option key={item?.name} value={item?.name}>{item?.name}</option>
                    )
                })}
                </select>
            </div>
        </>
    )
}

export default SelectFormikField