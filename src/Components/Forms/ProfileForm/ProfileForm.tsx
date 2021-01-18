// import React from 'react';
// import { Formik, Form } from 'formik';
// import FormControlLabel from '@material-ui/core/FormControlLabel';
// import Checkbox from '@material-ui/core/Checkbox';



// const ProfileForm = () => {

//   const initialValues = {email: '', password: ''}
  
//     <Formik
    
//       initialValues = {initialValues}

//       validate={values => {
//         const errors: Partial<Values> = {};
//         if (!values.email) {
//           errors.email = 'Required';
//         } else if (
//           !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)
//         ) {
//           errors.email = 'Invalid email address';
//         }
//         return errors;
//       }}
//       onSubmit={(values, { setSubmitting }) => {
//         setTimeout(() => {
//           setSubmitting(false);
//           alert(JSON.stringify(values, null, 2));
//         }, 500);
//       }}
//     >
//       {({ submitForm, isSubmitting }) => (
//         <Form>
//             <FormControlLabel
//                 control={
//                             <Checkbox
//                                 //checked={state.checkedF}
//                                 //onChange={handleChange}
//                                 name="checkedB"
//                                 color="primary"
//                             />
//                         }
//                 label="В поисках работы"
//             />
//         </Form>
//       )}
//     </Formik>
// }

// export default ProfileForm


import * as React from 'react';
 import {
   Formik,
   FormikHelpers,
   FormikProps,
   Form,
   Field,
   FieldProps,
 } from 'formik';
 
 interface MyFormValues {
   firstName: string;
 }
 
const ProfileForm: React.FC<{}> = () => {
   const initialValues: MyFormValues = { firstName: '' };
   return (
     <div>
       <h1>My Example</h1>
       <Formik
         initialValues={initialValues}
         onSubmit={(values, actions) => {
           console.log({ values, actions });
           alert(JSON.stringify(values, null, 2));
           actions.setSubmitting(false);
         }}
       >
         <Form>
           <label htmlFor="firstName">First Name</label>
           <Field id="firstName" name="firstName" placeholder="First Name" />
           <button type="submit">Submit</button>
         </Form>
       </Formik>
     </div>
   );
 };

export default ProfileForm