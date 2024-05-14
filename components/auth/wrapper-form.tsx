import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { HeaderForm } from "@/components/auth/header-form";
import { FooterForm } from "@/components/auth/footer-form";

interface WrapperFormProps {
  title: string;
  description: string;
  children: React.ReactNode;
  backButtonLabel: string;
  backButtonHref: string;
  backButtonDescription: string;
}

export const WrapperForm = ({
  title,
  description,
  children,
  backButtonLabel,
  backButtonHref,
  backButtonDescription,
}: WrapperFormProps) => {
  return (
    <Card className="w-full max-w-[400px]">
      <CardHeader>
        <HeaderForm title={title} description={description} />
      </CardHeader>
      <CardContent>{children}</CardContent>
      <CardFooter>
        <FooterForm
          backButtonLabel={backButtonLabel}
          backButtonHref={backButtonHref}
          backButtonDescription={backButtonDescription}
        />
      </CardFooter>
    </Card>
  );
};
