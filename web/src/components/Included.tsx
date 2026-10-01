/* eslint-disable @next/next/no-img-element */
const CARD = "rounded-16 bg-[rgba(217,217,217,0.2)]";
const TEXT = "font-inter text-21 leading-[1.15] text-ink";

function Check({ src, wide = false }: { src: string; wide?: boolean }) {
  return (
    <div className={`relative h-17 shrink-0 ${wide ? "w-[calc(25.841*var(--spacing))]" : "w-25"}`}>
      <img
        src={src}
        alt=""
        className={`absolute block size-full max-w-none ${
          wide ? "inset-[-10.58%_-6.72%_-20.44%_-6.72%]" : "inset-[-10.41%_-7.06%_-20.77%_-7.06%]"
        }`}
      />
    </div>
  );
}

const T = {
  cuidador: "Cuidador selecionado com conhecimento técnico, idôneo e perfil acolhedor",
  supervisao: "Supervisão técnica constante da equipe Home Angels",
  reposicao: "Reposição em caso de falta do profissional escalado",
  flexivel: "Atendimento flexível: diurno, noturno ou 24 horas",
};

export function Included() {
  return (
    <>
      {/* Mobile */}
      <section className="mx-auto flex h-996 w-full max-w-375 flex-col items-center justify-center gap-48 bg-white px-10 py-48 lg:hidden">
        <div className="w-335">
          <h2 className="w-329 font-display text-38 leading-[1.15] tracking-[-0.03em] text-ink">
            O que está incluso?
          </h2>
        </div>
        <ul className="flex w-full flex-wrap gap-x-60 gap-y-28">
          <li className={`${CARD} flex w-full flex-col items-start px-22 py-28`}>
            <div className="flex flex-col items-start gap-37">
              <Check src="/figma/check-icon-1.svg" />
              <p className={`${TEXT} w-288`}>{T.cuidador}</p>
            </div>
          </li>
          <li className={`${CARD} flex w-355 flex-col items-start px-22 py-28`}>
            <div className="flex w-full flex-col items-start gap-33">
              <Check src="/figma/check-icon-3.svg" />
              <p className={`${TEXT} w-219`}>{T.reposicao}</p>
            </div>
          </li>
          <li className={`${CARD} flex w-full flex-col items-start px-22 py-28`}>
            <div className="flex flex-col items-start gap-37">
              <Check src="/figma/check-icon-1.svg" />
              <p className={`${TEXT} w-230`}>{T.supervisao}</p>
            </div>
          </li>
          <li className={`${CARD} flex w-355 flex-col items-start px-22 py-28`}>
            <div className="flex w-full flex-col items-start gap-34">
              <Check src="/figma/check-icon-4.svg" wide />
              <p className={`${TEXT} w-full`}>{T.flexivel}</p>
            </div>
          </li>
        </ul>
      </section>

      {/* Desktop */}
      <section className="hidden bg-white lg:block">
        <div className="mx-auto flex w-full max-w-1440 flex-col items-start gap-48 px-246 py-48">
          <h2 className="h-44 w-[calc(422.5*var(--spacing))] font-display text-38 leading-[1.15] tracking-[-0.03em] text-ink">
            O que está incluso?
          </h2>
          <ul className="flex w-full flex-wrap content-start items-start gap-x-60 gap-y-57">
            <li className={`${CARD} flex w-[calc(422.5*var(--spacing))] flex-col items-start py-34 pr-64 pl-23`}>
              <div className="flex items-center gap-37">
                <Check src="/figma/check-icon-1.svg" />
                <p className={`${TEXT} w-313`}>{T.cuidador}</p>
              </div>
            </li>
            <li className={`${CARD} flex w-[calc(422.5*var(--spacing))] flex-col items-start pt-30 pr-18 pb-38 pl-23`}>
              <div className="grid grid-cols-[max-content] grid-rows-[max-content]">
                <p className={`${TEXT} col-1 row-1 ml-62 w-300`}>{T.supervisao}</p>
                <div className="col-1 row-1 mt-16">
                  <Check src="/figma/check-icon-2.svg" />
                </div>
              </div>
            </li>
            <li className={`${CARD} flex w-[calc(422.5*var(--spacing))] flex-col items-start py-34 pr-23 pl-35`}>
              <div className="grid grid-cols-[max-content] grid-rows-[max-content]">
                <p className={`${TEXT} col-1 row-1 ml-58 w-287`}>{T.reposicao}</p>
                <div className="col-1 row-1 mt-16">
                  <Check src="/figma/check-icon-3.svg" />
                </div>
              </div>
            </li>
            <li className={`${CARD} flex w-[calc(422.5*var(--spacing))] flex-col items-start py-34 pr-65 pl-35`}>
              <div className="flex items-center gap-34">
                <Check src="/figma/check-icon-4.svg" wide />
                <p className={`${TEXT} w-288`}>{T.flexivel}</p>
              </div>
            </li>
          </ul>
        </div>
      </section>
    </>
  );
}
