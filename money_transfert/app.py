from flask import Flask, render_template, request, jsonify

app = Flask(__name__)

# Configuration
SENDING_FEES = 0.02
EXCHANGE_RATE = 655

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/calculate', methods=['POST'])
def calculate():
    try:
        data = request.get_json()
        amount = float(data['amount'])
        
        fee_amount = SENDING_FEES * amount
        total_amount = amount + fee_amount
        receiving_amount = EXCHANGE_RATE * amount
        
        return jsonify({
            'success': True,
            'fee_amount': f"${fee_amount:,.2f}",
            'total_amount': f"${total_amount:,.2f}",
            'receiving_amount': f"{receiving_amount:,} CFA",
            'exchange_rate': f"1 USD = {EXCHANGE_RATE} CFA"
        })
    except Exception as e:
        return jsonify({'success': False, 'error': str(e)})

if __name__ == '__main__':
    app.run(debug=True)