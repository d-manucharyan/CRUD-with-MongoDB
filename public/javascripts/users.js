document.getElementById('editBtn').addEventListener('click', () => {
    const id = document.getElementById('editBtn').dataset.id
    const data = {
        firstname: document.getElementById('firstname').value,
        lastname: document.getElementById('lastname').value,
        age: document.getElementById('age').value,
        email: document.getElementById('email').value,
        address: document.getElementById('address').value
    }

    fetch(`/user/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
    })
        .then(res => res.json())
        .then(window.location.reload())
})