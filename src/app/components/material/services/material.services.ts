import { inject, Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, Observable, of } from 'rxjs';
import { MessageService } from 'primeng/api';
import { ErrorService } from 'src/app/services/error.service';
import { Responses } from 'src/app/models/responses';
import { Material } from 'src/app/models/material';
const baseUrl = 'http://10.50.10.208:6969/api';

@Injectable({
    providedIn: 'root'
})
export class MaterialService {
    private $http = inject(HttpClient);
    private $messageService = inject(MessageService);
    private $errorService = inject(ErrorService)
    public getOptions() {
        const extSessionId = `Bearer eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJhZG1pbiIsImF1dGgiOlt7ImF1dGhvcml0eSI6IlJPTEVfQURNSU4ifV0sImlhdCI6MTY4MDY4Njg2MywiZXhwIjoxNjgwNjk1ODYzfQ.7q_TKdPewj6suK0mboygywM82nbx3Q6QCQUUUv6hm4c`
        let headers = new HttpHeaders();
        return { headers: headers.set('Content-Type', 'application/json').set('accept', '*/*') };
      }
      
    getMaterials(query: string): Observable<Responses> {
        return this.$http.get<Responses>(baseUrl + `/Materials?` + query, this.getOptions()).pipe(
            catchError(error => {
                this.handleError(error)
                return of(error.error);
            })
        );;
    }

    getMaterialsById(id: number): Observable<Responses> {
        return this.$http.get<Responses>(baseUrl + `/Materials${id}`).pipe(
            catchError(error => {
                this.handleError(error)
                return of(error.error);
            })
        );;
    }

    createMaterial(params: Material): Observable<Responses> {
        return this.$http.post<Responses>(baseUrl + `/Materials`, {...params}).pipe(
            catchError(error => {
                this.handleError(error)
                return of(error.error);
            })
        );;
    }

    updateMaterialById(params: Material): Observable<Responses> {
        return this.$http.put<Responses>(baseUrl + `/Materials`, {...params}).pipe(
            catchError(error => {
                this.handleError(error)
                return of(error.error);
            })
        );;
    }

    deleteMaterialById(id: number): Observable<Responses> {
        return this.$http.delete<Responses>(baseUrl + `/Materials${id}`).pipe(
            catchError(error => {
                this.handleError(error)
                return of(error.error);
            })
        );;
    }

   

    private handleError(error: any) {
        this.$errorService.setError(error.error);
        this.$messageService.add({ severity: 'error', summary: 'Error Message', detail: error.error });
    }













    

    private showError(err: any) {
        if (err) {
            if (err.error) {
                if (err.error.message) {
                    //   this.talert.showError(err.error.message);
                }
                else {
                    //   this.talert.showError(err.statusText || "Network Error!");
                }
            }
            else {
                // this.talert.showError(err.statusText || "Network Error!");
            }
        }
        // else this.talert.showError("Network Error!");
    }

}