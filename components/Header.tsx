import React from 'react'
import { useLocale } from 'next-intl';

import LocalSwitcher from './LocalSwitcher'
import clsx from 'clsx';
import { Link } from '@/i18n/navigation';

const Header = () => {
  const locale = useLocale();

  return (
    <div
      className={clsx(
        locale === "he" ? "flex-row-reverse" : "",
        "flex items-center justify-between w-full px-6 md:px-20 py-4 fixed top-0 z-50"
      )}>
      <div>
        <Link
          href={"/"}
          className='text-xl font-bold'
        >
          MapApp
        </Link>
      </div>
      <LocalSwitcher />
    </div>
  )
}

export default Header