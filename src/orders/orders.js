document.addEventListener('DOMContentLoaded', function() {
    const ordersTable = document.getElementById('ordersTable').getElementsByTagName('tbody')[0];

    fetch('http://localhost:9000/sales/sale/getAll')
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            data.data.forEach(sale => {
                const row = ordersTable.insertRow();
                row.innerHTML = `
                    <td>${sale.id}</td>
                    <td>${sale.user.username}</td>
                    <td>${new Date(sale.saleDate).toLocaleString()}</td>
                    <td>$${sale.saleTotal.toFixed(2)}</td>
                `;
            });
        })
        .catch(error => {
            console.error('Error fetching sales data:', error);
            ordersTable.innerHTML = `<tr><td colspan="4">Failed to fetch sales data. Please try again later.</td></tr>`;
        });
});
