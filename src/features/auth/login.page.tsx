import { ROUTES } from "@/shared/model/routes";
import { Link } from "react-router-dom";
import { AuhtLayout } from "./auth-layout";
import { LoginForm } from "./login-form";

function LoginPage() {
  return (
    <AuhtLayout
      title="Вход в систему"
      descr="Введите ваш email и пароль для входа в систему"
      form={<LoginForm />}
      footerText={
        <>
          Нет аккаунта? <Link to={ROUTES.REGISTER}>Зарегистрироваться</Link>
        </>
      }
    />
  );
}


export const Component = LoginPage;
