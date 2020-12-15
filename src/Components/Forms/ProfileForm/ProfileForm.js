import * as React from 'react';
import { Formik, Form} from 'formik';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';

interface Values {
  email: string;
  password: string;
}

function ProfileForm() {
  return (
    <Formik
      initialValues={{
        email: '',
        password: '',
      }}
      validate={values => {
        const errors: Partial<Values> = {};
        if (!values.email) {
          errors.email = 'Required';
        } else if (
          !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)
        ) {
          errors.email = 'Invalid email address';
        }
        return errors;
      }}
      onSubmit={(values, { setSubmitting }) => {
        setTimeout(() => {
          setSubmitting(false);
          alert(JSON.stringify(values, null, 2));
        }, 500);
      }}
    >
      {({ submitForm, isSubmitting }) => (
        <Form>
            <FormControlLabel
                control={
                            <Checkbox
                                //checked={state.checkedF}
                                //onChange={handleChange}
                                name="checkedB"
                                color="primary"
                            />
                        }
                label="В поисках работы"
            />
        </Form>
      )}
    </Formik>
  );
}

export default ProfileForm;