interface HeaderFormProps {
  title: string;
  description: string;
}

export const HeaderForm = ({ title, description }: HeaderFormProps) => {
  return (
    <div className="space-y-1">
      <h1 className="text-3xl font-semibold">{title}</h1>
      <p className="text-sm text-muted-foreground">{description}</p>
    </div>
  );
};
