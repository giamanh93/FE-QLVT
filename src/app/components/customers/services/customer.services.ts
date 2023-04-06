import { inject, Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, Observable, of } from 'rxjs';
import { MessageService } from 'primeng/api';
import { ErrorService } from 'src/app/services/error.service';
import { Responses } from 'src/app/models/responses';
import { Customer } from 'src/app/models/customer';
const baseUrl = 'http://10.50.10.208:6969/api';

@Injectable({
    providedIn: 'root'
})
export class CustomerService {
    private $http = inject(HttpClient);
    private $messageService = inject(MessageService);
    private $errorService = inject(ErrorService)
    public getOptions() {
        const extSessionId = `Bearer eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJhZG1pbiIsImF1dGgiOlt7ImF1dGhvcml0eSI6IlJPTEVfQURNSU4ifV0sImlhdCI6MTY4MDY4Njg2MywiZXhwIjoxNjgwNjk1ODYzfQ.7q_TKdPewj6suK0mboygywM82nbx3Q6QCQUUUv6hm4c`
        let headers = new HttpHeaders();
        return { headers: headers.set('Content-Type', 'application/json').set('accept', '*/*') };
      }
    getCustomers(query: string): Observable<Responses> {
        return this.$http.get<Responses>(baseUrl + `/Customers?` + query, this.getOptions()).pipe(
            catchError(error => {
                this.handleError(error)
                return of(error.error);
            })
        );;
    }

    getCustomersById(id: number): Observable<Responses> {
        return this.$http.get<Responses>(baseUrl + `/Customers/${id}`).pipe(
            catchError(error => {
                this.handleError(error)
                return of(error.error);
            })
        );;
    }

    createCustomer(params: Customer): Observable<Responses> {
        return this.$http.post<Responses>(baseUrl + `/Customers`, {...params}).pipe(
            catchError(error => {
                this.handleError(error)
                return of(error.error);
            })
        );;
    }

    updateCustomerById(params: Customer): Observable<Responses> {
        return this.$http.put<Responses>(baseUrl + `/Customers`, {...params}).pipe(
            catchError(error => {
                this.handleError(error)
                return of(error.error);
            })
        );;
    }

    deleteCustomerById(id: number): Observable<Responses> {
        return this.$http.delete<Responses>(baseUrl + `/Customers?id=${id}`).pipe(
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