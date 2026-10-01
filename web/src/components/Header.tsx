/* eslint-disable @next/next/no-img-element */
export function Header() {
  return (
    <header className="flex justify-center pt-[calc(30.5*var(--spacing))] lg:pt-27 lg:pb-17">
      <img
        src="/figma/header-logo-mobile.svg"
        alt="Home Angels"
        className="h-33 w-[calc(193.123*var(--spacing))] lg:hidden"
      />
      <img
        src="/figma/header-logo-desktop.svg"
        alt="Home Angels"
        className="hidden h-[calc(76.6*var(--spacing))] w-[calc(448.28*var(--spacing))] lg:block"
      />
    </header>
  );
}
