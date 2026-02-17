
export default function AboutPage() {
  return (
    <div className="page-bg min-h-screen py-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-4">
            HowToHub.bd <span className="text-indigo-400">সম্পর্কে</span>
          </h1>
          <p className="text-lg text-slate-300">
            প্রযুক্তি ও সমাধানের এক বিশ্বস্ত প্ল্যাটফর্ম
          </p>
        </div>

        <div className="surface-strong rounded-3xl p-8 md:p-12 space-y-8 shadow-2xl shadow-indigo-500/10 border border-white/10">
          <div className="prose prose-lg prose-invert max-w-none">
            <p className="lead text-xl text-slate-200">
              <strong>HowToHub.bd</strong> বাংলাদেশের প্রযুক্তিপ্রেমী ও সাধারণ ব্যবহারকারীদের জন্য একটি ওয়ান-স্টপ সলিউশন হাব। আমরা বিশ্বাস করি, প্রযুক্তির জটিল সমস্যাগুলোর সমাধান হওয়া উচিত সহজ এবং সবার জন্য বোধগম্য।
            </p>

            <h3 className="text-2xl font-bold text-white mt-8 mb-4">আমাদের উদ্দেশ্য</h3>
            <p className="text-slate-300">
              স্মার্টফোন থেকে শুরু করে কম্পিউটার সফটওয়্যার, দৈনন্দিন জীবনের ছোট-বড় টেকনিক্যাল সমস্যার সমাধান বাংলায় পৌঁছে দেওয়াই আমাদের মূল লক্ষ্য। আমরা চাই প্রযুক্তি ভীতি দূর করে আপনাকে আরও প্রোডাক্টিভ ও স্মার্ট করে তুলতে।
            </p>

            <div className="grid md:grid-cols-2 gap-6 my-8 not-prose">
              <div className="surface p-6 rounded-2xl border border-white/5">
                <h4 className="text-lg font-bold text-indigo-300 mb-2">সহজ টিউটোরিয়াল</h4>
                <p className="text-sm text-slate-400">
                  ধাপে ধাপে শেখানো গাইড যা অনুসরণ করে আপনি নিজেই সমস্যার সমাধান করতে পারবেন।
                </p>
              </div>
              <div className="surface p-6 rounded-2xl border border-white/5">
                <h4 className="text-lg font-bold text-fuchsia-300 mb-2">এক্সপার্ট সাপোর্ট</h4>
                <p className="text-sm text-slate-400">
                  আমাদের ইমেইল নিউজলেটারের মাধ্যমে সরাসরি আপনার প্রশ্নের উত্তর ও সমাধান।
                </p>
              </div>
            </div>

            <h3 className="text-2xl font-bold text-white mt-8 mb-4">কেন আমরা আলাদা?</h3>
            <ul className="space-y-2 text-slate-300 list-disc list-inside marker:text-indigo-500">
              <li>সম্পূর্ণ বাংলায় সহজবোধ্য কন্টেন্ট</li>
              <li>নিয়মিত আপডেটেড টেকনোলজি টিপস ও ট্রিকস</li>
              <li>ভিডিও এবং লিখিত গাইডের সমন্বয়</li>
              <li>কমিউনিটি এনগেজমেন্ট ও সরাসরি প্রশ্নোত্তর</li>
            </ul>

            <div className="mt-10 p-6 bg-indigo-900/20 rounded-2xl border border-indigo-500/20">
              <p className="text-center text-slate-200 m-0">
                আমাদের সাথে যুক্ত থাকুন এবং প্রযুক্তির দুনিয়ায় নিজেকে এক ধাপ এগিয়ে রাখুন। <br/>
                <strong>HowToHub.bd - আপনার স্মার্ট টেক সলিউশন।</strong>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
