// https://tailwindui.com/components/application-ui/forms/select-menus

import React, { Fragment } from 'react'
import { Listbox, Transition } from '@headlessui/react'
import { CheckIcon, SelectorIcon } from '@heroicons/react/solid'
import clsx from 'clsx'

type Community = {
    id: number
    name: string
}
type Props = {
    communityId?: number
    communities: Community[]
    selectCommunity: (id: number) => void
}

export default function SelectForumMenu({
    communityId,
    communities,
    selectCommunity,
}: Props) {
    const handleChange = (selected: Community) => {
        selectCommunity(selected.id)
    }

    const selected = communities.find((el) => el.id === communityId)

    return (
        <div className="w-80">
            <Listbox value={selected} onChange={handleChange}>
                {({ open }) => (
                    <>
                        <Listbox.Button className="relative w-full cursor-default rounded-md bg-white py-2 pl-3 pr-10 text-left text-gray-600 shadow-sm focus:border-gray-300 focus:outline-none focus:ring-1 focus:ring-gray-300 sm:text-sm ">
                            <span className="flex items-center">
                                <span className="ml-3 block truncate">
                                    {selected ? selected.name : '请选择社区'}
                                </span>
                            </span>
                            <span className="pointer-events-none absolute inset-y-0 right-0 ml-3 flex items-center pr-2">
                                <SelectorIcon
                                    className="h-5 w-5 text-green-400"
                                    aria-hidden="true"
                                />
                            </span>
                        </Listbox.Button>

                        <Transition
                            show={open}
                            as={Fragment}
                            leave="transition ease-in duration-100"
                            leaveFrom="opacity-100"
                            leaveTo="opacity-0"
                        >
                            <Listbox.Options className="absolute z-10 mt-1 w-80 overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm ">
                                {communities.map((community) => (
                                    <Listbox.Option
                                        key={community.id}
                                        className={({ active }) =>
                                            clsx(
                                                active
                                                    ? 'bg-green-50 text-white'
                                                    : 'text-gray-800',
                                                'relative cursor-default select-none py-2 pl-3 pr-9'
                                            )
                                        }
                                        value={community}
                                    >
                                        {({ selected, active }) => (
                                            <>
                                                <div className="flex items-center">
                                                    <span
                                                        className={clsx(
                                                            selected
                                                                ? 'font-semibold'
                                                                : 'font-normal',
                                                            'ml-3 block truncate text-gray-800'
                                                        )}
                                                    >
                                                        {community.name}
                                                    </span>
                                                </div>

                                                {selected ? (
                                                    <span
                                                        className={clsx(
                                                            active
                                                                ? 'text-white'
                                                                : 'text-green-500',
                                                            'absolute inset-y-0 right-0 flex items-center pr-4'
                                                        )}
                                                    >
                                                        <CheckIcon
                                                            className="h-5 w-5"
                                                            aria-hidden="true"
                                                        />
                                                    </span>
                                                ) : null}
                                            </>
                                        )}
                                    </Listbox.Option>
                                ))}
                            </Listbox.Options>
                        </Transition>
                    </>
                )}
            </Listbox>
        </div>
    )
}
