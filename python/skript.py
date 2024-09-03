import requests
import time
import sys

def get_price(pair):
    url = "https://tradeogre.com/api/v1/markets"
    response = requests.get(url)
    
    if response.status_code == 200:
        data = response.json()
        if isinstance(data, list):
            for market_data in data:
                if pair in market_data:
                    price = market_data[pair].get("price", "N/A")
                    return price
            return f"Error: {pair} not found in market data"
        else:
            return "Error: Unexpected data format"
    else:
        return "Error: Unable to fetch data"

def continuously_update_price(pair):
    while True:
        price = get_price(pair)
        print(f"The current {pair} price is: {price}", flush=True)
        time.sleep(5)

if __name__ == "__main__":
    if len(sys.argv) > 1:
        pair = sys.argv[1]  # Načtení páru z příkazové řádky
    else:
        pair = "BTC-USDT"  # Výchozí hodnota, pokud není zadán žádný argument

    continuously_update_price(pair)
