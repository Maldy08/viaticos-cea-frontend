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
                <div className="col-sm-10 col-md-7 col-lg-5 col-xl-4 login-form-1 login-container">
                    <div className="login-header">
                        <span className="login-badge">CEA</span>
                        <h3>Acceso al Sistema</h3>
                        <p>Sistema de Control de Viaticos</p>
                    </div>
                    <Formik
                        initialValues={ { 
                            login: '',
                            password: '',
                            ejercicio: new Date().getFullYear(),
                        }}

                        onSubmit={ async ( { login, password,ejercicio } ) =>{
                           await startLogin( login, password,ejercicio );
                           //await startLogin( login.toUpperCase(), password.toUpperCase() );
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
                            ({initialValues}) => (     
                                <Form className="login-form">
                                    <div className="form-group mb-3">
                                        <label htmlFor="login" className="form-label">Usuario</label>
                                        <Field 
                                            id="login"
                                            name="login" 
                                            type="text" 
                                            className="form-control text-uppercase "
                                            placeholder="Usuario" 
                                         />
                                         <ErrorMessage name="login" component="span" className="login-field-error"/>
                                    </div>
                                    <div className="form-group mb-3">
                                        <label htmlFor="password" className="form-label">Password</label>
                                        <Field 
                                                id="password"
                                                name="password" 
                                                type="password" 
                                                className="form-control text-uppercase"
                                                placeholder="Password" 
                                            />
                                         <ErrorMessage name="password" component="span" className="login-field-error"/>

                                    </div>
                                    <div className="form-group mb-3">
                                        <label htmlFor="ejercicio" className="form-label">Ejercicio</label>
                                        <Field 
                                                id="ejercicio"
                                                name="ejercicio" 
                                                type="number" 
                                                min={initialValues.ejercicio - 1}
                                                max={initialValues.ejercicio}
                                                className="form-control text-uppercase"
                                                placeholder="Ejercicio" 
                                            />
                                         <ErrorMessage name="ejercicio" component="span" className="login-field-error"/>
                                    </div>
                                    <div className="d-grid gap-2">
                                        <button 
                                            type="submit" 
                                            className="btnSubmit text-uppercase"
                                            disabled={ disabled }
                                         >Iniciar Sesión
                                         </button>
                                    </div>
                                </Form>
                            )
                        }
                    </Formik>
                </div>
            </div>

            <div className="row d-flex justify-content-center">
                <div className="col-sm-10 col-md-7 col-lg-5 col-xl-4">
                    <div className="error-message">
                      { status != 'not-authenticated' &&  <p className="text-center">{ status }</p> } 
                    </div> 
                </div>
            </div>
        </div>
    </AuthLayout>
    
  )
}




