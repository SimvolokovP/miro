import { ROUTES } from "@/shared/model/routes";
import { Link } from "react-router-dom";
import { AuhtLayout } from "./auth-layout";

function RegisterPage() {
  return (
    <AuhtLayout
      title="Регистрация"
      descr="Введите ваш email и пароль для регистрации в системе"
      form={"reg"}
      footerText={
        <>
          Уже есть аккаунт? <Link to={ROUTES.LOGIN}>Войти</Link>
        </>
      }
    />
  );
}

export const Component = RegisterPage;
