// ** MUI Imports
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import { styled } from "@mui/material/styles";
import IconButton from "@mui/material/IconButton";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import DialogContentText from "@mui/material/DialogContentText";
import CloseIcon from "@mui/icons-material/Close";
import ErrorOutlineOutlinedIcon from "@mui/icons-material/ErrorOutlineOutlined";

// Styled component
const DialogContentTextStyled = styled(DialogContentText)(() => ({
  fontSize: "24px !important",
  width: "346px",
  textAlign: "center",
  paddingBottom: "10px",
}));

interface IDataInput {
  open: boolean;
  setOpen: Function;
  setConfirm: Function;
  label: string;
}

const ConfirmationDelete = ({
  open,
  setOpen,
  setConfirm,
  label,
}: IDataInput) => {
  const handleClose = () => {
    setOpen(false);
    setConfirm(false);
  };

  const handleConfirm = () => {
    setOpen(false);
    setConfirm(true);
  };

  return (
    <Dialog
      open={open}
      disableEscapeKeyDown
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
      onClose={handleClose}
      sx={{
        "& .MuiPaper-root": {
          padding: "20px 40px 60px 40px",
        },
      }}
    >
      <IconButton
        size="small"
        onClick={handleClose}
        sx={{ position: "absolute", right: "1rem", top: "1rem" }}
      >
        <CloseIcon />
      </IconButton>
      <DialogTitle id="alert-dialog-title" alignSelf={"center"}>
        <ErrorOutlineOutlinedIcon color={"error"} sx={{ fontSize: 100 }} />
      </DialogTitle>
      <DialogContent>
        <DialogContentTextStyled id="alert-dialog-description">
          {label}
        </DialogContentTextStyled>
      </DialogContent>
      <DialogActions
        className="dialog-actions-dense"
        sx={{ justifyContent: "center" }}
      >
        <Button
          variant="contained"
          color="error"
          size="medium"
          sx={{
            textTransform: "uppercase",
            whiteSpace: "nowrap",
          }}
          onClick={handleConfirm}
        >
          eliminar
        </Button>
        <Button
          variant="outlined"
          size="medium"
          sx={{
            textTransform: "uppercase",
            whiteSpace: "nowrap",
            borderColor: (theme) => theme.palette.text.secondary,
            color: (theme) => theme.palette.text.secondary,
          }}
          onClick={handleClose}
        >
          cancelar
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ConfirmationDelete;
