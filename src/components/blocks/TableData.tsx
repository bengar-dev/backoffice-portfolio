import { Badge, Button, Table } from "flowbite-react";
import { format } from "date-fns";
import { AiFillEdit } from "react-icons/ai";
import { FiTrash2 } from "react-icons/fi";
import { renderIconForHistoricCategory } from "../../services/categoryHistorics";
import { ToggleButton } from "../forms/ToggleButton";

/**
 * To make edit function =>
 * Add new prop to TableData Component => to handle open modal form
 * In FormSkillSection component => add new prop as boolean to tell that we are in edit mode.
 * In FormSkillSection component => add new prop to handle default values ( data )
 */

interface TableDataProps {
  headers: string[];
  data: any[];
  target: string;
  viewEnable?: boolean;
  editEnable?: boolean;
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
                ) : el === "title" ? (
                  <span className="font-bold text-blue-500">{data[el]}</span>
                ) : el === "createdAt" ||
                  el === "updatedAt" ||
                  el === "date" ? (
                  format(new Date(data[el]), "dd/MM/yyyy")
                ) : el === "category" ? (
                  renderIconForHistoricCategory(data[el])
                ) : el === "display" ? (
                  <ToggleButton
                    func={handleDisplayFunction}
                    status={data[el]}
                    id={data.id}
                  />
                ) : (
                  data[el]
                )}
              </Table.Cell>
            ))}
            <Table.Cell>
              <div className="flex w-full gap-2 text-lg justify-end">
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
                </Button>{" "}
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
