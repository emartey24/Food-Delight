const form = document.querySelector('form')

form.addEventListener('submit', () => {
    const data = new FormData(form);
    const url = new URLSearchParams(data).toString();

    fetch('http://localhost:3000/login', {
        method: "POST", 
        body: url,
        headers: {
            'Content-type': 'application/x-www-form-urlencoded'
        }
    })
})