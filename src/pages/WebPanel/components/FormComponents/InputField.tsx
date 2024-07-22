import React, { useState } from "react";


interface InputFieldProps {
    labelClassName: string | any;
    labelName: string | any;
    inputClassName: string | any;
    inputType: string | any;
    placeHolder: string | any;
    handleChange: any;
    isRequired: Boolean | any;
}


const InputField: React.FC<InputFieldProps> = ({
    labelClassName,
    labelName,
    inputClassName,
    inputType,
    placeHolder,
    handleChange,
    isRequired
}) => {

    return (
        <>
            <div key={labelName}>   
                <label className={labelClassName}> {labelName} </label>
                <input type={inputType} className={inputClassName} placeholder={placeHolder} onChange={(e)=> handleChange(e)} required={isRequired} />
            </div>
        </>
    )
}

export default InputField