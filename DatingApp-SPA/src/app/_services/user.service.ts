import { Injectable } from "@angular/core";
import { environment } from "../../environments/environment";
import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";
import { Observable } from "rxjs";
import { User } from "../_models/user";
// import { PaginatedResult } from '../_models/pagination';
import { map } from "rxjs/operators";
// import { Message } from '../_models/message';

@Injectable({
  providedIn: "root"
})
export class UserService {
  baseUrl = environment.apiUrl;
  constructor(private http: HttpClient) {}

  // page?, itemsPerPage?, userParams?, likesParam?
  // Observable<PaginatedResult<User[]>> {
  //   const paginatedResult: PaginatedResult<User[]> = new PaginatedResult<User[]>();
  getUsers() {
    // let params = new HttpParams();

    // if (page != null && itemsPerPage != null) {
    //   params = params.append('pageNumber', page);
    //   params = params.append('pageSize', itemsPerPage);
    // }

    // if (userParams != null) {
    //   params = params.append('minAge', userParams.minAge);
    //   params = params.append('maxAge', userParams.maxAge);
    //   params = params.append('gender', userParams.gender);
    //   params = params.append('orderBy', userParams.orderBy);
    // }

    // if (likesParam === 'Likers') {
    //   params = params.append('Likers', 'true');
    // }

    // if (likesParam === 'Likees') {
    //   params = params.append('Likees', 'true');
    // }

    return this.http.get<User[]>(this.baseUrl + "Users");
    // .pipe(
    //   map(response => {
    //     paginatedResult.result = response.body;
    //     if (response.headers.get("Pagination") != null) {
    //       paginatedResult.pagination = JSON.parse(
    //         response.headers.get("Pagination")
    //       );
    //     }
    //     return paginatedResult;
    //   })
    // );
  }

  getUser(id): Observable<User> {
    return this.http.get<User>(this.baseUrl + "users/" + id);
  }

  updateUser(id: number, user: User) {
    return this.http.put(this.baseUrl + "users/" + id, user);
  }
}
