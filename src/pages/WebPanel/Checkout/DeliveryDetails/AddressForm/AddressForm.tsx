import axios from "axios";
import React, { useState, useEffect } from "react";
import InputField from "../../../components/FormComponents/InputField";
import SelectField from "../../../components/FormComponents/SelectField";
import { useFormik } from "formik";
import { Country, State as states }  from 'country-state-city';
import * as Yup from 'yup';
import { useNavigate } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { errorToast, successToast, warningToast } from "../../../../../store/toast/actions-creation";
import { actionEnd, actionStart } from "../../../../../store/loader/actions-creations";
import { AddressFormValueType } from "../../../Type/CheckoutType";
import InputFormikField from "../components/InputFormikField";
import SelectFormikField from "../components/SelectionFormikField";
import { State } from "../../../../../store";
import { addUserAddress } from "../../../../../requests/WebPanel/CheckoutRequests";
import { addNewAddress } from "../../../../../store/address/action-Creation";


interface AddressFormProps {
  user: any;
  // setAddNewAddress: any;
  intialValue: any;
}

const AddressForm: React.FC<AddressFormProps> = (
  user,
  // setAddNewAddress,
  intialValue,
) => {

    const [allCountryData, setAllCountryData] = useState([]);
    const [countryValue, setCountryValue] = useState('Select');
    const [allStateValue, setAllStateValue] = useState<any>([]);
    const [stateValue, setStateValue] = useState('Select');

    const navigate = useNavigate();
    const dispatch = useDispatch();

    console.log(intialValue, "--------_Initial Value-------")
    
  
    useEffect(() => {
      // const baseURL = "https://countriesnow.space/api/v0.1/countries/states";
      // axios.get(baseURL).then((response) => {
      //   setAllCountryData(response.data.data);
      // });
      const all_country:any = Country.getAllCountries()
      setAllCountryData(all_country)
    }, [])
  
    const countryHandleChange = (e:any) => {
      setCountryValue(e.target.value);
      const country_data:any = allCountryData.find((country:any) => country.name === e.target.value);
      const allCountryStates = states.getStatesOfCountry(country_data?.isoCode)
      country_data && setAllStateValue(allCountryStates)
    }
  
    const stateHandleChange = (e:any) => {
      setStateValue(e.target.value);
    }

    const formik = useFormik({
      enableReinitialize: true,
      initialValues: {
        user_id: user.user.id,
        name: intialValue ? intialValue?.name : '' ,
        email: intialValue ? intialValue?.email : '',
        phone_number: intialValue ? intialValue?.phone_number : '',
        street: intialValue ? intialValue?.street : '',
        city: intialValue ? intialValue?.city : '',
        // country: intialValue ? intialValue?.country : countryValue,
        country: countryValue,
        // state: intialValue ? intialValue?.state : stateValue,
        state: stateValue,
        postal_code: intialValue ? intialValue?.postal_code : '',
      },
      validationSchema: Yup.object({
        name: Yup.string()
          .max(128, '** Must be 128 characters or less. **')
          .required('** Required **'),
        phone_number: Yup.string()
          .max(15, '** Must be 15 characters or less. **')
          .required('** Required **'),
        email: Yup.string().email('Invalid email address').required('** Required **'),
        street: Yup.string()
          .max(64, '** Must be 64 characters or less. **')
          .required('** Required **'),
        city: Yup.string()
          .max(20, '** Must be 20 characters or less. **')
          .required('** Required **'),
        country: Yup.string()
          .max(15, '** Must be 20 characters or less. **')
          .required('** Required **'),
        state: Yup.string()
          .max(15, '** Must be 20 characters or less. **')
          .required('** Required **'),
        postal_code: Yup.string()
          .max(8, '** Must be 8 characters or less. **')
          .required('** Required **'),
      }),
      onSubmit: (values: AddressFormValueType) => {
        dispatch(actionStart());
        addUserAddress(values)
          .then((res: any) => {
              dispatch(actionEnd());
              console.log(res, "=======res========")
              if (res.data.status === 201) {
                  console.log("HERE-----")
                  dispatch(addNewAddress(res.data.data))
                  dispatch(
                      successToast({
                      toast: true,
                      message: res.data.message,
                      })
                  );
                  formik.resetForm()
              } else if (res.data.status === 500) {
                dispatch(
                    warningToast({
                    toast: true,
                    message: res.data.message,
                    })
                );
                dispatch(actionEnd());
              }
          })
          .catch((error) => {
              console.log(error)
              dispatch(actionEnd());
              dispatch(
              errorToast({
                  toast: true,
                  message: "Something went wrong",
              })
              );
          });
      },
  });




    return (
        <>
            <div className="w-[520px] px-4 md:px-5 lg-6 mx-auto bg-white p-6 rounded-lg border-gray-200 shadow-lg z-20">
             
             <h2 className="text-xl font-semibold text-gray-700 dark:text-white mb-4">ADD ADDRESS</h2>
             <form 
                  onSubmit={formik.handleSubmit}
                  className="space-y-4 md:space-y-6"
              >
             <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">

               <InputFormikField
                 labelClassName={"mb-2 block text-sm font-medium text-gray-700 dark:text-white"}
                 labelName={"Your Name*"}
                 inputClassName={"block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-700 focus:border-primary-500 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder:text-gray-400 dark:focus:border-primary-500 dark:focus:ring-primary-500"}
                 inputType={"text"}
                 placeHolder={"Your Name"}
                //  handleChange={inputfieldHandle}
                //  isRequired={"false"}
                 name={"name"}
                 id={"name"}
                 onChange={formik.handleChange}
                 onBlur={formik.handleBlur}
                 value={formik.values.name}
               />
               {formik.touched.name && formik.errors.name ? (
                    <div className='text-red-500'>{formik.errors.name}</div>
                ) : null}

               <InputFormikField
                 labelClassName={"mb-2 block text-sm font-medium text-gray-700 dark:text-white"}
                 labelName={"Your Email*"}
                 inputClassName={"block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-700 focus:border-primary-500 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder:text-gray-400 dark:focus:border-primary-500 dark:focus:ring-primary-500"}
                 inputType={"email"}
                 placeHolder={"sample@email.com"}
                //  handleChange={inputfieldHandle}
                //  isRequired={"true"}
                 name={"email"}
                 id={"email"}
                 onChange={formik.handleChange}
                 onBlur={formik.handleBlur}
                 value={formik.values.email}
               />
               {formik.touched.email && formik.errors.email ? (
                    <div className='text-red-500'>{formik.errors.email}</div>
                ) : null}

               <InputFormikField
                 labelClassName={"mb-2 block text-sm font-medium text-gray-700 dark:text-white"}
                 labelName={"Phone Number*"}
                 inputClassName={"block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-700 focus:border-primary-500 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder:text-gray-400 dark:focus:border-primary-500 dark:focus:ring-primary-500"}
                 inputType={"text"}
                 placeHolder={"Phone Number"}
                //  handleChange={inputfieldHandle}
                //  isRequired={"true"}
                 name={"phone_number"}
                 id={"phone_number"}
                 onChange={formik.handleChange}
                 onBlur={formik.handleBlur}
                 value={formik.values.phone_number}
               />
               {formik.touched.phone_number && formik.errors.phone_number ? (
                    <div className='text-red-500'>{formik.errors.phone_number}</div>
                ) : null}

               <InputFormikField
                 labelClassName={"mb-2 block text-sm font-medium text-gray-700 dark:text-white"}
                 labelName={"Street"}
                 inputClassName={"block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-700 focus:border-primary-500 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder:text-gray-400 dark:focus:border-primary-500 dark:focus:ring-primary-500"}
                 inputType={"text"}
                 placeHolder={"Street"}
                //  handleChange={inputfieldHandle}
                //  isRequired={"false"}
                 name={"street"}
                 id={"street"}
                 onChange={formik.handleChange}
                 onBlur={formik.handleBlur}
                 value={formik.values.street}
               />
               {formik.touched.street && formik.errors.street ? (
                    <div className='text-red-500'>{formik.errors.street}</div>
                ) : null}

               <InputFormikField
                 labelClassName={"mb-2 block text-sm font-medium text-gray-700 dark:text-white"}
                 labelName={"City"}
                 inputClassName={"block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-700 focus:border-primary-500 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder:text-gray-400 dark:focus:border-primary-500 dark:focus:ring-primary-500"}
                 inputType={"text"}
                 placeHolder={"City Name"}
                //  handleChange={inputfieldHandle}
                //  isRequired={"false"}
                 name={"city"}
                 id={"city"}
                 onChange={formik.handleChange}
                 onBlur={formik.handleBlur}
                 value={formik.values.city}
               />
               {formik.touched.city && formik.errors.city ? (
                    <div className='text-red-500'>{formik.errors.city}</div>
                ) : null}

               <SelectFormikField 
                 labelClassName={"block text-sm font-medium text-gray-700 dark:text-white mb-2"}
                 labelName={"Country Name*"}
                 selectClassName={"block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-700 focus:border-primary-500 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder:text-gray-400 dark:focus:border-primary-500 dark:focus:ring-primary-500"}
                 selectOptionData={allCountryData}
                 handleChange={countryHandleChange}
                 selectedSelectValue={countryValue}
                //  onChange={formik.handleChange}
                 onBlur={formik.handleBlur}
                 value={countryValue}
                //  value={formik.values.country}
               />

               <SelectFormikField 
                 labelClassName={"block text-sm font-medium text-gray-700 dark:text-white mb-2"}
                 labelName={"State Name"}
                 selectClassName={"block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-700 focus:border-primary-500 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder:text-gray-400 dark:focus:border-primary-500 dark:focus:ring-primary-500"}
                 selectOptionData={allStateValue}
                 handleChange={stateHandleChange}
                 selectedSelectValue={stateValue}
                //  onChange={formik.handleChange}
                 onBlur={formik.handleBlur}
                 value={stateValue}
                //  value={formik.values.state}
               />

               <InputFormikField
                 labelClassName={"mb-2 block text-sm font-medium text-gray-700 dark:text-white"}
                 labelName={"Postal Code"}
                 inputClassName={"block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-700 focus:border-primary-500 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder:text-gray-400 dark:focus:border-primary-500 dark:focus:ring-primary-500"}
                 inputType={"text"}
                 placeHolder={"Postal Code"}
                //  handleChange={inputfieldHandle}
                //  isRequired={"true"}
                 name={"postal_code"}
                 id={"postal_code"}
                 onChange={formik.handleChange}
                 onBlur={formik.handleBlur}
                 value={formik.values.postal_code}
               />
               {formik.touched.postal_code && formik.errors.postal_code ? (
                    <div className='text-red-500'>{formik.errors.postal_code}</div>
                ) : null}

               
             </div>
             <div className="flex gap-4 justify-end pt-2 sm:col-span-2 ">
                 <p 
                    className="flex w-15 right-0 items-center justify-center gap-2 rounded-lg border border-gray-200 bg-gray-800 px-5 py-2.5 text-sm font-medium text-white hover:bg-indigo-700 hover:text-primary-700 focus:z-10 focus:outline-none focus:ring-4  dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white dark:focus:ring-gray-700"
                    // onClick={()=> {setAddNewAddress(false)}}
                 >
                   Cancel
                 </p>
                 <button 
                    type="submit"
                    className="flex w-15 right-0 items-center justify-center gap-2 rounded-lg border border-gray-200 bg-gray-800 px-5 py-2.5 text-sm font-medium text-white hover:bg-indigo-700 hover:text-primary-700 focus:z-10 focus:outline-none focus:ring-4  dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white dark:focus:ring-gray-700"
                >
                   Add
                 </button>
               </div>
            </form>
           </div>
        </>
    )
}

export default AddressForm