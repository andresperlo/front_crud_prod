import React from 'react'
import { Formik, Form, Field } from 'formik'
import { Container } from 'react-bootstrap'

const FormLogin = () => {

    return (
        <Formik
            initialValues={{ usuario: '', contraseña: ''}}
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
                    <h2 className={'text-center my-3'}>Iniciar Sesion</h2>
                    < Form >
                        <label>Usuario</label>
                        <Field name='usuario' value={values.usuario} className={`form-control ${errors.usuario && touched.usuario && 'is-invalid'}`} />
                        {errors.usuario && touched.usuario && errors.usuario}
                        <br />
                        <label className={'mt-3'}>Contraseña</label>
                        <Field name='contraseña' value={values.contraseña} className={`form-control ${errors.contraseña && touched.contraseña && 'is-invalid'}`} />
                        {errors.contraseña && touched.contraseña && errors.contraseña}
                        <br />
                     
                        <input type={'submit'} value='Iniciar Sesion' className={'btn btn-primary w-100 mt-3'} />
                    </Form>
                </Container>
            )}
        </Formik >
    )
}

export default FormLogin
