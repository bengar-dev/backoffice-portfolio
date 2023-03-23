import { Label, TextInput } from "flowbite-react";
import _ from "lodash";
import { useEffect, useState } from "react";
import { TitleSection } from "../components/blocks/TitleSection";
import { ToggleButton } from "../components/forms/ToggleButton";
import { SideBar } from "../components/nav/SideBar";
import { ButtonForm } from "../components/ui/ButtonForm";
import { TemplateBlock } from "../components/ui/TemplateBlock";
import { Toaster } from "../components/ui/Toaster";
import { useEditSettings } from "../hooks/useEditSettings";
import { MediasProps, useGetMedias } from "../hooks/useGetMedias";

export const Settings: React.FC = () => {
  const { data: medias, isLoading } = useGetMedias();
  const editMedias = useEditSettings();
  const [form, setForm] = useState<MediasProps>({
    CV: "",
    enableCV: false,
    github: "",
    linkedin: "",
    twitch: "",
    twitter: "",
  });

  useEffect(() => {
    if (medias && !_.isEqual(medias, form)) {
      setForm(medias);
    }
  }, [medias]);

  const onSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    console.log("form", form);
    await editMedias.mutateAsync(form);
  };

  return (
    <div className="relative">
      <SideBar />
      <TemplateBlock>
        <TitleSection title="Settings" />
        <Toaster />
        <form className="mt-6" onSubmit={onSubmit}>
          <div className="mb-2 block">
            <Label htmlFor="github" value="GitHub" />
          </div>
          <TextInput
            id="github"
            type="text"
            placeholder="Github account"
            required
            value={form.github}
            onChange={(e) => setForm({ ...form, github: e.target.value })}
          />
          <div className="mt-2 mb-2 block">
            <Label htmlFor="twitter" value="Twitter" />
          </div>
          <TextInput
            id="twitter"
            type="text"
            placeholder="Twitter account"
            required
            value={form.twitter}
            onChange={(e) => setForm({ ...form, twitter: e.target.value })}
          />
          <div className="mt-2 mb-2 block">
            <Label htmlFor="twitch" value="Twitch" />
          </div>
          <TextInput
            id="twitch"
            type="text"
            placeholder="Twitch account"
            required
            value={form.twitch}
            onChange={(e) => setForm({ ...form, twitch: e.target.value })}
          />
          <div className="mt-2 mb-2 block">
            <Label htmlFor="linkedin" value="Linkedin" />
          </div>
          <TextInput
            id="linkedin"
            type="text"
            placeholder="Linkedin account"
            required
            value={form.linkedin}
            onChange={(e) => setForm({ ...form, linkedin: e.target.value })}
          />
          <div className="mt-2 mb-2 block">
            <Label htmlFor="link-cv" value="CV Url" />
          </div>
          <TextInput
            id="link-cv"
            type="url"
            placeholder="Link to cv"
            required
            value={form.CV}
            onChange={(e) => setForm({ ...form, CV: e.target.value })}
          />
          <div className="mt-2 mb-2 block">
            <Label htmlFor={medias && medias.id} value="Enable CV" />
          </div>
          <ToggleButton
            status={form.enableCV}
            func={(e) => setForm({ ...form, enableCV: e.target.checked })}
            id={medias && medias.id}
          />
          <div className="mt-2">
            <ButtonForm
              loading={isLoading}
              type="submit"
              value="Update"
              fullWidth
              color="warning"
            />
          </div>
        </form>
      </TemplateBlock>
    </div>
  );
};
