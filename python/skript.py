import requests
import time

def get_xmr_btc_price():
    url = "https://tradeogre.com/api/v1/markets"
    response = requests.get(url)
    
    if response.status_code == 200:
        data = response.json()
        for market in data:
            if "XMR-BTC" in market:
                xmr_btc_data = market["XMR-BTC"]
                price = xmr_btc_data.get("price", "N/A")
                return price
    else:
        return "Error: Unable to fetch data"

def continuously_update_price():
    while True:
        price = get_xmr_btc_price()
        print(f"The current XMR-BTC price is: {price}", flush=True)
        time.sleep(5)

if __name__ == "__main__":
    continuously_update_price()
