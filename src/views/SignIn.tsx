import { Button, TextInput } from "flowbite-react";
import { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import { toasterState } from "../atoms/ui";
import { ButtonForm } from "../components/ui/ButtonForm";
import { PageTemplate } from "../components/ui/PageTemplate";
import { StyleProps, Toaster } from "../components/ui/Toaster";
import { useSignIn } from "../hooks/useSignIn";
import { handleToggleToaster } from "../services/atoms";

interface formProps {
  email: string;
  password: string;
}

export const SignIn = () => {
  const [form, setForm] = useState<formProps>({
    email: "",
    password: "",
  });
  const [toaster, setToaster] = useRecoilState(toasterState);

  const { mutateAsync, isLoading, isSuccess, isError } = useSignIn();

  useEffect(() => {
    if (isSuccess) {
      handleToaster("success", "You are gonna be redirected");
    }
    if (isError) {
      handleToaster("danger", "Bad email/password");
    }
  }, [isSuccess, isError]);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    await mutateAsync(form);
  };

  const handleToaster = (type: StyleProps, value: string) => {
    setToaster({
      display: true,
      type,
      value,
    });
    setTimeout(() => {
      setToaster({
        ...toaster,
        display: false,
      });
    }, 2000);
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
