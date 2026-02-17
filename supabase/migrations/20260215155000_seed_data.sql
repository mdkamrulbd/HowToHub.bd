-- Seed data for HowToHub.bd
-- Note: Replace 'gen_random_uuid()' with actual UUIDs if you want deterministic IDs, otherwise let DB generate them.

INSERT INTO posts (title, content, video_url, thumbnail_url, published)
VALUES
(
    'নেক্সট.জেএস ১৪ দিয়ে শুরু',
    '## পরিচিতি\n\nNext.js 14 এর App Router রাউটিং ও লেআউট ম্যানেজমেন্ট সহজ করে। এই টিউটোরিয়ালে নতুন প্রজেক্ট সেটআপ এবং প্রথম পেজ তৈরি করা শিখবেন।\n\n### ধাপ ১: ইনস্টলেশন\n\nনিচের কমান্ড চালান:\n```bash\nnpx create-next-app@latest my-app\n```\n\n### ধাপ ২: সার্ভার চালু করা\n\nপ্রজেক্ট ফোল্ডারে যান এবং ডেভ সার্ভার চালু করুন:\n```bash\ncd my-app\nnpm run dev\n```\n\nএখন ব্রাউজারে `http://localhost:3000` ওপেন করুন।',
    'https://www.youtube.com/watch?v=wm5gMKuwSYk',
    'https://coresg-normal.trae.ai/api/ide/v1/text_to_image?prompt=Modern%20Next.js%20code%20on%20screen%20with%20dark%20mode%20editor&image_size=landscape_16_9',
    true
),
(
    'শুরুর জন্য টেইলউইন্ড CSS মাস্টারি',
    '## কেন টেইলউইন্ড CSS?\n\nTailwind CSS হলো একটি ইউটিলিটি-ফার্স্ট ফ্রেমওয়ার্ক, যেটি দিয়ে আপনি দ্রুত মডার্ন ওয়েবসাইট তৈরি করতে পারেন।\n\n### মূল ধারণা\n\n1. **ইউটিলিটি ক্লাস**: কাস্টম CSS না লিখে `flex`, `pt-4`, `text-center` এর মতো ক্লাস ব্যবহার করেন।\n2. **রেসপনসিভ ডিজাইন**: `md:`, `lg:` প্রিফিক্স দিয়ে সহজেই রেসপনসিভ করা যায়।\n\nউদাহরণ:\n```html\n<div class="bg-blue-500 text-white p-4 rounded-lg shadow-lg">\n  Hello Tailwind!\n</div>\n```',
    'https://www.youtube.com/watch?v=lCxcTsOHrjo',
    'https://coresg-normal.trae.ai/api/ide/v1/text_to_image?prompt=Tailwind%20CSS%20logo%20with%20abstract%20blue%20waves%20background&image_size=landscape_16_9',
    true
),
(
    'Supabase: ফায়ারবেসের ওপেন সোর্স বিকল্প',
    '## Supabase কী?\n\nSupabase হলো Firebase এর ওপেন সোর্স বিকল্প। এতে আছে Postgres ডাটাবেস, অথেন্টিকেশন, ইনস্ট্যান্ট API, রিয়েলটাইম সাবস্ক্রিপশন এবং স্টোরেজ।\n\n### Authentication সেটআপ\n\n1. Supabase এ একটি প্রজেক্ট তৈরি করুন।\n2. Authentication সেটিংসে যান।\n3. Email/Password প্রোভাইডার চালু করুন।\n\nএতটাই সহজ!',
    'https://www.youtube.com/watch?v=zZ6NOIEqLTk',
    'https://coresg-normal.trae.ai/api/ide/v1/text_to_image?prompt=Database%20connection%20concept%20with%20glowing%20lines%20green%20theme&image_size=landscape_16_9',
    true
),
(
    'React Hooks এর পরিচিতি',
    '## Hooks কী?\n\nReact 16.8 এ Hooks যুক্ত হয়। Hooks দিয়ে ক্লাস লেখা ছাড়াই স্টেট এবং অন্যান্য React ফিচার ব্যবহার করা যায়।\n\n### useState Hook\n\n```javascript\nimport React, { useState } from ''react'';\n\nfunction Example() {\n  const [count, setCount] = useState(0);\n\n  return (\n    <div>\n      <p>আপনি {count} বার ক্লিক করেছেন</p>\n      <button onClick={() => setCount(count + 1)}>\n        ক্লিক করুন\n      </button>\n    </div>\n  );\n}\n```',
    'https://www.youtube.com/watch?v=TNhaISOUy6Q',
    'https://coresg-normal.trae.ai/api/ide/v1/text_to_image?prompt=React%20logo%20spinning%20in%203d%20space%20blue%20background&image_size=landscape_16_9',
    true
);
