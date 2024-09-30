import { Box, Drawer, IconButton, Typography } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

// ** Third Party Imports
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm, FormProvider } from "react-hook-form";
import FormData from "./FormData";
import { formSchema } from "../schemas";
import {
  CreatePersona,
  DataPersona,
  PersonaSlice,
  UpdatePersona,
} from "../../../models/persona.model";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../store/store";
import { activeForm } from "../../../store/persona/persona.slice";
import {
  addPersona,
  updatePersona,
} from "../../../store/persona/persona.thunks";
import { snackbarUtilities } from "../../../configs/snackbarManager.config";
import { labels } from "../../../utils/messageES.util";

const PersonaForm = () => {
  const dispatch = useDispatch<AppDispatch>();
  const personaStore: PersonaSlice = useSelector<RootState, PersonaSlice>(
    (state) => state.persona
  );

  const defaultValues: DataPersona = {
    id: personaStore.active?.id ?? 0,
    noDocumento: personaStore.active?.noDocumento ?? "",
    nombres: personaStore.active?.nombres ?? "",
    apellidos: personaStore.active?.apellidos ?? "",
  };

  const methods = useForm({
    resolver: yupResolver(formSchema()),
    defaultValues: defaultValues,
  });

  const handleCreatePersona = async (data: DataPersona) => {
    const dataToCreate: CreatePersona = {
      noDocumento: data.noDocumento,
      nombres: data.nombres,
      apellidos: data.apellidos,
    };

    dispatch(addPersona(dataToCreate))
      .unwrap()
      .then(() => {
        snackbarUtilities.success(labels.OK);
      })
      .finally(() => {
        handleClose();
      });
  };

  const handleUpdatePersona = async (data: DataPersona) => {
    const dataToUpdate: UpdatePersona = {
      idPersona: data.id,
      noDocumento: data.noDocumento,
      nombres: data.nombres,
      apellidos: data.apellidos,
    };

    dispatch(updatePersona(dataToUpdate))
      .unwrap()
      .then(() => {
        snackbarUtilities.success(labels.OK);
      })
      .finally(() => {
        handleClose();
      });
  };

  const onSubmit = async (data: any) => {
    if (personaStore.isNew) {
      handleCreatePersona(data);
    } else {
      handleUpdatePersona(data);
    }
  };

  const handleClose = () => {
    dispatch(
      activeForm({
        title: "",
        isNew: false,
        show: false,
        data: null,
      })
    );
  };

  return (
    <Drawer open={personaStore.show} anchor="right" variant="temporary">
      <Box position={"relative"} p={(theme) => theme.spacing(3.5, 5)}>
        <Typography variant="h6" width={"332px"}>
          {personaStore.title}
        </Typography>
        <IconButton
          size="small"
          onClick={handleClose}
          sx={{ position: "absolute", right: "1rem", top: "1rem" }}
        >
          <CloseIcon />
        </IconButton>
      </Box>
      <FormProvider {...methods}>
        <form
          noValidate
          autoComplete="off"
          onSubmit={methods.handleSubmit(onSubmit)}
        >
          <FormData />
        </form>
      </FormProvider>
    </Drawer>
  );
};

export default PersonaForm;
