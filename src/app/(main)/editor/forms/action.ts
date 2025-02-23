"use server";

import { getGeminiModel, generateContent } from "@/lib/Gemini"; // Import the function
import {
  GenerateSummaryInput,
  generateSummarySchema,
  GenerateWorkExperienceInput,
  generateWorkExperienceSchema,
  WorkExperience,
  ResumeValues,
} from "@/lib/validation";
import { auth } from "@clerk/nextjs/server";

const SUMMARY_SYSTEM_MESSAGE = `You are a highly skilled AI expert in crafting concise and compelling resume summaries.  Given the user's provided work experience, skills, and career goals, generate a single, professional summary statement optimized to capture the attention of recruiters.  Focus on highlighting key achievements and relevant qualifications.

*Output Requirements:*

*   *Concise:* Keep the summary to 3-4 lines maximum.
*   *Professional:* Maintain a formal and polished tone.
*   *Achievement-Oriented:* Quantify accomplishments whenever possible.
*   *Targeted:* Align the summary with the user's desired job roles and industry.
*   *Singular:* Return ONLY the resume summary statement. Do not include any introductory phrases, explanations, or conversational elements.
    `;

const WORK_EXPERIENCE_SYSTEM_MESSAGE = `You are a helpful and supportive AI assistant specializing in crafting impactful work experience entries for resumes, particularly for students and recent graduates just starting their careers.  Your goal is to take user input and generate a single, compelling work experience entry suitable for a resume.

Remember, the person using you is likely new to resume writing, so be clear and helpful in interpreting their input, even if it's incomplete. Focus on highlighting transferable skills and quantifiable achievements wherever possible.

Your response must adhere to the following structure.  *If specific information (like a start/end date) isn't provided, simply omit that field from your response.  Do not add any new fields beyond what's listed here.*  Prioritize creating a clear and concise description, even if it needs to be inferred from the job title.

*Here's the required structure:*

Job title: <Job Title>
Company: <Company Name>
Start date: <YYYY-MM-DD> (Only include if provided in user input)
End date: <YYYY-MM-DD> (Only include if provided in user input)
Description:
*   <Action verb> <Task or responsibility> resulting in <Quantifiable result or positive outcome>
*   <Action verb> <Task or responsibility> utilizing <Skill> to achieve <Goal>
*   <Action verb> <Task or responsibility> and <Collaborated with team> for <Project/Initiative>

*Important Guidelines:*

*   *Focus on Action Verbs:* Use strong action verbs to start each bullet point (e.g., Developed, Managed, Assisted, Created, Implemented, Contributed).
*   *Highlight Transferable Skills:* Even seemingly simple jobs involve valuable skills (e.g., communication, teamwork, problem-solving, time management).  Emphasize these.
*   *Quantify Where Possible:*  Instead of "Improved customer service," say "Improved customer satisfaction scores by 15%."  If no hard numbers are available, use relative terms like "significantly improved" or "reduced time by approximately 20%."
*   *Infer Meaning When Needed:* If the user provides a job title like "Sales Intern," and nothing else, infer common responsibilities of a Sales Intern and create a relevant description.
*   *Be Concise:*  Keep bullet points brief and to the point.  Focus on the most impactful aspects of the experience.
*   *Assume the User is a Novice:* Provide clear and easy-to-understand language. Avoid jargon.
*   *Positive Tone:* Frame the description in a positive and proactive manner.

By following these guidelines, you will help students and freshers create strong and effective work experience entries for their resumes.
`;

export async function generateSummary(resumeData: ResumeValues): Promise<string> {
  const model = getGeminiModel();
  
  const prompt = `
    Job Title: ${resumeData.jobTitle || 'Not specified'}
    
    Work Experience:
    ${resumeData.workExperiences?.map(exp => `
    - ${exp.position} at ${exp.company}
    ${exp.description}`).join('\n') || 'No work experience provided'}
    
    Education:
    ${resumeData.educations?.map(edu => `
    - ${edu.degree} from ${edu.school}`).join('\n') || 'No education provided'}
    
    Skills:
    ${resumeData.skills?.join(', ') || 'No skills provided'}

    ${SUMMARY_SYSTEM_MESSAGE}
  `;

  const response = await generateContent(prompt, model);
  if (!response) {
    throw new Error("Failed to generate summary");
  }

  return response;
}

export async function generateWorkExperience(
  input: GenerateWorkExperienceInput,
) {
  const { userId } = await auth();

  if (!userId) {
    throw new Error("Unauthorized");
  }

  const { description } = generateWorkExperienceSchema.parse(input);

  const model = getGeminiModel("gemini-1.5-pro-latest");

  const workExpUserMessage = `
  Please provide a work experience entry from this description:
  ${description}
  `;

  const prompt = `${WORK_EXPERIENCE_SYSTEM_MESSAGE}\n${workExpUserMessage}`;

  const aiResponse = await generateContent(prompt, model); // Pass the model to generateContent

  if (!aiResponse) {
    throw new Error("Failed to generate AI response");
  }

  // Updated parsing logic (using a single regex for each field):
  const positionMatch = /Job title:\s*(.*?)(?:\n|$)/.exec(aiResponse);
  const companyMatch = /Company:\s*(.*?)(?:\n|$)/.exec(aiResponse);
  const descriptionMatch = /Description:\s*([\s\S]*?)(?:\n|$)/.exec(aiResponse);
  const startDateMatch = /Start date:\s*(\d{4}-\d{2}-\d{2})(?:\n|$)/.exec(aiResponse);
  const endDateMatch = /End date:\s*(\d{4}-\d{2}-\d{2})(?:\n|$)/.exec(aiResponse);

  const response = {
    position: positionMatch ? positionMatch[1].trim() : "",
    company: companyMatch ? companyMatch[1].trim() : "",
    description: descriptionMatch ? descriptionMatch[1].trim() : "",
    startDate: startDateMatch ? startDateMatch[1] : undefined,
    endDate: endDateMatch ? endDateMatch[1] : undefined,
  } satisfies WorkExperience;

  return {
    ...response,
    startDate: response.startDate || "",
    endDate: response.endDate || "",
    description: [response.description],  // Convert description to array
  };
}