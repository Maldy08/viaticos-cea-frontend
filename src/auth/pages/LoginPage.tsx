
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from 'yup';
import { useAuthStore } from "../../hooks";
import { AuthLayout } from "../layout/AuthLayout"
import '../styles/LoginPage.css';



export const LoginPage = () => {
    
    const { startLogin, status } = useAuthStore();
    const disabled = status === 'checking';

  return (
    

    <AuthLayout>
        <div className="loginPage">
            <div className="row d-flex justify-content-center">
                <div className="col-md-6 login-form-1 login-container">
                    <h3>Acceso al Sistema</h3>
                    <Formik
                        initialValues={ { 
                            login: '',
                            password: ''
                        }}

                        onSubmit={ async ( { login, password } ) =>{
                           await startLogin( login, password );
                        }}

                        validationSchema={
                            Yup.object({
                                login: Yup.string()
                                        .required('Requerido'),
                                password: Yup.string()
                                        .required('Requerido')
                            })
                        }
                    >
                        {
                            () => (
                                <Form>
                                    <div className="form-group mb-2">
                                        <Field 
                                            name="login" 
                                            type="text" 
                                            className="form-control"
                                            placeholder="Usuario" 
                                         />
                                         <ErrorMessage name="login" component="span"/>
                                    </div>
                                    <div className="form-group mb-2">
                                        <Field 
                                                name="password" 
                                                type="password" 
                                                className="form-control"
                                                placeholder="Password" 
                                            />
                                         <ErrorMessage name="password" component="span"/>

                                    </div>
                                    <div className="d-grid gap-2">
                                        <button 
                                            type="submit" 
                                            className="btnSubmit"
                                            disabled={ disabled }
                                         >Iniciar Sesi??n
                                         </button>
                                    </div>
                                </Form>
                            )
                        }
                    </Formik>
                </div>
            </div>

            <div className="row d-flex justify-content-center">
                <div className="col-md-6">
                    <div className="error-message mt-5">
                        <p className="text-center">{ status }</p>
                    </div> 
                </div>
            </div>
        </div>
    </AuthLayout>
    
  )
}


