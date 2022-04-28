const get = selector => {
  const element = document.getElementById(selector);
  return element ? element : new Error(`check ${selector}, no element found.`);
}

const url = 'https://api.adviceslip.com/advice';

const getAdvice = async () => {
  get('spin').style.display = 'inline-block';
  let res = await fetch(url);
  let data = await res.json(); 
  try {
    displayAdvice(data);
  } catch (err) {
    console.log(err);
  }
}

const displayAdvice = data => {
  get('spin').style.display = 'none';
  get('number').textContent = `${data.slip.id}`;
  get('advice').innerText = `${data.slip.advice}`;
}

get('getAdvice').addEventListener('click', () => {
  getAdvice();
});

// window.addEventListener('DOMContentLoaded', getAdvice);