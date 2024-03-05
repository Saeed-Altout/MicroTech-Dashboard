import Link from "next/link";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { Social } from "@/components/auth/social";
import { BackButton } from "@/components/auth/back-button";

interface CardWrapperProps {
  children: React.ReactNode;
  social?: boolean;
  title?: string;
  description?: string;
  hrefBackButton: string;
  labelBackButton?: string;
}

export const CardWrapper = ({
  children,
  social,
  title,
  description,
  hrefBackButton,
  labelBackButton,
}: CardWrapperProps) => {
  return (
    <Card className="max-w-md w-full">
      <CardHeader className="text-center">
        <CardTitle>{title}</CardTitle>
        <CardDescription>
          {description}
          <BackButton href={hrefBackButton} label={labelBackButton} />
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-5">
        {children}
        {social && <Social />}
      </CardContent>
      <CardFooter>
        <p className="px-8 text-center text-sm text-muted-foreground">
          By clicking {title?.toLowerCase()}, you agree to our{" "}
          <Link
            href="/terms"
            className="underline underline-offset-4 hover:text-primary"
          >
            Terms of Service
          </Link>{" "}
          and{" "}
          <Link
            href="/privacy"
            className="underline underline-offset-4 hover:text-primary"
          >
            Privacy Policy
          </Link>
          .
        </p>
      </CardFooter>
    </Card>
  );
};
