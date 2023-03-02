class Booking {
  constructor(bookingObject) {
    this.id = bookingObject.id;
    this.userID = bookingObject.userID;
    this.date = bookingObject.date;
    this.roomNumber = bookingObject.roomNumber;
  };
};

export default Booking;