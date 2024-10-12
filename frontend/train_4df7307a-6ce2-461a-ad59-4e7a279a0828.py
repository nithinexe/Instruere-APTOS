# import requests
# import os
# from dotenv import load_dotenv
# import json

# load_dotenv()
# pinata_api_key = os.environ.get("PINATA_API_KEY")
# pinata_secret_api_key = os.environ.get("PINATA_SECRET_API_KEY")

model_repo_id = "DEEPAK70681/sendIntentModelTHEOGv1"

print(model_repo_id)



# print(f"Uploading started: {model_repo_id}")
# data = {
#     'model_repo_id': model_repo_id
# }
# json_data = json.dumps(data)

# headers = {
#     "pinata_api_key": pinata_api_key,
#     "pinata_secret_api_key": pinata_secret_api_key
# }

# response = requests.post(
#     "https://api.pinata.cloud/pinning/pinJSONToIPFS",
#     json=data,
#     headers=headers
# )

# # Check the response from Pinata
# if response.status_code == 200:
#     ipfs_hash = response.json()["IpfsHash"]
#     print(f"model_repo_id uploaded successfully. IPFS hash: {ipfs_hash}")
  
# else:
#     print(f"Failed to upload model_repo_id. Status code: {response.status_code}")
#     print(response.text)
