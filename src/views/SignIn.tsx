import { TextInput } from "flowbite-react";
import { useState } from "react";
import { ButtonForm } from "../components/ui/ButtonForm";
import { PageTemplate } from "../components/ui/PageTemplate";
import { Toaster } from "../components/ui/Toaster";
import { useSignIn } from "../hooks/useSignIn";

interface formProps {
  email: string;
  password: string;
}

export const SignIn = () => {
  const [form, setForm] = useState<formProps>({
    email: "",
    password: "",
  });

  const { mutateAsync, isLoading } = useSignIn();

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    await mutateAsync(form);
  };

  return (
    <PageTemplate center>
      <Toaster />
      <div className="p-10 rounded-lg bg-white flex flex-col w-full md:w-2/3 lg:w-1/3">
        <form className="flex flex-col space-y-2" onSubmit={handleSubmit}>
          <TextInput
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            type="email"
            placeholder="@mail.com"
            required={true}
          />
          <TextInput
            value={form.password}
            onChange={(e) => setForm({ ...form, password: e.target.value })}
            type="password"
            placeholder="password"
            required={true}
          />
          <ButtonForm loading={isLoading} type="submit" value="Sign-in" />
        </form>
      </div>
    </PageTemplate>
  );
};
