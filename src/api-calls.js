function getData(type) {
  return fetch(`http://localhost:3001/api/v1/${type}`)
  .then(res => res.json())
  .catch(err => alert(`Server Error: ${err}. Please try again later.`));
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
  .then(res => res.json())
  .catch(err => console.log(err));
};

export { getData, postBooking };