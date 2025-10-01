// Frontend scripts
document.getElementById('salesForm').addEventListener('submit', async (e) => {
    e.preventDefault();

    const item_name = document.getElementById('item_name').value;
    const quantity = parseInt(document.getElementById('quantity').value);
    const price = parseFloat(document.getElementById('price').value);

    const response = await fetch('http://localhost:3000/add-sale', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({ item_name, quantity, price })
    });

    const msg = await response.text();
    document.getElementById('msg').innerText = msg;
    document.getElementById('salesForm').reset();
});
