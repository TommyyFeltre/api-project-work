export class InsufficientBalance extends Error {
    constructor() {
        super();
        this.name = 'InsufficientBalance';
        this.message = 'Your Balance is insufficient';
      }
}