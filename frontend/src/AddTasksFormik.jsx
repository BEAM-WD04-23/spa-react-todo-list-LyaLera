import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup'

const AddTasksFormik = ({addTask}) => (
  <Formik 
  initialValues={{textOfTask: ""}}
  validationSchema={Yup.object({
    textOfTask: Yup.string()
      .max(15, 'Must be 15 characters or less')
      .required('Required')
      .min(3, 'Must be 3 characters or more')
      .matches(/[A-Za-z0-9]/, "Only letters and numbers are allowed")
  })}
  onSubmit={(values, {resetForm}) => {
    addTask(values.textOfTask)
    resetForm({values: {textOfTask: ""}})
  }}>
    <Form>
        <Field name="textOfTask" type="text"/>
        <button type='submit'>Add task</button>
        <div><ErrorMessage name="textOfTask"/></div>
    </Form>
  </Formik>
)

export default AddTasksFormik