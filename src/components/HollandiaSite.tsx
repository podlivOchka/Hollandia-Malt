import { assetUrl } from "../assets";

import { useEffect, useRef, useState } from "react";
import { ArrowDown, ArrowUpRight, ChevronDown, Crown, Handshake, Mail, MapPin, Menu, Phone, Plus, Sparkles, Store, Utensils, Wheat, X } from "lucide-react";
import { contact, facets, navigation, productFacts, questions } from "./content";
import { useSiteMotion } from "./useSiteMotion";
import AlternativeSection from "./AlternativeSection";

type ModalKind = "product" | "contact" | null;

function Wordmark({ light = false }: { light?: boolean }) {
  return <span className={`wordmark${light ? " wordmark-light" : ""}`} aria-label="Hollandia Malt">
    <span className="wordmark-name">HOLLANDIA</span>
    <span className="wordmark-sub"><i />MALT<i /></span>
  </span>;
}

function ArrowButton({ children, href, onClick, light = false, className = "" }: {
  children: React.ReactNode; href?: string; onClick?: () => void; light?: boolean; className?: string;
}) {
  const cls = `arrow-button ${light ? "button-light" : "button-dark"} ${className}`;
  const content = <><span>{children}</span><span className="button-arrow"><ArrowUpRight size={19} aria-hidden="true" /></span></>;
  return href ? <a className={cls} href={href}>{content}</a> : <button type="button" className={cls} onClick={onClick}>{content}</button>;
}

function MaltSprig({ className = "" }: { className?: string }) {
  return <svg viewBox="0 0 130 230" className={className} fill="none" aria-hidden="true">
    <path d="M61 222C66 160 66 102 65 27M65 30V6M56 49L45 20M74 48L86 20M51 76L37 48M78 76L94 46M49 107L31 81M81 106L101 80M48 137L28 115M82 135L104 112M49 164L25 146M80 163L107 141" stroke="currentColor" strokeWidth="1.2" />
    <path d="M65 49C46 47 42 35 49 30C62 31 66 41 65 49ZM66 49C84 45 89 34 82 29C69 31 64 41 66 49ZM65 77C42 75 36 62 44 55C60 57 66 68 65 77ZM66 77C91 73 96 59 87 54C72 56 64 67 66 77ZM65 107C38 105 31 90 39 84C57 85 65 96 65 107ZM67 107C92 104 101 88 92 82C74 84 66 95 67 107ZM64 138C36 137 27 124 35 115C54 116 65 128 64 138ZM67 138C98 133 106 119 96 113C76 115 66 126 67 138ZM63 167C35 168 23 153 31 145C50 144 63 156 63 167ZM66 167C96 163 111 148 101 140C82 141 69 154 66 167Z" stroke="currentColor" strokeWidth="1.4" />
  </svg>;
}

function BreweryDrawing() {
  return <svg viewBox="0 0 650 370" className="brewery-drawing" fill="none" aria-hidden="true">
    <defs><linearGradient id="tank-stroke" x1="0" y1="0" x2="650" y2="300" gradientUnits="userSpaceOnUse"><stop stopColor="#8baa81"/><stop offset="1" stopColor="#cfbf8d"/></linearGradient></defs>
    <g stroke="url(#tank-stroke)" strokeWidth="1.25">
      {[90,255,420].map((x) => <g key={x}>
        <path d={`M${x} 115Q${x} 65 ${x+65} 65Q${x+130} 65 ${x+130} 115V265Q${x+130} 302 ${x+65} 302Q${x} 302 ${x} 265Z`} />
        <ellipse cx={x+65} cy="115" rx="65" ry="20" />
        <path d={`M${x} 247Q${x+65} 278 ${x+130} 247M${x+23} 298V335M${x+107} 298V335M${x+65} 65V33H${x+80}V14M${x+117} 160H${x+140}V313`} />
        <circle cx={x+65} cy="195" r="21"/><circle cx={x+65} cy="195" r="15"/><path d={`M${x+65} 180V210M${x+50} 195H${x+80}`} />
        <path d={`M${x+16} 152V230M${x+25} 146V238`} opacity=".4" />
      </g>)}
      <path d="M50 335H605M50 342H605M57 335V310H86M563 313H602V284H620M155 33H485"/>
    </g>
  </svg>;
}

function SiteDialog({ kind, onClose }: { kind: ModalKind; onClose: () => void }) {
  const ref = useRef<HTMLDialogElement>(null);
  useEffect(() => {
    if (kind && ref.current && !ref.current.open) ref.current.showModal();
    const before = document.body.style.overflow;
    if (kind) document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = before; };
  }, [kind]);
  if (!kind) return null;
  return <dialog ref={ref} className={`site-dialog ${kind === "product" ? "product-dialog" : "contact-dialog"}`} onCancel={onClose} onClick={(e) => { if (e.target === e.currentTarget) onClose(); }} aria-labelledby="dialog-title">
    <button className="close-button" aria-label="Закрыть окно" onClick={onClose} autoFocus><X size={22} /></button>
    {kind === "product" ? <div className="product-dialog-layout">
      <div className="product-dialog-picture"><span className="micro-label">НАШ ЭКСКЛЮЗИВ</span><img src={assetUrl("hero-bottle.webp")} alt="Бутылка Hollandia Malt 0.0%" width="1024" height="1536" /><span className="dialog-zero" aria-hidden="true">0.0%</span></div>
      <div className="product-dialog-copy"><p className="eyebrow">БЛИЖЕ К НАПИТКУ</p><h2 id="dialog-title">HOLLANDIA<br/><span className="serif-italic">Malt</span></h2><dl className="product-facts">{productFacts.map(([label, value]) => <div key={label}><dt>{label}</dt><dd>{value}</dd></div>)}</dl><p className="product-dialog-note">Наш эксклюзивный продукт, изготовленный на заводе МПК.</p></div>
    </div> : <div className="contact-dialog-copy">
      <Crown size={30} strokeWidth={1.3} className="contact-crown" />
      <p className="eyebrow">HOLLANDIA MALT · ПАРТНЁРСТВО</p>
      <h2 id="dialog-title">Начнём<br/><span className="serif-italic">с диалога.</span></h2>
      <p className="dialog-intro">Обсудим Hollandia Malt для вашего магазина, кафе или дистрибуции.</p>
      <div className="contact-person"><span>ДИСТРИБЬЮТОР «{contact.company.toUpperCase()}»</span><strong>{contact.name}</strong></div>
      <a className="contact-link" href={`tel:${contact.phoneLink}`}><Phone size={19}/><span>{contact.phone}</span><ArrowUpRight size={18}/></a>
      <a className="contact-link contact-email" href={`mailto:${contact.email}?subject=Hollandia%20Malt%20%E2%80%94%20%D1%81%D0%BE%D1%82%D1%80%D1%83%D0%B4%D0%BD%D0%B8%D1%87%D0%B5%D1%81%D1%82%D0%B2%D0%BE`}><Mail size={19}/><span>{contact.email}</span><ArrowUpRight size={18}/></a>
      <p className="contact-footnote">Условия сотрудничества и документы — при обращении к команде.</p>
    </div>}
  </dialog>;
}

function MobileNavigation({ open, onClose, onContact }: { open: boolean; onClose: () => void; onContact: () => void }) {
  const ref = useRef<HTMLDialogElement>(null);
  useEffect(() => {
    if (open && ref.current && !ref.current.open) ref.current.showModal();
    const before = document.body.style.overflow;
    if (open) document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = before; };
  }, [open]);
  if (!open) return null;
  return <dialog ref={ref} className="mobile-navigation" onCancel={onClose} aria-label="Навигация по сайту">
    <div className="mobile-nav-top"><Wordmark/><button className="close-button" onClick={onClose} aria-label="Закрыть меню" autoFocus><X/></button></div>
    <nav>{navigation.map((item) => <a href={`#${item.id}`} key={item.id} onClick={onClose}>{item.label}<ArrowUpRight size={24}/></a>)}</nav>
    <ArrowButton onClick={() => { onClose(); onContact(); }}>Связаться с командой</ArrowButton>
    <span className="mobile-nav-bottom">СОЛОДОВЫЙ ХАРАКТЕР. 0.0% АЛКОГОЛЯ.</span>
  </dialog>;
}

export default function HollandiaSite() {
  const { rootRef, heroRef, bottleRef, activeSection } = useSiteMotion();
  const [facet, setFacet] = useState(0);
  const [faq, setFaq] = useState<number | null>(null);
  const [modal, setModal] = useState<ModalKind>(null);
  const [menuOpen, setMenuOpen] = useState(false);

  return <div ref={rootRef} className="hollandia-site">
    <a href="#about" className="skip-link">Перейти к содержимому</a>
    <div className="reading-progress" aria-hidden="true"/>
    <header className="site-header">
      <a href="#top" className="logo-link" aria-label="Hollandia Malt — в начало"><Wordmark/></a>
      <nav className="desktop-navigation" aria-label="Основная навигация">{navigation.map(item => <a key={item.id} href={`#${item.id}`} aria-current={activeSection === item.id ? "location" : undefined}>{item.label}</a>)}</nav>
      <button className="header-contact" onClick={() => setModal("contact")}>Связаться <ArrowUpRight size={17}/></button>
      <button className="mobile-menu-button" onClick={() => setMenuOpen(true)} aria-label="Открыть меню" aria-expanded={menuOpen}><Menu size={24}/></button>
    </header>

    <main>
      <section id="top" ref={heroRef} className="hero" aria-labelledby="hero-heading">
        <div className="hero-grain" aria-hidden="true"/>
        <div className="hero-topline"><span><i className="tiny-star">✳</i> СОЛОДОВЫЙ НАПИТОК</span><span className="hero-exclusive"><i/>НАШ ЭКСКЛЮЗИВ</span></div>
        <div className="hero-copy">
          <h1 id="hero-heading"><span>СОЛОДОВЫЙ</span><span>ХАРАКТЕР<span className="red-dot">.</span></span></h1>
          <p className="hero-script">В твоём ритме.</p>
          <p className="hero-description">Насыщенный вкус. Искрящаяся свежесть.<br/>Твоя Hollandia Malt — 0.0% алкоголя.</p>
          <ArrowButton href="#about" light>Открыть Hollandia</ArrowButton>
        </div>
        <div className="hero-art" aria-hidden="true">
          <div className="hero-orbit orbit-one"/><div className="hero-orbit orbit-two"/>
          <span className="hero-outline">0.0</span>
          <MaltSprig className="hero-sprig sprig-one"/><MaltSprig className="hero-sprig sprig-two"/>
          <div ref={bottleRef} className="hero-bottle-track"><img className="hero-bottle" src={assetUrl("hero-bottle.webp")} alt="" width="1024" height="1536" fetchPriority="high" /></div>
          <span className="floating-bubble bubble-one"/><span className="floating-bubble bubble-two"/><span className="floating-bubble bubble-three"/>
          <span className="hero-bottle-caption">0,45 Л<span>СТЕКЛЯННАЯ БУТЫЛКА</span></span>
          <span className="hero-seal"><span>БЕЗАЛКОГОЛЬНЫЙ</span><strong>0.0<span>%</span></strong><span>СОЛОДОВЫЙ НАПИТОК</span></span>
        </div>
        <div className="hero-bottom"><span>HOLLANDIA MALT <i/> ПРОИЗВОДСТВО МПК</span><a href="#about">УЗНАТЬ БЛИЖЕ <ArrowDown size={16}/></a></div>
      </section>

      <div className="brand-ribbon" aria-label="Hollandia Malt. Солодовый вкус. 0.0% алкоголя."><div className="ribbon-track" aria-hidden="true">{[0,1,2,3].map(i => <span key={i}>HOLLANDIA MALT <i>✳</i> СОЛОДОВЫЙ ВКУС <i>✳</i> 0.0% АЛКОГОЛЯ <i>✳</i></span>)}</div></div>

      <section id="about" className="about-section section-shell" aria-labelledby="about-heading">
        <div className="section-heading-row" data-reveal><p className="eyebrow">ЗНАКОМЬТЕСЬ, HOLLANDIA</p><span className="micro-label">СОЛОДОВЫЙ НАПИТОК 0.0%</span></div>
        <div className="about-grid"><h2 id="about-heading" className="display-heading" data-reveal><span className="heading-line">ЕСТЬ ВКУС.</span><span className="heading-line serif-italic">Есть характер.</span></h2><div className="about-copy" data-reveal><p>Hollandia Malt — солодовый напиток для тех, кто выбирает свой ритм.</p><p>Выразительный вкус солода, сильная газация и знакомый силуэт стеклянной бутылки. Всё, чтобы сделать обычный момент особенным.</p><button className="text-button" onClick={() => setModal("product")}>Ближе к напитку <Plus size={20}/></button></div></div>
        <div className="product-numbers" data-reveal><div><strong>0.0<span>%</span></strong><span>АЛКОГОЛЯ</span></div><div className="numbers-middle"><Wheat size={34} strokeWidth={1.1}/><span>СОЛОДОВЫЙ<br/>ХАРАКТЕР</span></div><div><strong>0,45<span>л</span></strong><span>В СТЕКЛЯННОЙ БУТЫЛКЕ</span></div></div>
      </section>

      <AlternativeSection onProduct={() => setModal("product")}/>

      <section id="character" className="character-section" aria-labelledby="character-heading">
        <div className="character-image"><img src={assetUrl("malt-story.webp")} alt="Золотистый солодовый напиток в бокале, бутылка Hollandia Malt и колосья" width="1536" height="1024" loading="lazy"/><div className="character-image-shade"/><span className="image-corner-note">HOLLANDIA MALT / ТРИ ГРАНИ ВКУСА</span><div className="character-image-word" key={facets[facet].word} aria-hidden="true">{facets[facet].word}<span>ПОЧУВСТВУЙ ХАРАКТЕР</span></div></div>
        <div className="character-copy" data-reveal><p className="eyebrow">ДЕТАЛИ РЕШАЮТ</p><h2 id="character-heading" className="display-heading"><span className="heading-line">ЯРКИЙ.</span><span className="heading-line">СВОБОДНЫЙ.</span><span className="heading-line serif-italic">Твой.</span></h2>
          <div className="facets" aria-label="Грани Hollandia Malt">{facets.map((item,i) => <div className={`facet ${facet === i ? "facet-active" : ""}`} key={item.title}><button aria-expanded={facet === i} aria-controls={`facet-panel-${i}`} onClick={() => setFacet(i)}><span>{item.title}</span><Plus size={18}/></button><div id={`facet-panel-${i}`} className="facet-panel" hidden={facet !== i}><p>{item.text}</p><span>{item.note}</span></div></div>)}</div>
        </div>
      </section>

      <section className="moment-section section-shell" aria-labelledby="moment-heading">
        <div className="moment-top" data-reveal><div><p className="eyebrow">ПРОСТО ХОРОШИЙ МОМЕНТ</p><h2 id="moment-heading" className="display-heading"><span className="heading-line">МЕНЯЙ ПЛАНЫ.</span><span className="heading-line">ВКУС <span className="serif-italic">остаётся.</span></span></h2></div><p className="moment-intro">Неспешный обед. Долгая встреча.<br/>Вечер, который хочется продлить.<br/>У каждого момента свой вкус.</p></div>
        <div className="moment-picture" data-reveal><img src={assetUrl("terrace-moment.webp")} alt="Hollandia Malt и бокал солодового напитка на солнечной террасе" width="1536" height="1024" loading="lazy"/><div className="moment-photo-overlay"/><span className="moment-photo-label">НАСЛАЖДАЙСЯ<br/><em>моментом.</em></span><span className="moment-zero">0.0<small>%</small></span><span className="photo-caption">ТВОЙ РИТМ. ТВОЯ HOLLANDIA.</span></div>
        <div className="moments-list" data-reveal><span>ЗА ОБЕДОМ</span><span>В ХОРОШЕЙ КОМПАНИИ</span><span>ВЕЧЕРОМ ДЛЯ СЕБЯ</span></div>
      </section>

      <section id="brewery" className="brewery-section" aria-labelledby="brewery-heading">
        <div className="brewery-inner section-shell">
          <div className="section-heading-row" data-reveal><p className="eyebrow">ТАМ, ГДЕ РОЖДАЕТСЯ ВКУС</p><span className="micro-label"><MapPin size={13}/> МЫТИЩИ, РОССИЯ</span></div>
          <div className="brewery-grid"><div className="brewery-copy" data-reveal><h2 id="brewery-heading" className="display-heading">СОЗДАН<br/>НА ЗАВОДЕ.<br/><span className="serif-italic">Выбран нами.</span></h2><p>Hollandia Malt производит Московская пивоваренная компания. Это наш эксклюзивный продукт.</p><p>МПК работает на российском рынке с 2008 года. Завод в Мытищах выпускает пиво и безалкогольные напитки собственных и лицензионных марок.</p><a className="text-button light-text" href="#partners">Познакомиться с нашим эксклюзивом <ArrowDown size={18}/></a></div>
          <div className="brewery-art" data-reveal><span className="brewery-art-label">МОСКОВСКАЯ ПИВОВАРЕННАЯ КОМПАНИЯ</span><div className="brewery-monogram">МПК<span>МЫТИЩИ</span></div><BreweryDrawing/><div className="brewery-art-bottom"><span>ПРОИЗВОДСТВО НАПИТКОВ</span><span>С 2008 ГОДА</span></div></div></div>
          <div className="production-details" data-reveal><div><span>ПРОИЗВОДСТВО</span><h3>Современное<br/>оборудование</h3><p>Hollandia Malt выпускается на производственной площадке МПК.</p></div><div><span>НАПИТОК</span><h3>Пастеризованный<br/>продукт</h3><p>Солодовый напиток в стекле с сильной газацией и маркировкой 0.0%.</p></div><div><span>ПАРТНЁРАМ</span><h3>Документы<br/>по запросу</h3><p>Документация на продукт предоставляется при обсуждении сотрудничества.</p></div></div>
        </div>
      </section>

      <section id="partners" className="partners-section section-shell" aria-labelledby="partners-heading">
        <div className="section-heading-row" data-reveal><p className="eyebrow">ПАРТНЁРАМ</p><span className="exclusive-label"><Sparkles size={14}/> НАШ ЭКСКЛЮЗИВ</span></div>
        <div className="partners-grid"><div data-reveal><h2 id="partners-heading" className="display-heading">ХАРАКТЕР,<br/>КОТОРЫЙ<br/><span className="serif-italic">замечают.</span></h2><p className="partners-intro">Hollandia Malt — выразительное дополнение к ассортименту безалкогольных напитков.</p><ArrowButton onClick={() => setModal("contact")}>Обсудить сотрудничество</ArrowButton></div><div className="partner-formats" data-reveal><div><span className="format-icon"><Store size={19}/></span><div><h3>Магазины и сети</h3><p>Узнаваемая бутылка и понятный формат солодового напитка 0.0%.</p></div><ArrowUpRight size={21}/></div><div><span className="format-icon"><Utensils size={19}/></span><div><h3>Кафе и рестораны</h3><p>Безалкогольный солодовый вкус для вашей карты напитков.</p></div><ArrowUpRight size={21}/></div><div><span className="format-icon"><Handshake size={19}/></span><div><h3>Дистрибьюторы</h3><p>Обсудим сотрудничество, условия и продукт с вашей командой.</p></div><ArrowUpRight size={21}/></div><div className="partner-signature"><span className="signature-star">✳</span><p>Один напиток.<br/><strong>Свой характер.</strong></p></div></div></div>
      </section>

      <section className="faq-section section-shell" aria-labelledby="faq-heading"><div data-reveal><p className="eyebrow">ЕЩЁ НЕМНОГО О ВАЖНОМ</p><h2 id="faq-heading" className="display-heading">БЕЗ ЛИШНИХ<br/><span className="serif-italic">вопросов.</span></h2></div><div className="faq-list" data-reveal>{questions.map((item,i) => <div className={`faq-item ${faq === i ? "faq-open" : ""}`} key={item.question}><h3><button aria-expanded={faq === i} aria-controls={`faq-answer-${i}`} onClick={() => setFaq(faq === i ? null : i)}>{item.question}<ChevronDown size={19}/></button></h3><div className="faq-answer" id={`faq-answer-${i}`} hidden={faq !== i}><p>{item.answer}</p></div></div>)}</div></section>
    </main>

    <footer className="site-footer"><div className="footer-top"><div><a href="#top" aria-label="Hollandia Malt — в начало"><Wordmark light/></a><p>Солодовый характер.<br/>0.0% алкоголя.</p></div><nav aria-label="Навигация в подвале">{navigation.map(item => <a key={item.id} href={`#${item.id}`}>{item.label}<ArrowUpRight size={14}/></a>)}</nav><div className="footer-contact"><span className="micro-label">ПО ВОПРОСАМ СОТРУДНИЧЕСТВА</span><a href={`tel:${contact.phoneLink}`}>{contact.phone}</a><a className="footer-email" href={`mailto:${contact.email}`}>{contact.email}</a><span className="footer-distributor">ДИСТРИБЬЮТОР «АМЕТИСТ»</span></div></div><div className="footer-big-type" aria-hidden="true">HOLLANDIA<span>MALT</span><i>✳</i></div><div className="footer-bottom"><span>HOLLANDIA MALT · 2026</span><span>НАШ ЭКСКЛЮЗИВ. ПРОИЗВОДСТВО МПК.</span><a href="#top">НАВЕРХ <ArrowUpRight size={14}/></a></div></footer>

    <SiteDialog kind={modal} onClose={() => setModal(null)}/>
    <MobileNavigation open={menuOpen} onClose={() => setMenuOpen(false)} onContact={() => setModal("contact")}/>
  </div>;
}
