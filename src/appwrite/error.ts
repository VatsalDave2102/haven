import { AppwriteException } from "appwrite";

export function throwError(error: AppwriteException) {
  throw new AppwriteException(
    error.message,
    error.code,
    error.type,
    error.response
  );
}
