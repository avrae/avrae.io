import {HttpHeaders} from "@angular/common/http";
import {getToken} from "../SecurityHelper";

export function defaultOptions() {
  return {headers: new HttpHeaders({"Authorization": getToken()})}
}
