/* eslint-disable @next/next/no-img-element */
const STEPS = [
  {
    n: "1",
    title: "Avaliação gratuita",
    desc: "Entendemos a necessidade da sua família por telefone ou em uma visita. Tudo sem custo e sem compromisso, essa é uma etapa importante para sabermos exatamente como te atender.",
    badge: "flex w-44 flex-col items-start py-8 pr-15 pl-16",
    numColor: "text-ink",
    absolute: false,
    d: { row: "gap-32 items-baseline", text: "w-382", desc: "w-full", cell: "col-1 row-1" },
    m: { desc: "w-336" },
  },
  {
    n: "2",
    title: "Seleção do cuidador ideal",
    desc: "Indicamos o profissional com o perfil que melhor se encaixa na rotina e na personalidade de quem vai receber o cuidado.",
    badge: "flex w-44 flex-col items-center justify-center py-8 pr-12 pl-14",
    numColor: "text-ink",
    absolute: false,
    d: { row: "gap-30 items-start justify-center", text: "w-417", desc: "w-full", cell: "col-2 row-1" },
    m: { desc: "w-326" },
  },
  {
    n: "3",
    title: "Atendimento flexível",
    desc: "Plantões diurnos, noturnos ou 24 horas. Montamos o formato de atendimento que faz sentido para dar segurança à pessoa que será cuidado e descanso à família.",
    badge: "relative size-44",
    numColor: "text-ink-2",
    absolute: true,
    d: { row: "gap-27 items-start", text: "w-335", desc: "w-full", cell: "col-1 row-2" },
    m: { desc: "w-324" },
  },
  {
    n: "4",
    title: "Supervisão contínua",
    desc: "Acompanhamento técnico da enfermeira garantindo cuidado seguro durante a vigência do contrato",
    badge: "flex items-center justify-center px-13 py-7",
    numColor: "text-ink",
    absolute: false,
    d: { row: "gap-33 items-start", text: "w-323", desc: "w-314", cell: "col-2 row-2" },
    m: { desc: "w-323" },
  },
  {
    n: "5",
    title: "Sem burocracia",
    desc: "Contratação de cuidadores, encargos, escala de trabalho e treinamentos de habilidades técnicas são nossa responsabilidade.",
    badge: "flex w-44 flex-col items-center justify-center pt-9 pr-12 pb-7 pl-14",
    numColor: "text-ink-2",
    absolute: false,
    d: { row: "gap-27 items-start", text: "w-382", desc: "w-335", cell: "col-1 row-3" },
    m: { desc: "w-325" },
  },
] as const;

function Badge({ step }: { step: (typeof STEPS)[number] }) {
  return (
    <div className={`shrink-0 rounded-22 bg-badge ${step.badge}`}>
      <p
        className={`font-display text-28 leading-none whitespace-nowrap ${step.numColor} ${
          step.absolute ? "absolute top-8 left-13" : "relative"
        }`}
      >
        {step.n}
      </p>
    </div>
  );
}

export function HowItWorks() {
  return (
    <>
      {/* Mobile: fundo branco, texto navy */}
      <section className="mx-auto flex h-1758 w-full max-w-375 flex-col justify-center gap-48 px-26 py-48 lg:hidden">
        <div className="contents">
          <h2 className="w-365 font-display text-38 leading-[1.15] tracking-[-0.03em] text-ink">
            Como funciona?
          </h2>
          <div className="flex flex-col gap-48">
            {STEPS.map((step) => (
              <div key={step.n} className="flex w-full flex-col items-start gap-14">
                <Badge step={step} />
                <h3 className={`w-full font-inter text-32 leading-[1.15] font-bold text-ink ${step.n === "4" ? "whitespace-nowrap" : ""}`}>
                  {step.title}
                </h3>
                <p className={`${step.m.desc} font-inter text-24 leading-[1.15] text-ink opacity-80`}>
                  {step.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Desktop: foto + gradiente */}
      <section className="relative hidden h-1147 items-center overflow-hidden lg:flex">
        <div aria-hidden="true" className="pointer-events-none absolute inset-0">
          <div className="absolute inset-0 overflow-hidden opacity-20">
            <img
              src="/figma/como-funciona-bg.jpg"
              alt=""
              className="absolute top-[0.01%] left-[-9.1%] h-[99.99%] w-[118.19%] max-w-none"
            />
          </div>
          <div
            className="absolute inset-0 mix-blend-multiply"
            style={{
              backgroundImage:
                "linear-gradient(118.8713deg, rgb(34,97,133) 34.742%, rgb(92,146,92) 167.2%)",
            }}
          />
        </div>
        <div className="relative mx-auto w-full max-w-1440 py-48 pl-192">
          <div className="flex flex-col items-start gap-48 py-48">
            <h2 className="font-display text-38 leading-[1.15] tracking-[-0.03em] whitespace-nowrap text-green-50">
              Como funciona?
            </h2>
            <div className="grid h-747 w-1012 grid-cols-2 grid-rows-3 gap-x-26 gap-y-58">
              {STEPS.map((step) => (
                <div key={step.n} className={`${step.d.cell} flex self-stretch ${step.d.row}`}>
                  <Badge step={step} />
                  <div className={`flex ${step.d.text} shrink-0 flex-col items-start gap-14 text-cream`}>
                    <h3 className="w-full font-inter text-32 leading-[1.15] font-bold whitespace-nowrap">
                      {step.title}
                    </h3>
                    <p className={`${step.d.desc} font-inter text-24 leading-[1.15] opacity-80`}>
                      {step.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
