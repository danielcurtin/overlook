class Booking {
    constructor(bookingObject, allRooms) {
        this.id = bookingObject.id;
        this.userID = bookingObject.userID;
        this.date = bookingObject.date;
        this.roomNumber = bookingObject.roomNumber;
        this.allRooms = allRooms;
    };

    getRoom() {
        return this.allRooms.find(room => room.number === this.roomNumber);
    };
};

export default Booking;