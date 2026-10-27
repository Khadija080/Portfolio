"use client";
import { useState, useEffect } from "react";

export default function Home() {
  const [t, setT] = useState("");
  const [say, setSay] = useState("Click on me! ✨");
  const [isTalking, setIsTalking] = useState(false);
  const [femaleVoice, setFemaleVoice] = useState<SpeechSynthesisVoice | null>(null);
  const [form, setForm] = useState({name:"", email:"", msg:""});

  const fullIntro = "Welcome to My Portfolio! ✨ I'm glad you're here!";

  useEffect(() => {
    let i=0;
    const id = setInterval(()=>{ if(i<fullIntro.length){ setT(fullIntro.slice(0,i+1)); i++; } else clearInterval(id); }, 35);
    return ()=> clearInterval(id);
  }, []);

  useEffect(() => {
    const loadVoices = () => {
      const voices = window.speechSynthesis.getVoices();
      const girl = voices.find(v => v.name.includes("Female") || v.name.includes("Zira") || v.name.includes("Google UK English Female") || v.name.toLowerCase().includes("female")) || voices.find(v=>v.name.includes("Google")) || voices[0];
      if (girl) setFemaleVoice(girl);
    };
    loadVoices();
    window.speechSynthesis.onvoiceschanged = loadVoices;
  }, []);

  const speak = (msg: string) => {
    setSay(msg); setIsTalking(true);
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const utter = new SpeechSynthesisUtterance(msg);
      if (femaleVoice) utter.voice = femaleVoice;
      utter.rate = 0.85; utter.pitch = 1.6; utter.volume = 1;
      window.speechSynthesis.speak(utter);
      utter.onend = () => setIsTalking(false);
    }
  };

  const handleAnimeClick = () => speak("Welcome to My Portfolio! I'm glad you're here! I'm Khadija Rasheed, Web Developer, Creative Website Designer!");

  const handleSend = () => {
    if(!form.name || !form.email || !form.msg){
      alert("Please fill all fields - Name, Email and Message!");
      return;
    }
    const subject = encodeURIComponent(`New Project Inquiry from ${form.name}`);
    const body = encodeURIComponent(`Hello Khadija,\n\nYou have a new message from your portfolio:\n\nName: ${form.name}\nEmail: ${form.email}\n\nMessage:\n${form.msg}\n\n---\nSent from KR.dev Portfolio`);
    window.location.href = `mailto:cslover2006@gmail.com?subject=${subject}&body=${body}`;
    alert(`Thank you ${form.name}! Your email app will open - just press Send and I will receive it at cslover2006@gmail.com`);
    setForm({name:"", email:"", msg:""});
  };

  return (
    <div className="min-h-screen bg-[#020617] text-white selection:bg-blue-600">
      <nav className="sticky top-0 z-50 flex justify-between items-center px-6 md:px-10 py-5 bg-[#020617]/80 backdrop-blur border-b border-blue-900/20">
        <b className="text-blue-400 text-xl">KR.dev</b>
        <div className="hidden md:flex gap-6 text-sm text-gray-400">
          <a href="#about" className="hover:text-white">About</a>
          <a href="#skills" className="hover:text-white">Skills</a>
          <a href="#projects" className="hover:text-white">Projects</a>
          <a href="#contact" className="hover:text-white">Contact</a>
        </div>
      </nav>

      <section className="flex flex-col md:flex-row items-center px-6 md:px-10 py-16 gap-10">
        <div className="md:w-1/2">
          <div className="bg-[#0f172a] border border-blue-500/30 p-4 rounded-xl font-mono text-sm text-cyan-300 min-h-[60px] shadow-[0_0_20px_rgba(56,189,248,0.15)]">
            {">"} {t}<span className="animate-pulse">|</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-black mt-8 leading-tight">Looking for a beautiful and <span className="text-blue-500">professional website</span>?</h1>
          <p className="text-blue-300 font-bold mt-2">You're in the right place. ✨</p>
          <div className="mt-8 bg-[#0f172a] p-6 rounded-2xl border border-blue-900/30">
            <h2 className="text-2xl font-bold">Hi, I'm <span className="text-blue-400">Khadija Rasheed</span></h2>
            <p className="text-blue-300 text-sm font-mono mt-1">Web Developer | Creative Website Designer</p>
            <p className="text-gray-400 mt-4 leading-relaxed text-[15px]">Hello! I'm Khadija Rasheed, a passionate web developer who loves creating modern, attractive, and user-friendly websites. I work with HTML, CSS, and JavaScript to build websites that look great and work smoothly on different devices. My goal is to help businesses and individuals build their online presence with creative and professional websites.</p>
            <div className="flex gap-3 mt-6">
              <a href="#projects" className="bg-blue-600 hover:bg-blue-700 px-6 py-2.5 rounded-full text-sm font-bold">View My Work</a>
              <button onClick={handleAnimeClick} className="border border-blue-800 px-6 py-2.5 rounded-full text-sm hover:bg-[#1e293b]">✨ Girl Voice</button>
            </div>
          </div>
        </div>
        <div className="md:w-1/2 flex flex-col items-center">
          {say && (<div className="mb-4 bg-white text-black px-5 py-3 rounded-2xl rounded-br-none font-bold text-sm shadow-xl max-w-[320px] text-center animate-bounce">✨ {say}</div>)}
          <div className="relative cursor-pointer group" onClick={handleAnimeClick}>
            <div className={`absolute -inset-4 blur-2xl rounded-full transition-all ${isTalking ? 'bg-cyan-400/50 blur-3xl scale-110' : 'bg-blue-600/20 group-hover:bg-blue-500/30'}`}></div>
            <img src="/anime-girl.png" alt="anime" className={`relative w-[420px] rounded-2xl border border-blue-500/20 shadow-[0_0_60px_rgba(37,99,235,0.6)] transition-transform active:scale-95 ${isTalking ? 'scale-105 ring-4 ring-blue-400/50' : 'group-hover:scale-[1.02]'}`} />
            <p className="text-center text-xs text-blue-400 mt-3 animate-pulse">👆 Click me!</p>
          </div>
        </div>
      </section>

      <section id="about" className="px-6 md:px-10 py-16 bg-[#0f172a]/40 border-y border-blue-900/10">
        <h2 className="text-3xl font-bold mb-8"><span className="text-blue-500">#</span> About Me</h2>
        <div className="grid md:grid-cols-3 gap-6">
          <div className="bg-[#1e293b] p-6 rounded-2xl border border-blue-900/20">
            <h3 className="font-bold text-blue-300">Who I Am</h3>
            <p className="text-sm text-gray-400 mt-3 leading-relaxed">I'm a creative <span className="text-white font-bold">Front-End Developer</span> skilled in HTML, CSS, JavaScript, Tailwind CSS & Next.js. I specialize in creating modern, attractive, responsive and user-friendly websites that look perfect on all devices.</p>
          </div>
          <div className="bg-[#1e293b] p-6 rounded-2xl border border-blue-900/20">
            <h3 className="font-bold text-blue-300">What I Do</h3>
            <p className="text-sm text-gray-400 mt-3 leading-relaxed">I design and develop professional websites, landing pages and UI/UX designs. My focus is on clean code, beautiful design and smooth user experience to help your business grow online.</p>
          </div>
          <div className="bg-[#1e293b] p-6 rounded-2xl border border-blue-900/20">
            <h3 className="font-bold text-blue-300">My Goal</h3>
            <p className="text-sm text-gray-400 mt-3 leading-relaxed">To become a top professional web developer and provide high-quality, creative and affordable website solutions for clients worldwide.</p>
          </div>
        </div>
      </section>

      <section id="skills" className="px-6 md:px-10 py-16">
        <h2 className="text-3xl font-bold mb-8"><span className="text-blue-500">#</span> My Skills</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            {n:"HTML5", d:"95% - Structure"},
            {n:"CSS3", d:"90% - Styling"},
            {n:"JavaScript", d:"80% - Logic"},
            {n:"Next.js", d:"75% - Framework"},
            {n:"Tailwind CSS", d:"85% - Modern CSS"},
            {n:"Responsive Design", d:"90% - Mobile First"},
            {n:"UI/UX Design", d:"80% - Creative"},
            {n:"Web Design", d:"88% - Professional"},
          ].map(s=>(
            <div key={s.n} className="bg-[#0f172a] p-5 rounded-xl border border-blue-900/20 hover:border-blue-600/40 transition group">
              <p className="font-bold group-hover:text-blue-400">{s.n}</p><p className="text-xs text-gray-500 mt-1">{s.d}</p>
              <div className="mt-3 h-1 bg-[#1e293b] rounded"><div className="h-1 bg-blue-600 rounded" style={{width: s.d.split('%')[0]+'%'}}></div></div>
            </div>
          ))}
        </div>
      </section>

      <section id="projects" className="px-6 md:px-10 py-16 bg-[#0f172a]/40 border-y border-blue-900/10">
        <h2 className="text-3xl font-bold mb-8"><span className="text-blue-500">#</span> My Projects</h2>
        <div className="grid md:grid-cols-3 gap-6">
          <div className="bg-[#020617] p-5 rounded-2xl border border-blue-900/20 hover:border-blue-600/50 transition hover:scale-[1.02] group">
            <div className="h-44 bg-black rounded-xl mb-4 overflow-hidden border border-blue-900/20">
              <img src="/public.portfolio.png" alt="Business Portfolio" className="w-full h-full object-cover group-hover:scale-110 transition duration-500" />
            </div>
            <h3 className="font-bold text-lg">Business Portfolio</h3>
            <p className="text-sm text-gray-400 mt-2">Modern dark portfolio with anime and girl voice feature. Fully responsive.</p>
            <p className="text-xs text-blue-400 mt-3 font-mono">Next.js • Tailwind • TTS</p>
          </div>
          <div className="bg-[#020617] p-5 rounded-2xl border border-blue-900/20 hover:border-blue-600/50 transition hover:scale-[1.02] group">
            <div className="h-44 bg-black rounded-xl mb-4 overflow-hidden border border-blue-900/20">
              <img src="/public.shop.png" alt="E-Commerce UI" className="w-full h-full object-cover group-hover:scale-110 transition duration-500" />
            </div>
            <h3 className="font-bold text-lg">E-Commerce UI</h3>
            <p className="text-sm text-gray-400 mt-2">Clean and attractive product page design for online store.</p>
            <p className="text-xs text-blue-400 mt-3 font-mono">HTML • CSS • JS</p>
          </div>
          <div className="bg-[#020617] p-5 rounded-2xl border border-blue-900/20 hover:border-blue-600/50 transition hover:scale-[1.02] group">
            <div className="h-44 bg-black rounded-xl mb-4 overflow-hidden border border-blue-900/20">
              <img src="/public.landing.png" alt="Landing Page" className="w-full h-full object-cover group-hover:scale-110 transition duration-500" />
            </div>
            <h3 className="font-bold text-lg">Landing Page</h3>
            <p className="text-sm text-gray-400 mt-2">Responsive landing page for startups with modern animations.</p>
            <p className="text-xs text-blue-400 mt-3 font-mono">Responsive • Modern</p>
          </div>
        </div>
      </section>

      <section id="contact" className="px-6 md:px-10 py-16">
        <h2 className="text-3xl font-bold mb-8 text-center"><span className="text-blue-500">#</span> Contact Me</h2>
        <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-8">
          <div className="bg-[#0f172a] p-6 rounded-2xl border border-blue-900/20">
            <h3 className="font-bold text-lg">Let's Work Together!</h3><p className="text-sm text-gray-400 mt-2">Have a project in mind? Send me a message.</p>
            <div className="mt-6 space-y-3 text-sm"><p>📧 cslover2006@gmail.com</p><p>📞 0328 73 80 107</p><p>📍 Pakistan - Available Worldwide</p></div>
            <div className="mt-6 p-4 bg-blue-600/10 rounded-xl border border-blue-600/20"><p className="text-xs text-blue-300">I will reply within 24 hours! ✨</p></div>
          </div>
          <div className="bg-[#0f172a] p-6 rounded-2xl border border-blue-900/20">
            <input value={form.name} onChange={e=>setForm({...form, name:e.target.value})} placeholder="Your Name" className="w-full bg-[#020617] border border-blue-900/30 rounded-xl px-4 py-3 text-sm mb-3 outline-none focus:border-blue-600 text-white" />
            <input value={form.email} onChange={e=>setForm({...form, email:e.target.value})} placeholder="Your Email" className="w-full bg-[#020617] border border-blue-900/30 rounded-xl px-4 py-3 text-sm mb-3 outline-none focus:border-blue-600 text-white" />
            <textarea value={form.msg} onChange={e=>setForm({...form, msg:e.target.value})} placeholder="Your Message" rows={4} className="w-full bg-[#020617] border border-blue-900/30 rounded-xl px-4 py-3 text-sm mb-4 outline-none focus:border-blue-600 text-white"></textarea>
            <button onClick={handleSend} className="w-full bg-blue-600 hover:bg-blue-700 py-3 rounded-xl font-bold text-sm transition">Send Message ✨</button>
            <p className="text-[11px] text-gray-500 mt-3 text-center">Clicking will open your email app to send to cslover2006@gmail.com</p>
          </div>
        </div>
        <p className="text-center text-xs text-gray-600 mt-16">© 2026 Khadija Rasheed - Web Developer | Built with Next.js & Love</p>
      </section>
    </div>
  );
}