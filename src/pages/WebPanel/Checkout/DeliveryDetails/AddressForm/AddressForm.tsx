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
import { addUserAddress, updateUserAddress } from "../../../../../requests/WebPanel/CheckoutRequests";
import { addNewAddress, updateAddress } from "../../../../../store/address/action-Creation";
import { PhotoIcon, UserCircleIcon } from '@heroicons/react/24/solid'
import { ChevronDownIcon } from '@heroicons/react/16/solid'
import { AddressFormType } from "../../../../../store/address/reducer/reducer";


interface AddressFormProps {
  user?: any;
  setAddNewAddress?: any;
  intialValue?: AddressFormType;
}

const AddressForm: React.FC<AddressFormProps> = ({
  user,
  setAddNewAddress,
  intialValue,
}) => {

    const [allCountryData, setAllCountryData] = useState([]);
    const [countryValue, setCountryValue] = useState('Select');
    const [allStateValue, setAllStateValue] = useState<any>([]);
    const [stateValue, setStateValue] = useState('Select');

    const navigate = useNavigate();
    const dispatch = useDispatch();

    
    useEffect(() => {
      const all_country:any = Country.getAllCountries()
      setAllCountryData(all_country)
      if (intialValue?.country) {
        setCountryValue(intialValue?.country)
        const country_data:any = Country.getAllCountries().find((country:any) => country.name === intialValue?.country);
        const allCountryStates = states.getStatesOfCountry(country_data?.isoCode)
        country_data && setAllStateValue(allCountryStates)
        intialValue?.state && setStateValue(intialValue?.state)
      }
    }, [intialValue])
  
    const countryHandleChange = (e:any) => {
      setCountryValue(e.target.value);
      formik.values.country = e.target.value
      const country_data:any = allCountryData.find((country:any) => country.name === e.target.value);
      const allCountryStates = states.getStatesOfCountry(country_data?.isoCode)
      country_data && setAllStateValue(allCountryStates)
    }
  
    const stateHandleChange = (e:any) => {
      setStateValue(e.target.value);
      formik.values.state = e.target.value
    }

    const formik = useFormik({
      enableReinitialize: true,
      initialValues: {
        user_id: user.id,
        name: intialValue ? intialValue?.name : '' ,
        email: intialValue ? intialValue?.email : '',
        phone_number: intialValue ? intialValue?.phone_number : '',
        street: intialValue ? intialValue?.street : '',
        city: intialValue ? intialValue?.city : '',
        country: intialValue ? intialValue?.country : countryValue,
        state: intialValue ? intialValue?.state : stateValue,
        postal_code: intialValue ? intialValue?.postal_code : '',
      },
      validationSchema: Yup.object({
        name: Yup.string()
          .max(128, '** Must be 128 characters or less. **')
          .required('** Required **'),
        phone_number: Yup.string()
          .max(15, '** Must be 15 characters or less. **')
          .required('** Required **'),
        email: Yup.string()
          .max(20, '** Must be 20 characters or less. **')
          .email('Invalid email address')
          .required('** Required **'),
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
        if (JSON.stringify(intialValue) !== '{}') {
          values.id = intialValue && intialValue['id'] 
          updateUserAddress(values)
            .then((res: any) => {
                dispatch(actionEnd());
                console.log(res, "=======res========")
                if (res.data.success === true) {
                    console.log("HERE-----")
                    dispatch(updateAddress(res.data.data))
                    dispatch(
                        successToast({
                        toast: true,
                        message: res.data.message,
                        })
                    );
                    formik.resetForm()
                    setAddNewAddress(false)
                } else {
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
        } else {
          addUserAddress(values)
            .then((res: any) => {
                dispatch(actionEnd());
                console.log(res, "=======res========")
                if (res.data.success === true) {
                    console.log("HERE-----")
                    dispatch(addNewAddress(res.data.data))
                    dispatch(
                        successToast({
                        toast: true,
                        message: res.data.message,
                        })
                    );
                    formik.resetForm()
                    setAddNewAddress(false)
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
        }
      },
    });


  return (
    <>
      <form onSubmit={formik.handleSubmit}>
      <div 
        className="bg-white border-gray-200 container justify-center max-w-[608px] p-6 rounded-lg right-4 rounded-lg ring-1 ring-black ring-opacity-5 shadow-lg">
        <div className="space-y-12">

          <div className="border-b border-gray-900/10 pb-12">
            <h2 className="text-base/7 font-semibold text-gray-900">Personal Information</h2>
            <p className="mt-1 text-sm/6 text-gray-600">Use a permanent address where you can receive product.</p>

            <div className="mt-8 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
              <div className="sm:col-span-4">
                <InputFormikField
                  labelClassName={"block text-sm/6 font-medium text-gray-900"}
                  labelName={"Name"}
                  inputClassName={"block w-full rounded-md bg-white px-3 mt-2 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"}
                  inputType={"text"}
                  placeHolder={"Name"}
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
              </div>

              <div className="sm:col-span-3">
                <InputFormikField
                  labelClassName={"block text-sm/6 font-medium text-gray-900"}
                  labelName={"Email address"}
                  inputClassName={"mt-2 block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"}
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

                
              </div>

              <div className="sm:col-span-3">
                <InputFormikField
                  labelClassName={"block text-sm/6 font-medium text-gray-900"}
                  labelName={"Phone Number*"}
                  inputClassName={"mt-2 block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"}
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
              </div>
            </div>
          </div>

          <div className="border-b border-gray-900/10 pb-12">
            <h2 className="text-base/7 font-semibold text-gray-900">Address Information</h2>
            <p className="mt-1 text-sm/6 text-gray-600">
              We'll always let you know about important changes, we will deliver product to this address.
            </p>

            <div className="mt-8 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">

              <div className="sm:col-span-3">
                <SelectFormikField 
                  labelClassName={"block text-sm/6 font-medium text-gray-900"}
                  labelName={"Country"}
                  selectClassName={"col-start-1 row-start-1 w-full appearance-none rounded-md bg-white py-1.5 pl-3 mt-2 pr-8 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"}
                  selectOptionData={allCountryData}
                  // handleChange={countryHandleChange}
                  selectedSelectValue={countryValue}
                  onChange={countryHandleChange}
                  onBlur={formik.handleBlur}
                  value={countryValue}
                  // value={formik.values.country}
                />
              </div>

              <div className="col-span-full">
                <InputFormikField
                  labelClassName={"block text-sm/6 font-medium text-gray-900"}
                  labelName={"Street-address"}
                  inputClassName={"block w-full rounded-md bg-white mt-2 px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"}
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
              </div>

              <div className="sm:col-span-2 sm:col-start-1">
                <InputFormikField
                  labelClassName={"block text-sm/6 font-medium text-gray-900"}
                  labelName={"City"}
                  inputClassName={"mt-2 block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"}
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
              </div>

              <div className="sm:col-span-2">
                <SelectFormikField 
                  labelClassName={"block text-sm/6 font-medium text-gray-900"}
                  labelName={"State Name"}
                  selectClassName={"block w-full rounded-md bg-white px-2 mt-2 py-2 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"}
                  selectOptionData={allStateValue}
                  // handleChange={stateHandleChange}
                  selectedSelectValue={stateValue}
                  onChange={stateHandleChange}
                  onBlur={formik.handleBlur}
                  value={stateValue}
                  //  value={formik.values.state}
                />
              </div>

              <div className="sm:col-span-2">
                <InputFormikField
                  labelClassName={"block text-sm/6 font-medium text-gray-900"}
                  labelName={"Postal Code"}
                  inputClassName={"mt-2 block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"}
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
            </div>
          </div>

        
          <div className="flex gap-x-4 items-center justify-end mt-4 pb-4">
            {/* <button 
              type="button" 
              className="bg-gray-300 duration-500 flex hover:bg-indigo-100 items-center px-5 py-2 rounded-md text-sm font-medium transition-all"
              onClick={setAddNewAddress(false)}
            >
              Cancel
            </button> */}
            <button
              type="submit"
              className="bg-gray-800 flex items-center rounded-lg bg-primary-700 px-5 py-2 text-sm font-medium text-white hover:bg-primary-800 focus:outline-none focus:ring-4  focus:ring-primary-300 dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800 hover:bg-indigo-700"
              // onSubmit={formik.handleSubmit}
            >
              Save
            </button>
          </div>
        </div>
      </div>
      </form>
    </>
  )

    // return (
    //     <>
    //         <div className="w-[520px] px-4 md:px-5 lg-6 mx-auto bg-white p-6 rounded-lg border-gray-200 shadow-lg z-20">
             
    //          <h2 className="text-xl font-semibold text-gray-700 dark:text-white mb-4">ADD ADDRESS</h2>
    //          <form 
    //               onSubmit={formik.handleSubmit}
    //               className="space-y-4 md:space-y-6"
    //           >
    //          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">




               
    //          </div>
    //          <div className="flex gap-4 justify-end pt-2 sm:col-span-2 ">
    //              <p 
    //                 className="flex w-15 right-0 items-center justify-center gap-2 rounded-lg border border-gray-200 bg-gray-800 px-5 py-2.5 text-sm font-medium text-white hover:bg-indigo-700 hover:text-primary-700 focus:z-10 focus:outline-none focus:ring-4  dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white dark:focus:ring-gray-700"
    //                 // onClick={()=> {setAddNewAddress(false)}}
    //              >
    //                Cancel
    //              </p>
    //              <button 
    //                 type="submit"
    //                 className="flex w-15 right-0 items-center justify-center gap-2 rounded-lg border border-gray-200 bg-gray-800 px-5 py-2.5 text-sm font-medium text-white hover:bg-indigo-700 hover:text-primary-700 focus:z-10 focus:outline-none focus:ring-4  dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white dark:focus:ring-gray-700"
    //             >
    //                Add
    //              </button>
    //            </div>
    //         </form>
    //        </div>
    //     </>
    // )
}

export default AddressForm