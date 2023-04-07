import { inject, Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, Observable, of } from 'rxjs';
import { MessageService } from 'primeng/api';
import { ErrorService } from 'src/app/services/error.service';
import { Responses } from 'src/app/models/responses';
import { Order } from 'src/app/models/order';
const baseUrl = 'https://localhost:7153/api';

@Injectable({
    providedIn: 'root'
})
export class OrderService {
    private $http = inject(HttpClient);
    private $messageService = inject(MessageService);
    private $errorService = inject(ErrorService)
    public getOptions() {
        const extSessionId = `Bearer eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJhZG1pbiIsImF1dGgiOlt7ImF1dGhvcml0eSI6IlJPTEVfQURNSU4ifV0sImlhdCI6MTY4MDY4Njg2MywiZXhwIjoxNjgwNjk1ODYzfQ.7q_TKdPewj6suK0mboygywM82nbx3Q6QCQUUUv6hm4c`
        let headers = new HttpHeaders();
        return { headers: headers.set('Content-Type', 'application/json').set('accept', '*/*') };
      }
      
    getOrders(query: string): Observable<Responses> {
        return this.$http.get<Responses>(baseUrl + `/Orders?` + query, this.getOptions()).pipe(
            catchError(error => {
                this.handleError(error)
                return of(error.error);
            })
        );
    }

    getOrdersById(id: number): Observable<Responses> {
        return this.$http.get<Responses>(baseUrl + `/Orders/${id}`).pipe(
            catchError(error => {
                this.handleError(error)
                return of(error.error);
            })
        );
    }

    createOrder(params: Order, method: string = 'post'): Observable<Responses> {
        if(method === 'post') {
            return this.$http.post<Responses>(baseUrl + `/Orders`, {...params}).pipe(
                catchError(error => {
                    this.handleError(error)
                    return of(error.error);
                })
            );
        }else {
            return this.$http.put<Responses>(baseUrl + `/Orders`, {...params}).pipe(
                catchError(error => {
                    this.handleError(error)
                    return of(error.error);
                })
            );
        }
       
    }

    updateOrderById(params: Order): Observable<Responses> {
        return this.$http.put<Responses>(baseUrl + `/Orders`, {...params}).pipe(
            catchError(error => {
                this.handleError(error)
                return of(error.error);
            })
        );
    }

    deleteOrderById(id: number): Observable<Responses> {
        return this.$http.delete<Responses>(baseUrl + `/Orders?id=${id}`).pipe(
            catchError(error => {
                this.handleError(error)
                return of(error.error);
            })
        );
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