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
import { rqClient } from "@/shared/api/instance";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "@/shared/model/routes";

const registerSchema = z
  .object({
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
    confirmPassword: z.string().optional(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    path: ["confirmPassword"],
    message: "Пароль не совпадают",
  });

export function RegisterForm() {
  const form = useForm({ resolver: zodResolver(registerSchema) });

  const naviage = useNavigate();

  const registerMutation = rqClient.useMutation("post", "/auth/register", {
    onSuccess() {
      naviage(ROUTES.HOME);
    },
  });

  const register = (data: {
    email: string;
    password: string;
    confirmPassword?: string;
  }) => {
    registerMutation.mutate({ body: data });
  };

  const onSubmit = form.handleSubmit(register);

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

        <FormField
          control={form.control}
          name="confirmPassword"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Повторите пароль</FormLabel>
              <FormControl>
                <Input placeholder="******" type="password" {...field} />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />

        {registerMutation.isError && (
          <p className="text-destructive text-sm">
            {registerMutation.error.message}
          </p>
        )}

        <Button disabled={registerMutation.isPending} type="submit">
          Войти
        </Button>
      </form>
    </Form>
  );
}
