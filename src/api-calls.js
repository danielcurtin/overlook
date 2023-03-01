function getData(type) {
    return fetch(`http://localhost:3001/api/v1/${type}`)
    .then(res => res.json())
    .catch(err => alert(`Server Error: ${err}. Please try again later.`));
};

export default getData;