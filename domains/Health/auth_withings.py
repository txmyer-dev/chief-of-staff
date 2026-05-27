import os
import requests
import json
from datetime import datetime
from dotenv import load_dotenv

load_dotenv("/root/chief-of-staff/.env")

CLIENT_ID = os.getenv("WITHINGS_CLIENT_ID")
CLIENT_SECRET = os.getenv("WITHINGS_CLIENT_SECRET")
REDIRECT_URI = "http://localhost:8080"
TOKEN_PATH = "/root/chief-of-staff/domains/Health/withings_tokens.json"

def get_auth_url():
    """Generates the URL the user needs to visit to authorize the app."""
    url = (
        "https://account.withings.com/oauth2_user/authorize2?"
        f"response_type=code&"
        f"client_id={CLIENT_ID}&"
        f"redirect_uri={REDIRECT_URI}&"
        f"scope=user.info,user.metrics,user.activity&"
        f"state=init"
    )
    return url

def exchange_code(code):
    """Exchanges the authorization code for access and refresh tokens."""
    url = "https://wbsapi.withings.net/v2/oauth2"
    payload = {
        "action": "requesttoken",
        "grant_type": "authorization_code",
        "client_id": CLIENT_ID,
        "client_secret": CLIENT_SECRET,
        "code": code,
        "redirect_uri": REDIRECT_URI
    }
    
    response = requests.post(url, data=payload)
    data = response.json()
    
    if data.get("status") == 0:
        tokens = data["body"]
        tokens["updated_at"] = int(datetime.now().timestamp())
        with open(TOKEN_PATH, "w") as f:
            json.dump(tokens, f)
        return "Tokens saved successfully."
    else:
        return f"Error: {data}"

if __name__ == "__main__":
    print(f"1. Visit this URL to authorize: {get_auth_url()}")
    code = input("2. After authorizing, paste the 'code' from the redirect URL here: ")
    if code:
        print(exchange_code(code))
