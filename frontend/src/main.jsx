import React, { useEffect, useMemo, useState } from "react";
import { createRoot } from "react-dom/client";
import {
  ArrowRight, CalendarDays, Check, ChevronDown, ChevronRight, Clock3,
  Headphones, Lightbulb, MapPin, Menu, Minus, Music2, PackageCheck,
  Phone, Plus, ShoppingBag, Sparkles, Star, UtensilsCrossed, Users, X
} from "lucide-react";
import "./styles.css";

const API = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

const fallbackCatalog = {
  catering: {},
  djSound: { setups: [], extras: [], speakerPrice: 900, micPrice: 350 },
  lighting: { packages: [] },
  decoration: []
};

const money = (n) => `₹${Number(n || 0).toLocaleString("en-IN")}`;

function App() {
  const [catalog, setCatalog] = useState(fallbackCatalog);
  const [loading, setLoading] = useState(true);
  const [activeTool, setActiveTool] = useState(null);
  const [cart, setCart] = useState([]);
  const [mobileMenu, setMobileMenu] = useState(false);
  const [notice, setNotice] = useState("");
  const [orderDone, setOrderDone] = useState(null);

  useEffect(() => {
    fetch(`${API}/catalog`)
      .then(r => r.json())
      .then(setCatalog)
      .catch(() => setNotice("Demo catalog loaded. Start the backend to enable bookings."))
      .finally(() => setLoading(false));
  }, []);

  const total = useMemo(() => cart.reduce((sum, item) => sum + item.total, 0), [cart]);

  const addItem = (item) => {
    setCart(prev => [...prev, { ...item, cartId: `${item.id}-${Date.now()}-${Math.random()}` }]);
    setNotice(`${item.name} added to your plan.`);
    setTimeout(() => setNotice(""), 2200);
  };

  const removeItem = (cartId) => setCart(prev => prev.filter(x => x.cartId !== cartId));

  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setMobileMenu(false);
  };

  return (
    <div>
      <header className="nav">
        <div className="container nav-inner">
          <button className="brand" onClick={() => scrollTo("home")}>
            <img src="/logo.png" alt="Pooja Arrangers logo" className="brand-mark" />
            <span><b>POOJA</b><small>ARRANGERS & CATERERS</small></span>
          </button>
          <button className="menu-btn" onClick={() => setMobileMenu(v => !v)}>{mobileMenu ? <X /> : <Menu />}</button>
          <nav className={mobileMenu ? "nav-links open" : "nav-links"}>
            <button onClick={() => scrollTo("home")}>Home</button>
            <button onClick={() => scrollTo("services")}>Services</button>
            <button onClick={() => scrollTo("decorations")}>Decorations</button>
            <button onClick={() => scrollTo("gallery")}>Gallery</button>
            <button className="nav-cta" onClick={() => setActiveTool("checkout")}>Plan My Function</button>
          </nav>
        </div>
      </header>

      {notice && <div className="toast"><Check size={17} /> {notice}</div>}

      <main>
        <section id="home" className="hero">
          <div className="hero-bg" />
          <div className="container hero-content">
            <h1>Everything your function needs, <em>beautifully arranged.</em></h1>
            <p>From delicious catering to stage decoration, lighting and DJ sound — choose what you need, see the estimated price and send your booking request in minutes.</p>
            <div className="hero-actions">
              <button className="primary" onClick={() => scrollTo("services")}>Explore Services <ArrowRight size={18}/></button>
              <button className="secondary light" onClick={() => setActiveTool("checkout")}><ShoppingBag size={18}/> View My Plan ({cart.length})</button>
            </div>
            <div className="trust-row">
              <span><Check/> Catering</span><span><Check/> Decoration</span><span><Check/> Lighting</span><span><Check/> DJ & Sound</span>
            </div>
          </div>
        </section>

        <section id="services" className="section">
          <div className="container">
            <SectionHead eyebrow="SERVICES" title="Build your function, your way" text="Select one service or combine multiple services into a single booking request." />
            <div className="service-grid">
              <ServiceCard icon={<UtensilsCrossed/>} title="Catering" onClick={() => setActiveTool("catering")} />
              <ServiceCard icon={<Sparkles/>} title="Stage & Event Decoration" onClick={() => scrollTo("decorations")} />
              <ServiceCard icon={<Lightbulb/>} title="Lighting" onClick={() => setActiveTool("lighting")} />
              <ServiceCard icon={<Headphones/>} title="DJ & Sound" onClick={() => setActiveTool("sound")} />
            </div>
          </div>
        </section>

        <section className="feature-band">
          <div className="container feature-layout">
            <div>
              <div className="eyebrow dark">SIMPLE BOOKING</div>
              <h2 className="feature-heading">Plan Your Perfect Celebration</h2>
              <p>Choose the services you need for your special day, from catering and decoration to lighting and DJ sound. Share your event details with us and book your complete event arrangements easily.</p>
              <div className="steps">
                <Step n="01" title="Choose services" text="Catering, decoration, lighting or sound." />
                <Step n="02" title="Customize" text="Select items, quantities, occasion and package." />
                <Step n="03" title="Send enquiry" text="Share your date, venue and contact details." />
              </div>
            </div>
            <div className="plan-card">
              <div className="plan-top"><span>YOUR EVENT PLAN</span><ShoppingBag/></div>
              {cart.length === 0 ? <div className="empty-plan">Your selected services will appear here.</div> :
                cart.slice(0, 4).map(x => <div className="mini-line" key={x.cartId}><span>{x.name}<small>{x.meta}</small></span><b>{money(x.total)}</b></div>)}
              <div className="plan-total"><span>Estimated total</span><strong>{money(total)}</strong></div>
              <button className="primary full" onClick={() => setActiveTool("checkout")}>Review & Book <ArrowRight size={17}/></button>
            </div>
          </div>
        </section>

        <DecorationSection catalog={catalog} addItem={addItem} scrollTo={scrollTo} />

        <section id="gallery" className="section gallery-section">
          <div className="container">
            <SectionHead eyebrow="OUR WORK" title="Set the mood for your celebration" />
                        <div className="gallery">
              <img src="/images/gallery/photo1.jpeg" alt="Event photo 1" loading="lazy" className="g1" />
              <img src="/images/gallery/photo2.webp" alt="Event photo 2" loading="lazy" className="g2" />
              <img src="/images/gallery/photo3.jpg" alt="Event photo 3" loading="lazy" className="g3" />
              <img src="/images/gallery/photo4.jpg" alt="Event photo 4" loading="lazy" className="g4" />
              <img src="/images/gallery/photo5.jpeg" alt="Event photo 5" loading="lazy" className="g5" />
              <img src="/images/gallery/photo6.jpeg" alt="Event photo 6" loading="lazy" className="g6" />
              <img src="/images/gallery/photo7.jpg" alt="Event photo 7" loading="lazy" className="g7" />
              <img src="/images/gallery/photo8.jpg" alt="Event photo 8" loading="lazy" className="g8" />


            </div>
          </div>
        </section>

        <section className="testimonial-section">
          <div className="container">
            <div className="testimonial">
              <div className="stars">{[1,2,3,4,5].map(x => <Star key={x} fill="currentColor" size={17}/>)}</div>
              <h2>“One team for the food, decor, lighting and sound makes event planning much easier.”</h2>
            </div>
          </div>
        </section>

        <section id="contact" className="contact-section">
          <div className="container contact-grid">
            <div>
              <div className="eyebrow">READY TO PLAN?</div>
              <h2>Tell us about your function.</h2>
              <p>Share your requirements and our team can confirm availability, final pricing and arrangements.</p>
            </div>
            <div className="contact-actions">
              <button className="primary" onClick={() => setActiveTool("checkout")}><CalendarDays/> Request a Quote</button>
              <a className="whatsapp" href="https://wa.me/919000000000" target="_blank" rel="noreferrer">WhatsApp Us</a>
            </div>
          </div>
        </section>
      </main>

      <footer>
  <div className="container footer-inner">
    <div>
      <b>POOJA ARRANGERS & CATERERS</b>
      <p>Complete event arrangements for your special occasions.</p>
      <div className="footer-map">
        <iframe
          title="Our Location"
          src="https://www.google.com/maps?q=Pooja+Arrangers+Pakshikere+Rd+Koluvailu+Haleangadi+Karnataka+574146&output=embed"
          width="260"
          height="160"
          style={{ border: 0, marginTop: "14px", borderRadius: "4px" }}
          allowFullScreen=""
          loading="lazy"
        ></iframe>
      </div>
    </div>
    <div className="footer-contact"><span><Phone size={15}/> +91 8904551379</span><span><MapPin size={15}/> Haleyangady, Mangaluru, Karnataka 574146</span></div>
  </div>
</footer>

{cart.length > 0 && (
  <button className="floating-plan" onClick={() => setActiveTool("checkout")}><ShoppingBag size={19}/><span>{cart.length} items</span><b>{money(total)}</b></button>
)}
      {activeTool === "catering" && <CateringModal catalog={catalog} addItem={addItem} onClose={() => setActiveTool(null)} />}
      {activeTool === "sound" && <SoundModal catalog={catalog} addItem={addItem} onClose={() => setActiveTool(null)} />}
      {activeTool === "lighting" && <LightingModal catalog={catalog} addItem={addItem} onClose={() => setActiveTool(null)} />}
      {activeTool === "checkout" && <CheckoutModal cart={cart} total={total} removeItem={removeItem} setOrderDone={setOrderDone} onClose={() => setActiveTool(null)} />}
      {orderDone && <SuccessModal order={orderDone} onClose={() => { setOrderDone(null); setCart([]); }} />}
    </div>
  );
}

function ServiceCard({icon,title,tag,onClick}) {
  return <button className="service-card" onClick={onClick}><span className="service-icon">{icon}</span>{tag && <span className="tag">{tag}</span>}<h3>{title}</h3><span className="learn">Configure <ArrowRight size={15}/></span></button>;
}

function SectionHead({eyebrow,title,text}) {
  return <div className="section-head"><div className="eyebrow">{eyebrow}</div><h2>{title}</h2><p>{text}</p></div>;
}

function Step({n,title,text}) {
  return <div className="step"><span>{n}</span><div><b>{title}</b><p>{text}</p></div></div>;
}

function Modal({children,onClose,title,kicker}) {
  return <div className="overlay"><div className="modal"><div className="modal-head"><div><span className="eyebrow">{kicker}</span><h2>{title}</h2></div><button className="close" onClick={onClose}><X/></button></div>{children}</div></div>;
}

function CateringModal({catalog,addItem,onClose}) {
  const [people,setPeople] = useState(100);
  const [selected,setSelected] = useState({});
  const toggle = (item) => setSelected(s => ({...s,[item.id]: !s[item.id]}));
  const chosen = Object.entries(selected).filter(([,v])=>v).map(([id]) => Object.values(catalog.catering).flat().find(x=>x.id===id)).filter(Boolean);
  const subtotal = chosen.reduce((s,x)=>s + x.price * people,0);

  const add = () => {
    if (!chosen.length) return;
    addItem({id:`catering-${Date.now()}`, name:`Catering for ${people} people`, meta:chosen.map(x=>x.name).join(", "), total:subtotal});
    onClose();
  };

  return <Modal onClose={onClose} title="Build your catering order" kicker="CATERING">
    <div className="form-row">
      <label>Number of people</label>
      <div className="counter"><button onClick={()=>setPeople(Math.max(10,people-10))}><Minus/></button><strong>{people}</strong><span>people</span><button onClick={()=>setPeople(people+10)}><Plus/></button></div>
    </div>
    <p className="hint">Select the dishes you want. Prices are calculated per person.</p>
        <div className="menu-groups">
      {Object.entries(catalog.catering).map(([group,items]) => {
        const hasNonVeg = items.some(i => i.veg === false);
        const vegItems = hasNonVeg ? items.filter(i => i.veg !== false) : items;
        const nonVegItems = hasNonVeg ? items.filter(i => i.veg === false) : [];
        const renderItem = item => <label className={`check-option ${selected[item.id]?"selected":""}`} key={item.id}><input type="checkbox" checked={!!selected[item.id]} onChange={()=>toggle(item)}/><span><b><span className={`veg-dot ${item.veg===false?"nonveg":""}`}></span>{item.name}</b><small>{money(item.price)} / person</small></span><strong>{money(item.price*people)}</strong></label>;
        return (
          <div key={group}>
            <h4>{group}</h4>
            {hasNonVeg ? (
              <>
                <h5 className="submenu-head">Veg</h5>
                <div className="option-list">{vegItems.map(renderItem)}</div>
                <h5 className="submenu-head nonveg">Non-Veg</h5>
                <div className="option-list">{nonVegItems.map(renderItem)}</div>
              </>
            ) : (
              <div className="option-list">{vegItems.map(renderItem)}</div>
            )}
          </div>
        );
      })}
    </div>
    <div className="modal-bottom"><div><small>Estimated catering</small><strong>{money(subtotal)}</strong></div><button className="primary" disabled={!chosen.length} onClick={add}>Add Catering <Plus size={17}/></button></div>
  </Modal>;
}

function SoundModal({catalog,addItem,onClose}) {
  const [setup,setSetup] = useState(catalog.djSound.setups[0]?.id || "");
  const [boxes,setBoxes] = useState(2);
  const [mics,setMics] = useState(1);
  const [extras,setExtras] = useState([]);
  const base = catalog.djSound.setups.find(x=>x.id===setup)?.price || 0;
  const extraTotal = extras.reduce((s,id)=>s+(catalog.djSound.extras.find(x=>x.id===id)?.price||0),0);
  const total = base + boxes*catalog.djSound.speakerPrice + mics*catalog.djSound.micPrice + extraTotal;
  const toggle = id => setExtras(e=>e.includes(id)?e.filter(x=>x!==id):[...e,id]);
  return <Modal onClose={onClose} title="Build your DJ & sound setup" kicker="DJ & SOUND">
    <div className="setup-grid">{catalog.djSound.setups.map(s=><button key={s.id} className={`setup-card ${setup===s.id?"active":""}`} onClick={()=>setSetup(s.id)}><b>{s.name}</b><span>{s.description}</span><strong>{money(s.price)}</strong></button>)}</div>
    <div className="counter-grid">
      <Counter label="Sound boxes" value={boxes} setValue={setBoxes} min={1} />
      <Counter label="Microphones" value={mics} setValue={setMics} min={0} />
    </div>
    <h4>Optional extras</h4>
    <div className="option-list">{catalog.djSound.extras.map(x=><label className={`check-option ${extras.includes(x.id)?"selected":""}`} key={x.id}><input type="checkbox" checked={extras.includes(x.id)} onChange={()=>toggle(x.id)}/><span><b>{x.name}</b><small>{money(x.price)}</small></span><strong>{money(x.price)}</strong></label>)}</div>
    <div className="modal-bottom"><div><small>Estimated sound setup</small><strong>{money(total)}</strong></div><button className="primary" onClick={()=>{addItem({id:`sound-${Date.now()}`,name:"DJ & Sound Setup",meta:`${setup}, ${boxes} boxes, ${mics} mics`,total});onClose()}}>Add Sound <Plus size={17}/></button></div>
  </Modal>;
}

function Counter({label,value,setValue,min=0}) {
  return <div className="counter-block"><span>{label}</span><div className="counter"><button onClick={()=>setValue(Math.max(min,value-1))}><Minus/></button><strong>{value}</strong><button onClick={()=>setValue(value+1)}><Plus/></button></div></div>;
}

function LightingModal({catalog,addItem,onClose}) {
  const [selected,setSelected] = useState(catalog.lighting.packages[0]?.id || "");
  const [qty,setQty] = useState(1);
  const pkg = catalog.lighting.packages.find(x=>x.id===selected);
  const total = (pkg?.price||0)*qty;
  return <Modal onClose={onClose} title="Choose event lighting" kicker="LIGHTING">
    <div className="setup-grid">{catalog.lighting.packages.map(x=><button key={x.id} className={`setup-card ${selected===x.id?"active":""}`} onClick={()=>setSelected(x.id)}><b>{x.name}</b><span>{x.description}</span><strong>{money(x.price)}</strong></button>)}</div>
    <Counter label="Number of lighting setups" value={qty} setValue={setQty} min={1}/>
    <div className="modal-bottom"><div><small>Estimated lighting</small><strong>{money(total)}</strong></div><button className="primary" onClick={()=>{addItem({id:`lighting-${Date.now()}`,name:pkg.name,meta:`${qty} setup(s)`,total});onClose()}}>Add Lighting <Plus size={17}/></button></div>
  </Modal>;
}

function DecorationSection({catalog,addItem}) {
  const [category,setCategory] = useState("Wedding");
  const [selected,setSelected] = useState(null);
  const categories = ["Wedding","Mehndi","Reception","Engagement","Birthday"];
  const results = catalog.decoration.filter(x=>x.category===category);

  return <section id="decorations" className="section decoration-section"><div className="container">
    <SectionHead eyebrow="DECORATION STUDIO" title="Find a decoration that fits your occasion" text="Choose the function to browse matching designs before booking." />
    <div className="filter-row"><div className="pill-row">{categories.map(x=><button key={x} className={category===x?"pill active":"pill"} onClick={()=>setCategory(x)}>{x}</button>)}</div></div>
    <div className="decoration-grid">{results.map(d=><article className="dec-card" key={d.id}><div className="dec-image"><img src={d.image} alt={d.name}/></div><div className="dec-body"><div><small>{d.category}</small></div><strong>{money(d.price)}</strong></div><button className="outline full" onClick={()=>setSelected(d)}>View & Book <ChevronRight size={16}/></button></article>)}</div>
    {results.length===0 && <div className="no-results">No designs for this occasion yet.</div>}
  </div>
  {selected && <DecorationBooking item={selected} addItem={addItem} onClose={()=>setSelected(null)}/>}
  </section>;
}

function DecorationBooking({item,addItem,onClose}) {
  const [date,setDate]=useState("");
  const [venue,setVenue]=useState("");
  const [guests,setGuests]=useState(100);
  const valid=date && venue;
  return <Modal onClose={onClose} title={item.name} kicker={`${item.category.toUpperCase()} • ${item.range.toUpperCase()}`}>
    <img className="modal-photo" src={item.image} alt={item.name}/>
    <div className="booking-info"><div><span>Starting package</span><b>{money(item.price)}</b></div><div><span>Occasion</span><b>{item.category}</b></div></div>
    <div className="input-grid">
      <label>Event date<input type="date" value={date} onChange={e=>setDate(e.target.value)} /></label>
      <label>Expected guests<input type="number" min="1" value={guests} onChange={e=>setGuests(e.target.value)} /></label>
      <label className="wide">Venue / location<input placeholder="Enter function hall or location" value={venue} onChange={e=>setVenue(e.target.value)} /></label>
    </div>
    <p className="hint">Final decoration pricing may change after the team confirms the venue, size and custom requirements.</p>
    <div className="modal-bottom"><div><small>Package estimate</small><strong>{money(item.price)}</strong></div><button className="primary" disabled={!valid} onClick={()=>{addItem({id:`${item.id}-${Date.now()}`,name:`Decoration — ${item.name}`,meta:`${item.category}, ${date}, ${venue}`,total:item.price,eventDate:date,venue,guests});onClose()}}>Add Decoration <Plus size={17}/></button></div>
  </Modal>;
}

function CheckoutModal({cart,total,removeItem,setOrderDone,onClose}) {
  const [form,setForm]=useState({name:"",phone:"",email:"",date:"",venue:"",guests:"",notes:""});
  const [sending,setSending]=useState(false);
  const update=e=>setForm(f=>({...f,[e.target.name]:e.target.value}));
  const submit=async e=>{
    e.preventDefault();
    if(!cart.length) return;
    setSending(true);
    try {
      const res=await fetch(`${API}/orders`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({customer:{name:form.name,phone:form.phone,email:form.email},event:{date:form.date,venue:form.venue,guests:form.guests,notes:form.notes},items:cart,total})});
      const data=await res.json();
      if(!res.ok) throw new Error(data.message);
      setOrderDone(data.order);
      onClose();
    } catch(err) {
      alert(err.message || "Could not send booking. Make sure backend is running.");
    } finally { setSending(false); }
  };
  return <Modal onClose={onClose} title="Review & send booking request" kicker="YOUR EVENT PLAN">
    {!cart.length ? <div className="empty-state"><ShoppingBag size={40}/><h3>Your plan is empty</h3><p>Add catering, decoration, lighting or sound first.</p></div> :
    <form onSubmit={submit}>
      <div className="cart-list">{cart.map(x=><div className="cart-line" key={x.cartId}><div><b>{x.name}</b><small>{x.meta}</small></div><strong>{money(x.total)}</strong><button type="button" onClick={()=>removeItem(x.cartId)}><X size={16}/></button></div>)}</div>
      <div className="checkout-total"><span>Estimated total</span><strong>{money(total)}</strong></div>
      <h4>Your details</h4>
      <div className="input-grid">
        <label>Name<input name="name" required value={form.name} onChange={update} /></label>
        <label>Phone<input name="phone" required value={form.phone} onChange={update} /></label>
        <label>Email (optional)<input name="email" type="email" value={form.email} onChange={update} /></label>
        <label>Event date<input name="date" required type="date" value={form.date} onChange={update}/></label>
        <label>Expected guests<input name="guests" type="number" value={form.guests} onChange={update} /></label>
        <label>Venue / location<input name="venue" value={form.venue} onChange={update} /></label>
        <label className="wide">Additional requirements<textarea name="notes" value={form.notes} onChange={update} placeholder="Tell us anything else we should know..."/></label>
      </div>
      <button className="primary full submit-btn" disabled={sending}>{sending ? "Sending..." : "Send Booking Request"} <ArrowRight size={17}/></button>
      <p className="form-note">This is a booking enquiry, not an instant payment. The business can confirm availability and final pricing.</p>
    </form>}
  </Modal>;
}

function SuccessModal({order,onClose}) {
  return <div className="overlay"><div className="success-modal"><span className="success-icon"><Check/></span><div className="eyebrow">REQUEST RECEIVED</div><h2>Thanks, {order.customer.name}!</h2><p>Your booking enquiry <b>{order.id}</b> has been received. The team can now review your requirements and confirm the final details.</p><div className="success-summary"><span>Event date <b>{order.event.date}</b></span><span>Estimated total <b>{money(order.total)}</b></span></div><button className="primary full" onClick={onClose}>Done</button></div></div>;
}

createRoot(document.getElementById("root")).render(<App />);
