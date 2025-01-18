import google.generativeai as genai

genai.configure(api_key="AIzaSyB5ejtB_QpueazK_KIKxBNFCZ0Vu-Arc9c")
model = genai.GenerativeModel("gemini-1.5-flash")
response = model.generate_content("Rephrase this text to be less emotionally intense, by about 3 points on a scale from 1 to 10: now that enough time has passed putting “the last scene” music in sonic 3 was extremely criminal due to being a targeted attack on my emotions")
print(response.text)