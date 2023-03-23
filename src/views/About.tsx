import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { Label, TextInput } from "flowbite-react";
import { useEffect, useState } from "react";
import { TitleSection } from "../components/blocks/TitleSection";
import { SideBar } from "../components/nav/SideBar";
import { ButtonForm } from "../components/ui/ButtonForm";
import { TemplateBlock } from "../components/ui/TemplateBlock";
import { AboutProps, useGetAbout } from "../hooks/useGetAbout";
import { useEditAbout } from "../hooks/useEditAbout";
import { Toaster } from "../components/ui/Toaster";

export const About: React.FC = () => {
  const { data } = useGetAbout();
  const aboutFn = useEditAbout();
  const [content, setContent] = useState<string>("");
  const [about, setAbout] = useState<AboutProps>({
    content: "",
    urlPic: "",
  });

  useEffect(() => {
    if (data) {
      setContent(data.content);
      setAbout({
        content: content,
        urlPic: data.urlPic,
      });
    }
  }, [data]);

  const onSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    const data = {
      content,
      urlPic: about.urlPic,
    };
    await aboutFn.mutateAsync(data);
  };

  return (
    <div className="relative">
      <Toaster />
      <SideBar />
      <TemplateBlock>
        <TitleSection title="About-me" />
        <form className="mt-6" onSubmit={onSubmit}>
          <div className="mb-2 block">
            <Label htmlFor="about-content" value="Content about-me section" />
          </div>
          <ReactQuill value={content} onChange={setContent} />

          <div className="mt-2 mb-2 block">
            <Label htmlFor="url-pic" value="Url main picture" />
          </div>
          <TextInput
            id="url-pic"
            type="url"
            value={about.urlPic}
            onChange={(event) =>
              setAbout({ ...about, urlPic: event.target.value })
            }
          />
          <div className="mt-2">
            <ButtonForm
              loading={false}
              type="submit"
              value="Update"
              color="warning"
              fullWidth
            />
          </div>
        </form>
      </TemplateBlock>
    </div>
  );
};
