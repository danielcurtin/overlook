function getData(type) {
  return fetch(`http://localhost:3001/api/v1/${type}`)
  .then(res => {
    if (res.ok) {
      return res.json();
    } else {
      throw new Error('Path not found. Try a different Path.');
    };
  });
};

function postBooking(userID, date, roomNumber) {
  return fetch(`http://localhost:3001/api/v1/bookings`, {
    method: 'POST',
    body: JSON.stringify({
      "userID": userID, 
      "date": date,
      "roomNumber": roomNumber
    }),
    headers: {
      'Content-Type': 'application/json'
    }
  })
  .then(res => {
    if (res.ok) {
      return res.json();
    } else {
      throw new Error('Booking Failed. Please try again.');
    };
  })
};

export { getData, postBooking };