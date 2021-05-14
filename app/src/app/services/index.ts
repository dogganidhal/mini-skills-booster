import {HttpErrorResponse} from "@angular/common/http";
import {throwError} from "rxjs";


export abstract class BaseService {
  protected handleError(error: HttpErrorResponse) {
    let errorMessage: string;
    if (error.status === 0) {
      // A client-side or network error occurred. Handle it accordingly.
      errorMessage = `An error occurred: ${error.error}`;
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong.
      errorMessage = error.error.message;
    }
    // Return an observable with a user-facing error message.
    return throwError(errorMessage);
  }
}
