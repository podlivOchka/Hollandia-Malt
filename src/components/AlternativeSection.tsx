import { assetUrl } from "../assets";

import { useId, useRef, useState } from "react";
import { ArrowUpRight, Sparkles } from "lucide-react";

const references = [
  {
    name: "Barbican",
    detail: "Солодовый напиток",
    image: "choice-barbican.webp",
    imageAlt: "Покупатель выбирает Hollandia Malt: бутылка в руках, а Barbican остаётся на магазинной витрине",
    text: "Любите солодовые напитки Barbican? Познакомьтесь с Hollandia Malt: выразительный вкус солода, сильная газация и 0.0% алкоголя.",
  },
  {
    name: "Löwenbräu",
    detail: "Безалкогольный",
    image: "choice-loewenbraeu.webp",
    imageAlt: "Покупатель выбирает Hollandia Malt: бутылка в руках, а безалкогольный Löwenbräu стоит на витрине",
    text: "Выбираете безалкогольный Löwenbräu? Откройте Hollandia Malt — вашу альтернативу с солодовым характером и маркировкой 0.0%.",
  },
] as const;

export default function AlternativeSection({ onProduct }: { onProduct: () => void }) {
  const [selected, setSelected] = useState(0);
  const id = useId();
  const tabs = useRef<Array<HTMLButtonElement | null>>([]);

  return <section id="alternatives" className="alternative-section section-shell" aria-labelledby={`${id}-heading`}>
    <div className="alternative-panel">
      <div className="alternative-copy" data-reveal>
        <p className="eyebrow"><Sparkles size={14} aria-hidden="true"/> СОЛОДОВЫЙ ВКУС. НОВЫЙ ВЫБОР.</p>
        <h2 id={`${id}-heading`} className="alternative-heading">АЛЬТЕРНАТИВА<br/><span className="serif-italic">знакомым именам.</span></h2>
        <p className="alternative-lead">На витрине — знакомые имена.<br/>В твоих руках — Hollandia Malt.</p>
      </div>
      <div className="alternative-controls">
        <div className="reference-tabs" role="tablist" aria-label="Какой напиток вам знаком?" onKeyDown={(event) => {
          if (!["ArrowRight", "ArrowLeft", "Home", "End"].includes(event.key)) return;
          event.preventDefault();
          const next = event.key === "Home" ? 0 : event.key === "End" ? 1 : selected === 0 ? 1 : 0;
          setSelected(next);
          tabs.current[next]?.focus();
        }}>
          {references.map((brand, index) => <button key={brand.name} ref={(node) => { tabs.current[index] = node; }} type="button" role="tab" id={`${id}-tab-${index}`} aria-selected={selected === index} aria-controls={`${id}-panel`} tabIndex={selected === index ? 0 : -1} onClick={() => setSelected(index)}>
            <span>{brand.name}</span><small>{brand.detail}</small><ArrowUpRight size={17} aria-hidden="true"/>
          </button>)}
        </div>
      </div>
      <div className="alternative-outro">
        <div className="alternative-description" role="tabpanel" id={`${id}-panel`} aria-labelledby={`${id}-tab-${selected}`} tabIndex={0}>
          <p key={selected}>{references[selected].text}</p>
        </div>
        <button type="button" className="alternative-cta" onClick={onProduct}><span>Узнать Hollandia ближе</span><span><ArrowUpRight size={20} aria-hidden="true"/></span></button>
      </div>
      <div className="alternative-art" data-reveal>
        <div className="alternative-scenes">
          {references.map((brand, index) => <img
            key={brand.image}
            className={`alternative-scene${selected === index ? " is-active" : ""}`}
            src={assetUrl(brand.image)}
            alt={brand.imageAlt}
            aria-hidden={selected !== index}
            width="1122"
            height="1402"
            loading="lazy"
            decoding="async"
          />)}
        </div>
        <span className="alternative-stamp">НАШ<br/><strong>ЭКСКЛЮЗИВ</strong><Sparkles size={18} aria-hidden="true"/></span>
        <div className="alternative-product-label"><span>ТВОЙ ВЫБОР — HOLLANDIA</span><small>0.0% АЛКОГОЛЯ · 0,45 Л · МПК</small></div>
      </div>
    </div>
  </section>;
}
