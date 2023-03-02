import Booking from "./Booking";

class Room {
  constructor(roomObject) {
    this.number = roomObject.number;
    this.type = roomObject.roomType;
    this.bed = roomObject.bedSize;
    this.numBeds = roomObject.numBeds;
    this.cost = roomObject.costPerNight;
  };

  getNewBooking(customerID, selectedDate) {
    return new Booking({ id: '', userID: customerID, date: selectedDate, roomNumber: this.number})
  };
};

export default Room;