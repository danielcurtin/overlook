import Booking from "./Booking";
import { postBooking } from '../api-calls';

class Room {
  constructor(roomObject) {
    this.number = roomObject.number;
    this.type = roomObject.roomType;
    this.cost = roomObject.costPerNight;
  };

  getNewBooking(customerID, selectedDate) {
    return new Booking({ id: '', userID: customerID, date: selectedDate, roomNumber: this.number})
  };
};

export default Room;