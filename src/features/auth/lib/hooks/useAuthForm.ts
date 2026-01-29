import {
  LoginFormData,
  loginSchema, RegisterFormData,
  registerSchema
} from "@/features/auth/lib/schemas/auth.schema";
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {apiAuthService} from "@/shared/api";

type AuthFormData = LoginFormData | RegisterFormData

interface UseAuthFormOptions {
  mode: 'login' | 'register'
  onSuccess?: () => void
}

export const useAuthForm = ({mode, onSuccess}: UseAuthFormOptions) => {

  const login = async (data: LoginFormData) => {
    await apiAuthService.login(data);
    onSuccess?.();
  };

  const register = async (data: RegisterFormData) => {
    await apiAuthService.register({
      email: data.email,
      password: data.password
    });
    onSuccess?.();
  };

  const schema = mode === "login" ? loginSchema : registerSchema

  const form = useForm<AuthFormData | RegisterFormData>({
    resolver: zodResolver(schema),
    mode: "onChange",

    defaultValues: mode === "login"
      ? {email: "", password: ""}
      : {email: "", password: "", confirmPassword: ""}

  })

  const onSubmit = async (data: AuthFormData) => {
    if (mode === "login") {
      await login(data as LoginFormData);
    }
    if (mode === "register") {
      await register(data as RegisterFormData)
    }
  }


  return {
    form,
    onSubmit: form.handleSubmit(onSubmit),
    isLoading: form.formState.isSubmitting,
    apiError: null,
    isSubmitting: form.formState.isSubmitting,
    isValid: form.formState.isValid,
    mode,
  }
}

