import { Badge, Button, Table } from "flowbite-react";
import { format } from "date-fns";
import { AiFillEdit, AiFillEye } from "react-icons/ai";
import { FiTrash2 } from "react-icons/fi";
import { renderIconForHistoricCategory } from "../../services/categoryHistorics";
import { ToggleButton } from "../forms/ToggleButton";
import { SkillsProps } from "../../hooks/useGetSkills";

interface TableDataProps {
  headers: string[];
  data: any[];
  target: string;
  viewEnable?: boolean;
  editEnable?: boolean;
  handleViewFunction?: (
    event: React.MouseEvent<HTMLButtonElement>,
    id: string
  ) => void;
  handleDisplayFunction?: (
    event: React.ChangeEvent<HTMLInputElement>,
    id: string
  ) => void;
  handleEditFunction?: (
    event: React.MouseEvent<HTMLButtonElement>,
    id: string
  ) => void;
  handleDeleteFunction?: (
    event: React.MouseEvent<HTMLButtonElement>,
    id: string
  ) => void;
}

export const TableData: React.FC<TableDataProps> = ({
  headers,
  data,
  target,
  editEnable,
  viewEnable,
  handleViewFunction,
  handleDisplayFunction,
  handleEditFunction,
  handleDeleteFunction,
}) => {
  return (
    <Table>
      <Table.Head>
        {headers.map((header, index) => (
          <Table.HeadCell key={`header-${header}_${index}`}>
            {header}
          </Table.HeadCell>
        ))}
        <Table.HeadCell className="text-right">Actions</Table.HeadCell>
      </Table.Head>
      <Table.Body>
        {filterDataWithDynamicColumns(data, headers).map((data, index) => (
          <Table.Row
            key={`column-${index}`}
            className="transition-all bg-white dark:border-gray-700 dark:bg-gray-800 hover:bg-gray-50"
          >
            {headers.map((el, index) => (
              <Table.Cell key={`cell-${data[el]}-${index}`}>
                {el === "id" ? (
                  <Badge color="info" className="w-max">
                    {data[el]}
                  </Badge>
                ) : el === "name" ? (
                  <span className="font-bold">{data[el]}</span>
                ) : el === "title" ? (
                  <span className="font-bold text-blue-500">{data[el]}</span>
                ) : el === "createdAt" ||
                  el === "updatedAt" ||
                  el === "date" ? (
                  format(new Date(data[el]), "dd/MM/yyyy")
                ) : el === "category" ? (
                  renderIconForHistoricCategory(data[el])
                ) : el === "display" || el === "read" ? (
                  <ToggleButton
                    func={handleDisplayFunction}
                    status={data[el] ? data[el] : false}
                    id={data.id}
                  />
                ) : el === "skillsId" ? (
                  <div className="flex space-x-1">
                    {handleSkillObject(data[el]).map((el) => (
                      <Badge key={`badge-${el}`} color="purple">
                        {el}
                      </Badge>
                    ))}
                  </div>
                ) : (
                  data[el]
                )}
              </Table.Cell>
            ))}
            <Table.Cell>
              <div className="flex w-full gap-2 text-lg justify-end">
                {viewEnable && (
                  <Button
                    size="sm"
                    color="dark"
                    onClick={(event) => {
                      if (viewEnable && handleViewFunction) {
                        handleViewFunction(event, data.id);
                      }
                    }}
                  >
                    <AiFillEye />
                  </Button>
                )}
                {editEnable && (
                  <Button
                    size="sm"
                    color="warning"
                    onClick={(event) => {
                      if (editEnable && handleEditFunction) {
                        handleEditFunction(event, data.id);
                      }
                    }}
                  >
                    <AiFillEdit />
                  </Button>
                )}{" "}
                <Button
                  onClick={(event) => {
                    if (handleDeleteFunction) {
                      handleDeleteFunction(event, data.id);
                    }
                  }}
                  size="sm"
                  color="failure"
                >
                  <FiTrash2 />
                </Button>
              </div>
            </Table.Cell>
          </Table.Row>
        ))}
      </Table.Body>
    </Table>
  );
};

function handleSkillObject(skillsId: SkillsProps[]): string[] {
  const newArray: string[] = [];
  skillsId.forEach((el) => newArray.push(el.name));
  return newArray;
}

function filterDataWithDynamicColumns<T>(data: T[], column: Array<keyof T>) {
  const newArray: any[] = [];

  data.forEach((el) => {
    let newObject: any = {};
    column.forEach((param) => {
      if (el[param] !== undefined) {
        newObject[param] = el[param];
      }
    });
    newArray.push(newObject);
  });
  return newArray;
}
