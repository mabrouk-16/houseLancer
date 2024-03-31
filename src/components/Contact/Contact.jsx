import styles from './Contact.module.css'
import { useForm } from 'react-hook-form'
function Contact() {
    const form = useForm();
    const { register, handleSubmit, formState } = form;
    function onSubmit(values) {
        console.log(values);
    }
    return (
        <>
            <div className={`${styles.contact_bg}`}>
                <div className={`${styles.page_heading}  ${styles.header_text}`}>
                    <div className="container">
                        <div className="row">
                            <div className="col-lg-12">
                                <h3>Contact Us</h3>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="container">
                    <div className="row my-5 justify-content-between ">
                        <div className="col-lg-6 ">
                            <div className={` ${styles.contact_page} ${styles.section}`}>
                                <div className="container">
                                    <div className={`${styles.section_heading}`}>
                                        <p className={`${styles.section_title}`}>Get In Touch <br /><span>With Our Agents</span></p>
                                    </div>
                                    <p className='text-muted'>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Ut officiis aut voluptatum eos,
                                        quos praesentium libero! Nesciunt vitae voluptatibus, juhum hbjn
                                        bbmhbv fcrxfcv  kmmjj jbvgt hbvhvh bhihbjb nnnnnnkknbjm
                                        impedit laboriosam a soluta rerum! Molestiae recusandae quia esse ea nobis.</p>
                                    <div className="row">
                                        <div className="col-lg-12">
                                            <div className={`${styles.item} ${styles.phone}`}>
                                                <i className="fa-solid fa-phone-volume fa-3x" />
                                                <h6>010-020-0340<br /><span>Phone Number</span></h6>
                                            </div>
                                        </div>
                                        <div className="col-lg-12">
                                            <div className={`${styles.item} ${styles.email}`}>
                                                <i className="fa-solid fa-envelope fa-3x " />
                                                <h6>info@Design.com<br /><span>Business Email</span></h6>
                                            </div>
                                        </div>
                                    </div>

                                </div>
                            </div>
                            
                        </div>
                        <div className="col-lg-6 d-flex justify-content-center">
                            <div className={`${styles.contact_page} ${styles.section}`}>
                                <div className="container">
                                    <form id={`${styles.contact_form}`} method="post" onSubmit={handleSubmit(onSubmit)}>
                                        <div className="row">
                                            <div className="col-lg-12">
                                                <fieldset>
                                                    <label htmlFor="userName">Full Name</label>
                                                    <input
                                                        {...register('name', {
                                                            required: {
                                                                value: true,
                                                                message: "Fill Name Field"
                                                            },
                                                            minLength: {
                                                                value: 3,
                                                                message: 'Name  must be at least 3 characters long'
                                                            },

                                                        })}
                                                        type="text"
                                                        className={`form-control`}
                                                        id="userName"
                                                        aria-describedby="nameHelp"
                                                        placeholder="Enter Name ...."
                                                        autoComplete='on'

                                                    />

                                                    <small id="nameHelp" className="form-text text-danger">
                                                        <p className='err'>{formState.errors.name?.message}</p>
                                                    </small>
                                                    {/* <input type="name" name="name" id="name" placeholder="Your Name..." autoComplete="on" required /> */}
                                                </fieldset>
                                            </div>

                                            <div className="col-lg-12">
                                                <fieldset>
                                                    <label htmlFor="email">Email Address</label>
                                                    <input
                                                        {...register('email', {
                                                            required: {
                                                                value: true,
                                                                message: "Fill Email Field"
                                                            },
                                                            pattern: {
                                                                // eslint-disable-next-line no-useless-escape
                                                                value: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/,
                                                                message: 'must be example@gmail.com'
                                                            },


                                                        })}
                                                        type="text"
                                                        className={`form-control`}
                                                        id="email"
                                                        aria-describedby="emailHelp"
                                                        placeholder="Enter email ..."

                                                    />

                                                    <small id="emailHelp" className="form-text text-danger">
                                                        <p className='err'>{formState.errors.email?.message}</p>
                                                    </small>
                                                    {/* <input type="text" name="email" id="email" pattern="[^ @]*@[^ @]*" placeholder="Your E-mail..." required /> */}
                                                </fieldset>
                                            </div>
                                            <div className="col-lg-12">
                                                <fieldset>
                                                    <label htmlFor="subject">Subject</label>
                                                    <input
                                                        {...register('subject', {
                                                            required: {
                                                                value: true,
                                                                message: "Fill Subject Field"
                                                            },
                                                            minLength: {
                                                                value: 10,
                                                                message: ' Subject must be at least 10 characters long'
                                                            },
                                                            maxLength: {
                                                                value: 20,
                                                                message: ' Subject must be at least 10 characters long'
                                                            }

                                                        })}
                                                        type="text"
                                                        className={`form-control`}
                                                        id="subject"
                                                        aria-describedby="subjectHelp"
                                                        placeholder="Enter Subject ..."

                                                    />

                                                    <small id="subjectHelp" className="form-text text-danger">
                                                        <p className='err'>{formState.errors.subject?.message}</p>
                                                    </small>
                                                    {/* <input type="subject" name="subject" id="subject" placeholder="Subject..." autoComplete="on" /> */}
                                                </fieldset>
                                            </div>
                                            <div className="col-lg-12">
                                                <fieldset>
                                                    <label htmlFor="message">Message</label>
                                                    <textarea
                                                        {...register('message', {
                                                            required: {
                                                                value: true,
                                                                message: "Fill Message Field"
                                                            },
                                                            minLength: {
                                                                value: 10,
                                                                message: 'Message must be at least 10 characters long'
                                                            },
                                                            maxLength: {
                                                                value: 200, // Adjusted maxLength value
                                                                message: 'Message must be less than 200 characters'
                                                            }
                                                        })}
                                                        className={`form-control `}
                                                        id="message"
                                                        aria-describedby="messageHelp"
                                                        placeholder="Enter Message ..."
                                                    />

                                                    <small id="messageHelp" className="form-text">
                                                        <p className='err'>{formState.errors.message?.message}</p>
                                                    </small>
                                                </fieldset>
                                            </div>
                                            <div className="col-lg-12">
                                                <fieldset>
                                                    <button type="submit" id="form-submit" className="orange-button">Send Message</button>
                                                </fieldset>
                                            </div>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>

                    </div>

                </div>
            </div>
            <div className="row ms-2 mt-4 justify-content-center">

                                <ul className={` d-flex w-25 justify-content-between`}>
                                    <li className='nav-link'><a className={`${styles.social_links}`} href="#"><i className={`${styles.social_links} fab fa-facebook fs-4 text-muted`} /></a></li>
                                    <li className='nav-link'><a href="https://x.com/minthu" ><i className={`${styles.social_links} fab fa-twitter fs-4 text-muted`} /></a></li>
                                    <li className='nav-link'><a href="#"><i className={`${styles.social_links} fab fa-linkedin fs-4 text-muted`} /></a></li>
                                    <li className='nav-link'><a href="#"><i className={`${styles.social_links} fab fa-instagram fs-4 text-muted`} /></a></li>
                                </ul>
                            </div>

        </>
    )
}

export default Contact