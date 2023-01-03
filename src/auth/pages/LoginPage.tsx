import { AuthLayout } from "../layout/AuthLayout"
import '../styles/LoginPage.css';

export const LoginPage = () => {
  return (
    <AuthLayout>
        <div className="loginPage">
            <div className="row d-flex justify-content-center">
                <div className="col-md-6 login-form-1 login-container">
                    <h3>Acceso al Sistema</h3>
                    <form>
                        <div className="form-group mb-2">
                            <input 
                                type="text"
                                className="form-control"
                                placeholder="Usuario"
                                name='loginUser'
                            />
                        </div>
                        <div className="form-group mb-2">
                            <input
                                type="password"
                                className="form-control"
                                placeholder="Contraseña"
                                name='loginPassword'
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
