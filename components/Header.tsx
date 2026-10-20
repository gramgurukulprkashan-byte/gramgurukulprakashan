'use client';

import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { useState, useEffect, useRef } from 'react';
import { Menu, X, Search } from 'lucide-react';
import { NAV_ITEMS, SOCIAL_LINKS } from '@/lib/utils';

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const searchRef = useRef<HTMLInputElement>(null);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    setMenuOpen(false);
    setOpenDropdown(null);
  }, [pathname]);

  useEffect(() => {
    if (searchOpen) searchRef.current?.focus();
  }, [searchOpen]);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [menuOpen]);

  const allItems = NAV_ITEMS.flatMap(g => g.items);

  const dropdownGroups = NAV_ITEMS.filter(g => g.group === 'ज्ञान');

  return (
    <>
      <a href="#main-content" className="skip-link">
        मुख्य सामग्री पर जाएँ
      </a>

      <header
        role="banner"
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? 'shadow-lg' : ''
          }`}
        style={{ backgroundColor: 'var(--color-charcoal)' }}
      >
        <div className="container-main">
          <nav aria-label="मुख्य नेविगेशन" className="flex items-center justify-between h-16 md:h-18">
            <Link
              href="/"
              className="flex items-center gap-3 shrink-0"
              aria-label="ग्रामगुरुकुल प्रकाशन — मुखपृष्ठ पर जाएँ"
            >
              <div
                className="w-10 h-10 rounded-full flex items-center justify-center shrink-0 overflow-hidden bg-white p-1"
                style={{ border: '2px solid var(--color-mustard)' }}
                aria-hidden="true"
              >
                <Image
                  src="/images/logo.webp"
                  alt="ग्रामगुरुकुल प्रकाशन लोगो"
                  width={34}
                  height={34}
                  className="object-contain w-full h-full"
                  priority
                />
              </div>
              <div className="leading-tight">
                <div
                  className="font-bold text-sm md:text-base leading-none"
                  style={{ color: 'var(--color-mustard)', fontFamily: 'var(--font-heading)' }}
                >
                  ग्रामगुरुकुल
                </div>
                <div className="text-xs leading-none" style={{ color: 'var(--color-sand)' }}>
                  प्रकाशन
                </div>
              </div>
            </Link>

            <ul className="hidden lg:flex items-center gap-1 list-none m-0 p-0" role="list">
              {NAV_ITEMS.map(group => (
                group.group === 'ज्ञान' ? (
                  <li key={group.group} className="relative">
                    <button
                      aria-expanded={openDropdown === group.group}
                      aria-haspopup="true"
                      onClick={() => setOpenDropdown(openDropdown === group.group ? null : group.group)}
                      className="flex items-center gap-1 px-3 py-2 rounded text-sm font-medium transition-colors"
                      style={{ color: 'var(--color-sand)', fontFamily: 'var(--font-body)' }}
                    >
                      {group.group}
                      <svg
                        width="12" height="12" viewBox="0 0 12 12" fill="currentColor"
                        className={`transition-transform ${openDropdown === group.group ? 'rotate-180' : ''}`}
                        aria-hidden="true"
                      >
                        <path d="M6 8L1 3h10z" />
                      </svg>
                    </button>
                    {openDropdown === group.group && (
                      <ul
                        role="list"
                        className="absolute top-full left-0 mt-1 w-56 rounded-xl shadow-xl z-50 list-none p-2"
                        style={{ backgroundColor: 'white', border: '2px solid var(--color-sand)' }}
                      >
                        {group.items.map(item => (
                          <li key={item.href}>
                            <Link
                              href={item.href}
                              className="block px-4 py-2 rounded-lg text-sm font-medium transition-colors hover:bg-orange-50"
                              style={{ color: 'var(--color-charcoal)', fontFamily: 'var(--font-body)' }}
                              onClick={() => setOpenDropdown(null)}
                            >
                              {item.label}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    )}
                  </li>
                ) : (
                  group.items.map(item => (
                    <li key={item.href}>
                      <Link
                        href={item.href}
                        className="px-3 py-2 rounded text-sm font-medium transition-colors block"
                        style={{
                          color: pathname === item.href ? 'var(--color-mustard)' : 'var(--color-sand)',
                          fontFamily: 'var(--font-body)',
                        }}
                        aria-current={pathname === item.href ? 'page' : undefined}
                      >
                        {item.label}
                      </Link>
                    </li>
                  ))
                )
              ))}
            </ul>

            <div className="flex items-center gap-2">
              <button
                onClick={() => setSearchOpen(!searchOpen)}
                aria-label="खोज"
                aria-expanded={searchOpen}
                className="w-10 h-10 flex items-center justify-center rounded-full transition-colors"
                style={{ color: 'var(--color-sand)' }}
              >
                <Search size={20} />
              </button>

              <Link
                href="/sampark"
                className="hidden md:inline-flex btn-mustard text-sm px-4 py-2"
                style={{ minHeight: '40px' }}
              >
                संपर्क करें
              </Link>

              <button
                aria-label={menuOpen ? 'मेनू बंद करें' : 'मेनू खोलें'}
                aria-expanded={menuOpen}
                aria-controls="mobile-menu"
                onClick={() => setMenuOpen(!menuOpen)}
                className="lg:hidden w-10 h-10 flex items-center justify-center rounded"
                style={{ color: 'var(--color-sand)' }}
              >
                {menuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </nav>

          {searchOpen && (
            <div className="pb-3">
              <form action="/khoj" method="GET" role="search">
                <label htmlFor="header-search" className="sr-only">खोज करें</label>
                <div className="flex gap-2">
                  <input
                    id="header-search"
                    ref={searchRef}
                    name="q"
                    type="search"
                    placeholder="खोज करें..."
                    className="input-base"
                    style={{ backgroundColor: 'rgba(255,255,255,0.1)', color: 'white', borderColor: 'rgba(255,255,255,0.2)' }}
                    autoComplete="off"
                  />
                  <button type="submit" className="btn-mustard px-4 py-2" style={{ minHeight: '48px' }}>
                    खोजें
                  </button>
                </div>
              </form>
            </div>
          )}
        </div>
      </header>

      {menuOpen && (
        <div
          id="mobile-menu"
          className="fixed inset-0 z-40 overflow-y-auto"
          style={{ backgroundColor: 'var(--color-charcoal)', paddingTop: '5rem' }}
          role="dialog"
          aria-label="मुख्य मेनू"
          aria-modal="true"
        >
          <div className="container-main pb-8">
            {NAV_ITEMS.map(group => (
              <div key={group.group} className="mb-6">
                <p
                  className="text-xs font-semibold tracking-widest uppercase mb-3"
                  style={{ color: 'var(--color-mustard)' }}
                >
                  {group.group}
                </p>
                <ul className="list-none m-0 p-0 space-y-1">
                  {group.items.map(item => (
                    <li key={item.href}>
                      <Link
                        href={item.href}
                        className="block text-xl font-semibold py-2 transition-colors"
                        style={{
                          color: pathname === item.href ? 'var(--color-mustard)' : 'white',
                          fontFamily: 'var(--font-heading)',
                        }}
                        aria-current={pathname === item.href ? 'page' : undefined}
                      >
                        {item.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
            <div className="mt-8 pt-6" style={{ borderTop: '1px solid rgba(255,255,255,0.1)' }}>
              <Link href="/sampark" className="btn-mustard w-full justify-center">
                संपर्क करें
              </Link>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
