document.addEventListener('DOMContentLoaded', function() {
    const amountInput = document.getElementById('amount');
    const calculateBtn = document.getElementById('calculate-btn');
    const resultsContainer = document.getElementById('results');
    const confirmation = document.getElementById('confirmation');
    
    // Calculate button click handler
    calculateBtn.addEventListener('click', function() {
        const amount = parseFloat(amountInput.value);
        
        if (isNaN(amount) {
            alert('Please enter a valid amount');
            return;
        }
        
        fetch('/calculate', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ amount: amount })
        })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                document.getElementById('fee-amount').textContent = data.fee_amount;
                document.getElementById('total-amount').textContent = data.total_amount;
                document.getElementById('receiving-amount').textContent = data.receiving_amount;
                document.getElementById('exchange-rate').textContent = data.exchange_rate;
                resultsContainer.classList.remove('hidden');
            } else {
                alert('Error: ' + data.error);
            }
        })
        .catch(error => {
            console.error('Error:', error);
            alert('An error occurred. Please try again.');
        });
    });
    
    // Confirm transfer button
    document.getElementById('confirm-btn').addEventListener('click', function() {
        resultsContainer.classList.add('hidden');
        confirmation.classList.remove('hidden');
    });
    
    // Cancel button
    document.getElementById('cancel-btn').addEventListener('click', function() {
        resultsContainer.classList.add('hidden');
    });
    
    // New transfer button
    document.getElementById('new-transfer').addEventListener('click', function() {
        confirmation.classList.add('hidden');
        amountInput.value = '';
    });
});