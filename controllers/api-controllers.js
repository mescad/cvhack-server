const axios = require("axios");
require("dotenv").config()
const API_KEY = process.env.OPENAI_API_KEY;


console.log(API_KEY);

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

    const openaiEndpoint = "https://api.openai.com/v1/chat/completions";
    const headers = {
      Authorization:
        `Bearer ${API_KEY}`,
      "Content-Type": "application/json",
    };

    const payload = {
      model: "gpt-3.5-turbo-16k",
      messages: [
        {
          role: "user",
          content: ` 
      I am providing you with my CV data and with a job description for the job that I am looking to apply to. Here is the job description for the job ${jobData}
      Extract the keywords from the job description and include them naturally into the CV. Please make sure that the keywords are naturally included and make sense in the context of the sentences.  The flexibility of adding the keywords should be limited within the typical algorithm of an ATS system (Applicant Tracking System). Make sure that the new formulated sentences make sense and  are compliant with the ATS system. 
      
      Have a look through the CV data and structure the final output strictly following the logic below:
        Part 1: Job experience
      - A list of job titles with a description of each role. The job title with tenure and company name should be the header, with the job description below.
       
       Part2: Education
      - A list of institutions, with degree titles with a description below.The degree and institution name should be the header of the list.
      
      Part 3: Skills
      - A list of skills by the candidate
      
      Please apply the structure to the following data to ${cvData} and return back the data with each section wrapped in a <p> and end with </p> tag.`,
        },
      ],
      temperature: 1,
      top_p: 0.9,
      n: 1,
      stream: false,
      max_tokens: 10000,
      presence_penalty: 0,
      frequency_penalty: 0,
    };

    const response = await axios.post(openaiEndpoint, payload, {
      headers: headers,
    });
    const result = response.data.choices[0].message.content.trim();
    console.log(result);

    res.json({ message: "data received", reformatedCV: result });
  } catch (error) {
    console.error("Error", error);
    res.status(500).json({ message: "An error occured with the data" });
  }
};
