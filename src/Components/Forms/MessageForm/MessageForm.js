import React from 'react';
import classes from './MessageForm.module.css';
import { Field } from 'redux-form';
import { requiredField, maxLength } from '../../../utilits/validators/validators';
import Input from '../../Textarea/Input';

const maxLengthValue100 = maxLength(5);

const MessageForm = (props) => {
    debugger;
    return (
        <form onSubmit={props.handleSubmit} >
            <Field component={Input} placeholder={""} name={"messageInput"} validate={[requiredField, maxLengthValue100]} />
            <div>
                <button onSubmit={props.onSubmit}>Отправить</button>
            </div>

        </form>
    )
};

export default MessageForm;