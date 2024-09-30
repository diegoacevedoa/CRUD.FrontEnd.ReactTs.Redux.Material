import { DataGrid, GridColDef } from "@mui/x-data-grid";

interface arrayOfObjects extends Array<{}> {}

interface ITable {
  data: arrayOfObjects;
  columns: GridColDef[];
  isLoading: boolean;
  emptyText?: string;
}

const Table = ({
  data,
  columns,
  isLoading,
  emptyText = "No hay registros para mostrar",
}: ITable) => {
  return (
    <DataGrid
      autoHeight
      rows={data}
      columns={columns}
      loading={isLoading}
      disableRowSelectionOnClick
      disableColumnMenu
      localeText={{
        noRowsLabel: emptyText,
      }}
      sx={{
        "& .MuiDataGrid-footerContainer": {
          justifyContent: "center",
          justifyItems: "flex-end",
          gap: 26,
          lineHeight: 6,
          wordWrap: "break-word",
        },
        "& .MuiDataGrid-row": {
          "&:nth-of-type(2n)": {
            backgroundColor: (theme) => theme.palette.action.hover,
          },
        },
        "& .MuiDataGrid-columnHeader": {
          display: "inline-grid",
          justifyContent: "center",
        },
        "& .datagrid-theme-header": {
          backgroundColor: "#E4F2FE",
        },
      }}
    />
  );
};

export default Table;
