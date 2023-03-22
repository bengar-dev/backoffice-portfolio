import { createElement } from "react";
import { AiFillCheckCircle, AiFillEdit, AiFillTrophy } from "react-icons/ai";
import { MdOutlineComputer } from "react-icons/md";
import { GiGraduateCap } from "react-icons/gi";
import { FaSchool } from "react-icons/fa";
import { BsBriefcase } from "react-icons/bs";
import { HistoricCategory } from "../hooks/useGetHistorics";

type RenderIconForHistoricCategoryFn = (
  historic: HistoricCategory
) => JSX.Element;

const className = "text-2xl text-gray-700";

export const renderIconForHistoricCategory: RenderIconForHistoricCategoryFn = (
  historic
) => {
  switch (historic) {
    case "work":
      return createElement(BsBriefcase, { className });
    case "trophee":
      return createElement(AiFillTrophy, { className });
    case "school":
      return createElement(FaSchool, { className });
    case "graduate":
      return createElement(GiGraduateCap, { className });
    case "computer":
      return createElement(MdOutlineComputer, { className });
    case "certif":
      return createElement(AiFillCheckCircle, { className });
    default:
      return createElement(AiFillEdit, { className });
  }
};
