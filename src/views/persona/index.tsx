// import { useState, useCallback } from "react";
// import Label from "../../ui/label/Label";
// import Button from "../../ui/button";
// import { IDataPersona } from "../../../api/persona/interfaces";
// import AgregarIcon from "../../ui/icons/AgregarIcon";
import { Container, Grid2 } from "@mui/material";
// import PersonaForm from "./components/Form";
import PersonaList from "./components/List";

const Persona = () => {
  //   const [loading, setLoading] = useState(false);
  //   const [titleModal, setTitleModal] = useState("");
  //   const [isNewModal, setIsNewModal] = useState(true);
  //   const [showModal, setShowModal] = useState(false);
  //   const [activeForm, setActiveForm] = useState<IDataPersona>();
  //   const [allData, setAllData] = useState<IDataPersona[]>([]);

  //   const handleNew = useCallback(() => {
  //     const defaultFormValues: IDataPersona = {
  //       idPersona: 0,
  //       noDocumento: "",
  //       nombres: "",
  //       apellidos: "",
  //     };

  //     setTitleModal("Agregar Registro");
  //     setIsNewModal(true);
  //     setShowModal(true);
  //     setActiveForm(defaultFormValues);
  //   }, []);

  return (
    <Container maxWidth="xl">
      <Grid2 container direction="row" alignItems={"center"}>
        <Grid2 size={{ xs: 5, sm: 9, md: 9, lg: 10, xl: 10 }}>
          {/* <Label
            align="left"
            hasMargin
            type={2}
            value="Persona"
            variant="title"
          /> */}
        </Grid2>
        <Grid2 size={{ xs: 6, sm: 3, md: 3, lg: 2, xl: 2 }}>
          {/* <Button
            className="mb-btn-primary mb-btn-float-end"
            variant={"contained"}
            color={"primary"}
            size={"medium"}
            disabled={loading}
            tabIndex={1}
            icon={<AgregarIcon width="20" height="20" />}
            type="button"
            onClick={handleNew}
          >
            Nuevo
          </Button>

          {showModal && activeForm && (
            <PersonaForm
              titleModal={titleModal}
              isNewModal={isNewModal}
              showModal={showModal}
              setShowModal={setShowModal}
              activeForm={activeForm}
              allData={allData}
              setAllData={setAllData}
            />
          )} */}
        </Grid2>
      </Grid2>
      <Grid2 container>
        <Grid2 size={{ xs: 12, sm: 12, md: 12, lg: 12, xl: 12 }}>
          <PersonaList
          // setTitleModal={setTitleModal}
          // setIsNewModal={setIsNewModal}
          // setShowModal={setShowModal}
          // setActiveForm={setActiveForm}
          />
        </Grid2>
      </Grid2>
    </Container>
  );
};

export default Persona;
