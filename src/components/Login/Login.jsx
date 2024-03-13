import { MDBBtn, MDBContainer, MDBCardBody, MDBInput } from 'mdb-react-ui-kit';
import styles from './Login.module.css';
import { useForm } from 'react-hook-form';
import axios from "axios";
import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
// eslint-disable-next-line react/prop-types
function Login({ saveUser }) {
    const loc = useLocation();
    const nav = useNavigate();
    console.log(loc.state);

    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)
    const { register, handleSubmit, formState: { errors, isDirty }, trigger } = useForm({
        mode: "onChange",
        defaultValues: {
            email: "",
            password: ""
        }
    });

    async function onSubmit(values) {
        setLoading(true);
        setError(null)
        // Make a POST request to your login endpoint

  
        let { data } = await axios.post('https://iti-final-be.onrender.com/auth/login', values).catch((err) => {

            setError(err.response.data.msgError)
            setLoading(false)

            console.log(err)
        })
        console.log(data)
        if (data.success) {
            localStorage.setItem("token", data.access_token)
            localStorage.setItem('userData', JSON.stringify(
                {
                    firstName: data.user.firstName,
                    lastName: data.user.lastName,
                    userName: data.user.userName,
                    image: "https://iti-final-be.onrender.com/" + data.user.image,
                    userId: data.user._id,
                    role: data.user.role,
                }))
            saveUser()
            if (loc.state) {
                nav(loc.state);
                setLoading(false)

            }
            else
                nav('/');
            setLoading(false)
        }

    }



    return (
        <div className={`${styles.register_bg} w-100 vh-100 position-relative`}>
            <div className={`w-100 vh-100 position-absolute ${styles.layer_bg}`}></div>

            <MDBContainer fluid className='container d-flex align-items-center justify-content-center pt-md-5'>
                <div className={`${styles.card_bg} p-3 rounded-5 mt-5`}>
                    <MDBCardBody style={{ width: "400px" }} className='px-1'>
                        <form onSubmit={handleSubmit(onSubmit)}>
                            <h2 className="text-uppercase fs-5 text-center mb-3">welcome back</h2>
                            {error ? <p className=" alert alert-danger ">{error}</p> : ''}
                            <MDBInput
                                {...register('email', {
                                    required: "You must enter your email address",
                                    pattern: {
                                        value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                                        message: "You must enter a valid email address (test@gmail.com)"
                                    }
                                })}
                                className={`mb-3 ${errors.email && 'is-invalid'} ${!errors.email && isDirty ? 'is-valid' : ''}`}
                                label='Your Email'
                                size='lg'
                                id='form2'
                                onBlur={() => trigger('email')}
                            />
                            {errors.email && <p className=" alert alert-danger ">{errors.email.message}</p>}

                            <MDBInput
                                {...register('password', {
                                    required: "You must enter your password",
                                    pattern: {
                                        value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()\-_=+{}|;:'",.<>?`~])[A-Za-z\d!@#$%^&*()\-_=+{}|;:'",.<>?`~]{8,}$/,
                                        message: "Password must be at least 8 characters long and include at least one uppercase letter, one lowercase letter, one digit, and one special character"
                                    }
                                })}
                                className={`mb-3 ${errors.password && 'is-invalid'} ${(!errors.password && isDirty) ? 'is-valid' : ''}`}
                                wrapperClass='mb-3'
                                label='Password'
                                size='lg'
                                id='form3'
                                type='password'
                                onBlur={() => trigger('password')}
                            />
                            {errors.password && <p className=" alert alert-danger ">{errors.password.message}</p>}
                            {loading ? <MDBBtn style={{ backgroundColor: "#000000" }} className={`w-100 rounded-5 mb-3`} size='lg'><i className='fa fa-spin fa-spinner'></i></MDBBtn> : <MDBBtn style={{ backgroundColor: "#000000" }} className={`w-100 rounded-5 mb-3`} size='lg'>Login</MDBBtn>}


                        </form>
                    </MDBCardBody>
                </div>
            </MDBContainer>
        </div>
    );
}

export default Login;
