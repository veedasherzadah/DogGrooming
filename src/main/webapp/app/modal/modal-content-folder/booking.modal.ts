export interface IBooking {
    firstName?: string;
    lastName?: string | null;
    dogName?: string;
    email?: string;
    service?: string;
    date?: string;
  }
  
  export class Booking implements IBooking {
    constructor(
      public firstName?: string,
      public lastName?: string | null,
      public dogName?: string,
      public email?: string,
      public service?: string,
      public date?: string
    ) {}
  }
  