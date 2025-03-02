"use client"

import clsx from 'clsx'
import { useParams } from 'next/navigation'
import React, { ChangeEvent, useTransition } from 'react'
import { usePathname, useRouter } from '@/i18n/navigation'

type Props = {
  children: React.ReactNode,
  defaultValue: string,
  label: string
}


const LocalSwitchSelect = ({ children, defaultValue, label }: Props) => {
  const router = useRouter()
  const [isPending, startTransition] = useTransition()
  const pathname = usePathname()
  const params = useParams()

  function onSelectChange(event: ChangeEvent<HTMLSelectElement>) {
    const nextLocale = event.target.value
    startTransition(() => {
      router.replace(
        //@ts-expect-error: Type mismatch due to router.replace signature
        { pathname, params },
        { locale: nextLocale }
      )
    })
  }
  return (
    <label
      className={clsx(
        "relative text-gray-400 shadow border border-gray-400 rounded-md ",
        isPending && "transition-opacity [&:disabled]:opacity-30"
      )}
    >
      <p className='sr-only'>{label}</p>
      <select
        className="inline-flex appearance-none bg-transparent py-2 pl-2 pr-6"
        defaultValue={defaultValue}
        disabled={isPending}
        onChange={onSelectChange}
      >
        {children}
      </select>
    </label>
  )
}

export default LocalSwitchSelect