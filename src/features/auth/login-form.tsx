import { Button } from "@/shared/ui/kit/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/shared/ui/kit/form";
import { Input } from "@/shared/ui/kit/input";
import { useForm } from "react-hook-form";
import z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { publicRqClient } from "@/shared/api/instance";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "@/shared/model/routes";
import { useSessionStore } from "@/shared/model/session";

const loginSchema = z.object({
  email: z
    .string({
      required_error: "Email обязателен",
    })
    .email("Неверный email"),
  password: z
    .string({
      required_error: "Пароль обязателен",
    })
    .min(6, "Пароль должен быть не менее 6 символов"),
});

export function LoginForm() {
  const form = useForm({ resolver: zodResolver(loginSchema) });

  const { login } = useSessionStore();

  const navigate = useNavigate();

  const loginMutation = publicRqClient.useMutation("post", "/auth/login", {
    onSuccess(data) {
      login(data.accessToken);
      navigate(ROUTES.HOME);
    },
  });

  const handleLogin = (data: { email: string; password: string }) => {
    loginMutation.mutate({ body: data });
  };

  const onSubmit = form.handleSubmit(handleLogin);

  return (
    <Form {...form}>
      <form className="flex flex-col gap-4" onSubmit={onSubmit}>
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input placeholder="admin@gmail.com" {...field} />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Пароль</FormLabel>
              <FormControl>
                <Input placeholder="******" type="password" {...field} />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />

        {loginMutation.isError && (
          <p className="text-destructive text-sm">
            {loginMutation.error.message}
          </p>
        )}

        <Button disabled={loginMutation.isPending} type="submit">
          Войти
        </Button>
      </form>
    </Form>
  );
}
