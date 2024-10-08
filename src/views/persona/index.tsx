import { Button, Container, Grid2, Typography } from "@mui/material";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import PersonaList from "./components/List";
import { DataPersona, PersonaSlice } from "../../models/persona.model";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../store/store";
import { activeForm } from "../../store/persona/persona.slice";
import PersonaForm from "./components/Form";

const Persona = () => {
  const dispatch = useDispatch<AppDispatch>();
  const personaStore: PersonaSlice = useSelector<RootState, PersonaSlice>(
    (state) => state.persona
  );

  const handleNew = () => {
    const defaultFormValues: DataPersona = {
      id: 0,
      noDocumento: "",
      nombres: "",
      apellidos: "",
    };

    dispatch(
      activeForm({
        title: "Agregar Persona",
        isNew: true,
        show: true,
        data: defaultFormValues,
      })
    );
  };

  return (
    <Container maxWidth="xl">
      <Grid2 container sx={{ paddingTop: 5, paddingBottom: 5 }}>
        <Grid2
          size={{ xs: 5, sm: 9, md: 9, lg: 10, xl: 10 }}
          display="flex"
          justifyContent="start"
          alignItems="flex-start"
        >
          <Typography variant="h4" fontWeight="600">
            Persona
          </Typography>
        </Grid2>
        <Grid2
          size={{ xs: 6, sm: 3, md: 3, lg: 2, xl: 2 }}
          display="flex"
          justifyContent="end"
          alignItems="flex-end"
        >
          <Button
            variant="contained"
            color="primary"
            size="large"
            startIcon={<AddCircleOutlineIcon />}
            onClick={handleNew}
          >
            Nuevo
          </Button>
          {personaStore.active && <PersonaForm />}
        </Grid2>
      </Grid2>
      <Grid2 container>
        <Grid2 size={{ xs: 12, sm: 12, md: 12, lg: 12, xl: 12 }}>
          <PersonaList />
        </Grid2>
      </Grid2>
    </Container>
  );
};

export default Persona;
