import React from 'react'
import { Formik, Form, Field } from 'formik'
import { Container } from 'react-bootstrap'

const FormFormik = () => {

    return (
        <Formik
            initialValues={{ usuario: '', contraseña: '', repetirContraseña: '', aceptarTerminos: 'false' }}
            validate={values => {
                const errors = {};
                if (!values.usuario) {
                    errors.usuario = 'Campo vacio';
                } else if (
                    !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.usuario)
                ) {
                    errors.usuario = 'Ingresaste un email invalido';
                }

                if (!values.contraseña) {
                    errors.contraseña = 'Campo vacio';
                }

                if (!values.repetirContraseña) {
                    errors.repetirContraseña = 'Campo vacio';
                }

                if (values.aceptarTerminos === 'false') {
                    errors.aceptarTerminos = 'Tenes que aceptar terminos y condiciones';
                }


                return errors;
            }}
            onSubmit={(values) => {
                console.log('values', values)
            }}
        >
            {({
                values,
                errors,
                touched,
                handleChange,
                handleBlur,
                handleSubmit,
                isSubmitting,
            }) => (
                <Container style={{ width: '30%' }}>
                    <h2 className={'text-center my-3'}>Registrarse</h2>
                    < Form >
                        <label>Usuario</label>
                        <Field name='usuario' value={values.usuario} className={`form-control ${errors.usuario && touched.usuario && 'is-invalid'}`} />
                        {errors.usuario && touched.usuario && errors.usuario}
                        <br />
                        <label className={'mt-3'}>Contraseña</label>
                        <Field name='contraseña' value={values.contraseña} className={`form-control ${errors.contraseña && touched.contraseña && 'is-invalid'}`} />
                        {errors.contraseña && touched.contraseña && errors.contraseña}
                        <br />
                        <label className={'mt-3'}>Repetir Contraseña</label>
                        <Field name='repetirContraseña' value={values.repetirContraseña} className={`form-control ${errors.repetirContraseña && touched.repetirContraseña && 'is-invalid'}`} />
                        {errors.repetirContraseña && touched.repetirContraseña && errors.repetirContraseña}
                        <br />
                        <input type={'checkbox'} className='my-3' value={values.aceptarTerminos}  onChange={(e) => {
                            if(e.target.value === 'false'){
                                values.aceptarTerminos = 'true'
                            }else{
                                values.aceptarTerminos = 'false'
                            }
                        }}/> <small>Acepto Terminos y Condiciones</small>
                        <br/>
                         <small style={{fontSize:'0.8rem', color:'red'}}>{errors.aceptarTerminos && touched.aceptarTerminos && errors.aceptarTerminos}</small>
                      
                        <input type={'submit'} value='Registrarse' className={'btn btn-primary w-100 mt-3'} />
                    </Form>
                </Container>
            )}
        </Formik >
    )
}

export default FormFormik
