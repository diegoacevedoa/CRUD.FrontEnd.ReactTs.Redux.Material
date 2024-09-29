import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { findAllPersonas } from "../../../store/persona/persona.thunks";
import { PersonaSlice } from "../../../models/persona.model";
import { Box, Typography, Tooltip, IconButton, Link } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { GridColDef } from "@mui/x-data-grid";
import Table from "../../../components/table";
import { AppDispatch, RootState } from "../../../store/store";

const PersonaList = () => {
  const dispatch = useDispatch<AppDispatch>();
  const personaStore: PersonaSlice = useSelector<RootState, PersonaSlice>(
    (state) => state.persona
  );

  useEffect(() => {
    search();
  }, []);

  const search = async () => {
    dispatch(findAllPersonas()).unwrap();
  };

  const columns: GridColDef[] = [
    {
      minWidth: 70,
      sortable: false,
      align: "center",
      field: "actions",
      headerName: "ACCIÓN",
      renderCell: ({ row }) => (
        <Box display="flex" alignItems="center">
          <Tooltip title="Editar">
            <IconButton size="small">
              <EditIcon />
            </IconButton>
          </Tooltip>
          <Tooltip title="Eliminar">
            <IconButton
              size="small"
              component={Link}
              // onClick={() => {
              //   setOpenConfirmTrash(true);
              //   setIdUser(row.id);
              // }}
            >
              <DeleteIcon />
            </IconButton>
          </Tooltip>
          {/* {openConfirmTrash && (
            <DialogConfirmationDelete
              open={openConfirmTrash}
              setOpen={setOpenConfirmTrash}
              setConfirm={setConfirmTrash}
              label={`¿Estás seguro que deseas eliminar este elemento?`}
            />
          )} */}
        </Box>
      ),
    },
    {
      minWidth: 200,
      align: "left",
      field: "noDocumento",
      headerName: "No DOCUMENTO",
      renderCell: ({ row }) => (
        <Typography variant="body1" fontSize="14px">
          {row.noDocumento}
        </Typography>
      ),
    },
    {
      minWidth: 300,
      align: "left",
      field: "nombres",
      headerName: "NOMBRES",
      renderCell: ({ row }) => (
        <Typography variant="body1" fontSize="14px">
          {row.nombres}
        </Typography>
      ),
    },
    {
      minWidth: 300,
      align: "left",
      field: "apellidos",
      headerName: "APELLIDOS",
      renderCell: ({ row }) => (
        <Typography variant="body1" fontSize="14px">
          {row.apellidos}
        </Typography>
      ),
    },
  ];

  return (
    <Table
      data={personaStore.data}
      columns={columns}
      isLoading={personaStore.isLoading}
    />
  );
};

export default PersonaList;
