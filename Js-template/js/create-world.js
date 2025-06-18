// Function for posting a new world
export function registerWorld() {
  //Get correct form
  const worldForm = document.querySelector('#postNewWorld');
  //Ger values
  const world_name = worldForm.querySelector('#new-world-name').value.trim();
  // SE NYT OTTAA DEFAULTTINA TON ONGOING MANUAALISESTI, EN JAKSANUT NYT MIETTII TOTA LOGIIKKAA ET SE OTTAA OIKEEN
  // JOS TESTAAT NI VALITSE AINA ONGOING
  const status = worldForm.querySelector('#Ongoing-story').value.trim();
  const user_id = localStorage.getItem('user_id')
  // Data for request
  const bodyData = {
      world_name: world_name,
      state: status
  };
  console.log(bodyData)
  // Endpoint
  const url = `http://localhost:3000/api/worlds/${user_id}`;
  let token = localStorage.getItem('authToken');
  // Options
  const options = {
      body: JSON.stringify(bodyData),
      method: 'POST',
      headers: {
      'Authorization': `Bearer ${token}`,
      'Content-type': 'application/json',
      },
  };
  // Send a request for posting data
  const response = fetch(url, options);
  if (response.error) {
      console.error('Creating A New World Failed:', response.error);
      return;
    } else {
      alert('World was saved!')
    }
    worldForm.reset();
};
