-- More seed data for HowToHub.bd (Optimized: Using external image URLs to save DB storage)

INSERT INTO posts (title, content, video_url, thumbnail_url, published)
VALUES
(
    'JavaScript ES6 Features You Must Know',
    '## Modern JavaScript\n\nES6 brought significant changes to JavaScript. Here are the top features:\n\n1. **Arrow Functions**: Concise syntax for writing functions.\n2. **Destructuring**: Extract values from arrays/objects easily.\n3. **Spread Operator**: Expand arrays/objects.\n\n```javascript\nconst sum = (a, b) => a + b;\nconst [first, second] = [10, 20];\n```',
    'https://www.youtube.com/watch?v=NCwa_xi0Uuc',
    'https://coresg-normal.trae.ai/api/ide/v1/text_to_image?prompt=JavaScript%20code%20abstract%20yellow%20background&image_size=landscape_16_9',
    true
),
(
    'Git & GitHub Crash Course',
    '## Version Control Basics\n\nGit is essential for any developer. Learn how to manage your code history.\n\n### Basic Commands\n\n- `git init`: Initialize a repo\n- `git add .`: Stage changes\n- `git commit -m "message"`: Save changes\n- `git push`: Upload to GitHub\n\nStart using version control today!',
    'https://www.youtube.com/watch?v=RGOj5yH7evk',
    'https://coresg-normal.trae.ai/api/ide/v1/text_to_image?prompt=Git%20branching%20diagram%20on%20dark%20background&image_size=landscape_16_9',
    true
),
(
    'Python for Data Science: Quick Start',
    '## Why Python?\n\nPython is the leading language for data science due to libraries like Pandas, NumPy, and Matplotlib.\n\n### Installation\n\nInstall Python and Jupyter Notebook to get started.\n\n```python\nimport pandas as pd\ndf = pd.read_csv("data.csv")\nprint(df.head())\n```',
    'https://www.youtube.com/watch?v=LHBE6Q9XlzI',
    'https://coresg-normal.trae.ai/api/ide/v1/text_to_image?prompt=Python%20snake%20logo%20with%20data%20charts%20background&image_size=landscape_16_9',
    true
),
(
    'CSS Flexbox vs Grid: When to Use Which?',
    '## Layout Systems\n\nModern CSS offers two powerful layout systems: Flexbox and Grid.\n\n### Flexbox\nBest for 1-dimensional layouts (row OR column).\n\n### Grid\nBest for 2-dimensional layouts (rows AND columns).\n\nLearn when to use each for the best results.',
    'https://www.youtube.com/watch?v=hs3piaN4b5I',
    'https://coresg-normal.trae.ai/api/ide/v1/text_to_image?prompt=CSS%20layout%20grid%20vs%20flexbox%20comparison%20diagram&image_size=landscape_16_9',
    true
);

INSERT INTO ads (title, description, image_url, link_url, html, type, placement, enabled)
VALUES
(
    'ক্যারিয়ার বুটক্যাম্প ২০২৬',
    'জব-রেডি স্কিল শিখুন ৮ সপ্তাহে। সীমিত সিট।',
    'https://coresg-normal.trae.ai/api/ide/v1/text_to_image?prompt=Career%20bootcamp%20banner%20neon%20gradient%20tech%20theme&image_size=landscape_16_9',
    'https://example.com/bootcamp',
    NULL,
    'image',
    'home_hero',
    true
),
(
    'ফ্রি ওয়েব ডেভ ওয়ার্কশপ',
    'লাইভ ক্লাস + প্রজেক্ট বেসড লার্নিং।',
    'https://coresg-normal.trae.ai/api/ide/v1/text_to_image?prompt=Live%20web%20development%20workshop%20banner%20dark%20blue%20theme&image_size=landscape_16_9',
    'https://example.com/workshop',
    NULL,
    'image',
    'home_middle',
    true
),
(
    'এআই টুলস বান্ডেল',
    'প্রোডাক্টিভিটির জন্য বেস্ট ২০টি এআই টুল একসাথে।',
    NULL,
    'https://example.com/ai-tools',
    NULL,
    'text',
    'home_footer',
    true
),
(
    'স্পনসরড টিউটোরিয়াল',
    'শূন্য থেকে ফুল-স্ট্যাক ডেভেলপার হওয়ার গাইড।',
    NULL,
    'https://example.com/fullstack',
    NULL,
    'text',
    'post_top',
    true
),
(
    'HTML স্পনসরড ব্লক',
    NULL,
    NULL,
    NULL,
    '<div style="padding:16px;border-radius:12px;background:#0f172a;color:#e2e8f0;"><strong>স্পনসরড:</strong> নতুন React কোর্সে ৩০% ছাড়। <a href="https://example.com/react" style="color:#93c5fd;">এখনই দেখুন</a></div>',
    'html',
    'post_inline',
    true
),
(
    'জব রেডি কোর্স',
    'সিভি রিভিউ, মক ইন্টারভিউ, জব রেফারাল সাপোর্ট।',
    'https://coresg-normal.trae.ai/api/ide/v1/text_to_image?prompt=Job%20ready%20course%20banner%20modern%20minimal%20design&image_size=landscape_16_9',
    'https://example.com/job-ready',
    NULL,
    'image',
    'post_bottom',
    true
);
