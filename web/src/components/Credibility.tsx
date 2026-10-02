export function Credibility() {
  return (
    <>
      {/* Mobile */}
      <div className="mx-auto flex w-369 flex-col items-start gap-14 px-18 leading-[1.15] font-medium text-ink lg:hidden">
        <p className="w-full font-display text-38">Parte da rede nacional Home Angels Brasil.</p>
        <p className="w-full font-inter text-21">
          Cuidadores selecionados e supervisionados tecnicamente, com atendimento humanizado dentro
          da casa da sua família
        </p>
      </div>

      {/* Desktop */}
      <section className="hidden h-433 items-center bg-white lg:flex">
        <div className="mx-auto w-full max-w-1440 py-48 pl-259">
          <div className="flex w-851 flex-col items-start gap-16">
            <div className="h-px w-536 bg-[rgba(72,124,154,0.16)]" />
            <div className="grid grid-cols-[max-content] grid-rows-[max-content] leading-[1.15] text-ink-2">
              <p className="col-1 row-1 mt-167 w-602 font-inter text-21">
                Cuidadores selecionados e supervisionados tecnicamente, com atendimento humanizado
                dentro da casa da sua família
              </p>
              <p className="col-1 row-1 w-777 font-display text-67 font-medium">
                Parte da rede nacional Home Angels Brasil.
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
