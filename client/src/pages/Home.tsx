import { useMemo, useState } from "react";
import {
  ArrowDownRight,
  ArrowRight,
  ArrowUpRight,
  CalendarDays,
  Check,
  ChevronDown,
  Clock3,
  Code2,
  Figma,
  Filter,
  Globe2,
  Heart,
  MessageCircle,
  Play,
  Plus,
  Search,
  ShieldCheck,
  Sparkles,
  Star,
  Users,
  Video,
  X,
  Zap,
} from "lucide-react";

type Session = {
  name: string;
  role: string;
  initials: string;
  avatar: string;
  avatarPosition?: string;
  offer: string;
  wants: string;
  rating: string;
  reviews: string;
  availability: string;
  color: string;
};

const sessions: Session[] = [
  {
    name: "Maya Chen",
    role: "Product designer · Toronto",
    initials: "MC",
    avatar:
      "https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&w=160&q=80",
    offer: "Figma systems",
    wants: "Storytelling",
    rating: "4.9",
    reviews: "18 reviews",
    availability: "Today · 4:30 PM",
    color: "blush",
  },
  {
    name: "Theo Martins",
    role: "Frontend engineer · Lisbon",
    initials: "TM",
    avatar:
      "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=160&q=80",
    offer: "React architecture",
    wants: "User research",
    rating: "5.0",
    reviews: "31 reviews",
    availability: "Tomorrow · 9:00 AM",
    color: "mint",
  },
  {
    name: "Nadia Okafor",
    role: "Growth lead · London",
    initials: "NO",
    avatar:
      "https://images.unsplash.com/photo-1531123897727-8f129e1688ce?auto=format&fit=crop&w=160&q=80",
    offer: "Go-to-market",
    wants: "Python basics",
    rating: "4.8",
    reviews: "12 reviews",
    availability: "Thu · 1:00 PM",
    color: "lavender",
  },
];

const reviewItems = [
  {
    title: "Portfolio case study",
    author: "Samira K.",
    meta: "Product designer · 12 min ago",
    kind: "PDF · 4 pages",
    tone: "peach",
    icon: Figma,
    comments: 4,
  },
  {
    title: "API error handling",
    author: "Jordan Lee",
    meta: "Software engineer · 28 min ago",
    kind: "TypeScript · 48 lines",
    tone: "blue",
    icon: Code2,
    comments: 7,
  },
  {
    title: "Climate policy essay",
    author: "Aarav Patel",
    meta: "Career changer · 1 hr ago",
    kind: "Essay · 680 words",
    tone: "green",
    icon: Globe2,
    comments: 3,
  },
];

function AppMark() {
  return (
    <div className="brand-mark" aria-label="SkillSwap home">
      <span className="brand-mark-dot" />
      <span>skillswap<span className="brand-mark-accent">_</span></span>
    </div>
  );
}

function Avatar({ session, small = false }: { session: Session; small?: boolean }) {
  return (
    <div className={`avatar ${small ? "avatar-small" : ""}`}>
      <img src={session.avatar} alt={session.name} />
      <span className="avatar-fallback">{session.initials}</span>
      {!small && <span className="avatar-status" />}
    </div>
  );
}

function Home() {
  const [activeFilter, setActiveFilter] = useState("All sessions");
  const [selectedSession, setSelectedSession] = useState<Session | null>(null);
  const [showJoin, setShowJoin] = useState(false);
  const [joined, setJoined] = useState(false);
  const [liked, setLiked] = useState<number[]>([]);
  const [reviewFilter, setReviewFilter] = useState("Latest");

  const filteredSessions = useMemo(() => {
    if (activeFilter === "All sessions") return sessions;
    return sessions.filter((session) =>
      `${session.offer} ${session.wants}`.toLowerCase().includes(activeFilter.toLowerCase()),
    );
  }, [activeFilter]);

  const toggleLike = (index: number) => {
    setLiked((current) =>
      current.includes(index) ? current.filter((item) => item !== index) : [...current, index],
    );
  };

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <main className="site-shell">
      <div className="top-strip">
        <div className="container top-strip-inner">
          <span className="top-strip-pulse" />
          <span>Built for the in-between moments.</span>
          <span className="top-strip-detail">30 minutes · one specific outcome</span>
          <button onClick={() => scrollTo("how-it-works")} className="top-strip-link">
            See how it works <ArrowRight size={13} />
          </button>
        </div>
      </div>

      <header className="site-header container">
        <button className="brand-button" onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}>
          <AppMark />
        </button>
        <nav className="main-nav" aria-label="Main navigation">
          <button onClick={() => scrollTo("swap-board")}>Explore swaps</button>
          <button onClick={() => scrollTo("reviews")}>Peer reviews</button>
          <button onClick={() => scrollTo("how-it-works")}>How it works</button>
        </nav>
        <div className="header-actions">
          <button className="text-button" onClick={() => setShowJoin(true)}>Log in</button>
          <button className="header-cta" onClick={() => setShowJoin(true)}>Join free <ArrowUpRightIcon /></button>
        </div>
      </header>

      <section className="hero container">
        <div className="hero-copy">
          <div className="eyebrow"><span className="eyebrow-line" /> Micro-mentorship, made useful</div>
          <h1>Trade what you know<br /><em>for what’s next.</em></h1>
          <p className="hero-subcopy">SkillSwap pairs you with good people for one focused, 30-minute exchange — a quick review, a clearer next step, a little momentum.</p>
          <div className="hero-actions">
            <button className="primary-button" onClick={() => scrollTo("swap-board")}>Find my match <ArrowRight size={17} /></button>
            <button className="quiet-button" onClick={() => scrollTo("how-it-works")}><span className="play-button"><Play size={12} fill="currentColor" /></span> See the idea</button>
          </div>
          <div className="proof-row">
            <div className="proof-avatars">
              {sessions.map((session) => <Avatar key={session.name} session={session} small />)}
              <span className="proof-more">+2k</span>
            </div>
            <div><strong>2,400+ curious humans</strong><span> already swapping</span></div>
          </div>
        </div>

        <div className="hero-visual" aria-label="Example SkillSwap session">
          <div className="visual-orbit orbit-one" />
          <div className="visual-orbit orbit-two" />
          <div className="hero-card hero-card-main">
            <div className="card-kicker"><span className="live-dot" /> Your next 30 minutes</div>
            <div className="match-line">
              <div className="match-person match-person-left">
                <Avatar session={sessions[0]} />
                <span className="person-name">Maya</span>
                <span className="person-skill">Figma systems</span>
              </div>
              <div className="swap-icon"><ArrowRight size={18} /></div>
              <div className="match-person match-person-right">
                <span className="person-name">You</span>
                <span className="person-skill">Need storytelling</span>
                <div className="you-avatar">JD</div>
              </div>
            </div>
            <div className="session-divider" />
            <div className="session-detail-row"><span><CalendarDays size={15} /> Tuesday, 4:30 PM</span><span><Video size={15} /> Video call</span></div>
            <button className="card-action" onClick={() => setSelectedSession(sessions[0])}>Review match <ArrowUpRightIcon /></button>
          </div>
          <div className="float-note note-top"><Sparkles size={14} /><span><strong>Smart match</strong><br />based on your tags</span></div>
          <div className="float-note note-bottom"><ShieldCheck size={14} /><span>Verified community<br /><strong>feedback you can trust</strong></span></div>
          <div className="hero-coordinate">01 <span>/</span> 03</div>
        </div>
      </section>

      <section className="signal-row container" aria-label="Platform benefits">
        <div className="signal-item"><span className="signal-icon"><Clock3 size={17} /></span><div><strong>Short by design</strong><span>Focused 30-min sessions</span></div></div>
        <div className="signal-item"><span className="signal-icon"><Zap size={17} /></span><div><strong>Useful by default</strong><span>Specific asks, clear outcomes</span></div></div>
        <div className="signal-item"><span className="signal-icon"><Users size={17} /></span><div><strong>Human first</strong><span>People, not profiles</span></div></div>
      </section>

      <section id="swap-board" className="section section-cream">
        <div className="container">
          <div className="section-heading-row">
            <div>
              <div className="section-label">01 · Skill swap board</div>
              <h2>Find a sharp mind<br /><em>for the next step.</em></h2>
            </div>
            <div className="heading-aside"><span className="aside-number">2,400+</span><span>people trading<br />specific skills</span></div>
          </div>
          <div className="board-toolbar">
            <div className="search-box"><Search size={16} /><input aria-label="Search skills" placeholder="Search a skill, topic or person" /></div>
            <div className="filter-pills">
              {["All sessions", "Design", "Code", "Career"].map((filter) => <button key={filter} className={activeFilter === filter ? "filter-pill active" : "filter-pill"} onClick={() => setActiveFilter(filter)}>{filter}</button>)}
            </div>
            <button className="filter-button"><Filter size={15} /> More filters <ChevronDown size={14} /></button>
          </div>
          <div className="session-grid">
            {filteredSessions.map((session, index) => (
              <article className={`session-card ${session.color}`} key={session.name}>
                <div className="session-card-top"><span className="match-badge">{index === 0 ? "97% match" : index === 1 ? "91% match" : "88% match"}</span><button className={`heart-button ${liked.includes(index) ? "liked" : ""}`} onClick={() => toggleLike(index)} aria-label={`Save ${session.name}`}><Heart size={16} fill={liked.includes(index) ? "currentColor" : "none"} /></button></div>
                <div className="session-person-row"><Avatar session={session} /><div><h3>{session.name}</h3><p>{session.role}</p></div></div>
                <div className="swap-tags"><div><span>Can help with</span><strong>{session.offer}</strong></div><ArrowRight size={17} /><div><span>Wants to learn</span><strong>{session.wants}</strong></div></div>
                <div className="session-card-bottom"><div className="rating"><Star size={14} fill="currentColor" /> {session.rating} <span>({session.reviews.replace(" reviews", "")})</span></div><span className="availability">{session.availability}</span></div>
                <button className="book-button" onClick={() => setSelectedSession(session)}>View profile <ArrowUpRightIcon /></button>
              </article>
            ))}
          </div>
          {filteredSessions.length === 0 && <div className="empty-state">No swaps found for that tag yet. Try another filter.</div>}
          <div className="center-link"><button onClick={() => setActiveFilter("All sessions")}>Browse all swaps <ArrowRight size={16} /></button></div>
        </div>
      </section>

      <section id="how-it-works" className="section section-ink">
        <div className="container">
          <div className="section-label light-label">02 · The simple loop</div>
          <div className="loop-heading"><h2>Give a little.<br /><em>Get a lot back.</em></h2><p>Good things happen when the ask is specific, the time is short, and both people show up ready to help.</p></div>
          <div className="steps-grid">
            <div className="step-card"><span className="step-number">01</span><div className="step-icon"><Search size={22} /></div><h3>Make your ask</h3><p>Tell us what you can share and the one thing you want to move forward.</p><span className="step-caption">2 minutes to set up</span></div>
            <div className="step-card active-step"><span className="step-number">02</span><div className="step-icon coral"><Sparkles size={22} /></div><h3>Get a smart match</h3><p>Our tags connect complementary skills, goals and availability.</p><span className="step-caption">A better fit, faster</span></div>
            <div className="step-card"><span className="step-number">03</span><div className="step-icon"><MessageCircle size={22} /></div><h3>Swap & keep moving</h3><p>Meet for 30 minutes, trade notes, and leave with a next action.</p><span className="step-caption">Momentum, unlocked</span></div>
          </div>
        </div>
      </section>

      <section id="reviews" className="section section-paper">
        <div className="container review-layout">
          <div className="review-intro"><div className="section-label">03 · Peer review feed</div><h2>Make the work<br /><em>better together.</em></h2><p>Share a small slice of what you’re working on. Get useful, kind feedback from someone who’s been there.</p><button className="outline-button" onClick={() => setShowJoin(true)}><Plus size={16} /> Share a piece of work</button><div className="review-stat"><span className="review-stat-number">8,642</span><span>helpful notes<br />left this month</span></div></div>
          <div className="review-feed"><div className="feed-header"><div className="feed-tabs">{["Latest", "For you"].map((filter) => <button key={filter} onClick={() => setReviewFilter(filter)} className={reviewFilter === filter ? "feed-tab active" : "feed-tab"}>{filter}</button>)}</div><button className="feed-filter"><Filter size={14} /> Filter</button></div>{reviewItems.map((item, index) => { const Icon = item.icon; return <article className="review-card" key={item.title}><div className={`review-file-icon ${item.tone}`}><Icon size={22} /></div><div className="review-content"><div className="review-meta">{item.meta}</div><h3>{item.title}</h3><div className="review-file-meta"><span>{item.kind}</span><span className="dot-separator">·</span><span><MessageCircle size={13} /> {item.comments} comments</span></div><div className="review-author"><div className="mini-avatar">{item.author.split(" ").map((part) => part[0]).join("")}</div><span>posted by <strong>{item.author}</strong></span></div></div><button className="review-arrow" onClick={() => setShowJoin(true)} aria-label="Open review"><ArrowUpRightIcon /></button></article> })}<div className="feed-footer"><button onClick={() => setShowJoin(true)}>See all peer reviews <ArrowRight size={15} /></button><span>Updated just now</span></div></div>
        </div>
      </section>

      <section className="section cta-section">
        <div className="container cta-inner"><div className="cta-spark"><Sparkles size={22} /></div><div><div className="section-label">Your next good conversation</div><h2>Start with one<br /><em>specific thing.</em></h2></div><div className="cta-action"><p>No endless networking. No vague advice. Just 30 minutes with someone who gets it.</p><button className="primary-button light-button" onClick={() => setShowJoin(true)}>Join the swap <ArrowRight size={17} /></button></div></div>
      </section>

      <footer className="site-footer"><div className="container footer-inner"><AppMark /><div className="footer-links"><span>© 2026 SkillSwap</span><button onClick={() => setShowJoin(true)}>Community guidelines</button><button onClick={() => setShowJoin(true)}>Privacy</button><button onClick={() => setShowJoin(true)}>Say hello <ArrowUpRightIcon /></button></div></div></footer>

      {selectedSession && <div className="modal-backdrop" onClick={() => setSelectedSession(null)}><div className="modal-card" onClick={(event) => event.stopPropagation()}><button className="modal-close" onClick={() => setSelectedSession(null)}><X size={18} /></button><div className="modal-card-header"><Avatar session={selectedSession} /><div><span className="modal-overline">{selectedSession.rating} <Star size={12} fill="currentColor" /> · {selectedSession.reviews}</span><h3>{selectedSession.name}</h3><p>{selectedSession.role}</p></div></div><div className="modal-swap"><div><span>Can help with</span><strong>{selectedSession.offer}</strong></div><ArrowRight size={18} /><div><span>Wants to learn</span><strong>{selectedSession.wants}</strong></div></div><div className="modal-note"><CalendarDays size={16} /><div><strong>Next opening</strong><span>{selectedSession.availability} · 30 minutes</span></div></div><button className="primary-button modal-cta" onClick={() => { setSelectedSession(null); setShowJoin(true); }}>Request a swap <ArrowRight size={16} /></button></div></div>}

      {showJoin && <div className="modal-backdrop" onClick={() => setShowJoin(false)}><div className="join-modal" onClick={(event) => event.stopPropagation()}><button className="modal-close" onClick={() => setShowJoin(false)}><X size={18} /></button>{joined ? <div className="join-success"><div className="success-icon"><Check size={24} /></div><h3>You’re on the list.</h3><p>We’ll keep a spot warm for your first useful 30 minutes.</p><button className="primary-button modal-cta" onClick={() => setShowJoin(false)}>Back to exploring <ArrowRight size={16} /></button></div> : <><div className="modal-overline">JOIN THE SWAP</div><h3>Bring one thing<br /><em>you know.</em></h3><p className="join-copy">Get matched with people who can help you move a specific idea forward.</p><label>Email address<input type="email" placeholder="you@example.com" /></label><label>Your focus<select defaultValue=""><option value="" disabled>Choose one</option><option>Design & product</option><option>Code & data</option><option>Career & communication</option></select></label><button className="primary-button modal-cta" onClick={() => setJoined(true)}>Create my profile <ArrowRight size={16} /></button><span className="fine-print">Free to join · No spam · Good conversations only</span></>}</div></div>}
    </main>
  );
}

function ArrowUpRightIcon() {
  return <ArrowUpRight size={15} />;
}

export default Home;
