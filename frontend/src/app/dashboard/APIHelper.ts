import {HttpHeaders} from "@angular/common/http";
import {getToken} from "../SecurityHelper";

export function defaultOptions() {
  return {headers: new HttpHeaders({"Authorization": getToken()})}
}

export function defaultTextOptions() {
  return {responseType: 'text', headers: new HttpHeaders({"Authorization": getToken()})}
}
