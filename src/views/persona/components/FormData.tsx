// ** React Imports
import { useEffect } from "react";

// ** MUI Imports
import {
  Grid2,
  Button,
  FormControl,
  FormHelperText,
  TextField,
} from "@mui/material";

// ** Third Party Imports
import { useFormContext, Controller } from "react-hook-form";
import { PersonaSlice } from "../../../models/persona.model";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../store/store";
import { activeForm } from "../../../store/persona/persona.slice";

const FormData = () => {
  const dispatch = useDispatch<AppDispatch>();
  const personaStore: PersonaSlice = useSelector<RootState, PersonaSlice>(
    (state) => state.persona
  );

  // ** Hooks
  const {
    control,
    reset,
    formState: { errors },
  } = useFormContext();

  useEffect(() => {
    reset();
  }, [personaStore.show]);

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
    <Grid2 container spacing={5} padding={5} width={"400px"}>
      <Grid2 size={{ xs: 12, sm: 12, md: 12, lg: 12, xl: 12 }}>
        <FormControl fullWidth>
          <Controller
            name="noDocumento"
            control={control}
            rules={{ required: true }}
            render={({ field: { value, onChange } }) => (
              <TextField
                type="text"
                value={value ?? ""}
                onChange={onChange}
                label={"No Documento"}
                InputLabelProps={{ shrink: true }}
                aria-describedby="validation-async-invoice"
                error={Boolean(errors.noDocumento)}
                // helperText={errors.noDocumento?.message}
              />
            )}
          />
        </FormControl>
      </Grid2>
      <Grid2 size={{ xs: 12, sm: 12, md: 12, lg: 12, xl: 12 }}>
        <FormControl fullWidth>
          <Controller
            name="nombres"
            control={control}
            rules={{ required: true }}
            render={({ field: { value, onChange } }) => (
              <TextField
                type="text"
                value={value ?? ""}
                onChange={onChange}
                label={"Nombres"}
                InputLabelProps={{ shrink: true }}
                aria-describedby="validation-async-invoice"
                error={Boolean(errors.nombres)}
                // helperText={errors.nombres?.message}
              />
            )}
          />
        </FormControl>
      </Grid2>
      <Grid2 size={{ xs: 12, sm: 12, md: 12, lg: 12, xl: 12 }}>
        <FormControl fullWidth>
          <Controller
            name="apellidos"
            control={control}
            rules={{ required: true }}
            render={({ field: { value, onChange } }) => (
              <TextField
                type="text"
                value={value ?? ""}
                onChange={onChange}
                label={"Apellidos"}
                InputLabelProps={{ shrink: true }}
                aria-describedby="validation-async-invoice"
                error={Boolean(errors.apellidos)}
                // helperText={errors.apellidos?.message}
              />
            )}
          />
        </FormControl>
      </Grid2>
      <Grid2
        size={{ xs: 12, sm: 12, md: 12, lg: 12, xl: 12 }}
        display={"inline-flex"}
        justifyContent={"center"}
        gap={2}
      >
        <Button type="submit" variant="contained" size="large" color="primary">
          GUARDAR
        </Button>
        <Button
          variant="outlined"
          size="large"
          color="inherit"
          onClick={handleClose}
        >
          CANCELAR
        </Button>
      </Grid2>
    </Grid2>
  );
};

export default FormData;
