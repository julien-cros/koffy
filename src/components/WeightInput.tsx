"use client";

import { Fragment, useState } from "react";
import { Combobox, Transition } from "@headlessui/react";
import { CheckIcon, ChevronUpDownIcon } from "@heroicons/react/20/solid";

type Props = {
  setState: (value: string) => void;
  isUpdate: boolean;
};

type WeightProp = {
  id: number;
  value: string;
};

const weightList = [
  { id: 1, value: "150g" },
  { id: 2, value: "250g" },
  { id: 3, value: "300g" },
  { id: 4, value: "500g" },
  { id: 5, value: "1Kg" },
  { id: 6, value: "2kg" },
];

export default function WeightInput({ setState, isUpdate }: Props) {
  const [selected, setSelected] = useState(weightList[0]);
  const [query, setQuery] = useState("");

  const filteredWeightList =
    query === ""
      ? weightList
      : weightList.filter((weight) =>
          weight.value
            .toLowerCase()
            .replace(/\s+/g, "")
            .includes(query.toLowerCase().replace(/\s+/g, "")),
        );

  return (
    <div className="flex justify-start pl-10 z-10 items-end pb-2 w-full">
      <Combobox value={selected} onChange={setSelected}>
        <div className="relative mt-1">
          <div
            className="relative w-full cursor-default overflow-hidden rounded-lg bg-slate-100 
		  	text-left shadow-md focus:outline-none focus-visible:ring-2 focus-visible:ring-white/75 
			focus-visible:ring-offset-2 focus-visible:ring-slate-900 sm:text-sm"
          >
            <Combobox.Input
              className={`w-24 md:w-32 text-sm  border-none  ${
                isUpdate ? " dark:text-white   " : "bg-blue-500"
              } py-2 pl-3 pr-10 leading-5 text-gray-900 outline-none `}
              displayValue={(weight: WeightProp) => weight.value}
              onChange={(event) => setQuery(event.target.value)}
            />
            <Combobox.Button className="absolute inset-y-0 right-0 flex items-center pr-2">
              <ChevronUpDownIcon
                className="h-5 w-5"
                aria-hidden="true"
              />
            </Combobox.Button>
          </div>
          <Transition
            as={Fragment}
            leave="transition ease-in duration-100"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
            afterLeave={() => setQuery("")}
          >
            <Combobox.Options className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black/5 focus:outline-none sm:text-sm">
              {filteredWeightList.length === 0 && query !== "" ? (
                <div className="relative cursor-default  select-none py-2 px-4 text-gray-700">
                  Nothing found.
                </div>
              ) : (
                filteredWeightList.map((weight) => (
                  <Combobox.Option
                    key={weight.id}
                    className={({ active }) =>
                      `relative cursor-default select-none py-2 pl-10 pr-4 ${
                        active ? "bg-pale-red text-orange-500" : "text-gray-900"
                      }`
                    }
                    onClick={() => setState(weight.value)}
                    value={weight}
                  >
                    {({ selected }) => (
                      <>
                        <span
                          className={`block truncate ${
                            selected ? "font-medium" : "font-normal"
                          }`}
                        >
                          {weight.value}
                        </span>
                        {selected ? (
                          <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-orange-300">
                            <CheckIcon className="h-5 w-5" aria-hidden="true" />
                          </span>
                        ) : null}
                      </>
                    )}
                  </Combobox.Option>
                ))
              )}
            </Combobox.Options>
          </Transition>
        </div>
      </Combobox>
    </div>
  );
}
