const get = selector => {
  const element = document.getElementById(selector);
  return element ? element : new Error(`check ${selector}, no element found.`);
}

const url = 'https://api.adviceslip.com/advice';


// Get Random
const getAdvice = async () => {
  get('spin').style.display = 'inline-block';
  try {
    const res = await fetch(url);
    const data = await res.json(); 
    return data;
  } catch (err) {
    console.log(err);
  }
}

const displayAdvice = async () => {
  const data = await getAdvice();
  get('spin').style.display = 'none';
  get('number').textContent = `# ${data.slip.id}`;
  get('advice').innerText = `${data.slip.advice}`;
}

get('getAdvice').addEventListener('click', () => displayAdvice());

// Get Search Query
const searchAdvice = async () => {
  const query = get('input').value;
  const searchURL = `${url}/search/${query}`;
  get('spin').style.display = 'inline-block';
  try {
    const res = await fetch(searchURL);
    const data = await res.json();
    return data;
  } catch (err) {
    console.log(err);
  }
}

const displaySearch = async () => {
  const data = await searchAdvice();
  get('spin').style.display = 'none';
  console.log(data);
  const index = randomEl(data.slips.length);
  if (data.slips) {
    get('number').textContent = `# ${data.slips[index].id}`
    get('advice').innerText = `${data.slips[index].advice}`
  } else {
    get('number').textContent = `${data.message.type}`
    get('advice').innerText = `${data.message.text}`
  }
}

const randomEl = arrLength => {
  return Math.floor(Math.random() * arrLength);
}

get('form').addEventListener('submit', e => {
  e.preventDefault();
  displaySearch();
  get('input').value = '';
})

// On Load
window.addEventListener('DOMContentLoaded', displayAdvice);