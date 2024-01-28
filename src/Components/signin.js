import React,{useEffect,useState} from 'react'
import { Link,useNavigate } from "react-router-dom";
import configImgs from "../Assets/images/imgConfig.js"
import { useForm, Controller } from 'react-hook-form';



const Signin = () => {
    const {register,handleSubmit,formState:{errors}} = useForm()
    const [userData,setUserData] = useState()
    const navigate = useNavigate()

    useEffect(() => {       
        getUserDetails();      
    }, [])

    const getUserDetails = () =>{
        const data = JSON.parse(localStorage.getItem('userInfo'))
        console.log("data---",data);
        setUserData(data)
    }
    

    const onUserSignin = (data) =>{
    //    console.log("datttt---",data);
       if(data.email === userData.email && data.password === userData.password){
        // toast.success("Hurray!!! User is loggedin Successfully!!!");
        navigate('/products')
       }
       else{
        toast.error("Please Enter correct details");
       }

    }
  return (
    <div>
          <section className="sign-in">
            <div className="container">
                <div className="signin-content">
                    <div className="signin-image">
                        <figure><img src={configImgs.signin} alt="sing up image"/></figure>
                        {/* <a href="#" className="signup-image-link">Create an account</a> */}
                        <Link to="/">Create an account</Link>
                    </div>

                    <div className="signin-form">
                        <h2 className="form-title">Sign In</h2>
                        <form className="register-form" id="login-form" onSubmit={handleSubmit(onUserSignin)}>
                            <div className="form-group">
                                <label htmlFor="email"><i className="fa fa-envelope"></i></label>
                                <input type="text" id="email" placeholder="Enter your email" {...register('email',{required: true})}/>
                            </div>
                            <div className="form-group">
                                <label htmlFor="password"><i className="fa fa-lock"></i></label>
                                <input type="password"  id="password" placeholder="Enter Password" {...register('password',{required: true,
                                 pattern: {
                                    value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/,
                                    message:
                                      'Password must contain at least one number, one uppercase letter, and be more than 8 characters long',
                                }})}/>
                               {errors.password && <p style={{color: "red"}}>Password must contain at least one number, one uppercase letter, and be more than 8 characters long</p>}

                            </div>
                            {/* <div className="form-group">
                                <input type="checkbox" name="remember-me" id="remember-me" className="agree-term" />
                                <label htmlFor="remember-me" className="label-agree-term"><span><span></span></span>Remember me</label>
                            </div> */}
                            <div className="form-group form-button">
                                <input type="submit" name="signin" id="signin" className="form-submit" value="Log in"/>
                            </div>  
                        </form>
                        {/* <div className="social-login">
                            <span className="social-label">Or login with</span>
                            <ul className="socials">
                                <li><a href="#"><i class="fa fa-facebook"></i></a></li>
                                <li><a href="#"><i className="display-flex-center zmdi zmdi-twitter"></i></a></li>
                                <li><a href="#"><i className="display-flex-center zmdi zmdi-google"></i></a></li>
                            </ul>
                        </div> */}
                    </div>
                </div>
            </div>
        </section>
    </div>
  )
}

export default Signin