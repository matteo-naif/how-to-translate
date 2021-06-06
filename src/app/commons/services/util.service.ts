import { Injectable } from "@angular/core";
import { MatSnackBar, MatSnackBarConfig } from "@angular/material/snack-bar";

@Injectable({
  providedIn: 'root'
})
export class UtilService {

  constructor(private _snackBar: MatSnackBar) { }

  /**
   * Utility function to handle Local storage
   */

  saveItem(key: any, value: any) {
    localStorage.setItem(key, JSON.stringify(value));
  }

  getItem(key: string): any {
    const res: string | null = localStorage.getItem(key);
    if (!res) return null;
    return JSON.parse(res);
  }

  removeItem(key: string) {
    localStorage.removeItem(key);
  }

  openSnackBar(message: string, action?: string, durationMs?: number, panelClass?: string): void {

    const config: MatSnackBarConfig = {
      duration: durationMs || 3000,
      panelClass: panelClass
    };

    this._snackBar.open(message, action || '', config);
  }

  formatString(val: string): string {

    val = val.trim();
    val = val.toLowerCase();

    return val;
  }

  // Reference: https://github.com/kwunshing123/jaro-winkler-typescript
  /**
   *
   * @param str1 String 1 for compare
   * @param str2 String 2 for compare
   * @param isCaseSensitive to control case sensitive or not
   */
  jaro(str1: string, str2: string, isCaseSensitive: boolean = false): number {
    // Exit early if either are empty.
    if (str1.length === 0 || str2.length === 0) {
      return 0;
    }

    // Convert to upper if case-sensitive is false.
    if (!isCaseSensitive) {
      str1 = str1.toUpperCase();
      str2 = str2.toUpperCase();
    }

    // Exact match
    if (str1 === str2) {
      return 1;
    }

    // Number of matches
    let m: number = 0;

    // Length of two Strings
    const len1: number = str1.length;
    const len2: number = str2.length;

    // Maximum distance
    const window: number = Math.floor(Math.max(len1, len2) / 2) - 1;

    // Hash for matches
    const str1Hash: boolean[] = new Array(len1);
    const str2Hash: boolean[] = new Array(len2);

    for (let i = 0; i < len1; i++) {
      for (let j = Math.max(0, i - window); j <= Math.min(len2, i + window + 1); j++) {
        if (!str1Hash[i] && !str2Hash[j] && str1[i] === str2[j]) {
          ++m;
          str1Hash[i] = str2Hash[j] = true;
          break;
        }
      }
    }

    // Exit early if no matches were found.
    if (m === 0) {
      return 0;
    }

    // Count the transpositions.
    let t = 0;
    let point = 0;

    for (let i = 0; i < len1; i++) {
      if (str1Hash[i]) {
        while (!str2Hash[point]) {
          point++;
        }

        if (str1.charAt(i) !== str2.charAt(point++)) {
          t++;
        }
      }
    }

    t /= 2;

    return (m / len1 + m / len2 + (m - t) / m) / 3;
  }

  /**
   *
   * @param str1 String 1 for compare
   * @param str2 String 2 for compare
   * @param isCaseSensitive to control case sensitive or not
   */
  jaroWinkler(str1: string, str2: string, isCaseSensitive: boolean = false): number {
    // Jaro Distance
    let jaroDist: number = this.jaro(str1, str2, isCaseSensitive);
    // Same prefix length, maxium is 4
    let prefix: number = 0;

    if (jaroDist > 0.7) {
      const minIndex = Math.min(str1.length, str2.length);
      let i = 0;
      while (str1[i] === str2[i] && i < 4 && i < minIndex) {
        ++prefix;
        i++;
      }

      jaroDist += 0.1 * prefix * (1 - jaroDist);
    }

    return jaroDist;
  }

}
