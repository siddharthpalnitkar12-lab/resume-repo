# PRD — Siddharth Palnitkar Resume Site

## Original problem statement
"I want to build a resume site to be chatbot readable and then I want to import the site code to GitHub and then deploy the code from github to vercel"
User choices: content from uploaded PDF; chat widget (keyword matching, no AI key) + AI-crawler HTML, JSON-LD, llms.txt, plain-text resume; frontend-only static site for Vercel; clean minimal editorial style. Do NOT show phone number or residential address.

## Architecture
- Static React (CRA/craco) in /app/frontend — no backend used.
- Data: src/data/resume.js; chat engine: src/lib/chatEngine.js; Lenis smooth scroll; framer-motion.
- Machine-readable: public/llms.txt, resume.json, resume.txt, robots.txt; JSON-LD + full static resume HTML inside #root in public/index.html.
- Vercel: frontend/vercel.json (CI=false yarn build, output build). Set Vercel Root Directory = frontend.

## Implemented (2026-10-10)
- Recruiter "Why hire Siddharth?" hero button + chat chip → opens chat and asks AI for a short pitch (keyword fallback pitch included), with a "Copy pitch" button on pitch replies.
- AI chat: POST /api/chat streams plain text. Preview = FastAPI + Emergent key (gpt-5.6-terra); Vercel = frontend/api/chat.js using OPENAI_API_KEY (optional OPENAI_MODEL). Falls back to keyword answers on error. Frontend calls same-origin /api/chat.
- Hero with masked line reveal + 3D tilt/parallax image, bot-readable bar, marquee, About/Objective, Academics, Skills bento, Contact (email + LinkedIn only), Ask-my-resume chat widget, SP monogram favicon.

## Backlog
- P1: Add canonical/og:url + sitemap.xml once Vercel domain is known
- P1: Profile photo, internships/projects when available
- P1: Rate limiting on /api/chat
- P2: Real AI chat via Vercel serverless function (DONE)
