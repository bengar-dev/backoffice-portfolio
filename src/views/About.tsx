import { Label, Textarea, TextInput } from "flowbite-react";
import { useEffect, useState } from "react";
import { TitleSection } from "../components/blocks/TitleSection";
import { SideBar } from "../components/nav/SideBar";
import { ButtonForm } from "../components/ui/ButtonForm";
import { TemplateBlock } from "../components/ui/TemplateBlock";
import { AboutProps, useGetAbout } from "../hooks/useGetAbout";

export const About: React.FC = () => {
  const { data } = useGetAbout();
  const [about, setAbout] = useState<AboutProps>({
    content: "",
    urlPic: "",
  });

  useEffect(() => {
    if (data) {
      setAbout({
        content: data.content,
        urlPic: data.urlPic,
      });
    }
  }, [data]);
  return (
    <div className="relative">
      <SideBar />
      <TemplateBlock>
        <TitleSection title="About-me" />
        <form className="mt-6">
          <div className="mb-2 block">
            <Label htmlFor="about-content" value="Content about-me section" />
          </div>
          <Textarea
            id="about-content"
            value={about.content}
            placeholder="Here text content"
            required={true}
            rows={8}
            onChange={(event) =>
              setAbout({ ...about, content: event.target.value })
            }
          />
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
          <div className="mt-2 w-1/12 mr-0 ml-auto">
            <ButtonForm
              loading={false}
              type="submit"
              value="Submit"
              color="success"
              fullWidth
            />
          </div>
        </form>
      </TemplateBlock>
    </div>
  );
};
