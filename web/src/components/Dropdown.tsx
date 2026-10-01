"use client";

/* eslint-disable @next/next/no-img-element */
import { useEffect, useId, useRef, useState } from "react";

type Option = { value: string; label: string };

type DropdownProps = {
  name: string;
  labelId: string;
  options: readonly Option[];
  // Medidas do componente Filter / Filter 2 do Figma
  className: string;
  chevronRight: string;
};

function Chevron({ up = false }: { up?: boolean }) {
  return (
    <div className={`relative h-[calc(6.25*var(--spacing))] w-[calc(12.5*var(--spacing))] ${up ? "-scale-y-100" : ""}`}>
      <img
        src="/figma/filter-chevron.svg"
        alt=""
        className="absolute inset-[-7.86%_-3.93%_-15.71%_-3.93%] block size-full max-w-none"
      />
    </div>
  );
}

export function Dropdown({ name, labelId, options, className, chevronRight }: DropdownProps) {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState("");
  const rootRef = useRef<HTMLDivElement>(null);
  const listId = useId();
  const selected = options.find((o) => o.value === value);

  useEffect(() => {
    if (!open) return;
    function onDown(event: MouseEvent) {
      if (!rootRef.current?.contains(event.target as Node)) setOpen(false);
    }
    function onKey(event: KeyboardEvent) {
      if (event.key === "Escape") setOpen(false);
    }
    document.addEventListener("mousedown", onDown);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onDown);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <div ref={rootRef} className={`relative ${className}`}>
      <input type="hidden" name={name} value={value} />
      {!open ? (
        <button
          type="button"
          aria-haspopup="listbox"
          aria-expanded={false}
          aria-labelledby={labelId}
          data-dropdown={name}
          onClick={() => setOpen(true)}
          className="relative block size-full cursor-pointer rounded-3 border border-line text-left"
        >
          {selected ? (
            <span className="absolute top-1/2 left-19 -translate-y-1/2 font-helvetica text-16 leading-[1.15] text-cream">
              {selected.label}
            </span>
          ) : null}
          <span className={`absolute top-22 ${chevronRight}`}>
            <Chevron />
          </span>
        </button>
      ) : (
        <div className="relative z-10 rounded-3 border border-line bg-navy pt-22 pr-18 pb-14 pl-6">
          <button
            type="button"
            aria-label="Fechar opções"
            aria-expanded={true}
            onClick={() => setOpen(false)}
            className="flex h-[calc(49.67*var(--spacing))] w-full cursor-pointer items-start justify-end"
          >
            <Chevron up />
          </button>
          <ul id={listId} role="listbox" aria-labelledby={labelId} className="flex flex-col gap-11 pt-11">
            {options.map((option) => (
              <li key={option.value} role="option" aria-selected={option.value === value}>
                <button
                  type="button"
                  autoFocus={option === options[0]}
                  onClick={() => {
                    setValue(option.value);
                    setOpen(false);
                  }}
                  className="block h-[calc(49.67*var(--spacing))] w-full cursor-pointer text-left font-helvetica text-25 leading-none text-white"
                >
                  {option.label}
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
