const axios = require("axios");
require("dotenv").config();
const API_KEY = process.env.OPENAI_API_KEY;
const {OpenAIApi} = require("openai")

const openaiEndpoint = "https://api.openai.com/v1/chat/completions";
const headers = {
  Authorization: `Bearer ${API_KEY}`,
  "Content-Type": "application/json",
};

async function getGPTResponse(promptMessage, inputData, temp) {
  const payload = {
    model: "gpt-3.5-turbo-16k",
    messages: [
      {
        role: "system",
        content: promptMessage,
      },
      {
        role: "user",
        content: inputData,
      },
    ],
    temperature: temp,
    top_p: 1,
    n: 1,
    stream: false,
    max_tokens: 10000,
    presence_penalty: 0,
    frequency_penalty: 0,
  };

  const response = await axios.post(openaiEndpoint, payload, {
    headers: headers,
  });

  return response.data.choices[0].message.content.trim();
}

async function getGPTResponseFinal(promptMessage, inputData1,inputData2, temp) {
  const payload = {
    model: "gpt-4-0613",
    messages: [
      {
        role: "system",
        content: promptMessage,
      },
      {
        role: "user",
        content: `User CV ${inputData1}`,
      },
      {
        role: "user",
        content: `Keywords ${inputData2}`,
      },
    ],
    temperature: temp,
    top_p: 1,
    n: 1,
    stream: false,
    max_tokens: 7000,
    presence_penalty: 0,
    frequency_penalty: 0,
  };

  const response = await axios.post(openaiEndpoint, payload, {
    headers: headers,
  });

  return response.data.choices[0].message.content.trim();
}

exports.checkAPI = async (req, res) => {
  try {
    res.json({ message: "api connection set" });
  } catch (error) {
    res.status(404);
  }
};

exports.getCV = async (req, res) => {
  try {
    const jobData = req.body.jobDescription;
    const cvData = req.body.pdfContent;

    const prompt1 = `Segment the following CV into its major sections. Use strictly the following format: 
    1.Job title and Company
    -Job title
    -Job description
    2.Education
    -Degree/Diploma 
    3.Skills`;

    const reformatedCV = await getGPTResponse(prompt1, cvData, 0.05);
    console.log(reformatedCV);

    const prompt2 = `I am providing a job description. Extract only the job title and the most job related keywords, such as skills, responsibilities and soft skills.Return it as a list.
    `;

    const jobKeywords = await getGPTResponse(prompt2,jobData, 0.6);
    console.log(jobKeywords);

    const prompt3 = `The user will provide with a CV and with keywords extracted from a new job requirement, including skills and responsibilities.

    Include the keywords into the user CV. Make the inclusion very natural and apply the specific words in context, where it is logically  applicable.If the keywords don't match the logic of the job description section, generate a brief scenario where it could be applicable given the job title and description.
    
    Keep the same roles and titles.
    Avoid adding the new job title.
    Avoid major changes of the content.
    
    Modify the CV by maintaining its original structure and avoid changing job titles and degree titles.Use professional language and terminology and optimise for ATS algorithms. Wrap each line in a <p> tag and end with a </p> tag.
    
    Add a paragraph at the end explaining the changes done.
    
    
    `;
    
    const finalResponse = await getGPTResponseFinal(prompt3,reformatedCV,jobKeywords,0.9);
    console.log(finalResponse);

    res.json({ message: "data received", finalResponse });
  } catch (error) {
    console.error("Error", error);
    res.status(500).json({ message: "An error occured with the data" });
  }
};
