const get = selector => {
  const element = document.getElementById(selector);
  return element ? element : new Error(`check ${selector}, no element found.`);
}

const url = 'https://api.adviceslip.com/advice';

const getAdvice = async () => {
  let res = await fetch(url);
  let data = await res.json(); 
  try {
    displayAdvice(data);
  } catch (err) {
    console.log(err);
  }
}

const displayAdvice = data => {
  get('number').textContent = `${data.slip.id}`;
  get('advice').innerText = `${data.slip.advice}`;
}

get('getAdvice').addEventListener('click', () => {
  getAdvice();
});