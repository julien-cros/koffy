"use client";

import { Fragment, useState } from "react";
import { Combobox, Transition } from "@headlessui/react";
import { CheckIcon, ChevronUpDownIcon } from "@heroicons/react/20/solid";

type Props = {
  setState: (value: string) => void;
};

type WeightProp = {
  id: number;
  value: string;
};

const weightList = [
  { id: 1, value: "100g" },
  { id: 2, value: "150g" },
  { id: 3, value: "200g" },
  { id: 4, value: "250g" },
  { id: 5, value: "300g" },
  { id: 6, value: "500g" },
  { id: 7, value: "1Kg" },
  { id: 8, value: "2kg" },
];

export default function WeightInput({ setState }: Props) {
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
    <div className="flex justify-start z-10 items-center">
      <Combobox value={selected} onChange={setSelected}>
        <div className="relative w-full">
          <div
            className="relative w-full h-10 cursor-default overflow-hidden rounded-lg py-1 border-[1px] border-black dark:border-neutral-400 pr-10
		  	text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-white/75 
			focus-visible:ring-offset-2 focus-visible:ring-slate-900 sm:text-sm"
          >
            <Combobox.Input
              className={`w-full md:w-full text-sm  border-none
              } py-1 pl-10 pr-10 leading-5 outline-none bg-transparent dark:placeholder-white`}
              displayValue={(weight: WeightProp) => weight.value}
              onChange={(event) => setQuery(event.target.value)}
            />
            <Combobox.Button className="absolute inset-y-0 left-2 flex items-center pr-2">
              <ChevronUpDownIcon className="h-5 w-5" aria-hidden="true" />
            </Combobox.Button>
          </div>
          <Transition
            as={Fragment}
            leave="transition ease-in duration-100"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
            afterLeave={() => setQuery("")}
          >
            <Combobox.Options className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white dark:bg-black border-[1px] border-black dark:border-neutral-400 py-1 text-base shadow-lg ring-1 ring-black/5 focus:outline-none sm:text-sm">
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
                        active
                          ? "bg-pale-red dark:bg-gray-800 text-orange-500"
                          : ""
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
