import React, { useState } from "react";


interface InputFormikFieldProps {
    labelClassName: string | any;
    labelName: string | any;
    inputClassName: string | any;
    inputType: string | any;
    name?: string | any;
    id?: string | any;
    placeHolder: string | any;
    handleChange?: any;
    // isRequired: Boolean | any;
    onChange?: any;
    onBlur?: any;
    value?: any;
}


const InputFormikField: React.FC<InputFormikFieldProps> = ({
    labelClassName,
    labelName,
    inputClassName,
    inputType,
    name,
    id,
    placeHolder,
    // handleChange,
    // isRequired,
    onChange,
    onBlur,
    value,
}) => {

    return (
        <>
            <div key={labelName}>   
                <label className={labelClassName}> {labelName} </label>
                <input 
                    type={inputType} 
                    name={name}
                    id={id}
                    className={inputClassName} 
                    placeholder={placeHolder} 
                    onChange={onChange} 
                    // required={isRequired} 
                    onBlur={onBlur} 
                    value={value} />
            </div>
        </>
    )
}

export default InputFormikField