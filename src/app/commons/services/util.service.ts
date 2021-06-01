import { Injectable } from "@angular/core";
import { MatSnackBar } from "@angular/material/snack-bar";

@Injectable({
    providedIn: 'root'
})
export class UtilService {

  constructor(private _snackBar: MatSnackBar){}

    /**
     * Utility function to handle Local storage
     */

    saveItem(key: any, value: any) {
        localStorage.setItem(key, JSON.stringify(value));
    }

    getItem(key: string): any {
        const res: string | null = localStorage.getItem(key);
        if(!res) return null;
        return JSON.parse(res);
    }

    removeItem(key: string) {
        localStorage.removeItem(key);
    }

    openSnackBar(message: string, action?: string, durationMs?: number): void {
      action = action || '';
      durationMs = durationMs ||3000;
      this._snackBar.open(message, action, {duration: durationMs});
    }

    formatString(val: string): string{

      val = val.trim();
      val = val.toLowerCase();

      return val;
    }

}
