import requests
import time
import sys

def get_price(pair):
    url = "https://tradeogre.com/api/v1/markets"
    response = requests.get(url)
    
    if response.status_code == 200:
        data = response.json()
        if pair in data:
            market_data = data[pair]
            price = market_data.get("price", "N/A")
            return price
        else:
            return f"Error: {pair} not found in market data"
    else:
        return "Error: Unable to fetch data"

def continuously_update_price(pair):
    while True:
        price = get_price(pair)
        print(f"The current {pair} price is: {price}", flush=True)
        time.sleep(5)

if __name__ == "__main__":
    if len(sys.argv) > 1:
        pair = sys.argv[1]
    else:
        pair = "XMR-BTC"  # Default value if no argument is provided

    continuously_update_price(pair)
