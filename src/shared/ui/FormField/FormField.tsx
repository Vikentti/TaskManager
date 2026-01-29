'use client'

import './FormField.scss'
import classNames from 'classnames'
import React from "react";
import {FieldError, UseFormRegister} from "react-hook-form";

interface FormFieldProps extends React.InputHTMLAttributes<HTMLInputElement> {
  className?: string
  label: string
  name: string
  register: UseFormRegister<any>
  error?: FieldError
  type?: string
}

export const FormField = React.forwardRef<HTMLInputElement, FormFieldProps>(({
                                                                               className,
                                                                               label,
                                                                               name,
                                                                               register,
                                                                               error,
                                                                               type = 'text',
                                                                               disabled,
                                                                               ...props
                                                                             }, ref) => {

  const fieldProps = register(name);

  

  return (
    <div className={classNames(className, 'form-field')}>
      <input
        className={classNames('form-field__input',
          {'form-field__input--error': error})}
        id={name}
        type={type}
        disabled={disabled}
        {...fieldProps}
        {...props}
      />
      <label className="form-field__label" htmlFor={name}>
        {label}
      </label>
    </div>
  )
})

FormField.displayName = 'FormField'