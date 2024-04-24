"use client";

type Props = {
  setCategorySearch: (type: string) => void;
};

import { Fragment, useState } from "react";
import { Listbox, Transition } from "@headlessui/react";
import { CheckIcon, ChevronUpDownIcon } from "@heroicons/react/20/solid";

const category = [
  { name: "brand" },
  { name: "title" },
  { name: "variety" },
  { name: "rate" },
  { name: "price" },
  { name: "tasting" },
  { name: "note" },
];

export default function CategorySearchBar({ setCategorySearch }: Props) {
  const [selected, setSelected] = useState(category[0]);

  return (
    <div className="w-32">
      <Listbox value={selected} onChange={setSelected}>
        <div className="relative">
          <Listbox.Button className="relative w-full cursor-default rounded-full  px-3 py-2 border-[1px] border-black dark:border-white pl-3 pr-10 text-left focus:outline-none sm:text-sm">
            <span className="block truncate">{selected.name}</span>
            <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
              <ChevronUpDownIcon
                className="h-4 w-4 text-gray-400"
                aria-hidden="true"
              />
            </span>
          </Listbox.Button>
          <Transition
            as={Fragment}
            leave="transition ease-in duration-100"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Listbox.Options className="absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white dark:bg-black dark:border-[1px] dark:border-white py-1 text-base shadow-lg ring-1 ring-black/5 focus-visible:ring-offset-gray-100 focus:outline-none sm:text-sm">
              {category.map((categoryItem, categotyIndex) => (
                <Listbox.Option
                  key={categotyIndex}
                  className={({ active }) =>
                    `relative cursor-default select-none py-2 pl-10 pr-5 ${
                      active
                        ? "bg-pale-red dark:bg-gray-800 text-orange-500"
                        : "text-gray-900 dark:text-white"
                    }`
                  }
                  onClick={() => setCategorySearch(categoryItem.name)}
                  value={categoryItem}
                >
                  {({ selected }) => (
                    <>
                      <span
                        className={`block truncate ${
                          selected ? "font-medium" : "font-normal"
                        }`}
                      >
                        {categoryItem.name}
                      </span>
                      {selected ? (
                        <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-orange-300">
                          <CheckIcon className="h-5 w-5" aria-hidden="true" />
                        </span>
                      ) : null}
                    </>
                  )}
                </Listbox.Option>
              ))}
            </Listbox.Options>
          </Transition>
        </div>
      </Listbox>
    </div>
  );
}
