import React, { useState, useEffect } from 'react'
import "../Assets/signup.css"
import configImgs from "../Assets/images/imgConfig.js"
import 'react-phone-number-input/style.css'
import PhoneInput,{isPossiblePhoneNumber} from 'react-phone-number-input'
import { useForm, Controller } from 'react-hook-form';
import axiosInstance from '../axiosInstance.js'
import { toast } from 'react-toastify';
import { Link,useNavigate } from "react-router-dom";





const Signup = () => {

    const { register, handleSubmit, formState: { errors }, control, watch } = useForm();

    const [countryList, setCountryList] = useState([])
    const [stateList, setStateList] = useState([])
    const [cityList, setCityList] = useState([])
    const [selectedCountry, setSelectedCountry] = useState('')
    const [selectedState, setSelectedState] = useState('')
    const [selectedCity, setSelectedCity] = useState('')
    const [isSubmitted, setIsSubmitted] = useState(false)

  // Watch the 'password' and 'confirmPassword' fields for every changes
  const password = watch('password', ''); 
  const cnfPassword = watch('cnfPassword', '');
  console.log("cnfPassword--",cnfPassword,password);

  //   Fetch Countries
    const fetchCountries = async () => {
        try {
            const response = await axiosInstance.get('/countries/capital');
            // console.log("response---",response);
            if (response && response.data?.data) {
                setCountryList(response.data.data)
            }
        } catch (err) {
            console.error("error while fetch countries---", err);
        }
    }
    useEffect(() => {
        fetchCountries()
    }, []);

    //   Fetch states based on selected country
    const fetchStates = async () => {
        try {
            let payload = {
                country: selectedCountry
            }
            const response = await axiosInstance.post('/countries/states', payload);
            // console.log("response-state--",response);
            if (response && response.data?.data?.states) {
                setStateList(response.data.data.states)
            }

        } catch (err) {
            console.error("error while fetch states---", err);
        }

    }
    useEffect(() => {
        if (selectedCountry) {
            fetchStates()
        }
    }, [selectedCountry]);

    //   Fetch cities based on selected country & state
    const fetchCities = async () => {
        try {
            let payload = {
                country: selectedCountry,
                state: selectedState
            }
            const response = await axiosInstance.post('/countries/state/cities', payload);
            console.log("response-state--", response);
            if (response && response.data?.data) {
                setCityList(response.data.data)
            }

        } catch (err) {
            console.error("error while fetch cities---", err);
        }

    }
    useEffect(() => {
        if (selectedState) {
            fetchCities()
        }
    }, [selectedState]);


    // Save user data in localStorage
    const onUserRegistered = (userData) => {
        setIsSubmitted(true)
        if(userData && selectedCountry && selectedState && selectedCity){
            const saveUserDetails= {...userData,selectedCountry,selectedState,selectedCity}
            console.log("userData--",saveUserDetails);
            localStorage.setItem('userInfo',JSON.stringify(saveUserDetails))
            toast.success("Hurray!!! User is Registered Successfully!!!");
        }
        else{
            toast.error("Please Fill all the required details");
        }        
    }


    return (
        <div className="main">
            <section className="signup">
                <div className="container">
                    <div className="signup-content">
                        <div className="signup-form">
                            <h2 className="form-title">Sign Up</h2>
                            <form className="register-form" id="register-form" onSubmit={handleSubmit(onUserRegistered)}>
                                <div className="form-group">
                                    <label htmlFor="name"><i className="fa fa-user" aria-hidden="true"></i></label>                                    
                                    <input type="text" id="name" placeholder="Full Name" {...register("fullName", { required: true })} />
                                    {errors.fullName && <p style={{color: "red"}}>Please enter user name</p>}
                                </div>
                                <div className="form-group">
                                    <label htmlFor="email"><i className="fa fa-envelope" aria-hidden="true"></i></label>
                                    <input type="email" id="email" placeholder="Email" {...register("email", { required: true })} />
                                    {errors.email && <p style={{color: "red"}}>Please enter email</p>}
                                </div>
                                <div className="form-group">
                                    <label htmlFor="address"><i className="fa-solid fa-house"></i></label>
                                    <input type="text" id="address" placeholder="Address" {...register("address", { required: true })} />
                                    {errors.address && <p style={{color: "red"}}>Please enter address</p>}
                                </div>
                                <div className="form-group">
                                    <label htmlFor="country"></label>
                                    <select class="select" value={selectedCountry} onChange={e => setSelectedCountry(e.target.value)}>
                                        <option value="null">Select Country</option>
                                        {countryList?.map(val => (
                                            <option key={val.name} value={val.name}>{val.name}</option>
                                        ))}
                                    </select>
                                    {isSubmitted && !selectedCountry && <p style={{color: "red"}}>Please select country</p>}
                                </div>

                                <div className="form-group">
                                    <label htmlFor="state"></label>
                                    <select class="select" value={selectedState} onChange={e => setSelectedState(e.target.value)}>
                                        <option value="null">Select State</option>
                                        {stateList?.length > 0 ?
                                            stateList?.map(val => (
                                                <option key={val.state_code} value={val.name}>{val.name}</option>
                                            ))
                                            :
                                            <option value="null">Loading....</option>
                                        }
                                    </select>
                                    {isSubmitted && !selectedState && <p style={{color: "red"}}>Please select state</p>}
                                </div>
                                <div className="form-group">
                                    <label htmlFor="city"></label>
                                    <select class="select" value={selectedCity} onChange={e => setSelectedCity(e.target.value)}>
                                        <option value="">Select City</option>
                                        {cityList?.length > 0 ?
                                            cityList?.map(val => (
                                                <option key={val} value={val}>{val}</option>
                                            ))
                                            :
                                            <option value="null">Loading....</option>
                                        }
                                    </select>
                                    {isSubmitted && !selectedCity && <p style={{color: "red"}}>Please select city</p>}
                                </div>
                                <div className="form-group">
                                    <label htmlFor="pincode"><i className="fa fa-map-pin"></i></label>
                                    <input type="number" id="pincode" placeholder="Pincode" {...register("pincode", { required: true })} />
                                   
                                    {errors.pincode && <p style={{color: "red"}}>Please enter valid pincode</p>}
                                </div>
                                <div className="form-group">
                                    <label htmlFor="phoneNo"></label>
                                    <Controller
                                        name="phoneNo"
                                        control={control}
                                        rules={{
                                            validate: (value) =>{  
                                                let phnNo= `${value || ''}`
                                                console.log("phnNo--",value,phnNo);
                                                return phnNo.trim().length > 0 || 'Please enter a valid Mobile Number';
                                                // return phnNo.length === 10
                                            } 
                                        }}
                                        render={({ field: { onChange, value } }) => (
                                            <PhoneInput
                                                placeholder="Enter phone number"
                                                international
                                                defaultCountry="IN"
                                                countryCallingCodeEditable={false}
                                                value={value || ''}
                                                onChange={onChange}
                                            />
                                        )}
                                    />                                    
                                    {errors.phoneNo && <p style={{color: "red"}}>Please enter valid Mobile Number</p>}
                                </div>

                                <div className="form-group">
                                    <label htmlFor="pass"><i className="fa fa-lock"></i></label>
                                    <input type="password" id="pass" placeholder="Password" {...register("password", { required: true,
                                     pattern: {
                                        value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/,
                                        message:
                                          'Password must contain at least one number, one uppercase letter, and be more than 8 characters long',
                                      }
                                       })} />
                                       {errors.password && <p style={{color: "red"}}>Password must contain at least one number, one uppercase letter, and be more than 8 characters long</p>}
                                </div>

                                <div className="form-group">
                                    <label htmlFor="re-pass"><i class="fa-solid fa-shield"></i></label>
                                    <input type="password" id="re_pass" placeholder="Confirm password" {...register("cnfPassword", { required: true,
                                    validate: (value) => value === password || 'Passwords do not match' })} />
                                    {errors.cnfPassword && <p style={{color: "red"}}>Passwords do not match</p>}
                                </div>

                                <div className="form-group form-button">
                                    {/* <input type="submit" name="signup" id="signup" className="form-submit"/> */}
                                    <button type="submit" name="signup" id="signup" className="form-submit">Sign Up</button>
                                </div>
                            </form>
                        </div>
                        <div className="signup-image">
                            <figure><img src={configImgs.signup} alt="sing up image" /></figure>
                            <Link to='/signin' className="signup-image-link">I am already member</Link>

                        </div>
                    </div>
                </div>
            </section>

        </div>
    )
}

export default Signup