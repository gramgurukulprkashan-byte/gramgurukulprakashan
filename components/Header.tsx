'use client';

import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { useState, useEffect, useRef } from 'react';
import { Menu, X, Search, ChevronDown } from 'lucide-react';
import { NAV_ITEMS } from '@/lib/utils';

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const dropdownRef = useRef<HTMLLIElement>(null);
  const pathname = usePathname();

  useEffect(() => {
    setMenuOpen(false);
    setOpenDropdown(null);
  }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [menuOpen]);

  // Close dropdown on click outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setOpenDropdown(null);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <>
      <a href="#main-content" className="skip-link">
        मुख्य सामग्री पर जाएँ
      </a>

      <header role="banner" className="w-full relative z-40 bg-[#FAF7F0]">
        {/* ── TOP BANNER: Institutional Header (Logo + Title + Search + Indian Emblem) ── */}
        <div className="border-b border-[#E8DFC8] py-2 md:py-3">
          <div className="container-main flex items-center justify-between gap-4">
            {/* Left: Organization Seal & Name */}
            <Link
              href="/"
              className="flex items-center gap-3 shrink-0 group no-underline"
              aria-label="ग्रामगुरुकुल प्रकाशन — मुख्य पृष्ठ पर जाएँ"
              style={{ textDecoration: 'none' }}
            >
              <div
                className="w-12 h-12 md:w-14 md:h-14 rounded-full flex items-center justify-center shrink-0 overflow-hidden bg-white p-1 shadow-sm"
                style={{ border: '2px solid var(--color-mustard)' }}
                aria-hidden="true"
              >
                <Image
                  src="/logo.webp"
                  alt="ग्रामगुरुकुल प्रकाशन लोगो"
                  width={52}
                  height={52}
                  className="object-contain w-full h-full"
                  priority
                />
              </div>
              <div className="flex flex-col">
                <span
                  className="font-bold text-lg md:text-2xl leading-tight"
                  style={{ color: '#5A2C10', fontFamily: 'var(--font-heading)' }}
                >
                  ग्रामगुरुकुल प्रकाशन
                </span>
                <span
                  className="text-xs md:text-sm font-medium tracking-wide"
                  style={{ color: '#8B5A2B', fontFamily: 'var(--font-body)' }}
                >
                  शिवगंगा समग्र ग्रामविकास परिषद | धर्मभूमि झाबुआ
                </span>
              </div>
            </Link>

            {/* Middle: Clean Search Bar */}
            <div className="hidden lg:flex items-center flex-1 max-w-xs mx-4">
              <form action="/pustakein" method="GET" role="search" className="w-full relative">
                <label htmlFor="top-search-input" className="sr-only">
                  खोजें
                </label>
                <input
                  id="top-search-input"
                  name="q"
                  type="search"
                  placeholder="खोजें..."
                  className="w-full pl-3 pr-9 py-1.5 text-xs rounded-md border border-[#D5C6A8] bg-white text-[#1A1A1A] placeholder-stone-400 focus:outline-none focus:ring-1 focus:ring-[var(--color-orange)]"
                  autoComplete="off"
                />
                <button
                  type="submit"
                  aria-label="खोजें"
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 text-stone-500 hover:text-[var(--color-orange)]"
                >
                  <Search size={14} />
                </button>
              </form>
            </div>

            {/* Right: National Emblem of India & Mobile Toggle */}
            <div className="flex items-center gap-3 shrink-0">
              {/* State Emblem of India (Ashoka Lion Capital with Satyameva Jayate) */}
              <div className="flex items-center gap-2 pl-3 border-l border-[#E2D5BA]">
                <Image
                  src="/images/indian-emblem.webp"
                  alt="भारत का राज्य चिह्न — सत्यमेव जयते"
                  width={34}
                  height={54}
                  className="h-10 md:h-12 w-auto object-contain opacity-90"
                  priority
                />
              </div>

              {/* Mobile Hamburger Button */}
              <button
                aria-label={menuOpen ? 'मेनू बंद करें' : 'मेनू खोलें'}
                aria-expanded={menuOpen}
                aria-controls="mobile-menu"
                onClick={() => setMenuOpen(!menuOpen)}
                className="lg:hidden w-10 h-10 flex items-center justify-center rounded-md text-[#5A2C10] hover:bg-[#EFE8D6] transition-colors"
              >
                {menuOpen ? <X size={26} /> : <Menu size={26} />}
              </button>
            </div>
          </div>
        </div>

        {/* ── BOTTOM BAR: Main Navigation Strip (Divided Tabs / Institutional Bar) ── */}
        <nav
          aria-label="मुख्य नेविगेशन"
          className="hidden lg:block sticky top-0 z-30 shadow-md"
          style={{ backgroundColor: '#1E1813' }}
        >
          <div className="container-main">
            <ul className="flex items-stretch list-none m-0 p-0" role="list">
              {NAV_ITEMS.map((group) => {
                if (group.group === 'ज्ञान') {
                  const isKnowledgeActive = group.items.some((item) => pathname === item.href);
                  return (
                    <li
                      key={group.group}
                      ref={dropdownRef}
                      className="relative border-r border-white/10 flex items-stretch"
                    >
                      <button
                        type="button"
                        aria-expanded={openDropdown === group.group}
                        aria-haspopup="true"
                        onClick={() =>
                          setOpenDropdown(openDropdown === group.group ? null : group.group)
                        }
                        className={`flex items-center gap-1 px-4 py-2.5 text-xs font-semibold tracking-wide transition-colors ${
                          isKnowledgeActive
                            ? 'bg-[var(--color-orange)] text-white'
                            : 'text-[#E8DCBF] hover:bg-white/10 hover:text-white'
                        }`}
                        style={{ fontFamily: 'var(--font-body)' }}
                      >
                        <span>{group.group}</span>
                        <ChevronDown
                          size={13}
                          className={`transition-transform duration-200 ${
                            openDropdown === group.group ? 'rotate-180' : ''
                          }`}
                          aria-hidden="true"
                        />
                      </button>

                      {/* Dropdown Menu */}
                      {openDropdown === group.group && (
                        <ul
                          role="list"
                          className="absolute top-full left-0 w-60 rounded-b-lg shadow-2xl z-50 list-none p-1.5 border border-[#D5C6A8]"
                          style={{ backgroundColor: '#FAF7F0' }}
                        >
                          {group.items.map((item) => (
                            <li key={item.href}>
                              <Link
                                href={item.href}
                                className={`block px-3 py-2 rounded text-xs font-medium transition-colors ${
                                  pathname === item.href
                                    ? 'bg-[var(--color-orange)] text-white font-semibold'
                                    : 'text-[#3E2718] hover:bg-[#EFE8D6]'
                                }`}
                                style={{ fontFamily: 'var(--font-body)' }}
                                onClick={() => setOpenDropdown(null)}
                              >
                                {item.label}
                              </Link>
                            </li>
                          ))}
                        </ul>
                      )}
                    </li>
                  );
                }

                return group.items.map((item, idx) => {
                  const isActive = pathname === item.href;
                  return (
                    <li
                      key={item.href}
                      className="border-r border-white/10 flex items-stretch"
                    >
                      <Link
                        href={item.href}
                        className={`px-4 py-2.5 text-xs font-semibold tracking-wide transition-colors flex items-center ${
                          isActive
                            ? 'bg-[var(--color-orange)] text-white'
                            : 'text-[#E8DCBF] hover:bg-white/10 hover:text-white'
                        }`}
                        style={{ fontFamily: 'var(--font-body)' }}
                        aria-current={isActive ? 'page' : undefined}
                      >
                        {item.label}
                      </Link>
                    </li>
                  );
                });
              })}
            </ul>
          </div>
        </nav>
      </header>

      {/* ── MOBILE MENU OVERLAY ── */}
      {menuOpen && (
        <div
          id="mobile-menu"
          className="fixed inset-0 z-50 overflow-y-auto lg:hidden"
          style={{ backgroundColor: '#1E1813' }}
          role="dialog"
          aria-label="मुख्य मेनू"
          aria-modal="true"
        >
          {/* Header Inside Mobile Drawer */}
          <div className="flex items-center justify-between p-4 border-b border-white/10">
            <div className="flex items-center gap-2">
              <Image
                src="/logo.webp"
                alt="ग्रामगुरुकुल प्रकाशन लोगो"
                width={36}
                height={36}
                className="object-contain"
              />
              <span
                className="font-bold text-base text-white"
                style={{ fontFamily: 'var(--font-heading)' }}
              >
                ग्रामगुरुकुल प्रकाशन
              </span>
            </div>
            <button
              onClick={() => setMenuOpen(false)}
              aria-label="मेनू बंद करें"
              className="p-2 text-stone-300 hover:text-white"
            >
              <X size={24} />
            </button>
          </div>

          <div className="p-4">
            {/* Search Input for Mobile */}
            <form action="/pustakein" method="GET" role="search" className="mb-6">
              <div className="relative">
                <input
                  name="q"
                  type="search"
                  placeholder="खोजें..."
                  className="w-full pl-3 pr-9 py-2 text-sm rounded-md bg-white/10 border border-white/20 text-white placeholder-stone-400 focus:outline-none focus:ring-1 focus:ring-[var(--color-mustard)]"
                  autoComplete="off"
                />
                <button
                  type="submit"
                  aria-label="खोजें"
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-stone-300"
                >
                  <Search size={16} />
                </button>
              </div>
            </form>

            {/* Mobile Navigation List */}
            <nav aria-label="मोबाइल नेविगेशन">
              {NAV_ITEMS.map((group) => (
                <div key={group.group} className="mb-5">
                  <p
                    className="text-xs font-bold tracking-wider uppercase mb-2"
                    style={{ color: 'var(--color-mustard)' }}
                  >
                    {group.group}
                  </p>
                  <ul className="list-none m-0 p-0 space-y-1">
                    {group.items.map((item) => (
                      <li key={item.href}>
                        <Link
                          href={item.href}
                          className={`block py-2 px-3 rounded text-base font-medium transition-colors ${
                            pathname === item.href
                              ? 'bg-[var(--color-orange)] text-white font-semibold'
                              : 'text-stone-200 hover:bg-white/10'
                          }`}
                          aria-current={pathname === item.href ? 'page' : undefined}
                          onClick={() => setMenuOpen(false)}
                        >
                          {item.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </nav>

            <div className="mt-6 pt-4 border-t border-white/10">
              <Link
                href="/sampark"
                className="btn-mustard w-full justify-center text-sm py-2.5 font-bold"
                onClick={() => setMenuOpen(false)}
              >
                संपर्क करें
              </Link>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
