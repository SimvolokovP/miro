import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/shared/ui/kit/card";
import { ReactNode } from "react";

export function AuhtLayout({
  title,
  descr,
  form,
  footerText,
}: {
  title: ReactNode;
  descr: ReactNode;
  form: ReactNode;
  footerText: ReactNode;
}) {
  return (
    <main className="grow flex flex-col justify-center items-center">
      <Card className="w-full max-w-[400px]">
        <CardHeader>
          <CardTitle>{title}</CardTitle>
          <CardDescription>{descr}</CardDescription>
        </CardHeader>
        <CardContent>{form}</CardContent>
        <CardFooter>
          <p className="text-sm text-muted-foreground [&_a]:underline [&_a]:text-primary">
            {footerText}
          </p>
        </CardFooter>
      </Card>
    </main>
  );
}
