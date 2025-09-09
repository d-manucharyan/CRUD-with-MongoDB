window.addEventListener('click', (e) => {
    const id = e.target.dataset.id;
    if (id) {
        fetch(`/${id}`, {
            method: "DELETE"
        })
            .then(res => res.json())
            .then(res => {
                console.log(res);
                window.location.reload();
            })
            .catch(err => console.error("Delete request failed:", err));
    }
});

