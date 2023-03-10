const $ezWrapper = document.querySelector('.ez-wrapper');
const $ezForm = document.querySelector('.ez-form');
const $ezFormEmail = document.querySelector('#ez-email');
const $ezFormName = document.querySelector('#ez-name');
const $submitButon = document.querySelector('.ez-button');
const $invalidEmail = document.querySelector('#ez-email-invalid-span');
const $invalidName = document.querySelector('#ez-name-invalid-span');
const $closeButton = document.querySelector('.ez-close-button');
const pageHeight = Math.max(
  document.body.scrollHeight, document.documentElement.scrollHeight,
  document.body.offsetHeight, document.documentElement.offsetHeight,
  document.body.clientHeight, document.documentElement.clientHeight
  );
const scrollHeight = pageHeight - document.documentElement.clientHeight;

if (pageHeight === innerHeight) {
  $ezWrapper.classList.add('active');
}

$ezForm.addEventListener('submit', async e => {
  e.preventDefault();

  const inputEmail = document.querySelector('#ez-email');
  const inputName = document.querySelector('#ez-name');

  if (!validateEmail(inputEmail.value)) {
    $invalidEmail.removeAttribute("hidden");

    return false;
  } else {
    $invalidEmail.setAttribute("hidden", true);
  }

  if (!inputName.value) {
    $invalidName.removeAttribute("hidden");

    return false;
  } else {
    $invalidName.setAttribute("hidden", true);
  }
  
  const formData = {
    "subscriber": {
      "email": $ezFormEmail.value,
      "name": $ezFormName.value
    }
  }
  const FETCH_URL = $ezForm.action;
  const options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    credentials: 'include',
    body: JSON.stringify(formData),
  };
  const response = await fetch(FETCH_URL, options);

  if (response.status === 201) {
    alert("구독자 추가 성공");
    
    $ezFormEmail.value = '';
    $ezFormName.value = '';
    $ezWrapper.classList.remove('active');
  } else {
    alert("구독자 추가 실패");
  }
});

$closeButton.addEventListener('click', e => {
  $ezWrapper.classList.remove('active');
})

window.addEventListener('scroll', e => {
  if (pageYOffset > scrollHeight - 300) {
    $ezWrapper.classList.add('active');
  } else {
    $ezWrapper.classList.remove('active');
  }
});

function validateEmail(email) {
  const emailPattern = /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i;

  return emailPattern.test(email);
}
