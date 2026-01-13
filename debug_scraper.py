import requests
from bs4 import BeautifulSoup

url = "https://www.rlc1952.de/rlc.php?id=0-0000-0"
headers = {
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
}

response = requests.get(url, headers=headers)
print(f"Status Code: {response.status_code}")
print(f"Content Length: {len(response.text)}")
soup = BeautifulSoup(response.text, 'html.parser')

links = soup.select('.headlineHolder a')
print(f"Found {len(links)} links with .headlineHolder a")

for link in links[:3]:
    print(f"Link: {link.get('href')} - Text: {link.text}")

# Check IDs
for link in links:
    href = link.get('href')
    if href and 'id=' in href:
        id_part = href.split('=')[-1]
        print(f"ID Part: {id_part} - Count-: {id_part.count('-')}")
