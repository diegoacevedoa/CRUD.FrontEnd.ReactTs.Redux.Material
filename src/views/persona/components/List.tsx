import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  deletePersona,
  findAllPersonas,
} from "../../../store/persona/persona.thunks";
import { DataPersona, PersonaSlice } from "../../../models/persona.model";
import { Box, Typography, Tooltip, IconButton, Link } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { GridColDef } from "@mui/x-data-grid";
import Table from "../../../components/table";
import { AppDispatch, RootState } from "../../../store/store";
import { activeForm } from "../../../store/persona/persona.slice";
import ConfirmationDelete from "../../../components/confirmationDelete";
import { snackbarUtilities } from "../../../configs/snackbarManager.config";
import { labels } from "../../../utils/messageES.util";

const PersonaList = () => {
  // ** States
  const [openConfirm, setOpenConfirm] = useState(false);
  const [confirm, setConfirm] = useState(false);
  const [idDelete, setIdDelete] = useState(0);

  // ** Hooks
  const dispatch = useDispatch<AppDispatch>();
  const personaStore: PersonaSlice = useSelector<RootState, PersonaSlice>(
    (state) => state.persona
  );

  useEffect(() => {
    search();
  }, []);

  useEffect(() => {
    if (confirm) {
      handleDelete(idDelete);
    }
  }, [confirm]);

  const search = async () => {
    dispatch(findAllPersonas()).unwrap();
  };

  const handleEdit = (item: DataPersona) => {
    dispatch(
      activeForm({
        title: "Editar Persona",
        isNew: false,
        show: true,
        data: item,
      })
    );
  };

  const handleDelete = (id: number) => {
    dispatch(deletePersona(id))
      .unwrap()
      .then(() => {
        snackbarUtilities.success(labels.OK);
      });
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
            <IconButton size="small" onClick={() => handleEdit(row)}>
              <EditIcon />
            </IconButton>
          </Tooltip>
          <Tooltip title="Eliminar">
            <IconButton
              size="small"
              component={Link}
              onClick={() => {
                setOpenConfirm(true);
                setIdDelete(row.id);
              }}
            >
              <DeleteIcon />
            </IconButton>
          </Tooltip>
          {openConfirm && (
            <ConfirmationDelete
              open={openConfirm}
              setOpen={setOpenConfirm}
              setConfirm={setConfirm}
              label={`¿Estás seguro que deseas eliminar este elemento?`}
            />
          )}
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
