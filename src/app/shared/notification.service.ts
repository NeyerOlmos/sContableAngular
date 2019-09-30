import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  constructor(private snackBar: MatSnackBar) { }
  message(message: string, action: string) {
    this.snackBar.open(message, action, {duration: 3000 });
  }
}
