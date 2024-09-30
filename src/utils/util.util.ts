import { TypeWithKey } from "../models/typeWithKey.model";
import { labels } from "./messageES.util";

export function isInRange(value: number, min: number, max: number): boolean {
  return value >= min && value <= max;
}

export function dateToString(date: Date): string {
  return date.toISOString().toString().slice(0, 10);
}

export const getValidationError = (errorCode: any) => {
  const codeMatcher: TypeWithKey<string> = {
    400: labels.INTERNALERRORCLIENT,
    401: labels.UNAUTHORIZED,
    500: labels.INTERNALERRORSERVER,
    502: labels.INTERNALERRORGATEWAY,
    503: labels.NETWORKERROR,
    504: labels.INTERNALERRORGATEWAY,
    ERR_BAD_REQUEST: labels.INTERNALERRORSERVER,
  };

  return codeMatcher[errorCode];
};
