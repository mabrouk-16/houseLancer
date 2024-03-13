import {
    MDBBtn,
    MDBContainer,
    MDBCardBody,
    MDBInput,
    MDBCheckbox,
    MDBCol,
    MDBRadio,
} from "mdb-react-ui-kit";
import styles from "./Register.module.css";
import { useForm } from "react-hook-form";
import axios from "axios";
import React, { useState } from "react";

function Register() {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const {
        register,
        handleSubmit,
        formState: { errors, isDirty },
        trigger,
        watch,
        setValue,
    } = useForm({
        mode: "onChange",
        defaultValues: {
            firstName: "",
            lastName: "",
            email: "",
            gender: "",
            password: "",
            cPassword: "",
        },
    });
    const password = React.useRef({});
    password.current = watch("password", "");

    const handleGenderChange = (e) => {
        setValue("gender", e.target.value);
    };
    async function onSubmit(values) {
        setLoading(true);
        setError(null);
        let { data } = await axios.post("http://localhost:3000/auth/signup", values).catch((err) => {

        setError(err.response.data.msgError)
        setLoading(false)
        
        console.log(err)
    })
            
        console.log(data);
        if (data.success) {
            window.location.href = "/login";
            setLoading(false);
        }
    }
    return (
        <div className={`${styles.register_bg}  position-relative`}>
            <div className={`w-100   ${styles.layer_bg}`}></div>

            <MDBContainer
                fluid
                className="container d-flex align-items-center justify-content-center pt-md-5"
            >
                <div className={`${styles.card_bg} p-3 rounded-2 mt-5 mb-5`}>
                    <MDBCardBody className="px-1">
                        <h2 className="text-uppercase fs-5 text-center mb-3">
                            Create an account
                        </h2>
                        {error ? <p className=" alert alert-danger ">{error}</p> : ""}
                        <form onSubmit={handleSubmit(onSubmit)}>
                            <MDBInput
                                {...register("firstName", {
                                    required: "You must enter your FirstName",
                                    minLength: {
                                        value: 3,
                                        message: "firstName must be 3 characters at least ",
                                    },
                                    maxLength: {
                                        value: 15,
                                        message: "firstName must be 15 characters long ",
                                    },
                                    pattern: {
                                        value: /^[A-Za-z]{3,15}$/,
                                        message:
                                            "first name must be character only and between 3,15",
                                    },
                                })}
                                className={`mb-3 ${errors.firstName && "is-invalid"} ${!errors.firstName && isDirty? "is-valid" : ""}`}
                                wrapperClass="mb-4"
                                label="First Name"
                                size="lg"
                                id="form1"
                                type="text"
                                onBlur={() => trigger("firstName")}
                            />
                            {errors.firstName && <p className=" alert alert-danger ">{errors.firstName.message}</p>}

                            <MDBInput
                                {...register("lastName", {
                                    required: "You must enter your lastName",
                                    minLength: {
                                        value: 3,
                                        message: "lastName must be 3 characters at least ",
                                    },
                                    maxLength: {
                                        value: 15,
                                        message: "lastName must be 15 characters long ",
                                    },
                                    pattern: {
                                        value: /^[A-Za-z]{3,15}$/,
                                        message:
                                            "last name must be character only and between 3,15",
                                    },
                                })}
                                className={`mb-3 ${errors.lastName && "is-invalid"} ${!errors.lastName && isDirty? "is-valid" : ""
                                    }`}
                                wrapperClass="mb-4"
                                label="First Name"
                                size="lg"
                                id="form2"
                                type="text"
                                onBlur={() => trigger("lastName")}
                            />
                            {errors.lastName && <p className=" alert alert-danger ">{errors.lastName.message}</p>}
                            <MDBInput
                                {...register("email", {
                                    required: "You must enter your email address",
                                    pattern: {
                                        value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                                        message:"You must enter a valid email address (test@gmail.com)",
                                    },
                                })}
                                className={`mb-3 ${errors.email && "is-invalid"} ${!errors.email && isDirty? "is-valid" : ""}`}
                                label="Your Email"
                                size="lg"
                                id="form3"
                                onBlur={() => trigger("email")}
                            />
                            {errors.email && <p className=" alert alert-danger ">{errors.email.message}</p>}
                            <MDBCol className="mb-4 d-flex">
                <h6 className="fw-bold me-1">Gender: </h6>
                <MDBRadio
                    {...register("gender")}
                    type="radio"
                    name="gender"
                    id="male"
                    value="male"
                    label="Male"
                    inline
                    onChange={handleGenderChange} // Add onChange handler
                />
                <MDBRadio
                    {...register("gender")}
                    type="radio"
                    name="gender"
                    id="female"
                    value="female"
                    label="Female"
                    inline
                    onChange={handleGenderChange} // Add onChange handler
                />
            </MDBCol>
                            <MDBInput
                                {...register("password", {
                                    required: "You must enter your password",
                                    pattern: {
                                        value:
                                            /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()\-_=+{}|;:'",.<>?`~])[A-Za-z\d!@#$%^&*()\-_=+{}|;:'",.<>?`~]{8,}$/,
                                        message:
                                            "Password must be at least 8 characters long and include at least one uppercase letter, one lowercase letter, one digit, and one special character",
                                    },
                                })}
                                className={`mb-3 ${errors.password && "is-invalid"} ${!errors.password && isDirty? "is-valid" : ""}`}
                                wrapperClass="mb-3"
                                label="Password"
                                size="lg"
                                id="form4"
                                type="password"
                                onBlur={() => trigger("password")}
                            />
                            {errors.password && <p className=" alert alert-danger ">{errors.password.message}</p>}
                            <MDBInput
                                {...register("cPassword", {
                                    validate: (value) =>
                                        value === password.current || "The passwords do not match",
                                    required: "You must enter your cPassword",
                                    pattern: {
                                        value:
                                            /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()\-_=+{}|;:'",.<>?`~])[A-Za-z\d!@#$%^&*()\-_=+{}|;:'",.<>?`~]{8,}$/,
                                        message:
                                            "cPassword must be at least 8 characters long and include at least one uppercase letter, one lowercase letter, one digit, and one special character",
                                    },
                                })}
                                className={`mb-3 ${errors.cPassword && "is-invalid"} ${!errors.cPassword && isDirty? "is-valid" : ""}`}
                                wrapperClass="mb-3"
                                label="Confirm Password"
                                size="lg"
                                id="form5"
                                type="password"
                                onBlur={() => trigger("cPassword")}
                            />
                            {errors.cPassword && <p className=" alert alert-danger ">{errors.cPassword.message}</p>}
                            <div className="d-flex flex-row justify-content-center mb-4">
                                <MDBCheckbox
                                    name="flexCheck"
                                    id="flexCheckDefault"
                                    label="I agree all statements in Terms of service"
                                />
                            </div>
                            {loading ? (
                                <MDBBtn
                                    style={{ backgroundColor: "#000000" }}
                                    className={`w-100 rounded-5 mb-3`}
                                    size="lg"
                                >
                                    <i className="fa fa-spin fa-spinner"></i>
                                </MDBBtn>
                            ) : (
                                <MDBBtn
                                    style={{ backgroundColor: "#000000" }}
                                    className={`w-100 rounded-5 mb-3`}
                                    size="lg"
                                >
                                    Register
                                </MDBBtn>
                            )}
                        </form>
                    </MDBCardBody>
                </div>
            </MDBContainer>
        </div>
    );
}

export default Register;
