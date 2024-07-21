import React, { useState } from "react";


interface SelectFieldProps {
    labelClassName: string | any;
    labelName:string | any;
    selectClassName:string | any;
    selectOptionData: [] | any;
    handleChange: any;
    selectedSelectValue: any;
}


const SelectField: React.FC<SelectFieldProps> = ({
    labelClassName,
    labelName,
    selectClassName,
    selectOptionData,
    handleChange,
    selectedSelectValue,
}) => {

    

    return (
        <>
            <div key={labelName}>
                <label key={labelName} className={labelClassName}> {labelName} </label>
                <select 
                    className={selectClassName}
                    onChange={(e)=> handleChange(e)}
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

export default SelectField