'use client'

import './AuthForm.scss'
import React, {useEffect} from "react";
import {useAuthForm} from "@/features/auth/lib/hooks/useAuthForm";
import {FormField} from "@/shared/ui/FormField/FormField";
import {Button} from "@/shared/ui/Button/Button";
import {FieldError} from "react-hook-form";
import {loginSchema, registerSchema} from "@/features/auth/lib/schemas/auth.schema";

interface AuthFormProps {
  mode: 'login' | 'register'
  onSuccess?: () => void;
}

const AuthForm = ({mode, onSuccess}: AuthFormProps) => {

  const {
    form,
    onSubmit,
    isLoading,
    apiError,
    isSubmitting,
    isValid,
  } = useAuthForm({mode, onSuccess})

  const {
    register,
    formState: {errors},
    watch
  } = form;

  const getError = (fieldName: string): FieldError | undefined => {
    return errors[fieldName as keyof typeof errors] as FieldError | undefined;
  };

  const email = watch('email');
  const password = watch('password');
  const confirmPassword = watch('confirmPassword');

  const isFormValid = React.useMemo(() => {
    try {
      if (mode === 'login') {
        loginSchema.parse({ email, password });
      } else {
        registerSchema.parse({ email, password, confirmPassword });
      }
      return true;
    } catch {
      return false;
    }
  }, [email, password, confirmPassword, mode]);



  return (
    <form
      className='auth-form'
      onSubmit={onSubmit}
      noValidate
    >
      <FormField
        label="Email"
        name="email"
        type="email"
        autoComplete="email"
        placeholder=" "
        register={register}
        error={getError('email')}
        disabled={isSubmitting}
      />

      <FormField
        label="Пароль"
        name="password"
        register={register}
        type="password"
        autoComplete={mode === 'login' ? 'current-password' : 'new-password'}
        placeholder=" "
        error={getError('password')}
        disabled={isSubmitting}
      />
      {mode === 'register' && (
        <FormField
          label="Повторите пароль"
          name="confirmPassword"
          type="password"
          register={register}
          autoComplete={'new-password'}
          placeholder=" "
          error={getError('confirmPassword')}
          disabled={isSubmitting}
        />
      )}

      <Button
        type="submit"
        size="lg"
        variant="primary"
        isLoading={isLoading || isSubmitting}
        disabled={!isFormValid || isSubmitting}
      >
        Let’s Start
      </Button>


    </form>
  )
}

export default AuthForm