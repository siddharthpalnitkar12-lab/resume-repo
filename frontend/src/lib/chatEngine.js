import { resume as r } from "@/data/resume";

const list = (a) => a.join(", ");

const intents = [
  { keys: ["hire", "pitch", "why should", "good fit", "recruit"], answer: `Why hire Siddharth? He is a PGDM student at IMDR Pune specializing in finance and marketing, bringing working knowledge of ${list(r.knowledge).toLowerCase()} alongside strengths in ${list(r.competencies).toLowerCase()}. With a strong academic record (8.67 CGPA in graduation), hands-on ${list(r.technical.slice(0, 2))} skills and fluency in ${list(r.languages)}, he is ready to contribute to a finance or marketing internship. Reach him at ${r.email}.` },
  { keys: ["contact", "email", "reach", "hire", "linkedin", "connect", "mail"], answer: `You can reach Siddharth at ${r.email} or on LinkedIn: ${r.linkedin}` },
  { keys: ["educat", "study", "studies", "degree", "college", "universit", "pgdm", "academ", "cgpa", "grade", "score", "hsc", "ssc", "school", "qualif"], answer: r.academics.map((a) => `${a.course} (${a.year}) — ${a.institute}${a.score !== "—" ? `, ${a.score}` : ""}`).join(" · ") },
  { keys: ["skill", "excel", "powerpoint", "tool", "software", "technical"], answer: `Technical skills: ${list(r.technical)}. Core competencies: ${list(r.competencies)}. Knowledge areas: ${list(r.knowledge)}.` },
  { keys: ["competenc", "strength", "good at", "strategy", "strategic", "problem"], answer: `Core competencies: ${list(r.competencies)}.` },
  { keys: ["tax", "account", "legal", "law", "finance", "financial"], answer: `Siddharth specializes in finance and marketing, with working knowledge of ${list(r.knowledge).toLowerCase()}.` },
  { keys: ["marketing", "market research", "research"], answer: `Marketing is one of Siddharth's two PGDM specializations, backed by market research skills and an interest in business & market trends.` },
  { keys: ["goal", "objective", "looking", "seek", "internship", "intern", "career", "role", "job", "available", "experience", "work"], answer: r.objective },
  { keys: ["language", "speak", "hindi", "marathi", "english"], answer: `Languages known: ${list(r.languages)}.` },
  { keys: ["interest", "hobb", "free time", "cricket", "football", "sport", "fitness", "travel"], answer: `Personal interests: ${list(r.interests)}.` },
  { keys: ["where", "location", "based", "city", "pune"], answer: `Siddharth studies at IMDR in Pune, India.` },
  { keys: ["hello", "hey", "who", "about", "tell me", "summary"], answer: `${r.name} is a ${r.headline} at ${r.institute}. ${r.about}` },
];

export const PITCH_QUESTION = "Why should a recruiter hire Siddharth? Give a short, persuasive pitch.";
export const rolePitch = (role) => `Why should a recruiter hire Siddharth for the role of "${role}"? Give a short, persuasive pitch tailored to that role, using only facts from his resume.`;

export const suggestions = [
  "Why hire Siddharth?",
  "What is Siddharth studying?",
  "What are his skills?",
  "What role is he looking for?",
  "How can I contact him?",
];

export function answer(q) {
  const text = q.toLowerCase();
  let best = null;
  let score = 0;
  intents.forEach((i) => {
    const s = i.keys.filter((k) => text.includes(k)).length;
    if (s > score) { score = s; best = i; }
  });
  return best
    ? best.answer
    : "I can answer questions about Siddharth's education, skills, competencies, career goals, languages, interests and contact details. Try one of the suggestions below.";
}
