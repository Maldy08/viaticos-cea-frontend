import { useState } from "react";
import { useAuthStore } from "../../hooks";
import { AuthLayout } from "../layout/AuthLayout"
import '../styles/LoginPage.css';

const loginFormFields = {
    loginUser: '',
    loginPassword: ''
}

export const LoginPage = () => {
    const { startLogin, errorMessage, status } = useAuthStore();
    const [login, setLogin] = useState(loginFormFields.loginUser);
    const [pass, setPass] = useState(loginFormFields.loginPassword);

    const onChangeLogin = (event : React.ChangeEvent<HTMLInputElement>) => {
        setLogin( event.target.value );
    }

    const onChangePass = ( event: React.ChangeEvent<HTMLInputElement>) => {
        setPass( event.target.value );
    }

    const loginSubmit = ( event: React.FormEvent<HTMLFormElement> ) => {
        event.preventDefault();
        startLogin( login, pass );
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
                                name='loginUser'
                                value={ login }
                                onChange={ onChangeLogin }
                             
                            />
                        </div>
                        <div className="form-group mb-2">
                            <input
                                type="password"
                                className="form-control"
                                placeholder="Contraseña"
                                name='loginPassword'
                                value={ pass }
                                onChange={ onChangePass }
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
        </div>
    </AuthLayout>
  )
}
