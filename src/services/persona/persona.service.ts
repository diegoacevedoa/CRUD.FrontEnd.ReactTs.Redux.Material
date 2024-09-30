import { API } from "../../configs/api.config";
import HttpService from "../../configs/http.config";
import {
  CreatePersona,
  PersonaResponse,
  PersonaResponseOne,
  UpdatePersona,
} from "../../models/persona.model";

export class PersonaService {
  private http: HttpService;

  constructor() {
    this.http = new HttpService();
  }

  async getAllPersonas(): Promise<PersonaResponse> {
    const response = await this.http.get<PersonaResponse>(API.PERSONA_GET_ALL);

    return response;
  }

  async createPersona(dto: CreatePersona): Promise<PersonaResponseOne> {
    const response = await this.http.post<PersonaResponseOne>(
      API.PERSONA_CREATE,
      dto
    );

    return response;
  }

  async updatePersona(dto: UpdatePersona): Promise<void> {
    const response = await this.http.put<void>(
      API.PERSONA_UPDATE.replace("{id}", dto.idPersona.toString()),
      dto
    );

    return response;
  }

  async deletePersona(id: number): Promise<PersonaResponse> {
    const response = await this.http.delete<PersonaResponse>(
      API.PERSONA_DELETE.replace("{id}", id.toString())
    );

    return response;
  }
}
