
# Project Title

The CVHACK project helps people adjust their CV's according to the job description for the desired job.The app is intended to customize and refine a candidate's CV based on the job description that the candidate is applying for as well as making the cv format readable for the ATS system.

## Installation

Install CVHACK with npm

```bash

  cd into cvhack folder
  run npm install in the terminal
  create a new file called .env in cvhack/src folder and copy+paste the values from the .env_template
  run npm start
  
```
    
## Run Locally

Clone the project

```bash
  git clone git@github.com:mescad/cvhack.git
```

Go to the project directory

```bash
  cd cvhack
```

Install dependencies

```bash
  npm install
```

Start the server

```bash
  npm start
```


## API Reference

#### Check for API response

```http
  GET /api/
```



#### Send request and get response from chat gpt

```http
  POST /api/
```

Receives the user input as REQ.
Sends back the CHAT GPT response based on the pre-written prompt

User input:
- cvData - raw parsed pdf data of the candidate cv
- jobData - description of the job 
- wildMode (boolean for wild mode toggle)


Prompt: - stored on the back end (pre-written)

Output:
API CALL 1:
- reformatedCv - Structured CV from cvData input + prompt1

API CALL 2:
- jobKeywords - keywords extracted from jobData input + prompt2

API CALL 3:
-finalResponse - final output which takes jobKeywords + reformatedCV + prompt3 as input.

#### Send refine request and get response from chat gpt

```http
  POST /api/refine
```
API ALL 4:
Receives the user input, previous assistance answer as well as the revised prompt including the possitive and negative keywords.

Takes the following as input:
reformated CV, jobKeywords,finalResponse, prompt3 + refinementPrompt

Sends back the CHAT GPT respone as refinedCV





## Screenshots

Set up input 1
![App Screenshot](https://github.com/mescad/cvhack/blob/main/Screenshot%202023-09-04%20at%2021.27.00.png)

Set up input 2
![App Screenshot](https://github.com/mescad/cvhack/blob/main/Screenshot%202023-09-04%20at%2021.27.30.png)

Loading
![App Screenshot](https://github.com/mescad/cvhack/blob/main/Screenshot%202023-09-04%20at%2021.37.34.png)

Final output
![App Screenshot](https://github.com/mescad/cvhack/blob/main/Screenshot%202023-09-04%20at%2021.39.49.png)

Refinement
![App Screenshot](https://github.com/mescad/cvhack/blob/main/Screenshot%202023-09-04%20at%2021.40.48.png)


## Optimizations

What optimizations did you make in your code? E.g. refactors, performance improvements, accessibility


The code does 3 API calls in total by defaul with one more call for optional refinement.

1. API CALL-Structuring the parsed data from the pdf. 
-Adding structure to the current parsed CV.

-Optimisation done: Reduced the prompt size and moved to GPT3.5 turbo due to low complexity.

2.API CALL- Keyword extraction
- Extracting the main words out of the job application input

-Optimisation done: Reduced the prompt size and moved to GPT3.5 turbo due to low complexity.

3. API CALL- Data merge and CV refinement using the inputs

- Optimisation done: Moved to GPT4 algorithm due to its better propmpt undestanding and better intelligence.

## Authors

- [@mescad](https://www.github.com/mescad)

