import React from 'react';
import {useState , useEffect} from 'react';
// import logo from './logo.svg';
import './App.css';
import './payment.css';
import './vs.css';
import './vs1.css';

function App() {

  
  const initialValues = { username: "", email: "", password: "" };
  const [formValues, setFormValues] = useState(initialValues);
  const [formErrors, setFormErrors] = useState({});
  const [isSubmit, setIsSubmit] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setFormErrors(validate(formValues));
    setIsSubmit(true);
  };

  useEffect(() => {
    console.log(formErrors);
    if (Object.keys(formErrors).length === 0 && isSubmit) {
      console.log(formValues);
    }
  }, [formErrors]);
  const validate = (values) => {
    const errors = {};
    const regex = /^[0]?[1234567890]\d{15}$/;
    const cv=/^\d{3}$/
    if (!values.name) {
      errors.name = "Name is required!";
    }
    if (!values.cardno) {
      errors.cardno = "Card Number are required!";
    } else if (!regex.test(values.cardno)) {
      errors.cardno = "Invalid Card Number!";
    }

    if (!values.cvv) {
      errors.cvv = "CVV is Required !";
    } else if (!cv.test(values.cvv)) {
      errors.cvv = "Invalid CVV !";
    }


    if (!values.month) {
      errors.month = "Month is required";
    } else if (values.month < 1 || values.month >12) {
      errors.month = "Invalid Month";
    } 
    if (!values.year) {
      errors.year = "Year is required";
    } else if ((values.month < 9 && values.year === 2022) || values.year <2022) {
      errors.month = "Invalid Year";
    } 
    return errors;
  };
  return (

    
    <div className="container">
      
     


        

        <div className="row">
            
            <div className="col-lg-4 mb-lg-0 mb-3">
                <div className="card p-3">
                    <div className="img-box">
                    <img src={process.env.PUBLIC_URL+"1.png"}  alt="logo" />
                    </div>
                    <div className="number">
                        <label className="fw-bold" for="">**** **** **** 1060</label>
                    </div>
                    <div className="d-flex align-items-center justify-content-between">
                        <small><span className="fw-bold">Expiry date:</span><span>10/16</span></small>
                        <small><span className="fw-bold">Name:</span><span>Kumar</span></small>
                    </div>
                </div>
            </div>
            <div className="col-lg-4 mb-lg-0 mb-3">
                <div className="card p-3">
                    <div className="img-box">
                    <img src={process.env.PUBLIC_URL+"2.png"}  alt="logo" />
                    </div>
                    <div className="number">
                        <label className="fw-bold">**** **** **** 1060</label>
                    </div>
                    <div className="d-flex align-items-center justify-content-between">
                        <small><span className="fw-bold">Expiry date:</span><span>10/16</span></small>
                        <small><span className="fw-bold">Name:</span><span>Kumar</span></small>
                    </div>
                </div>
            </div>
            <div className="col-lg-4 mb-lg-0 mb-3">
                <div className="card p-3">
                    <div className="img-box">
                    <img src={process.env.PUBLIC_URL+"3.png"}  alt="logo" />
                    </div>
                    <div className="number">
                        <label className="fw-bold">**** **** **** 1060</label>
                    </div>
                    <div className="d-flex align-items-center justify-content-between">
                        <small><span className="fw-bold">Expiry date:</span><span>10/16</span></small>
                        <small><span className="fw-bold">Name:</span><span>Kumar</span></small>
                    </div>
                </div>
            </div>
            <div className="col-12 mt-4">
                <div className="card p-3">
                    <p className="mb-0 fw-bold h4">Payment Methods</p>
                </div>
            </div>
            <div className="col-12">
                <div className="card p-3">
                    <div className="card-body border p-0">
                        <p>
                            <a className="btn btn-primary w-100 h-100 d-flex align-items-center justify-content-between"
                                data-toggle="collapse" href="#collapseExample" role="button" aria-expanded="true"
                                aria-controls="collapseExample">
                                <span className="fw-bold">PayPal</span>
                                <span className="fab fa-cc-paypal">
                                </span>
                            </a>
                        </p>
                        <div className="collapse p-3 pt-0" id="collapseExample">
                            <div className="row">
                                <div className="col-8">
                                </div>
                                <div className="cart-items">
                                </div>
                                <div className="cart-total">
                                    <strong className="cart-total-title">Total</strong>
                                    <span className="cart-total-price">$0</span>
                                </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="card-body border p-0">
                        <p>
                            <a className="btn btn-primary p-2 w-100 h-100 d-flex align-items-center justify-content-between"
                                data-toggle="collapse" href="#collapseExample" role="button" aria-expanded="true"
                                aria-controls="collapseExample">
                                <span className="fw-bold">Credit Card</span>
                                <span className="">
                                    <span className="fab fa-cc-amex"></span>
                                    <span className="fab fa-cc-mastercard"></span>
                                    <span className="fab fa-cc-discover"></span>
                                </span>
                            </a>
                        </p>
                        <div className="collapse show p-3 pt-0" id="collapseExample">
                            <div className="row">
                                <div className="col-lg-5 mb-lg-0 mb-3">
                                <img src={process.env.PUBLIC_URL+"mypic.jpg"}className="img-fluid"   alt="logo" />
                                
                                </div>
                                <div className="col-lg-7">
                                <form className='form' onSubmit={handleSubmit}>
                                {/* <form  className="form" noValidate autofocus> */}
                                        <div className="row">
                                            <div className="col-12">
                                                <div className="form__div">
                                                    <input type="text" name='cardno' className="form-control" placeholder=" " id="cardnumber" autocomplete="off"
                                                    value={formValues.cardno}
                                                    onChange={handleChange}/>
                                                  
                                                        
                                                    <label htmlFor="" className="form__label">Card Number</label>
                                                  
                                                <p className='errors'>{formErrors.cardno}</p>
                                                </div>
                                            </div>

                                            <div className="col-5">
                                                <div className="form__div">
                                                    <input type="text" className="form-control" name='month' id="month" placeholder=" " autocomplete="off" min={1} max={12}
                                                    value={formValues.month}
                                                    onChange={handleChange}/>
                                                    <label htmlFor="" className="form__label">Month</label>
                                                    
                                                
                                                <p className='errors'>{formErrors.month}</p>
                                                </div>
                                            </div>

                                           <div className="col-3">
                                                <div className="form__div">
                                                    <input type="text" className="form-control" name='year' id="year" placeholder=" " autocomplete="off" min={2023}
                                                    value={formValues.year}
                                                    onChange={handleChange}/>
                                                    <label for="" className="form__label">Year</label>
                                                    
                                                
                                                <p className='errors'>{formErrors.year}</p>
                                                </div>
                                            </div>

                                            <div className="col-4">
                                                <div className="form__div">
                                                    <input type="password" name='cvv' className="form-control" placeholder=" " id="cvv"
                                                     value={formValues.cvv}
                                                     onChange={handleChange}/>
                                                    <label for="" className="form__label">cvv code</label>
                                                    <p className='errors'>{formErrors.cvv}</p>
                                                </div>
                                            </div>
                                            <div className="col-12">
                                                <div className="form__div">
                                                    <input type="text" className="form-control" placeholder=" " id="cardname" name='name' autocomplete="off" pattern="[a-z A-Z]{3,}" title="contain only alphabets"
                                                    value={formValues.name}
                                                    onChange={handleChange}/>
                                                   <label for="" className="form__label">name of the card</label>
                                                    <p className='errors'>{formErrors.name}</p>
                                            </div>
                                            </div>


                                            
                                            
{Object.keys(formErrors).length === 0 && isSubmit ? (
        <div className="col-lg-12 psuccess">
        <div className="col-lg-8 col-md-4 succ">PAYMENT SUCCESSFULL </div>
        <div className="col-lg-12 col-md-4">
<a className='col-lg-3 linkk' href='http://localhost/index' > OK </a></div>
</div>
        
      ) : 
        <pre> <div className="col-12">
        <div className='col-5'></div> 
        <button className='col-5'>Make Payment</button>
          {/* <input type="submit" name="" value="submit" className="btn btn-primary w-100"/> */}
      </div></pre>
      }
                                            
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div> 
          
        </div>
  

  



  );
}

export default App;
