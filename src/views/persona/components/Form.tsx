import { Box, Drawer, IconButton, Typography } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

// ** Third Party Imports
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm, FormProvider } from "react-hook-form";
import FormData from "./FormData";
import { formSchema } from "../schemas";
import { DataPersona, PersonaSlice } from "../../../models/persona.model";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../store/store";
import { activeForm } from "../../../store/persona/persona.slice";

const PersonaForm = () => {
  const dispatch = useDispatch<AppDispatch>();
  const personaStore: PersonaSlice = useSelector<RootState, PersonaSlice>(
    (state) => state.persona
  );

  const methods = useForm({
    resolver: yupResolver(formSchema()),
    defaultValues: {
      id: personaStore.active?.id,
      noDocumento: personaStore.active?.noDocumento,
      nombres: personaStore.active?.nombres,
      apellidos: personaStore.active?.apellidos,
    },
  });

  const onSubmit = async (data: any) => {};

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
          Nueva Persona
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
