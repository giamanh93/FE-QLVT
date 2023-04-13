import { inject, Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, Observable, of } from 'rxjs';
import { MessageService } from 'primeng/api';
import { ErrorService } from 'src/app/services/error.service';
import { Responses } from 'src/app/models/responses';
import { Supplier } from 'src/app/models/supplier';
const baseUrl = 'http://10.50.10.208:6969/api';

@Injectable({
    providedIn: 'root'
})
export class SupplierService {
    private $http = inject(HttpClient);
    private $messageService = inject(MessageService);
    private $errorService = inject(ErrorService)
    public getOptions() {
        let headers = new HttpHeaders();
        return { headers: headers.set('Content-Type', 'application/json').set('accept', '*/*') };
      }

    getSuppliers(query: string): Observable<Responses> {
        return this.$http.get<Responses>(baseUrl + `/Suppliers?` + query, this.getOptions()).pipe(
            catchError(error => {
                this.handleError(error)
                return of(error.error);
            })
        );
    }

    getSuppliersById(id: number): Observable<Responses> {
        return this.$http.get<Responses>(baseUrl + `/Suppliers/${id}`).pipe(
            catchError(error => {
                this.handleError(error)
                return of(error.error);
            })
        );
    }

    createSupplier(params: Supplier, method: string = 'post'): Observable<Responses> {
        if(method === 'post') {
            return this.$http.post<Responses>(baseUrl + `/Suppliers`, {...params}).pipe(
                catchError(error => {
                    this.handleError(error)
                    return of(error.error);
                })
            );
        }else {
            return this.$http.put<Responses>(baseUrl + `/Suppliers`, {...params}).pipe(
                catchError(error => {
                    this.handleError(error)
                    return of(error.error);
                })
            );
        }
       
    }

    updateSupplierById(params: Supplier): Observable<Responses> {
        return this.$http.put<Responses>(baseUrl + `/Suppliers`, {...params}).pipe(
            catchError(error => {
                this.handleError(error)
                return of(error.error);
            })
        );
    }

    deleteSupplierById(id: number): Observable<Responses> {
        return this.$http.delete<Responses>(baseUrl + `/Suppliers?id=${id}`).pipe(
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