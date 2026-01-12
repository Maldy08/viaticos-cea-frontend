import { ErrorMessage, Field, Form, Formik } from "formik"
import * as Yup from 'yup';
import { ViaticosLayout } from "../layout/ViaticosLayout"
import { useAuthStore, useLocalData } from "../../hooks";

type Props = {
    password:string
    confirmPassword:string
}

const initialValues : Props = {
    password:'',
    confirmPassword:''
}
const validationSchema = 
    Yup.object({
        password: Yup.string().required(),
        confirmPassword: Yup.string().required()
      
    });

export const CambiarPass = () => {

    const {user, startUpdatePassword } = useAuthStore()

    return (
        <ViaticosLayout>
            <div className="row d-flex justify-content-center mt-5">
                <div className="col-md-4">
                      <h3>Cambiar contraseña</h3>
                      <hr />

                    <Formik
                        initialValues={ initialValues }
                        validationSchema={ validationSchema }
                        onSubmit={ async ( values ) =>  {
                            //console.log( values );
                            await startUpdatePassword(user.Id,values.password)
                        }}
                    >
                        {
                            () => (

                                <Form>
                                    <div className="form-group mb-2">
                                        <Field 
                                            name="password" 
                                            type="text" 
                                            className="form-control text-uppercase "
                                            placeholder="Nueva contraseña" 
                                        />
                                        <ErrorMessage name="password" component="span"/>
                                    </div>
                                    <div className="form-group mb-2">
                                        <Field 
                                                name="confirmPassword" 
                                                type="password" 
                                                className="form-control text-uppercase"
                                                placeholder="Confirmar nueva contraseña" 
                                            />
                                        <ErrorMessage name="confirmPassword" component="span"/>

                                    </div>
                                    <div className="d-grid gap-2">
                                        <button 
                                            type="submit" 
                                            className="btnSubmit text-uppercase"
                                        >
                                            Guardar
                                        </button>
                                    </div>
                                </Form>
                            )
                        }

                    </Formik> 
                </div>
         

            </div>

        </ViaticosLayout>
    )

}