import { object, string, number } from "yup";
import { labels } from "../../../utils/messageES.util";

export const formSchema = () => {
  return object().shape({
    id: number().optional(),
    noDocumento: string().required(labels.REQUIRED),
    nombres: string().required(labels.REQUIRED),
    apellidos: string().required(labels.REQUIRED),
  });
};
