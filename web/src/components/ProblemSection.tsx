import { CtaLink } from "./CtaButton";

const ITEMS = [
  {
    title: "Pós-operatório e recuperação",
    question: "O seu familiar voltou da internação e precisa de atenção redobrada?",
    answer:
      "Cuidamos de cada detalhe da transição para casa, da medicação à mobilidade, para que a recuperação seja segura e tranquila, sem sobrecarregar a rotina de vocês.",
    d: { gap: "gap-129", left: "w-359", q: "w-266", a: "w-[calc(339.5*var(--spacing))]", align: "items-start" },
    m: { title: "w-337", q: "w-275", a: "w-full" },
  },
  {
    title: "Alzheimer e condições neurológicas",
    question: "O diagnóstico trouxe desafios que exigem paciência e técnica?",
    answer:
      "Oferecemos um acompanhamento especializado para preservar a segurança, a rotina e a dignidade do seu familiar, trazendo tranquilidade para a sua casa.",
    d: { gap: "gap-43", left: "w-445", q: "w-246", a: "w-328", align: "items-start" },
    m: { title: "w-full", q: "w-full", a: "w-328" },
  },
  {
    title: "Mobilidade reduzida no dia a dia",
    question: "As tarefas simples do cotidiano se tornaram difíceis?",
    answer:
      "Damos o suporte necessário na higiene e locomoção com respeito e atenção, garantindo o bem-estar e aliviando o desgaste físico da família.",
    d: { gap: "gap-52", left: "w-436", q: "w-246", a: "w-298", align: "items-center" },
    m: { title: "w-337", q: "w-full", a: "w-full" },
  },
  {
    title: "Sobrecarga e falta de tempo",
    question:
      "Você sente que está difícil equilibrar os cuidados com seu familiar, trabalho e vida pessoal?",
    answer:
      "Cuidar de quem você ama não deve custar a sua saúde mental. Nós assumimos o cuidado diário para que você possa voltar a ter a sua rotina de volta.",
    d: { gap: "gap-86", left: "w-402", q: "w-266", a: "w-327", align: "items-center" },
    m: { title: "w-249", q: "w-full", a: "w-327" },
  },
] as const;

const TITLE = "Quando a sua família precisa de um cuidado a mais: nós estamos aqui para ajudar.";

export function ProblemSection() {
  return (
    <>
      {/* Mobile */}
      <section className="mx-auto h-1265 w-full max-w-375 px-10 py-48 lg:hidden">
        <div className="flex h-1203 flex-col gap-48">
          <div className="flex items-center px-17">
            <h2 className="h-211 w-336 shrink-0 font-display text-38 leading-[1.15] tracking-[-0.03em] text-ink">
              {TITLE}
            </h2>
          </div>
          <div className="grid h-932 grid-cols-1 grid-rows-4 gap-y-9 px-17">
            {ITEMS.map((item) => (
              <div key={item.title} className="flex flex-col items-start gap-10 self-start">
                <div className="h-px w-full bg-[rgba(24,68,93,0.36)]" />
                <h3 className={`${item.m.title} font-inter text-24 leading-[1.15] font-bold text-ink`}>
                  {item.title}
                </h3>
                <p className={`${item.m.q} font-inter text-16 leading-[1.15] text-black`}>
                  {item.question}
                </p>
                <p className={`${item.m.a} font-inter text-16 leading-[1.15] text-black/60`}>
                  {item.answer}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
      <div className="mx-auto flex w-319 flex-col items-start lg:hidden">
        <CtaLink href="#formulario">Quero cuidar da minha família</CtaLink>
      </div>

      {/* Desktop */}
      <section className="hidden h-928 items-center bg-cream lg:flex">
        <div className="mx-auto w-full max-w-1440 px-251 py-48">
          <div className="flex h-746 flex-col items-start justify-center gap-48">
            <h2 className="w-555 font-display text-38 leading-[1.15] tracking-[-0.03em] text-ink">
              {TITLE}
            </h2>
            <div className="flex flex-col justify-center gap-29">
              {ITEMS.map((item) => (
                <div key={item.title} className="flex w-full flex-col items-start gap-15">
                  <div className="h-px w-full bg-[rgba(24,68,93,0.36)]" />
                  <div className={`flex ${item.d.gap} ${item.d.align}`}>
                    <div className={`flex ${item.d.left} flex-col items-start gap-14`}>
                      <h3 className="w-full font-inter text-24 leading-[1.15] font-bold text-ink">
                        {item.title}
                      </h3>
                      <p className={`${item.d.q} font-inter text-16 leading-[1.15] text-black`}>
                        {item.question}
                      </p>
                    </div>
                    <p className={`${item.d.a} font-inter text-16 leading-[1.15] text-black/80`}>
                      {item.answer}
                    </p>
                  </div>
                </div>
              ))}
            </div>
            <CtaLink href="#formulario">Quero cuidar da minha família</CtaLink>
          </div>
        </div>
      </section>
    </>
  );
}
