import { Facebook, Youtube, Twitter, Instagram, Globe } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { readHomeContent } from '@/utils/homeContentStore'

export default async function Footer() {
  const content = await readHomeContent()

  const footerTitle = content?.footer_title ?? 'HowToHub.bd'
  const footerDescription = content?.footer_description ?? 'বাংলাদেশের জন্য ফ্রি ও মানসম্মত ডিজিটাল শিক্ষা। আমাদের কমিউনিটিতে যোগ দিন, আজই নতুন স্কিল শিখুন।'
  const footerCredit = content?.footer_credit ?? 'HowToHub.bd. সর্বস্বত্ব সংরক্ষিত।'
  const footerWebsites =
    Array.isArray(content?.footer_websites) && content.footer_websites.length > 0
      ? content.footer_websites
      : ['www.zzt.com.bd', 'www.eTender.bd', 'www.zmart.bd']
  const links = content?.social_links ?? {}
  const normalizeUrl = (raw: string) => (/^https?:\/\//i.test(raw) ? raw : `https://${raw}`)

  return (
    <footer className="solid-bar border-t border-white/10 mt-auto">
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="text-center md:text-left">
            <h3 className="text-sm font-semibold text-white tracking-wider uppercase mb-4">আমাদের সাইটসমূহ</h3>
            <ul className="space-y-3">
              {footerWebsites.map((site) => (
                <li key={site} className="flex items-center justify-center md:justify-start gap-2">
                  <Globe className="h-5 w-5 text-slate-300" />
                  <a
                    href={normalizeUrl(site)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-base text-slate-300 hover:text-white transition-colors"
                  >
                    {site}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div className="text-center md:text-left">
            <h3 className="text-sm font-semibold text-white tracking-wider uppercase mb-4">দ্রুত লিংক</h3>
            <ul className="space-y-3">
              {(Array.isArray(content.quick_links) && content.quick_links.length > 0
                ? content.quick_links
                : [
                    { label: 'হোম', href: '/' },
                    { label: 'সব টিউটোরিয়াল', href: '/#tutorials' },
                    { label: 'আমাদের সম্পর্কে', href: '/about' },
                    { label: 'সহায়তা কেন্দ্র', href: '/contact' },
                  ]
              ).map((link) => (
                <li key={`${link.label}-${link.href}`}>
                  <Link href={link.href} className="text-base text-slate-300 hover:text-white transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="text-center md:text-left space-y-4">
            <div className="flex items-center justify-center md:justify-start gap-3">
              <Image src="/howtohub-logo.svg" alt={footerTitle} width={36} height={36} priority />
              <Link href="/" className="text-xl font-bold text-white">
                {footerTitle}
              </Link>
            </div>
            <p className="text-slate-300 text-sm leading-relaxed md:max-w-xs">
              {footerDescription}
            </p>
            <div className="flex justify-center md:justify-start gap-4">
              {links.facebook ? (
                <Link href={links.facebook} className="chip p-2 rounded-full hover:bg-white/10 transition-colors text-slate-200">
                  <span className="sr-only">ফেসবুক</span>
                  <Facebook className="h-5 w-5" />
                </Link>
              ) : null}
              {links.youtube ? (
                <Link href={links.youtube} className="chip p-2 rounded-full hover:bg-white/10 transition-colors text-slate-200">
                  <span className="sr-only">ইউটিউব</span>
                  <Youtube className="h-5 w-5" />
                </Link>
              ) : null}
              {links.x ? (
                <Link href={links.x} className="chip p-2 rounded-full hover:bg-white/10 transition-colors text-slate-200">
                  <span className="sr-only">এক্স</span>
                  <Twitter className="h-5 w-5" />
                </Link>
              ) : null}
              {links.instagram ? (
                <Link href={links.instagram} className="chip p-2 rounded-full hover:bg-white/10 transition-colors text-slate-200">
                  <span className="sr-only">ইনস্টাগ্রাম</span>
                  <Instagram className="h-5 w-5" />
                </Link>
              ) : null}
            </div>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-white/10">
          <p className="text-center text-sm text-slate-400">
            &copy; {new Date().getFullYear()} {footerCredit}
          </p>
        </div>
      </div>
    </footer>
  )
}
