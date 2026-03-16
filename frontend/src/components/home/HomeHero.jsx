import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { heroSlides, serviceChips } from '../../data/homeData'
import WaIcon from './WaIcon'
import { waLink } from './homeUtils'

const WebsiteIllustration = () => (
  <svg viewBox="0 0 340 252" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full max-w-[420px]">
    <rect width="340" height="236" rx="12" fill="#18181b" stroke="#3f3f46" strokeWidth="1.5"/>
    <rect width="340" height="32" rx="12" fill="#27272a"/>
    <rect y="22" width="340" height="10" fill="#27272a"/>
    <circle cx="20" cy="16" r="4" fill="#ef4444" fillOpacity="0.7"/>
    <circle cx="34" cy="16" r="4" fill="#eab308" fillOpacity="0.7"/>
    <circle cx="48" cy="16" r="4" fill="#22c55e" fillOpacity="0.7"/>
    <rect x="100" y="10" width="140" height="12" rx="6" fill="#3f3f46"/>
    <rect x="108" y="14" width="60" height="4" rx="2" fill="#52525b"/>
    <rect x="12" y="40" width="316" height="22" rx="3" fill="#27272a"/>
    <rect x="20" y="46" width="32" height="10" rx="2" fill="#10b981" fillOpacity="0.9"/>
    <rect x="196" y="48" width="18" height="6" rx="1" fill="#52525b"/>
    <rect x="220" y="48" width="18" height="6" rx="1" fill="#52525b"/>
    <rect x="244" y="48" width="18" height="6" rx="1" fill="#52525b"/>
    <rect x="274" y="45" width="52" height="12" rx="6" fill="#10b981"/>
    <rect x="12" y="70" width="316" height="66" rx="4" fill="#10b981" fillOpacity="0.09" stroke="#10b981" strokeOpacity="0.2" strokeWidth="0.8"/>
    <rect x="28" y="82" width="130" height="9" rx="2" fill="#f4f4f5" fillOpacity="0.9"/>
    <rect x="28" y="96" width="90" height="6" rx="2" fill="#71717a"/>
    <rect x="28" y="109" width="68" height="18" rx="9" fill="#10b981"/>
    <rect x="104" y="109" width="56" height="18" rx="9" fill="none" stroke="#3f3f46" strokeWidth="1.5"/>
    <rect x="12" y="146" width="97" height="74" rx="6" fill="#27272a" stroke="#3f3f46" strokeWidth="1"/>
    <rect x="22" y="156" width="20" height="18" rx="4" fill="#10b981" fillOpacity="0.25"/>
    <rect x="22" y="180" width="58" height="5" rx="1" fill="#a1a1aa"/>
    <rect x="22" y="189" width="72" height="4" rx="1" fill="#3f3f46"/>
    <rect x="22" y="197" width="56" height="4" rx="1" fill="#3f3f46"/>
    <rect x="121" y="146" width="97" height="74" rx="6" fill="#27272a" stroke="#3f3f46" strokeWidth="1"/>
    <rect x="131" y="156" width="20" height="18" rx="4" fill="#6366f1" fillOpacity="0.25"/>
    <rect x="131" y="180" width="58" height="5" rx="1" fill="#a1a1aa"/>
    <rect x="131" y="189" width="72" height="4" rx="1" fill="#3f3f46"/>
    <rect x="131" y="197" width="56" height="4" rx="1" fill="#3f3f46"/>
    <rect x="230" y="146" width="97" height="74" rx="6" fill="#27272a" stroke="#3f3f46" strokeWidth="1"/>
    <rect x="240" y="156" width="20" height="18" rx="4" fill="#f59e0b" fillOpacity="0.25"/>
    <rect x="240" y="180" width="58" height="5" rx="1" fill="#a1a1aa"/>
    <rect x="240" y="189" width="72" height="4" rx="1" fill="#3f3f46"/>
    <rect x="240" y="197" width="56" height="4" rx="1" fill="#3f3f46"/>
    <rect x="-6" y="236" width="352" height="14" rx="3" fill="#27272a" stroke="#3f3f46" strokeWidth="1"/>
    <rect x="130" y="236" width="80" height="8" fill="#3f3f46"/>
  </svg>
)

const KRAIllustration = () => (
  <svg viewBox="0 0 320 252" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full max-w-[380px]">
    <rect x="38" y="24" width="172" height="216" rx="8" fill="#1a1a1e" stroke="#3f3f46" strokeWidth="1"/>
    <rect x="58" y="10" width="200" height="230" rx="8" fill="#27272a" stroke="#3f3f46" strokeWidth="1.5"/>
    <rect x="58" y="10" width="200" height="44" rx="8" fill="#10b981" fillOpacity="0.14"/>
    <rect x="58" y="40" width="200" height="14" fill="#10b981" fillOpacity="0.14"/>
    <rect x="74" y="17" width="30" height="30" rx="5" fill="#10b981" fillOpacity="0.18" stroke="#10b981" strokeOpacity="0.3" strokeWidth="1"/>
    <circle cx="89" cy="32" r="9" fill="#10b981" fillOpacity="0.35"/>
    <circle cx="89" cy="32" r="5" fill="#10b981" fillOpacity="0.6"/>
    <rect x="116" y="19" width="100" height="8" rx="2" fill="#f4f4f5" fillOpacity="0.9"/>
    <rect x="126" y="31" width="80" height="6" rx="2" fill="#71717a"/>
    <rect x="74" y="64" width="48" height="5" rx="1" fill="#52525b"/>
    <rect x="74" y="73" width="156" height="5" rx="1" fill="#3f3f46"/>
    <rect x="74" y="90" width="48" height="5" rx="1" fill="#52525b"/>
    <rect x="74" y="99" width="136" height="5" rx="1" fill="#3f3f46"/>
    <rect x="74" y="116" width="48" height="5" rx="1" fill="#52525b"/>
    <rect x="74" y="125" width="116" height="5" rx="1" fill="#3f3f46"/>
    <rect x="74" y="142" width="48" height="5" rx="1" fill="#52525b"/>
    <rect x="74" y="151" width="156" height="5" rx="1" fill="#3f3f46"/>
    <rect x="74" y="168" width="164" height="1" fill="#3f3f46"/>
    <rect x="74" y="180" width="68" height="1.5" fill="#52525b"/>
    <rect x="74" y="186" width="50" height="4" rx="1" fill="#3f3f46"/>
    <circle cx="220" cy="190" r="28" fill="#10b981" fillOpacity="0.06" stroke="#10b981" strokeOpacity="0.35" strokeWidth="1.5" strokeDasharray="4 3"/>
    <circle cx="220" cy="190" r="20" fill="none" stroke="#10b981" strokeOpacity="0.2" strokeWidth="1"/>
    <path d="M210 190 L217 197 L231 177" stroke="#10b981" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M224 10 L258 10 L258 44 Z" fill="#3f3f46" fillOpacity="0.8"/>
    <path d="M224 10 L258 44" stroke="#52525b" strokeWidth="1"/>
  </svg>
)

const NetworkIllustration = () => (
  <svg viewBox="0 0 340 252" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full max-w-[420px]">
    <rect x="128" y="96" width="84" height="54" rx="8" fill="#27272a" stroke="#10b981" strokeWidth="1.5"/>
    <rect x="140" y="107" width="60" height="6" rx="2" fill="#10b981" fillOpacity="0.6"/>
    <circle cx="146" cy="124" r="4" fill="#10b981"/>
    <circle cx="159" cy="124" r="4" fill="#10b981" fillOpacity="0.4"/>
    <circle cx="172" cy="124" r="4" fill="#10b981" fillOpacity="0.2"/>
    <rect x="140" y="135" width="60" height="4" rx="1" fill="#3f3f46"/>
    <path d="M159 56 Q170 42 181 56" stroke="#10b981" strokeWidth="2.2" strokeLinecap="round" fill="none"/>
    <path d="M153 62 Q170 42 187 62" stroke="#10b981" strokeWidth="1.5" strokeLinecap="round" fill="none" strokeOpacity="0.45"/>
    <path d="M147 68 Q170 42 193 68" stroke="#10b981" strokeWidth="1" strokeLinecap="round" fill="none" strokeOpacity="0.2"/>
    <circle cx="170" cy="58" r="3" fill="#10b981"/>
    <line x1="170" y1="61" x2="170" y2="96" stroke="#10b981" strokeWidth="1.5" strokeOpacity="0.3" strokeDasharray="4 3"/>
    <rect x="14" y="16" width="84" height="62" rx="7" fill="#27272a" stroke="#3f3f46" strokeWidth="1.5"/>
    <rect x="22" y="26" width="68" height="44" rx="4" fill="#18181b"/>
    <rect x="22" y="26" width="68" height="12" rx="4" fill="#1f2937"/>
    <rect x="34" y="30" width="36" height="4" rx="1" fill="#374151"/>
    <rect x="26" y="44" width="60" height="4" rx="1" fill="#374151"/>
    <rect x="26" y="52" width="48" height="4" rx="1" fill="#374151"/>
    <rect x="26" y="60" width="38" height="4" rx="1" fill="#10b981" fillOpacity="0.5"/>
    <rect x="4" y="78" width="104" height="8" rx="3" fill="#3f3f46"/>
    <rect x="36" y="78" width="40" height="4" fill="#27272a"/>
    <line x1="88" y1="50" x2="128" y2="114" stroke="#10b981" strokeWidth="1.5" strokeOpacity="0.3" strokeDasharray="6 4"/>
    <rect x="20" y="164" width="50" height="82" rx="11" fill="#27272a" stroke="#3f3f46" strokeWidth="1.5"/>
    <rect x="27" y="175" width="36" height="60" rx="4" fill="#18181b"/>
    <rect x="27" y="175" width="36" height="14" rx="4" fill="#10b981" fillOpacity="0.2"/>
    <rect x="30" y="178" width="22" height="5" rx="1" fill="#10b981" fillOpacity="0.6"/>
    <rect x="30" y="196" width="30" height="4" rx="1" fill="#374151"/>
    <rect x="30" y="204" width="22" height="4" rx="1" fill="#374151"/>
    <rect x="30" y="212" width="26" height="4" rx="1" fill="#374151"/>
    <circle cx="45" cy="240" r="4" fill="#3f3f46" stroke="#52525b" strokeWidth="1"/>
    <line x1="62" y1="192" x2="128" y2="148" stroke="#10b981" strokeWidth="1.5" strokeOpacity="0.3" strokeDasharray="6 4"/>
    <rect x="228" y="14" width="90" height="56" rx="7" fill="#27272a" stroke="#3f3f46" strokeWidth="1.5"/>
    <rect x="244" y="24" width="58" height="36" rx="4" fill="#18181b"/>
    <circle cx="262" cy="42" r="15" fill="#1a1a1e" stroke="#374151" strokeWidth="1"/>
    <circle cx="262" cy="42" r="9" fill="#111" stroke="#374151" strokeWidth="1"/>
    <circle cx="262" cy="42" r="4" fill="#10b981" fillOpacity="0.4"/>
    <circle cx="262" cy="42" r="2" fill="#10b981" fillOpacity="0.8"/>
    <rect x="276" y="30" width="18" height="10" rx="3" fill="#374151"/>
    <line x1="228" y1="44" x2="212" y2="114" stroke="#10b981" strokeWidth="1.5" strokeOpacity="0.3" strokeDasharray="6 4"/>
    <rect x="240" y="160" width="84" height="64" rx="7" fill="#27272a" stroke="#3f3f46" strokeWidth="1.5"/>
    <rect x="248" y="170" width="68" height="9" rx="2" fill="#18181b"/>
    <rect x="248" y="184" width="68" height="6" rx="1" fill="#374151"/>
    <rect x="256" y="198" width="52" height="18" rx="3" fill="#18181b"/>
    <rect x="256" y="198" width="52" height="5" rx="1" fill="#10b981" fillOpacity="0.2"/>
    <circle cx="274" cy="176" r="3" fill="#10b981" fillOpacity="0.7"/>
    <circle cx="286" cy="176" r="3" fill="#3f3f46"/>
    <line x1="240" y1="180" x2="212" y2="148" stroke="#10b981" strokeWidth="1.5" strokeOpacity="0.3" strokeDasharray="6 4"/>
  </svg>
)

const DocumentsIllustration = () => (
  <svg viewBox="0 0 320 252" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full max-w-[380px]">
    <rect x="22" y="32" width="170" height="210" rx="8" fill="#18181b" stroke="#3f3f46" strokeWidth="1"/>
    <rect x="40" y="18" width="170" height="210" rx="8" fill="#1f1f23" stroke="#3f3f46" strokeWidth="1"/>
    <rect x="58" y="6" width="170" height="210" rx="8" fill="#27272a" stroke="#3f3f46" strokeWidth="1.5"/>
    <rect x="58" y="6" width="170" height="38" rx="8" fill="#10b981" fillOpacity="0.12"/>
    <rect x="58" y="34" width="170" height="10" fill="#10b981" fillOpacity="0.12"/>
    <rect x="74" y="14" width="86" height="8" rx="2" fill="#f4f4f5" fillOpacity="0.85"/>
    <rect x="74" y="26" width="60" height="5" rx="1" fill="#52525b"/>
    <rect x="74" y="56" width="42" height="4" rx="1" fill="#52525b"/>
    <rect x="74" y="64" width="138" height="4" rx="1" fill="#3f3f46"/>
    <rect x="74" y="72" width="112" height="4" rx="1" fill="#3f3f46"/>
    <rect x="74" y="88" width="42" height="4" rx="1" fill="#52525b"/>
    <rect x="74" y="96" width="138" height="4" rx="1" fill="#3f3f46"/>
    <rect x="74" y="104" width="92" height="4" rx="1" fill="#3f3f46"/>
    <rect x="74" y="120" width="42" height="4" rx="1" fill="#52525b"/>
    <rect x="74" y="128" width="138" height="4" rx="1" fill="#3f3f46"/>
    <rect x="74" y="136" width="118" height="4" rx="1" fill="#3f3f46"/>
    <rect x="74" y="152" width="42" height="4" rx="1" fill="#52525b"/>
    <rect x="74" y="160" width="138" height="4" rx="1" fill="#3f3f46"/>
    <rect x="74" y="174" width="64" height="1" fill="#52525b"/>
    <rect x="74" y="180" width="46" height="4" rx="1" fill="#3f3f46"/>
    <circle cx="190" cy="178" r="26" fill="#10b981" fillOpacity="0.06" stroke="#10b981" strokeOpacity="0.35" strokeWidth="1.5" strokeDasharray="4 3"/>
    <circle cx="190" cy="178" r="18" fill="none" stroke="#10b981" strokeOpacity="0.2" strokeWidth="1"/>
    <path d="M181 178 L188 185 L202 170" stroke="#10b981" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
    <g transform="rotate(-32 248 130)">
      <rect x="238" y="68" width="14" height="92" rx="4" fill="#1d4ed8" fillOpacity="0.85" stroke="#3b82f6" strokeOpacity="0.5" strokeWidth="0.8"/>
      <rect x="238" y="68" width="14" height="16" rx="4" fill="#93c5fd" fillOpacity="0.9"/>
      <polygon points="238,160 252,160 245,176" fill="#e2e8f0" fillOpacity="0.9"/>
    </g>
    <path d="M194 6 L228 6 L228 40 Z" fill="#3f3f46" fillOpacity="0.85"/>
    <path d="M194 6 L228 40" stroke="#52525b" strokeWidth="1"/>
  </svg>
)

const ERPIllustration = () => (
  <svg viewBox="0 0 340 252" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full max-w-[420px]">
    <rect x="8" y="8" width="324" height="210" rx="10" fill="#18181b" stroke="#3f3f46" strokeWidth="1.5"/>
    <rect x="18" y="18" width="304" height="192" rx="6" fill="#0e0e10"/>
    <rect x="18" y="18" width="54" height="192" rx="6" fill="#18181b" stroke="#27272a" strokeWidth="1"/>
    <rect x="26" y="30" width="38" height="8" rx="2" fill="#10b981" fillOpacity="0.8"/>
    <rect x="26" y="48" width="38" height="5" rx="1" fill="#3f3f46"/>
    <rect x="26" y="60" width="38" height="5" rx="1" fill="#3f3f46"/>
    <rect x="26" y="72" width="38" height="5" rx="1" fill="#3f3f46"/>
    <rect x="26" y="84" width="38" height="5" rx="1" fill="#3f3f46"/>
    <rect x="26" y="96" width="38" height="5" rx="1" fill="#3f3f46"/>
    <rect x="26" y="108" width="38" height="5" rx="1" fill="#10b981" fillOpacity="0.35"/>
    <rect x="26" y="120" width="38" height="5" rx="1" fill="#3f3f46"/>
    <rect x="80" y="20" width="74" height="44" rx="4" fill="#1e1e22" stroke="#2a2a30" strokeWidth="1"/>
    <rect x="88" y="28" width="36" height="5" rx="1" fill="#52525b"/>
    <rect x="88" y="38" width="52" height="11" rx="2" fill="#10b981" fillOpacity="0.85"/>
    <rect x="88" y="54" width="42" height="4" rx="1" fill="#22c55e" fillOpacity="0.5"/>
    <rect x="162" y="20" width="74" height="44" rx="4" fill="#1e1e22" stroke="#2a2a30" strokeWidth="1"/>
    <rect x="170" y="28" width="36" height="5" rx="1" fill="#52525b"/>
    <rect x="170" y="38" width="52" height="11" rx="2" fill="#6366f1" fillOpacity="0.85"/>
    <rect x="170" y="54" width="42" height="4" rx="1" fill="#f59e0b" fillOpacity="0.5"/>
    <rect x="244" y="20" width="70" height="44" rx="4" fill="#1e1e22" stroke="#2a2a30" strokeWidth="1"/>
    <rect x="252" y="28" width="36" height="5" rx="1" fill="#52525b"/>
    <rect x="252" y="38" width="52" height="11" rx="2" fill="#f59e0b" fillOpacity="0.85"/>
    <rect x="252" y="54" width="42" height="4" rx="1" fill="#ef4444" fillOpacity="0.5"/>
    <rect x="80" y="72" width="150" height="100" rx="5" fill="#151518" stroke="#27272a" strokeWidth="1"/>
    <rect x="88" y="80" width="52" height="5" rx="1" fill="#a1a1aa"/>
    <rect x="92" y="152" width="14" height="12" rx="2" fill="#10b981" fillOpacity="0.7"/>
    <rect x="112" y="136" width="14" height="28" rx="2" fill="#10b981" fillOpacity="0.75"/>
    <rect x="132" y="144" width="14" height="20" rx="2" fill="#10b981" fillOpacity="0.6"/>
    <rect x="152" y="132" width="14" height="32" rx="2" fill="#10b981" fillOpacity="0.8"/>
    <rect x="172" y="138" width="14" height="26" rx="2" fill="#6366f1" fillOpacity="0.65"/>
    <rect x="192" y="126" width="14" height="38" rx="2" fill="#6366f1" fillOpacity="0.75"/>
    <rect x="80" y="164" width="1" height="8" fill="#27272a"/>
    <rect x="80" y="164" width="150" height="1" fill="#27272a"/>
    <rect x="238" y="72" width="84" height="100" rx="5" fill="#151518" stroke="#27272a" strokeWidth="1"/>
    <rect x="246" y="80" width="44" height="5" rx="1" fill="#a1a1aa"/>
    <polyline points="246,158 261,138 274,146 287,122 300,112 314,118" stroke="#10b981" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
    <polyline points="246,158 261,138 274,146 287,122 300,112 314,118" stroke="#10b981" strokeWidth="8" fill="none" strokeOpacity="0.08" strokeLinecap="round"/>
    <circle cx="314" cy="118" r="3" fill="#10b981"/>
    <rect x="80" y="180" width="242" height="24" rx="4" fill="#151518" stroke="#27272a" strokeWidth="1"/>
    <rect x="88" y="188" width="44" height="4" rx="1" fill="#52525b"/>
    <rect x="140" y="188" width="64" height="4" rx="1" fill="#3f3f46"/>
    <rect x="212" y="188" width="44" height="4" rx="1" fill="#10b981" fillOpacity="0.5"/>
    <rect x="88" y="196" width="44" height="4" rx="1" fill="#3f3f46"/>
    <rect x="140" y="196" width="64" height="4" rx="1" fill="#3f3f46"/>
    <rect x="212" y="196" width="44" height="4" rx="1" fill="#3f3f46"/>
    <rect x="148" y="218" width="44" height="10" rx="3" fill="#27272a" stroke="#3f3f46" strokeWidth="1"/>
    <rect x="126" y="226" width="88" height="8" rx="4" fill="#27272a" stroke="#3f3f46" strokeWidth="1"/>
  </svg>
)

const ChatIllustration = () => (
  <svg viewBox="0 0 280 252" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full max-w-[320px]">
    <rect x="70" y="4" width="140" height="244" rx="24" fill="#18181b" stroke="#3f3f46" strokeWidth="2"/>
    <rect x="78" y="14" width="124" height="224" rx="18" fill="#0f0f10"/>
    <rect x="108" y="14" width="64" height="12" rx="6" fill="#18181b"/>
    <circle cx="140" cy="20" r="3" fill="#27272a"/>
    <rect x="78" y="26" width="124" height="46" rx="4" fill="#059669"/>
    <circle cx="100" cy="49" r="14" fill="#047857"/>
    <circle cx="100" cy="49" r="9" fill="#065f46"/>
    <rect x="120" y="40" width="62" height="7" rx="2" fill="white" fillOpacity="0.9"/>
    <rect x="120" y="52" width="46" height="5" rx="1" fill="white" fillOpacity="0.5"/>
    <circle cx="188" cy="42" r="3" fill="white" fillOpacity="0.6"/>
    <circle cx="198" cy="42" r="3" fill="white" fillOpacity="0.6"/>
    <rect x="84" y="80" width="92" height="30" rx="8" fill="#27272a"/>
    <rect x="91" y="88" width="76" height="5" rx="1" fill="#a1a1aa"/>
    <rect x="91" y="97" width="56" height="4" rx="1" fill="#52525b"/>
    <path d="M84 90 L77 84 L84 96 Z" fill="#27272a"/>
    <rect x="104" y="118" width="92" height="30" rx="8" fill="#10b981" fillOpacity="0.85"/>
    <rect x="111" y="126" width="76" height="5" rx="1" fill="white" fillOpacity="0.85"/>
    <rect x="111" y="135" width="56" height="4" rx="1" fill="white" fillOpacity="0.5"/>
    <path d="M196 126 L203 120 L196 132 Z" fill="#10b981" fillOpacity="0.85"/>
    <rect x="84" y="156" width="104" height="38" rx="8" fill="#27272a"/>
    <rect x="91" y="164" width="88" height="5" rx="1" fill="#a1a1aa"/>
    <rect x="91" y="173" width="70" height="4" rx="1" fill="#52525b"/>
    <rect x="91" y="181" width="80" height="4" rx="1" fill="#52525b"/>
    <path d="M84 164 L77 158 L84 170 Z" fill="#27272a"/>
    <rect x="84" y="202" width="58" height="22" rx="11" fill="#27272a"/>
    <circle cx="100" cy="213" r="3.5" fill="#52525b"/>
    <circle cx="113" cy="213" r="3.5" fill="#52525b" fillOpacity="0.55"/>
    <circle cx="126" cy="213" r="3.5" fill="#52525b" fillOpacity="0.25"/>
    <rect x="78" y="228" width="124" height="16" rx="4" fill="#1a1a1e" stroke="#27272a" strokeWidth="1"/>
    <rect x="84" y="234" width="82" height="4" rx="1" fill="#3f3f46"/>
    <circle cx="194" cy="236" r="6" fill="#10b981" fillOpacity="0.8"/>
    <rect x="115" y="248" width="50" height="4" rx="2" fill="#27272a"/>
  </svg>
)

export default function HomeHero() {
  const [slide, setSlide] = useState(0)
  const [visible, setVisible] = useState(true)

  useEffect(() => {
    const interval = setInterval(() => {
      setVisible(false)
      setTimeout(() => {
        setSlide((prev) => (prev + 1) % heroSlides.length)
        setVisible(true)
      }, 250)
    }, 5000)
    return () => clearInterval(interval)
  }, [])

  const current = heroSlides[slide]
  const heroIllustrations = [
    WebsiteIllustration,
    KRAIllustration,
    NetworkIllustration,
    DocumentsIllustration,
    ERPIllustration,
    ChatIllustration,
  ]
  const CurrentIllustration = heroIllustrations[slide] || WebsiteIllustration

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-zinc-200 via-zinc-100/80 to-zinc-50">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(15,23,42,0.12),transparent_46%)] pointer-events-none" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,rgba(59,130,246,0.14),transparent_44%)] pointer-events-none" />
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center py-20 lg:py-24">
          <div className={`transition-all duration-500 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'}`}>
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-zinc-900 leading-tight">
              {current.headline}
            </h1>
            <p className="text-zinc-600 text-base mt-3 max-w-md">{current.sub}</p>
            <p className="text-zinc-400 text-xs mt-3">Last project delivered: 12 March 2026</p>
            <div className="flex flex-wrap gap-3 mt-6">
              <a
                href={waLink('Hi, I have an enquiry')}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 bg-green-500 hover:bg-green-600 text-white font-semibold px-6 py-3 rounded-xl transition-colors"
              >
                <WaIcon /> Chat on WhatsApp
              </a>
              <Link
                to="/services"
                className="border border-zinc-300 text-zinc-700 hover:border-zinc-500 hover:text-zinc-900 font-medium px-6 py-3 rounded-xl transition-colors"
              >
                See all services
              </Link>
            </div>
            <div className="flex flex-wrap gap-2 mt-5">
              {serviceChips.map((cat) => (
                <Link
                  key={cat}
                  to="/services"
                  state={{ category: cat }}
                  className="text-xs text-zinc-500 hover:text-zinc-900 bg-zinc-50 hover:bg-zinc-100 border border-zinc-200 hover:border-zinc-300 px-3 py-1.5 rounded-full transition-all"
                >
                  {cat}
                </Link>
              ))}
            </div>
            <div className="flex gap-1.5 mt-7">
              {heroSlides.map((_, i) => (
                <button
                  key={i}
                  onClick={() => {
                    setSlide(i)
                    setVisible(true)
                  }}
                  className={`h-0.5 rounded-full transition-all duration-300 ${i === slide ? 'w-6 bg-zinc-900' : 'w-2 bg-zinc-300 hover:bg-zinc-500'}`}
                  aria-label={`Slide ${i + 1}`}
                />
              ))}
            </div>
          </div>
          <div className={`hidden lg:flex justify-center items-center transition-all duration-500 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'}`}>
            <CurrentIllustration />
          </div>
        </div>
      </div>
      <div className="border-t border-zinc-200 bg-zinc-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex gap-8">
          <div><p className="text-zinc-900 font-semibold text-sm">KRA PIN</p><p className="text-zinc-500 text-xs">Same day · KES 500</p></div>
          <div><p className="text-zinc-900 font-semibold text-sm">Business Website</p><p className="text-zinc-500 text-xs">7–10 days · from KES 18,000</p></div>
          <div className="hidden sm:block"><p className="text-zinc-900 font-semibold text-sm">Car Agreement</p><p className="text-zinc-500 text-xs">Same day · KES 800</p></div>
        </div>
      </div>
    </section>
  )
}
