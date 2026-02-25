/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  ChevronLeft, 
  ChevronRight, 
  HeartPulse, 
  Scale, 
  Stethoscope, 
  Brain, 
  Users, 
  Film, 
  ShieldAlert, 
  Baby, 
  Globe, 
  FileText,
  Microscope,
  HandHelping,
  CheckCircle2,
  Play,
  Home as HomeIcon
} from 'lucide-react';
import { generateHomeImage } from './services/imageService';

// --- Types ---

interface Slide {
  id: number;
  title: string;
  subtitle?: string;
  content: React.ReactNode;
  icon?: React.ReactNode;
}

// --- Components ---

const BubbleBackground = React.memo(() => {
  const bubbles = useMemo(() => Array.from({ length: 20 }).map((_, i) => ({
    id: i,
    size: Math.random() * 40 + 10,
    left: Math.random() * 100,
    duration: Math.random() * 15 + 15,
    delay: Math.random() * 20,
  })), []);

  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
      {bubbles.map((bubble) => (
        <div
          key={bubble.id}
          className="bubble"
          style={{
            width: `${bubble.size}px`,
            height: `${bubble.size}px`,
            left: `${bubble.left}%`,
            animation: `float ${bubble.duration}s linear infinite`,
            animationDelay: `${bubble.delay}s`,
            willChange: 'transform, opacity'
          }}
        />
      ))}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-ocean-deep/30 to-ocean-deep pointer-events-none" />
    </div>
  );
});

const WelcomeScreen = ({ onStart }: { onStart: () => void }) => {
  const [homeImage, setHomeImage] = useState<string | null>(null);

  useEffect(() => {
    generateHomeImage().then(setHomeImage);
  }, []);

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="relative w-full h-screen flex flex-col items-center justify-center overflow-hidden bg-ocean-deep"
    >
      <BubbleBackground />
      
      <div className="relative z-10 max-w-6xl w-full px-6 flex flex-col md:flex-row items-center gap-12">
        <motion.div 
          initial={{ x: -50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="flex-1 space-y-8 text-center md:text-left"
        >
          <div className="space-y-2">
            <motion.span 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="text-ocean-accent font-mono text-sm tracking-[0.3em] uppercase"
            >
              Apresentação Acadêmica
            </motion.span>
            <h1 className="text-7xl md:text-8xl font-serif italic text-white drop-shadow-2xl">
              Saúde & <br />
              <span className="text-ocean-accent">Cidadania</span>
            </h1>
          </div>
          
          <p className="text-xl text-slate-300 font-light leading-relaxed max-w-xl">
            Uma exploração profunda sobre os direitos fundamentais, o papel do Estado e os desafios da saúde mental na contemporaneidade.
          </p>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={onStart}
            className="group relative inline-flex items-center gap-4 px-8 py-4 bg-ocean-accent text-ocean-deep font-bold rounded-full overflow-hidden transition-all hover:shadow-[0_0_30px_rgba(100,255,218,0.4)]"
          >
            <span className="relative z-10">INICIAR APRESENTAÇÃO</span>
            <Play size={20} className="relative z-10 group-hover:translate-x-1 transition-transform" />
            <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-20 transition-opacity" />
          </motion.button>
        </motion.div>

        <motion.div 
          initial={{ x: 50, opacity: 0, scale: 0.9 }}
          animate={{ x: 0, opacity: 1, scale: 1 }}
          transition={{ delay: 0.4, type: "spring" }}
          className="flex-1 relative"
        >
          <div className="relative glass p-4 rounded-[2rem] overflow-hidden shadow-2xl border-ocean-accent/20">
            {homeImage ? (
              <img 
                src={homeImage} 
                alt="Mulher olhando para o aquário" 
                className="w-full h-auto rounded-2xl object-cover aspect-[16/9]"
                referrerPolicy="no-referrer"
              />
            ) : (
              <div className="w-full aspect-[16/9] bg-ocean-light animate-pulse rounded-2xl flex items-center justify-center">
                <div className="text-ocean-accent/30 flex flex-col items-center gap-4">
                  <div className="w-12 h-12 border-4 border-ocean-accent border-t-transparent rounded-full animate-spin" />
                  <span className="text-xs font-mono uppercase tracking-widest">Carregando Aquário...</span>
                </div>
              </div>
            )}
            {/* Floating "Pranchinha" element overlay */}
            <motion.div 
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              className="absolute -bottom-4 -right-4 glass p-4 rounded-2xl shadow-xl border border-ocean-accent/30 hidden md:block"
            >
              <FileText className="text-ocean-accent" size={32} />
            </motion.div>
          </div>
          
          {/* Decorative elements */}
          <div className="absolute -top-10 -left-10 w-32 h-32 bg-ocean-accent/10 blur-3xl rounded-full" />
          <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-ocean-accent/5 blur-3xl rounded-full" />
        </motion.div>
      </div>

      <div className="absolute bottom-8 text-slate-500 text-[10px] uppercase tracking-[0.5em] font-mono">
        Ana Bovi • Cecília B.P • 2026
      </div>
    </motion.div>
  );
};

const SlideWrapper = ({ children, direction, key }: { children: React.ReactNode; direction: number; key?: React.Key }) => {
  const variants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 1000 : -1000,
      opacity: 0,
      scale: 0.9,
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1,
      scale: 1,
    },
    exit: (direction: number) => ({
      zIndex: 0,
      x: direction < 0 ? 1000 : -1000,
      opacity: 0,
      scale: 0.9,
    }),
  };

  return (
    <motion.div
      custom={direction}
      variants={variants}
      initial="enter"
      animate="center"
      exit="exit"
      transition={{
        x: { type: "spring", stiffness: 300, damping: 30 },
        opacity: { duration: 0.4 },
        scale: { duration: 0.4 }
      }}
      className="absolute inset-0 flex items-center justify-center p-6 md:p-12"
    >
      {children}
    </motion.div>
  );
};

export default function App() {
  const [isHome, setIsHome] = useState(true);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [direction, setDirection] = useState(0);

  const slides: Slide[] = [
    {
      id: 0,
      title: "Saúde",
      subtitle: "Ana Bovi e Cecília B.P",
      content: (
        <div className="text-center space-y-8">
          <motion.div 
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 1 }}
            className="relative inline-block"
          >
            <h1 className="text-8xl md:text-9xl font-serif italic text-ocean-accent drop-shadow-[0_0_20px_rgba(100,255,218,0.3)]">
              Saúde
            </h1>
            <div className="absolute -top-12 -right-12 text-ocean-accent/20">
              <HeartPulse size={120} />
            </div>
          </motion.div>
          <p className="text-2xl font-light tracking-widest uppercase opacity-70">
            Ana Bovi e Cecília B.P
          </p>
        </div>
      ),
    },
    {
      id: 1,
      title: "O que é a saúde?",
      content: (
        <div className="max-w-4xl space-y-8 glass p-12 rounded-3xl">
          <h2 className="text-4xl font-display italic text-ocean-accent">Conceito da Organização Mundial da Saúde (OMS)</h2>
          <p className="text-3xl font-serif leading-relaxed">
            "Saúde é um estado de completo bem-estar físico, mental e social."
          </p>
          <ul className="space-y-4 text-xl opacity-80">
            <li className="flex items-center gap-3"><CheckCircle2 className="text-ocean-accent" /> Não é apenas ausência de doenças</li>
            <li className="flex items-center gap-3"><CheckCircle2 className="text-ocean-accent" /> Envolve qualidade de vida</li>
            <li className="flex items-center gap-3"><CheckCircle2 className="text-ocean-accent" /> Relaciona-se com fatores sociais</li>
          </ul>
        </div>
      ),
      icon: <Stethoscope />
    },
    {
      id: 2,
      title: "Direito Fundamental",
      content: (
        <div className="max-w-4xl space-y-8 glass p-12 rounded-3xl">
          <div className="space-y-2">
            <h3 className="text-ocean-accent font-mono uppercase tracking-tighter">Constituição Federal de 1988</h3>
            <h2 className="text-4xl font-display">Art. 196:</h2>
          </div>
          <p className="text-3xl font-serif italic border-l-4 border-ocean-accent pl-8 py-4">
            “A saúde é direito de todos e dever do Estado.”
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-8">
            <div className="space-y-4">
              <h4 className="font-bold text-ocean-accent uppercase text-sm">Contexto</h4>
              <p className="opacity-70">Após a Ditadura Militar, a Constituição ampliou direitos sociais.</p>
            </div>
            <div className="space-y-4">
              <h4 className="font-bold text-ocean-accent uppercase text-sm">Implicações</h4>
              <p className="opacity-70">O Estado é responsável por políticas públicas. A omissão governamental pode ser criticada.</p>
            </div>
          </div>
        </div>
      ),
      icon: <Scale />
    },
    {
      id: 3,
      title: "Sistema Único de Saúde",
      content: (
        <div className="max-w-5xl grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <h2 className="text-5xl font-display text-ocean-accent">SUS</h2>
            <p className="text-xl opacity-80 leading-relaxed">
              Criado em 1990 como consequência da Constituição de 1988. O maior sistema público de saúde do mundo.
            </p>
            <div className="space-y-4">
              <div className="glass p-4 rounded-xl border-l-4 border-ocean-accent">
                <span className="font-bold block">Universalidade</span>
                <span className="text-sm opacity-60">Todos têm direito.</span>
              </div>
              <div className="glass p-4 rounded-xl border-l-4 border-ocean-accent">
                <span className="font-bold block">Integralidade</span>
                <span className="text-sm opacity-60">Atendimento completo.</span>
              </div>
              <div className="glass p-4 rounded-xl border-l-4 border-ocean-accent">
                <span className="font-bold block">Equidade</span>
                <span className="text-sm opacity-60">Tratar desigualmente os desiguais.</span>
              </div>
            </div>
          </div>
          <div className="glass p-8 rounded-3xl space-y-6">
            <h3 className="text-2xl font-serif italic">Importância & Críticas</h3>
            <ul className="space-y-3 opacity-80">
              <li>• Fundamental durante a pandemia de COVID-19.</li>
              <li>• Responsável por campanhas de vacinação.</li>
              <li className="pt-4 text-red-400">• Subfinanciamento.</li>
              <li className="text-red-400">• Filas e superlotação.</li>
            </ul>
          </div>
        </div>
      ),
      icon: <ShieldAlert />
    },
    {
      id: 4,
      title: "Biopoder",
      content: (
        <div className="max-w-4xl space-y-12 text-center">
          <div className="space-y-4">
            <h2 className="text-6xl font-serif italic text-ocean-accent">Michel Foucault</h2>
            <p className="text-2xl font-light tracking-widest uppercase opacity-50">Biopoder e Controle Social</p>
          </div>
          <div className="glass p-12 rounded-full aspect-square flex flex-col justify-center items-center max-w-lg mx-auto border-dashed border-2 border-ocean-accent/30">
            <p className="text-xl leading-relaxed italic">
              "O Estado administra a vida e os corpos por meio de normas e instituições."
            </p>
          </div>
          <div className="flex flex-wrap justify-center gap-4 opacity-70">
            {["Vacinação Obrigatória", "Políticas Sanitárias", "Controle de Natalidade", "Medicalização"].map(tag => (
              <span key={tag} className="px-4 py-2 border border-ocean-accent/20 rounded-full text-sm">{tag}</span>
            ))}
          </div>
        </div>
      ),
      icon: <Users />
    },
    {
      id: 5,
      title: "Modernidade Líquida",
      content: (
        <div className="max-w-4xl space-y-8 glass p-12 rounded-3xl relative overflow-hidden">
          <div className="absolute top-0 right-0 p-8 opacity-10">
            <Brain size={200} />
          </div>
          <h2 className="text-5xl font-serif text-ocean-accent">Zygmunt Bauman</h2>
          <p className="text-2xl italic">"Vivemos em uma sociedade marcada por instabilidade e insegurança."</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-8">
            <div className="space-y-4">
              <h4 className="text-ocean-accent font-bold uppercase text-xs tracking-widest">Consequências</h4>
              <ul className="space-y-2 opacity-80">
                <li>• Ansiedade constante</li>
                <li>• Fragilidade das relações</li>
                <li>• Pressão por produtividade</li>
              </ul>
            </div>
            <div className="space-y-4">
              <h4 className="text-ocean-accent font-bold uppercase text-xs tracking-widest">Relação com</h4>
              <ul className="space-y-2 opacity-80">
                <li>• Burnout</li>
                <li>• Depressão</li>
                <li>• Exaustão emocional</li>
              </ul>
            </div>
          </div>
        </div>
      ),
      icon: <Brain />
    },
    {
      id: 6,
      title: "Psicanálise",
      content: (
        <div className="max-w-4xl space-y-12 text-center">
          <div className="space-y-2">
            <h2 className="text-6xl font-display text-ocean-accent">Sigmund Freud</h2>
            <p className="text-xl opacity-50">Psicanálise e Sofrimento</p>
          </div>
          <div className="glass p-12 rounded-3xl">
            <p className="text-3xl font-serif italic leading-relaxed">
              "Conflitos reprimidos geram sofrimento psíquico."
            </p>
          </div>
          <div className="grid grid-cols-3 gap-4">
            {["Ansiedade", "Depressão", "Transtornos"].map(item => (
              <div key={item} className="p-6 glass rounded-2xl border-b-2 border-ocean-accent">
                <span className="font-bold">{item}</span>
              </div>
            ))}
          </div>
        </div>
      ),
      icon: <Brain />
    },
    {
      id: 7,
      title: "Desigualdade Social",
      content: (
        <div className="max-w-5xl space-y-8">
          <h2 className="text-5xl font-display text-ocean-accent text-center">Desigualdade e Saúde</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="glass p-8 rounded-2xl space-y-4">
              <h3 className="font-bold text-ocean-accent">Determinantes</h3>
              <ul className="text-sm opacity-70 space-y-2">
                <li>• Renda & Educação</li>
                <li>• Moradia</li>
                <li>• Saneamento Básico</li>
                <li>• Alimentação</li>
              </ul>
            </div>
            <div className="glass p-8 rounded-2xl space-y-4 col-span-2">
              <h3 className="font-bold text-ocean-accent">O Problema</h3>
              <p className="text-xl italic">"Populações vulneráveis adocem mais."</p>
              <div className="pt-4 border-t border-white/10 space-y-2 text-sm opacity-70">
                <p>• Falta de saneamento gera doenças infecciosas.</p>
                <p>• Baixa renda dificulta acesso a tratamentos.</p>
              </div>
            </div>
          </div>
          <p className="text-center text-ocean-accent/60 font-mono text-sm uppercase tracking-widest">Saúde como reflexo das desigualdades estruturais</p>
        </div>
      ),
      icon: <Users />
    },
    {
      id: 8,
      title: "Cinema",
      content: (
        <div className="max-w-6xl space-y-12">
          <h2 className="text-5xl font-serif italic text-center text-ocean-accent">Cinema como Repertório</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { title: "Coringa", desc: "Negligência do Estado com saúde mental e invisibilidade social.", img: "🤡" },
              { title: "Contágio", desc: "Importância da ciência e o impacto social das pandemias.", img: "🦠" },
              { title: "O Poço", desc: "Desigualdade na distribuição de recursos e metáfora da exclusão.", img: "📦" }
            ].map(movie => (
              <div key={movie.title} className="glass p-8 rounded-3xl hover:bg-white/10 transition-colors group">
                <div className="text-6xl mb-6 group-hover:scale-110 transition-transform">{movie.img}</div>
                <h3 className="text-2xl font-bold mb-4 text-ocean-accent">{movie.title}</h3>
                <p className="opacity-70 leading-relaxed">{movie.desc}</p>
              </div>
            ))}
          </div>
        </div>
      ),
      icon: <Film />
    },
    {
      id: 9,
      title: "Saúde Mental Hoje",
      content: (
        <div className="max-w-4xl space-y-8 glass p-12 rounded-3xl">
          <h2 className="text-4xl font-display text-ocean-accent">Desafios Atuais</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div className="space-y-4">
              <h4 className="font-bold uppercase text-xs opacity-50">Principais Desafios</h4>
              <ul className="space-y-2">
                <li>• Ansiedade crescente</li>
                <li>• Depressão</li>
                <li>• Suicídio entre jovens</li>
                <li>• Burnout no trabalho</li>
              </ul>
            </div>
            <div className="space-y-4">
              <h4 className="font-bold uppercase text-xs opacity-50">Fatores Agravantes</h4>
              <ul className="space-y-2">
                <li>• Redes sociais</li>
                <li>• Pressão estética</li>
                <li>• Competitividade</li>
              </ul>
            </div>
          </div>
          <div className="pt-8 border-t border-white/10 text-center">
            <p className="text-ocean-accent italic">Temas recorrentes sobre saúde mental e juventude no ENEM.</p>
          </div>
        </div>
      ),
      icon: <Brain />
    },
    {
      id: 10,
      title: "Saúde da Mulher",
      content: (
        <div className="max-w-4xl space-y-12">
          <h2 className="text-6xl font-serif italic text-ocean-accent text-center">Saúde da Mulher</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="glass p-8 rounded-2xl space-y-4">
              <h3 className="font-bold text-red-400">Problemas Críticos</h3>
              <ul className="space-y-3 opacity-80">
                <li>• Violência obstétrica</li>
                <li>• Mortalidade materna</li>
                <li>• Pobreza menstrual</li>
              </ul>
            </div>
            <div className="glass p-8 rounded-2xl space-y-4">
              <h3 className="font-bold text-ocean-accent">Relação Social</h3>
              <ul className="space-y-3 opacity-80">
                <li>• Desigualdade de gênero</li>
                <li>• Falta de políticas públicas específicas</li>
              </ul>
            </div>
          </div>
        </div>
      ),
      icon: <Baby />
    },
    {
      id: 11,
      title: "Uso na Redação",
      content: (
        <div className="max-w-5xl space-y-8 glass p-12 rounded-3xl">
          <h2 className="text-4xl font-display text-ocean-accent mb-8">Estratégia Argumentativa</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="space-y-4">
              <div className="text-ocean-accent font-bold">Base Teórica</div>
              <p className="text-sm opacity-70">OMS + Constituição Federal</p>
            </div>
            <div className="space-y-4">
              <div className="text-ocean-accent font-bold">Desenvolvimento</div>
              <p className="text-sm opacity-70">Foucault (Controle), Bauman (Mental), Determinantes Sociais, Cinema.</p>
            </div>
            <div className="space-y-4">
              <div className="text-ocean-accent font-bold">Intervenção</div>
              <p className="text-sm opacity-70">Estado/Ministério, Campanhas, Políticas Públicas.</p>
            </div>
          </div>
          <div className="mt-8 p-6 bg-ocean-accent/5 rounded-xl border border-ocean-accent/20">
            <p className="text-center italic text-ocean-accent">Finalidade: Garantir o direito constitucional à vida digna.</p>
          </div>
        </div>
      ),
      icon: <FileText />
    },
    {
      id: 12,
      title: "Pandemia",
      content: (
        <div className="max-w-4xl space-y-12 text-center">
          <div className="space-y-4">
            <h2 className="text-6xl font-display text-ocean-accent">Covid-19</h2>
            <p className="text-xl opacity-50 uppercase tracking-widest">Marco Histórico</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="glass p-8 rounded-2xl space-y-4">
              <h3 className="font-bold text-ocean-accent">Impactos Imediatos</h3>
              <ul className="text-sm opacity-70 space-y-2">
                <li>• Colapso hospitalar</li>
                <li>• Valorização da ciência</li>
                <li>• Ampliação das desigualdades</li>
              </ul>
            </div>
            <div className="glass p-8 rounded-2xl space-y-4">
              <h3 className="font-bold text-ocean-accent">Legado Social</h3>
              <ul className="text-sm opacity-70 space-y-2">
                <li>• Crise econômica</li>
                <li>• Aumento de transtornos mentais</li>
                <li>• Debate sobre vacinação</li>
              </ul>
            </div>
          </div>
        </div>
      ),
      icon: <Globe />
    },
    {
      id: 13,
      title: "Bioética",
      content: (
        <div className="max-w-4xl space-y-8 glass p-12 rounded-3xl">
          <h2 className="text-4xl font-display text-ocean-accent">Bioética</h2>
          <p className="text-xl opacity-80 italic">"Área que estuda os limites morais da ciência e da medicina."</p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 py-8">
            {["Autonomia", "Beneficência", "Não Maleficência", "Justiça"].map(p => (
              <div key={p} className="text-center p-4 glass rounded-xl text-xs font-bold uppercase tracking-tighter">{p}</div>
            ))}
          </div>
          <div className="space-y-4">
            <h4 className="font-bold text-ocean-accent uppercase text-xs">Dilemas</h4>
            <div className="flex flex-wrap gap-3 opacity-60 text-sm">
              <span>Eutanásia</span> • <span>Células-tronco</span> • <span>Testes de vacinas</span> • <span>Prioridade de leitos</span>
            </div>
          </div>
        </div>
      ),
      icon: <Microscope />
    },
    {
      id: 14,
      title: "Indústria Farmacêutica",
      content: (
        <div className="max-w-5xl space-y-8">
          <h2 className="text-5xl font-serif italic text-ocean-accent text-center">Capitalismo e Saúde</h2>
          <div className="glass p-12 rounded-3xl space-y-6">
            <p className="text-2xl text-center italic">"A saúde também movimenta bilhões na economia global."</p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pt-8">
              <div className="space-y-2">
                <h4 className="text-red-400 font-bold uppercase text-xs">Problemas</h4>
                <p className="text-sm opacity-70">Alto custo, patentes, lucro acima da vida.</p>
              </div>
              <div className="space-y-2">
                <h4 className="text-ocean-accent font-bold uppercase text-xs">Crítica</h4>
                <p className="text-sm opacity-70">Transformação da saúde em mercadoria.</p>
              </div>
              <div className="space-y-2">
                <h4 className="text-ocean-accent font-bold uppercase text-xs">Exemplo</h4>
                <p className="text-sm opacity-70">Disputa global por vacinas na pandemia.</p>
              </div>
            </div>
          </div>
        </div>
      ),
      icon: <HandHelping />
    },
    {
      id: 15,
      title: "Direitos Humanos",
      content: (
        <div className="max-w-4xl space-y-12 text-center">
          <h2 className="text-5xl font-display text-ocean-accent">Dignidade Humana</h2>
          <div className="glass p-12 rounded-full border-2 border-ocean-accent/20">
            <p className="text-2xl font-serif italic leading-relaxed">
              "Sem saúde, não há educação de qualidade, trabalho digno ou participação social."
            </p>
          </div>
          <p className="text-xl opacity-70">Garantir saúde é garantir democracia e igualdade social.</p>
        </div>
      ),
      icon: <Scale />
    },
    {
      id: 16,
      title: "Conclusão",
      content: (
        <div className="max-w-4xl space-y-12 glass p-12 rounded-3xl text-center">
          <h2 className="text-6xl font-serif italic text-ocean-accent">Conclusão Geral</h2>
          <div className="space-y-6">
            <p className="text-2xl">A saúde não é apenas biológica, mas:</p>
            <div className="flex flex-wrap justify-center gap-6 text-3xl font-display italic text-ocean-accent/60">
              <span>Social</span>
              <span>Política</span>
              <span>Econômica</span>
              <span>Cultural</span>
            </div>
          </div>
          <p className="text-3xl font-serif pt-12 border-t border-white/10">
            "Discutir saúde é discutir cidadania e direitos humanos."
          </p>
        </div>
      ),
      icon: <CheckCircle2 />
    },
    {
      id: 17,
      title: "Obrigada",
      content: (
        <div className="text-center space-y-12">
          <motion.h1 
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.5, duration: 1 }}
            className="text-9xl font-serif italic text-ocean-accent drop-shadow-[0_0_30px_rgba(100,255,218,0.5)]"
          >
            Obrigada!
          </motion.h1>
          <div className="flex justify-center gap-8 opacity-30">
            <HeartPulse size={48} />
            <Stethoscope size={48} />
            <Brain size={48} />
          </div>
        </div>
      ),
    }
  ];

  const paginate = useCallback((newDirection: number) => {
    setDirection(newDirection);
    setCurrentSlide((prev) => {
      const next = prev + newDirection;
      if (next < 0) return 0;
      if (next >= slides.length) return slides.length - 1;
      return next;
    });
  }, [slides.length]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") paginate(1);
      if (e.key === "ArrowLeft") paginate(-1);
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [paginate]);

  if (isHome) {
    return <WelcomeScreen onStart={() => setIsHome(false)} />;
  }

  return (
    <div className="relative w-full h-screen bg-ocean-deep flex flex-col font-sans overflow-hidden">
      <BubbleBackground />

      {/* Header / Tabs */}
      <header className="relative z-20 p-4 md:p-6 flex items-center justify-between glass border-b-0 rounded-b-3xl mx-4 mt-4">
        <div className="flex items-center gap-3">
          <button 
            onClick={() => setIsHome(true)}
            className="p-2 hover:bg-white/5 rounded-full transition-colors text-ocean-accent"
          >
            <HomeIcon size={20} />
          </button>
          <div className="h-4 w-[1px] bg-white/10 mx-2" />
          <HeartPulse className="animate-pulse text-ocean-accent" />
          <span className="font-display italic text-xl hidden md:block text-ocean-accent">Saúde</span>
        </div>
        
        <nav className="hidden lg:flex gap-1 overflow-x-auto max-w-[70%] no-scrollbar">
          {slides.map((slide, idx) => (
            <button
              key={slide.id}
              onClick={() => {
                setDirection(idx > currentSlide ? 1 : -1);
                setCurrentSlide(idx);
              }}
              className={`px-3 py-1.5 rounded-full text-[10px] uppercase tracking-tighter transition-all whitespace-nowrap ${
                currentSlide === idx 
                  ? "bg-ocean-accent text-ocean-deep font-bold" 
                  : "text-slate-400 hover:text-white hover:bg-white/5"
              }`}
            >
              {slide.title}
            </button>
          ))}
        </nav>

        <div className="text-xs font-mono text-ocean-accent/50">
          {String(currentSlide + 1).padStart(2, '0')} / {slides.length}
        </div>
      </header>

      {/* Main Content */}
      <main className="relative flex-1 z-10">
        <AnimatePresence initial={false} custom={direction}>
          <SlideWrapper key={currentSlide} direction={direction}>
            {slides[currentSlide].content}
          </SlideWrapper>
        </AnimatePresence>
      </main>

      {/* Footer / Controls */}
      <footer className="relative z-20 p-6 flex items-center justify-between">
        <div className="flex gap-4">
          <button
            onClick={() => paginate(-1)}
            disabled={currentSlide === 0}
            className="p-4 rounded-full glass hover:bg-white/10 disabled:opacity-20 disabled:cursor-not-allowed transition-all group"
          >
            <ChevronLeft className="group-hover:-translate-x-1 transition-transform" />
          </button>
          <button
            onClick={() => paginate(1)}
            disabled={currentSlide === slides.length - 1}
            className="p-4 rounded-full glass hover:bg-white/10 disabled:opacity-20 disabled:cursor-not-allowed transition-all group"
          >
            <ChevronRight className="group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

        <div className="hidden md:flex items-center gap-6 text-slate-500 text-[10px] uppercase tracking-[0.2em]">
          <span className="flex items-center gap-2">
            <div className="w-12 h-[1px] bg-slate-800" />
            Apresentação Interativa
          </span>
          <span className="flex items-center gap-2">
            <div className="w-12 h-[1px] bg-slate-800" />
            2026
          </span>
        </div>

        <div className="flex gap-2">
          {slides.map((_, idx) => (
            <div 
              key={idx}
              className={`h-1 rounded-full transition-all duration-500 ${
                currentSlide === idx ? "w-8 bg-ocean-accent" : "w-2 bg-white/10"
              }`}
            />
          ))}
        </div>
      </footer>

      {/* Decorative Side Rails */}
      <div className="fixed left-4 top-1/2 -translate-y-1/2 z-20 hidden xl:flex flex-col gap-8 text-[10px] uppercase tracking-[0.5em] text-slate-600 [writing-mode:vertical-lr] rotate-180">
        <span>Direitos Humanos</span>
        <span>Bioética</span>
        <span>Saúde Pública</span>
      </div>
      <div className="fixed right-4 top-1/2 -translate-y-1/2 z-20 hidden xl:flex flex-col gap-8 text-[10px] uppercase tracking-[0.5em] text-slate-600 [writing-mode:vertical-lr]">
        <span>Constituição 1988</span>
        <span>SUS</span>
        <span>Cidadania</span>
      </div>
    </div>
  );
}
