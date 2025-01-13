import {
  userSignupSchema,
  UserSignupInput,
} from "@/lib/validations/user.validations";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import AuthForm from "./auth-form";
import { AuthInput } from "./auth-input";
import { Button } from "@/components/ui/button";
import { Link, useNavigate } from "react-router";
import { useState } from "react";
import { AuthPasswordInput } from "./password-input";
import { useToast } from "@/hooks/use-toast";
import { Spinner } from "../percept-ui/spinner";
import { register } from "@/lib/services/auth.actions";

const RegistrationForm = () => {
  const [loading, setLoading] = useState<boolean>(false);

  const { toast } = useToast();

  const navigate = useNavigate();

  const form = useForm<UserSignupInput>({
    resolver: zodResolver(userSignupSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const signup = async (data: UserSignupInput) => {
    setLoading(true);
    const res = await register(data.name, data.email, data.password);
    toast({
      title: res.data.message,
      variant: res.status === 201 ? "default" : "destructive",
    });
    setLoading(false);
    navigate("/auth/login");
  };

  return (
    <AuthForm form={form}>
      <form
        className="flex flex-col w-full gap-4"
        onSubmit={form.handleSubmit(signup)}
      >
        <AuthInput
          form={form}
          label="Full Name"
          name="name"
          disabled={loading}
          placeholder="John Doe"
        />
        <AuthInput
          form={form}
          label="Email Address"
          name="email"
          disabled={loading}
          placeholder="john.doe@gmail.com"
        />
        <AuthInput
          form={form}
          label="Password"
          name="password"
          disabled={loading}
          placeholder="******"
          type="password"
        />
        <AuthPasswordInput
          form={form}
          label="Confirm Password"
          name="confirmPassword"
          disabled={loading}
          placeholder="******"
        />
        <Button disabled={loading} type="submit" className="w-full">
          {loading ? <Spinner /> : "Register"}
        </Button>
        <div>
          <p className="text-sm text-end">
            Already have an account?{" "}
            <Link to="/auth/login" className="text-sky-600">
              Login
            </Link>
          </p>
        </div>
      </form>
    </AuthForm>
  );
};

export default RegistrationForm;
