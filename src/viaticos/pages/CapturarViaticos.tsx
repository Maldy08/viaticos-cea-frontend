import { useEffect } from "react";
import { Formik } from "formik";
import * as Yup from 'yup';
import { 
         useEmpleadosStore, 
         useLocalData, 
         usePartidasStore, 
         useViaticosStore
       } from "../../hooks";

import { Viaticos, ViaticosPart } from "../../interfaces/interfaces";
import { ViaticosLayout } from "../layout/ViaticosLayout"
import "react-datepicker/dist/react-datepicker.css";
import '../styles/CapturarViaticos.css';
import { CapturarViaticosForm } from "../components";

interface Props {
  empleado:number;
  idoficina:number
  ejercicio:number;
  fecha: Date;
  estatus:number;
  noViat:number;
  fechasal: Date;
  fechareg: Date;
  dias:number;
  origenid:number;
  destinoid:number;
  motivo:string;
  inforact:string;
}

export const CapturarViaticos = () => {
//idoficina,ejercicio,fecha,estatus,noViat,fechasal,fechareg,dias,origenid,destinoid,motivo,inforact

  let isModificarViatico = false;
 
  let { noEmpleado, nombreCompleto, deptoDescripcion, descripcionPuesto, oficina } = useLocalData();
  const { empleado, startLoadingEmpleadoById } = useEmpleadosStore();
  // const { openEmpleadosModal, empleadoModalSelected, isModificarViatico, ViaticoModificar } = useUiStore();
  const { startAddNewPartidas } = usePartidasStore();
  const { startGetConsecutivo, isLoading: isLoadingViatico, startAddNewViatico, startGetViaticoByEjercicioOficinaNoviat, viatico, startUpdateViatico } = useViaticosStore();


 useEffect(() => {
  startLoadingEmpleadoById( noEmpleado );
}, [])


let initialValues = {} as Props;

  if(Object.keys(viatico).length !== 0) {
    
      initialValues.idoficina = viatico.oficina;
      initialValues.ejercicio = viatico.ejercicio;
      initialValues.fecha = new Date(viatico.fecha);
      initialValues.estatus = viatico.estatus;
      initialValues.noViat = viatico.noViat;
      initialValues.fechasal = new Date(viatico.fechaSal);
      initialValues.fechareg = new Date(viatico.fechaReg);
      initialValues.dias = viatico.dias;
      initialValues.origenid = empleado.municipio;
      initialValues.destinoid = viatico.destinoId;
      initialValues.motivo = viatico.motivo;
      initialValues.inforact =viatico.inforAct;
      isModificarViatico = true;
  }
  else{
      initialValues.idoficina = empleado.oficina;
      initialValues.ejercicio = 2023;
      initialValues.fecha = new Date();
      initialValues.estatus = 0;
      initialValues.noViat = 0;
      initialValues.fechasal = new Date();
      initialValues.fechareg = new Date();
      initialValues.dias = 1;
      initialValues.origenid = empleado.municipio;
      initialValues.destinoid = 0;
      initialValues.motivo = "";
      initialValues.inforact = "";
  }

  


  return (
    <ViaticosLayout>
      <div className="capturar-viaticos">
        <div className="header">
          <div className="row">
            <div className="col-md-2">
              <label htmlFor="empleado" className="form-label mb-2">EMPLEADO</label>
              <span className="form-control">{ noEmpleado }</span>
            </div>
            <div className="col">
                <span className="d-block nombre-completo">{ nombreCompleto }</span>
                <span className="d-block">{ deptoDescripcion }</span>
                <span className="d-block">{ descripcionPuesto }</span>
            </div>
          </div>
        </div>

        <hr />

        <Formik
             initialValues={ initialValues }
              validationSchema={
                  Yup.object({
                    destinoid: Yup.number()
                                  .integer()
                                  .not([0],'* Seleccione una opcion'),
                    motivo: Yup.string()
                                .max(300,'* Debe de contener 300 caracteres o menos')
                                .required('* Este campo es requerido'),
                    inforact: Yup.string()
                                .max(500,'* Debe de contener 500 caracteres o menos')
                                .required('* Este campo es requerido')
                    
                  })
              }
              
              onSubmit={ async ( values, { setSubmitting,setFieldValue, setStatus } ) => {
                 
                  const consecutivo = await startGetConsecutivo( values.ejercicio, values.idoficina );
                  const { noEmpleado:empCrea } = useLocalData()

                  const newViatico = {
                      oficina:values.idoficina,
                      ejercicio: values.ejercicio,
                      noViat:consecutivo + 1,
                      fecha: new Date(values.fecha),
                      noEmp: empleado.empleado,
                      origenId: values.origenid,
                      destinoId: values.destinoid,
                      motivo: values.motivo,
                      fechaSal: new Date(values.fechasal),
                      fechaReg: new Date(values.fechareg),
                      dias: values.dias,
                      inforFecha: new Date(values.fechareg),
                      inforAct: values.inforact,
                      nota:'nada',
                      estatus:1,
                      pol:0,
                      polMes:0,
                      caja:0,
                      fechaMod: new Date(values.fecha),
                      cajaVale:0,
                      cajaRepo:0,
                      noEmpCrea:empCrea,
                      inforResul:'LAS ACTIVIDADES QUE SE ASIGNARON EN LA COMISION FUERON REALIZADAS SATISFACTORIAMENTE'
                  } as Viaticos;

                  const newPartida = {
                    partida:37501,
                    ejercicio: 2023,
                    importe:0,
                   // importe: importePorDias( values.dias ),
                    noviat: consecutivo + 1,
                    oficina: values.idoficina

                  } as ViaticosPart;
                    
                  setSubmitting(true);

                  if(isModificarViatico) {

                    const updateViatico = {
                      oficina:values.idoficina,
                      ejercicio: values.ejercicio,
                      noViat:values.noViat,
                      fecha: new Date(values.fecha),
                      origenId: values.origenid,
                      destinoId: values.destinoid,
                      motivo: values.motivo,
                      fechaSal: new Date(values.fechasal),
                      fechaReg: new Date(values.fechareg),
                      dias: values.dias,
                      inforFecha: new Date(values.fechareg),
                      inforAct: values.inforact,
                      fechaMod: new Date(values.fecha),
                      inforResul:'LAS ACTIVIDADES QUE SE ASIGNARON EN LA COMISION FUERON REALIZADAS SATISFACTORIAMENTE'
                  } as Viaticos;


                    await startUpdateViatico( updateViatico ).then( () => {
                    
                      alert('Viatico actualizado correctamente!');
                      setFieldValue('noViat', 0);
                      setFieldValue('fecha',new Date());
                      setFieldValue('estatus',0);
                      setFieldValue('fechasal', new Date());
                      setFieldValue('fechareg', new Date());
                      setFieldValue('dias', 1);
                      setFieldValue('origenid',empleado.municipio);
                      setFieldValue('destinoid',0);
                      setFieldValue('motivo',"");
                      setFieldValue('inforact', "");
                      setStatus('submitted');
                      setSubmitting(false);
                      return ;

                    }).catch( (error) => {
                      alert( error );
                    }).finally( () => setSubmitting( false ));

                    
                  }
                 
                  else {

                    await startAddNewViatico( newViatico ).then( () => {
                        
                      startAddNewPartidas( newPartida );
                          alert(`Viatico generado con el numero: ${newViatico.noViat}`);
                          setFieldValue('noViat', 0);
                          setFieldValue('fecha',new Date());
                          setFieldValue('estatus',0);
                          setFieldValue('fechasal', new Date());
                          setFieldValue('fechareg', new Date());
                          setFieldValue('dias', 1);
                          setFieldValue('origenid',empleado.municipio);
                          setFieldValue('destinoid',0);
                          setFieldValue('motivo',"");
                          setFieldValue('inforact', "");
                          setStatus('submitted');
                          setSubmitting(false);
                          
                          window.open( "formato-comision/"+ newViatico.oficina + "/" + newViatico.ejercicio + "/" + newViatico.noViat ,  '_blank', 'location=yes,height=570,width=520,scrollbars=yes,status=yes');
                          window.open( "recibo-viatico/"+ newViatico.oficina + "/" + newViatico.ejercicio + "/" + newViatico.noViat ,  '_blank', 'location=yes,height=570,width=520,scrollbars=yes,status=yes');
                          window.open( "informe-actividades/"+ newViatico.oficina + "/" + newViatico.ejercicio + "/" + newViatico.noViat ,  '_blank', 'location=yes,height=570,width=520,scrollbars=yes,status=yes');
                          
                          return;

                    }).catch((error) => {
                      alert(error);
                    }).finally(() => setSubmitting(false));
               
                  }
              }}
              
              enableReinitialize={ true }
              
          >
            {
              ({ values, setFieldValue, isSubmitting, status }) => (

                <CapturarViaticosForm 
                    values={ values } 
                    setFieldValue={ setFieldValue } 
                    isSubmitting={ isSubmitting } 
                    status={ status } 
                    empleado={ empleado }
                />
                
              )
            }

        </Formik>

      </div>
    </ViaticosLayout>
  )
}
