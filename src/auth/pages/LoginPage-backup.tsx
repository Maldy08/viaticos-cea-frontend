import { ChangeEvent, useState } from "react";
import { Formik, Field, Form, ErrorMessage } from "formik";
import { useAuthStore } from "../../hooks";
import { AuthLayout } from "../layout/AuthLayout"
import '../styles/LoginPage.css';

const loginFormFields = {
    loginUser: '',
    loginPassword: ''
}

export const LoginPage = () => {
    const { startLogin, status } = useAuthStore();
    const [formData, setFormData] = useState({
        login: '',
        password: ''
    });

    const errorMessage = "Error"

    const { login, password } = formData;
    
    const onChange = ( event: ChangeEvent<HTMLInputElement> ) => {
        setFormData( prev => ({
           ...prev,
           [ event.target.name ] : event.target.value
        }))
     }

    const loginSubmit = ( event: React.FormEvent<HTMLFormElement> ) => {
        event.preventDefault();
        //startLogin( login, password );
    }

  return (

    <AuthLayout>
        <div className="loginPage">
            <div className="row d-flex justify-content-center">
                <div className="col-md-6 login-form-1 login-container">
                    <h3>Acceso al Sistema</h3>
                    <form onSubmit={ loginSubmit }>
                        <div className="form-group mb-2">
                            <input 
                                type="text"
                                className="form-control"
                                placeholder="Usuario"
                                name='login'
                                value={ login }
                                onChange={ onChange }
                             
                            />
                        </div>
                        <div className="form-group mb-2">
                            <input
                                type="password"
                                className="form-control"
                                placeholder="Contraseña"
                                name='password'
                                value={ password }
                                onChange={ onChange }
                            />
                        </div>
                        <div className="d-grid gap-2">
                            <input 
                                type="submit"
                                className="btnSubmit"
                                value="Iniciar Sesión" 
                            />
                        </div>
                    </form>
                </div>
                
            </div>

            <div className="row d-flex justify-content-center">
                <div className="col-md-6">
                    <div className="error-message mt-5">
                        <p className="text-center">{errorMessage}</p>
                    </div> 
                </div>
            </div>
        </div>
    </AuthLayout>
    
  )
}


