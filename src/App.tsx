import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Home as HomeIcon, 
  Stethoscope, 
  PiggyBank, 
  TrendingUp, 
  Wallet, 
  FileText, 
  Users, 
  ChevronDown, 
  AlertCircle, 
  Info,
  ArrowRight,
  Clock,
  Star,
  ShieldCheck
} from 'lucide-react';
import { cn } from './lib/utils';
import { SMMLV_2025 } from './types';
import { INVESTMENT_OPTIONS } from './constants';

// --- Components ---

const Navbar = ({ activePage, onNavigate }: { activePage: string, onNavigate: (page: string) => void }) => {
  return (
    <nav className="bg-white border-b border-black/10 px-5 flex items-center gap-2.5 h-[52px] sticky top-0 z-50">
      <div className="w-[30px] height-[30px] rounded-lg bg-brand-400 flex items-center justify-center">
        <HomeIcon className="w-4 h-4 text-white" />
      </div>
      <span className="text-[15px] font-semibold">MiPlata</span>
      <div className="flex gap-0.5 ml-auto">
        {[
          { id: 'home', label: 'Inicio' },
          { id: 'rx', label: 'Radiografía' },
          { id: 'ahorro', label: 'Ahorro' },
          { id: 'invertir', label: 'Invertir' },
          { id: 'chat', label: 'Chat AI' }
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => onNavigate(tab.id)}
            className={cn(
              "px-3 py-1.5 rounded-md text-[12px] transition-colors",
              activePage === tab.id 
                ? "bg-brand-50 text-brand-800 font-medium" 
                : "text-[#6b6b6b] hover:bg-black/5"
            )}
          >
            {tab.label}
          </button>
        ))}
      </div>
    </nav>
  );
};

const LandingPage = ({ onStart }: { onStart: () => void }) => {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="max-w-[460px] mx-auto px-5 py-10"
    >
      <div className="text-center mb-10">
        <div className="w-14 h-14 rounded-2xl bg-brand-400 flex items-center justify-center mx-auto mb-4 shadow-lg shadow-brand-400/20">
          <HomeIcon className="w-7 h-7 text-white" />
        </div>
        <h1 className="text-2xl font-bold mb-2 leading-tight">Tu plata, clara y sencilla</h1>
        <p className="text-sm text-[#6b6b6b] leading-relaxed max-w-[320px] mx-auto mb-6">
          Hecha para auxiliares de enfermería. Sin letra pequeña, sin jerga de banco. Solo lo que necesitas saber.
        </p>
        <div className="inline-flex items-center gap-1.5 bg-brand-50 border border-brand-100 rounded-full px-3.5 py-1.5 text-[13px] text-brand-800 font-medium mb-6">
          <Clock className="w-3.5 h-3.5" />
          Solo $25.000/mes · Cancela cuando quieras
        </div>
      </div>

      <div className="grid grid-cols-2 gap-2 mb-8">
        {[
          { icon: <FileText className="w-4 h-4 text-brand-600" />, title: 'Radiografía', desc: 'Ve exactamente a dónde se va tu plata', bg: 'bg-brand-50' },
          { icon: <PiggyBank className="w-4 h-4 text-blue-600" />, title: 'Alcancía diaria', desc: 'Un hábito pequeño que crece', bg: 'bg-blue-50' },
          { icon: <TrendingUp className="w-4 h-4 text-purple-600" />, title: 'Dónde invertir', desc: 'Opciones reales sin riesgo', bg: 'bg-purple-50' },
          { icon: <Star className="w-4 h-4 text-amber-600" />, title: 'Sin jerga', desc: 'Explicado como a una amiga', bg: 'bg-amber-50' }
        ].map((f, i) => (
          <div key={i} className="card p-4">
            <div className={cn("w-7 h-7 rounded-lg flex items-center justify-center mb-2", f.bg)}>
              {f.icon}
            </div>
            <div className="text-[13px] font-semibold mb-1">{f.title}</div>
            <div className="text-[11px] text-[#6b6b6b] leading-tight">{f.desc}</div>
          </div>
        ))}
      </div>

      <button onClick={onStart} className="btn-primary">
        Comenzar mi radiografía <ArrowRight className="w-4 h-4 inline ml-1" />
      </button>
      <p className="text-[11px] text-[#9a9a9a] text-center mt-3">7 días gratis · No necesitas tarjeta para empezar</p>
    </motion.div>
  );
};

interface Ingresos {
  salario: number;
  extra: number;
}

interface Gastos {
  arriendo: number;
  servicios: number;
  transporte: number;
  celular: number;
  comida: number;
  salud: number;
  ropa: number;
  ocio: number;
}

const RadiografiaPage = ({ onComplete }: { onComplete: (data: any) => void }) => {
  const [step, setStep] = useState(1);
  const [ingresos, setIngresos] = useState<Ingresos>({ salario: SMMLV_2025, extra: 0 });
  const [gastos, setGastos] = useState<Gastos>({
    arriendo: 400000,
    servicios: 80000,
    transporte: 120000,
    celular: 40000,
    comida: 350000,
    salud: 50000,
    ropa: 60000,
    ocio: 80000
  });

  const totalIngresos = ingresos.salario + ingresos.extra;
  const totalGastos = Object.values(gastos).reduce((a, b) => (a as number) + (b as number), 0) as number;
  const saldoLibre = totalIngresos - totalGastos;
  const porcentajeGasto = Math.round((totalGastos / totalIngresos) * 100);

  const formatCOP = (n: number) => '$' + Math.round(n).toLocaleString('es-CO');

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="max-w-[460px] mx-auto px-5 py-6"
    >
      <div className="flex items-center justify-between mb-5">
        <div>
          <h2 className="text-[17px] font-bold">Radiografía financiera</h2>
          <div className="text-[12px] text-[#6b6b6b]">Paso {step} de 3</div>
        </div>
        <div className="flex gap-1.5 w-20">
          {[1, 2, 3].map((s) => (
            <div 
              key={s} 
              className={cn(
                "flex-1 h-1 rounded-full transition-colors",
                s < step ? "bg-brand-100" : s === step ? "bg-brand-400" : "bg-black/5"
              )} 
            />
          ))}
        </div>
      </div>

      <AnimatePresence mode="wait">
        {step === 1 && (
          <motion.div 
            key="step1"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
          >
            <div className="card mb-4">
              <div className="inline-flex items-center gap-1 bg-brand-50 text-brand-800 text-[11px] px-2 py-0.5 rounded-full mb-3">
                <Stethoscope className="w-2.5 h-2.5" />
                Auxiliar de enfermería
              </div>
              <h3 className="text-sm font-bold mb-1">¿Cuánto recibes cada mes?</h3>
              <p className="text-[12px] text-[#6b6b6b] mb-4">Incluye tu salario y cualquier otro ingreso adicional</p>
              
              <div className="space-y-3">
                <div>
                  <label className="block text-[11px] font-medium text-[#6b6b6b] mb-1">Salario mensual</label>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-sm text-[#6b6b6b] font-mono">$</span>
                    <input 
                      type="number" 
                      value={ingresos.salario}
                      onChange={(e) => setIngresos({ ...ingresos, salario: Number(e.target.value) })}
                      className="input-field pl-6"
                    />
                  </div>
                  <p className="text-[11px] text-[#9a9a9a] mt-1">Salario mínimo 2025: $1.423.500</p>
                </div>
                <div>
                  <label className="block text-[11px] font-medium text-[#6b6b6b] mb-1">Otros ingresos (extras, bonos...)</label>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-sm text-[#6b6b6b] font-mono">$</span>
                    <input 
                      type="number" 
                      value={ingresos.extra}
                      onChange={(e) => setIngresos({ ...ingresos, extra: Number(e.target.value) })}
                      className="input-field pl-6"
                    />
                  </div>
                </div>
              </div>
            </div>
            <button onClick={() => setStep(2)} className="btn-primary">Continuar</button>
          </motion.div>
        )}

        {step === 2 && (
          <motion.div 
            key="step2"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
          >
            <div className="card mb-4">
              <h3 className="text-sm font-bold mb-1">Tus gastos del mes</h3>
              <p className="text-[12px] text-[#6b6b6b] mb-4">Sé honesta, solo tú los ves</p>
              
              <div className="text-[10px] font-bold text-brand-600 uppercase tracking-wider mb-2">Gastos fijos</div>
              <div className="grid grid-cols-2 gap-2 mb-4">
                {(['arriendo', 'servicios', 'transporte', 'celular'] as const).map((key) => (
                  <div key={key}>
                    <label className="block text-[11px] font-medium text-[#6b6b6b] mb-1 capitalize">{key}</label>
                    <div className="relative">
                      <span className="absolute left-2.5 top-1/2 -translate-y-1/2 text-[13px] text-[#6b6b6b] font-mono">$</span>
                      <input 
                        type="number" 
                        value={gastos[key]}
                        onChange={(e) => setGastos({ ...gastos, [key]: Number(e.target.value) })}
                        className="input-field pl-5"
                      />
                    </div>
                  </div>
                ))}
              </div>

              <div className="text-[10px] font-bold text-brand-600 uppercase tracking-wider mb-2">Gastos variables</div>
              <div className="grid grid-cols-2 gap-2">
                {(['comida', 'salud', 'ropa', 'ocio'] as const).map((key) => (
                  <div key={key}>
                    <label className="block text-[11px] font-medium text-[#6b6b6b] mb-1 capitalize">{key}</label>
                    <div className="relative">
                      <span className="absolute left-2.5 top-1/2 -translate-y-1/2 text-[13px] text-[#6b6b6b] font-mono">$</span>
                      <input 
                        type="number" 
                        value={gastos[key]}
                        onChange={(e) => setGastos({ ...gastos, [key]: Number(e.target.value) })}
                        className="input-field pl-5"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="flex gap-2">
              <button onClick={() => setStep(1)} className="btn-secondary">Volver</button>
              <button onClick={() => setStep(3)} className="btn-primary">Ver resultados</button>
            </div>
          </motion.div>
        )}

        {step === 3 && (
          <motion.div 
            key="step3"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
          >
            <div className="bg-brand-50 border border-brand-100 rounded-2xl p-5 mb-4">
              <div className="text-[12px] text-brand-600 mb-1">Dinero libre al mes</div>
              <div className={cn("text-3xl font-bold font-mono", saldoLibre >= 0 ? "text-brand-800" : "text-red-600")}>
                {formatCOP(saldoLibre)}
              </div>
              {saldoLibre > 0 && (
                <div className="text-[12px] text-brand-600 mt-1">
                  Ahorrando la mitad: {formatCOP(saldoLibre / 2)}/mes
                </div>
              )}
            </div>

            {saldoLibre < 0 && (
              <div className="bg-red-50 border border-red-100 rounded-2xl p-4 mb-4 flex gap-3">
                <AlertCircle className="w-5 h-5 text-red-600 shrink-0" />
                <div>
                  <div className="text-[12px] font-bold text-red-900 mb-0.5">Gastos mayores al ingreso</div>
                  <div className="text-[12px] text-red-600 leading-relaxed">
                    Estás gastando {formatCOP(Math.abs(saldoLibre))} más de lo que ganas. Revisemos qué ajustar.
                  </div>
                </div>
              </div>
            )}

            <div className="card mb-4">
              <h3 className="text-sm font-bold mb-3">Tu radiografía</h3>
              <div className="space-y-2 mb-4">
                <div className="flex justify-between text-sm py-1.5 border-b border-black/5">
                  <span className="text-[#6b6b6b]">Ingresos</span>
                  <span className="font-medium text-brand-600 font-mono">{formatCOP(totalIngresos)}</span>
                </div>
                <div className="flex justify-between text-sm py-1.5 border-b border-black/5">
                  <span className="text-[#6b6b6b]">Gastos</span>
                  <span className="font-medium text-red-600 font-mono">{formatCOP(totalGastos)}</span>
                </div>
                <div className="flex justify-between text-sm py-1.5">
                  <span className="text-[#6b6b6b]">Saldo libre</span>
                  <span className={cn("font-bold font-mono", saldoLibre >= 0 ? "text-brand-800" : "text-red-600")}>
                    {formatCOP(saldoLibre)}
                  </span>
                </div>
              </div>

              <div className="mb-4">
                <div className="flex justify-between text-[11px] text-[#6b6b6b] mb-1.5">
                  <span>Porcentaje gastado</span>
                  <span className="font-bold">{porcentajeGasto}%</span>
                </div>
                <div className="h-2 bg-black/5 rounded-full overflow-hidden">
                  <div 
                    className={cn(
                      "h-full transition-all duration-500",
                      porcentajeGasto > 90 ? "bg-red-500" : porcentajeGasto > 75 ? "bg-amber-500" : "bg-brand-400"
                    )}
                    style={{ width: `${Math.min(porcentajeGasto, 100)}%` }}
                  />
                </div>
              </div>

              <div className="pt-4 border-t border-black/5">
                <div className="text-[10px] font-bold text-brand-600 uppercase tracking-wider mb-3">Desglose de gastos</div>
                <div className="space-y-2">
                  {(Object.entries(gastos) as [keyof Gastos, number][])
                    .sort(([, a], [, b]) => b - a)
                    .map(([key, val]) => (
                      <div key={key} className="flex items-center justify-between text-[12px] py-1 border-b border-black/5 last:border-0">
                        <span className="text-[#6b6b6b] capitalize">{key}</span>
                        <div className="flex items-center gap-2">
                          <div className="w-12 h-1 bg-black/5 rounded-full overflow-hidden">
                            <div 
                              className="h-full bg-brand-400" 
                              style={{ width: `${(val / totalGastos) * 100}%` }}
                            />
                          </div>
                          <span className="font-mono min-w-[80px] text-right">{formatCOP(val)}</span>
                        </div>
                      </div>
                    ))}
                </div>
              </div>
            </div>
            <button onClick={() => onComplete({ totalIngresos, totalGastos, saldoLibre })} className="btn-primary">
              Ver mi plan de ahorro
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

const AhorroPage = ({ rxData }: { rxData: any }) => {
  const [diario, setDiario] = useState(5000);
  const [meses, setMeses] = useState(6);
  const [savedDays, setSavedDays] = useState<number[]>([]);

  const formatCOP = (n: number) => '$' + Math.round(n).toLocaleString('es-CO');
  const formatK = (n: number) => {
    if (n >= 1000000) return '$' + (n / 1000000).toFixed(1).replace('.', ',') + 'M';
    if (n >= 1000) return '$' + Math.round(n / 1000) + 'K';
    return '$' + Math.round(n);
  };

  const mensual = diario * 30;
  const totalMeta = mensual * meses;
  const ahorrado = savedDays.length * diario;
  const progreso = Math.max(0.5, Math.min(100, (ahorrado / totalMeta) * 100));

  const toggleDay = (day: number) => {
    if (savedDays.includes(day)) {
      setSavedDays(savedDays.filter(d => d !== day));
    } else {
      setSavedDays([...savedDays, day]);
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="max-w-[460px] mx-auto px-5 py-6"
    >
      <div className="flex items-center justify-between mb-5">
        <div>
          <h2 className="text-[17px] font-bold">Mi alcancía diaria</h2>
          <p className="text-[12px] text-[#6b6b6b]">Construye el hábito, peso a peso</p>
        </div>
        <div className="bg-brand-50 text-brand-800 text-[11px] px-2.5 py-1 rounded-full font-medium">
          Día {savedDays.length || 1}
        </div>
      </div>

      <div className="card mb-4">
        <h3 className="text-sm font-bold mb-1">¿Cuánto puedes guardar cada día?</h3>
        <p className="text-[12px] text-[#6b6b6b] mb-4">Ajusta según lo que te sobró en tu radiografía</p>
        
        <div className="space-y-4">
          <div>
            <div className="flex justify-between text-[12px] text-[#6b6b6b] mb-2">
              <span>Ahorro diario</span>
              <span className="font-bold font-mono text-brand-800">{formatCOP(diario)}</span>
            </div>
            <input 
              type="range" 
              min="500" 
              max="20000" 
              step="500" 
              value={diario}
              onChange={(e) => setDiario(Number(e.target.value))}
              className="w-full accent-brand-400"
            />
          </div>
          <div>
            <div className="flex justify-between text-[12px] text-[#6b6b6b] mb-2">
              <span>Meta en meses</span>
              <span className="font-bold text-brand-800">{meses} meses</span>
            </div>
            <input 
              type="range" 
              min="1" 
              max="24" 
              step="1" 
              value={meses}
              onChange={(e) => setMeses(Number(e.target.value))}
              className="w-full accent-brand-400"
            />
          </div>
        </div>
      </div>

      <div className="bg-brand-50 border border-brand-100 rounded-2xl p-5 mb-4">
        <div className="text-[12px] text-brand-600 mb-1">Tu meta de ahorro</div>
        <div className="text-3xl font-bold font-mono text-brand-800">{formatCOP(totalMeta)}</div>
        <div className="text-[12px] text-brand-600 mt-1">
          en {meses} meses · {formatCOP(mensual)}/mes
        </div>
        
        <div className="mt-4">
          <div className="h-4 bg-black/5 rounded-full overflow-hidden">
            <motion.div 
              className="h-full bg-brand-400"
              initial={{ width: 0 }}
              animate={{ width: `${progreso}%` }}
            />
          </div>
          <div className="flex justify-between text-[11px] text-brand-600 mt-1.5">
            <span>{formatCOP(ahorrado)} ahorrados</span>
            <span>Meta: {formatCOP(totalMeta)}</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-2 mb-4">
        {[
          { label: 'Mensual', val: formatK(mensual) },
          { label: 'Semestral', val: formatK(mensual * 6) },
          { label: 'Al año', val: formatK(mensual * 12) }
        ].map((m, i) => (
          <div key={i} className="bg-black/5 rounded-xl p-3">
            <div className="text-[11px] text-[#6b6b6b] mb-1">{m.label}</div>
            <div className="text-[17px] font-bold text-brand-600 font-mono">{m.val}</div>
          </div>
        ))}
      </div>

      <div className="card mb-4">
        <h3 className="text-sm font-bold mb-1">Calendario de ahorro</h3>
        <p className="text-[12px] text-[#6b6b6b] mb-3">Toca cada día para marcarlo como guardado</p>
        <div className="grid grid-cols-7 gap-1">
          {['L', 'M', 'X', 'J', 'V', 'S', 'D'].map(d => (
            <div key={d} className="text-[9px] text-[#9a9a9a] text-center font-bold pb-1">{d}</div>
          ))}
          {Array.from({ length: 35 }).map((_, i) => (
            <button
              key={i}
              onClick={() => toggleDay(i)}
              className={cn(
                "aspect-square rounded-md text-[9px] font-mono flex items-center justify-center transition-all",
                savedDays.includes(i) 
                  ? "bg-brand-400 text-white" 
                  : i === 0 ? "border-2 border-brand-400 text-brand-800" : "bg-black/5 text-[#6b6b6b]"
              )}
            >
              {i + 1}
            </button>
          ))}
        </div>
        <div className="flex gap-3 mt-4 text-[11px] text-[#6b6b6b]">
          <div className="flex items-center gap-1"><div className="w-2.5 h-2.5 rounded-sm bg-brand-400" /> Guardado</div>
          <div className="flex items-center gap-1"><div className="w-2.5 h-2.5 rounded-sm border border-brand-400" /> Hoy</div>
          <div className="flex items-center gap-1"><div className="w-2.5 h-2.5 rounded-sm bg-black/5" /> Pendiente</div>
        </div>
      </div>

      <div className="bg-amber-50 border border-amber-100 rounded-2xl p-4 flex gap-3">
        <Info className="w-5 h-5 text-amber-600 shrink-0" />
        <div>
          <div className="text-[12px] font-bold text-amber-900 mb-0.5">Consejo</div>
          <p className="text-[12px] text-amber-600 leading-relaxed">
            Guarda tu ahorro el mismo día que te pagan. Si esperas al final del mes, es más difícil. Abre una cuenta separada y transfiérelo ese día.
          </p>
        </div>
      </div>
    </motion.div>
  );
};

const InvertirPage = () => {
  const [cap, setCap] = useState(150000);
  const [anos, setAnos] = useState(3);
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const formatCOP = (n: number) => '$' + Math.round(n).toLocaleString('es-CO');
  const formatK = (n: number) => {
    if (n >= 1000000) return '$' + (n / 1000000).toFixed(1).replace('.', ',') + 'M';
    if (n >= 1000) return '$' + Math.round(n / 1000) + 'K';
    return '$' + Math.round(n);
  };

  const calculateGrowth = (rate: number) => {
    let total = 0;
    const months = anos * 12;
    for (let i = 0; i < months; i++) {
      total = (total + cap) * (1 + rate / 12);
    }
    return total;
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="max-w-[460px] mx-auto px-5 py-6"
    >
      <div className="mb-5">
        <h2 className="text-[17px] font-bold">¿Dónde poner mi ahorro?</h2>
        <p className="text-[12px] text-[#6b6b6b]">Sin riesgo · Para principiantes · Colombia</p>
      </div>

      <div className="bg-black/5 rounded-2xl p-5 mb-6">
        <h3 className="text-[13px] font-bold mb-4">Simula cuánto puede crecer</h3>
        <div className="space-y-4 mb-5">
          <div>
            <div className="flex justify-between text-[12px] text-[#6b6b6b] mb-2">
              <span>Ahorro/mes</span>
              <span className="font-bold font-mono text-brand-800">{formatCOP(cap)}</span>
            </div>
            <input 
              type="range" 
              min="50000" 
              max="1000000" 
              step="10000" 
              value={cap}
              onChange={(e) => setCap(Number(e.target.value))}
              className="w-full accent-brand-400"
            />
          </div>
          <div>
            <div className="flex justify-between text-[12px] text-[#6b6b6b] mb-2">
              <span>Años</span>
              <span className="font-bold text-brand-800">{anos} años</span>
            </div>
            <input 
              type="range" 
              min="1" 
              max="20" 
              step="1" 
              value={anos}
              onChange={(e) => setAnos(Number(e.target.value))}
              className="w-full accent-brand-400"
            />
          </div>
        </div>

        <div className="grid grid-cols-3 gap-2">
          <div className="bg-white/50 rounded-xl p-3">
            <div className="text-[10px] text-[#6b6b6b] mb-1">Sin rendimiento</div>
            <div className="text-[15px] font-bold text-[#9a9a9a] font-mono">{formatK(cap * 12 * anos)}</div>
          </div>
          <div className="bg-white/50 rounded-xl p-3">
            <div className="text-[10px] text-[#6b6b6b] mb-1">CDT ~10% EA</div>
            <div className="text-[15px] font-bold text-brand-600 font-mono">{formatK(calculateGrowth(0.10))}</div>
          </div>
          <div className="bg-white/50 rounded-xl p-3">
            <div className="text-[10px] text-[#6b6b6b] mb-1">Fiducia ~12% EA</div>
            <div className="text-[15px] font-bold text-brand-600 font-mono">{formatK(calculateGrowth(0.12))}</div>
          </div>
        </div>
      </div>

      <div className="text-[10px] font-bold text-brand-600 uppercase tracking-wider mb-3">Opciones: más segura primero</div>
      <div className="space-y-2 mb-6">
        {INVESTMENT_OPTIONS.map((opt) => (
          <div 
            key={opt.id}
            onClick={() => setExpandedId(expandedId === opt.id ? null : opt.id)}
            className={cn(
              "card p-4 cursor-pointer transition-all",
              opt.recommended && "ring-2 ring-brand-400 ring-inset",
              expandedId === opt.id && "border-brand-400"
            )}
          >
            <div className="flex items-center gap-3">
              <div className={cn(
                "w-9 h-9 rounded-lg flex items-center justify-center shrink-0",
                opt.color === 'blue' ? 'bg-blue-50 text-blue-600' : 
                opt.color === 'green' ? 'bg-brand-50 text-brand-600' :
                opt.color === 'purple' ? 'bg-purple-50 text-purple-600' : 'bg-emerald-50 text-emerald-600'
              )}>
                {opt.icon === 'Wallet' && <Wallet className="w-5 h-5" />}
                {opt.icon === 'FileText' && <FileText className="w-5 h-5" />}
                {opt.icon === 'TrendingUp' && <TrendingUp className="w-5 h-5" />}
                {opt.icon === 'Users' && <Users className="w-5 h-5" />}
              </div>
              <div className="flex-1">
                <div className="text-[13px] font-bold">{opt.title}</div>
                <div className="text-[11px] text-[#6b6b6b]">{opt.description}</div>
              </div>
              <ChevronDown className={cn("w-4 h-4 text-[#9a9a9a] transition-transform", expandedId === opt.id && "rotate-180")} />
            </div>
            
            <div className="flex gap-1.5 mt-2 flex-wrap">
              {opt.recommended && <span className="bg-brand-400 text-white text-[10px] px-2 py-0.5 rounded-full font-bold">Recomendada</span>}
              <span className="bg-brand-50 text-brand-800 text-[10px] px-2 py-0.5 rounded-full">{opt.risk} riesgo</span>
              <span className="bg-black/5 text-[#6b6b6b] text-[10px] px-2 py-0.5 rounded-full">{opt.yield}</span>
            </div>

            <AnimatePresence>
              {expandedId === opt.id && (
                <motion.div 
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  className="overflow-hidden"
                >
                  <div className="pt-4 mt-4 border-t border-black/5 space-y-2">
                    {opt.details.map((d, i) => (
                      <div key={i} className="flex justify-between text-[12px]">
                        <span className="text-[#6b6b6b]">{d.label}</span>
                        <span className="font-medium">{d.value}</span>
                      </div>
                    ))}
                    <div className="flex justify-between text-[12px]">
                      <span className="text-[#6b6b6b]">Mínimo</span>
                      <span className="font-medium">{opt.minimum}</span>
                    </div>
                    <div className="flex justify-between text-[12px]">
                      <span className="text-[#6b6b6b]">Liquidez</span>
                      <span className="font-medium">{opt.liquidity}</span>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        ))}
      </div>

      <div className="bg-red-50 border border-red-100 rounded-2xl p-4 flex gap-3 mb-6">
        <ShieldCheck className="w-5 h-5 text-red-600 shrink-0" />
        <div>
          <div className="text-[12px] font-bold text-red-900 mb-0.5">Evita estas "inversiones"</div>
          <p className="text-[12px] text-red-600 leading-relaxed">
            Cadenas de referidos, criptomonedas sin respaldo, grupos de WhatsApp que prometen 30%+ mensual. En Colombia se llaman captación ilegal. Si suena demasiado bueno, es trampa.
          </p>
        </div>
      </div>

      <p className="text-[11px] text-[#9a9a9a] leading-relaxed border-t border-black/10 pt-4">
        Esta pantalla es informativa y educativa. No es asesoría financiera. Cada persona debe investigar y tomar sus propias decisiones según su situación.
      </p>
    </motion.div>
  );
};

// --- Main App ---

import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

const ChatPage = ({ rxData }: { rxData: any }) => {
  const [messages, setMessages] = useState<{ role: 'user' | 'model', text: string }[]>([
    { role: 'model', text: '¡Hola! Soy tu asistente de MiPlata. ¿En qué puedo ayudarte hoy con tus finanzas?' }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = React.useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMsg = input.trim();
    setInput('');
    setMessages(prev => [...prev, { role: 'user', text: userMsg }]);
    setIsLoading(true);

    try {
      const context = rxData ? 
        `El usuario ha completado su radiografía financiera. Sus ingresos totales son ${rxData.totalIngresos}, sus gastos totales son ${rxData.totalGastos} y su saldo libre es ${rxData.saldoLibre}.` : 
        "El usuario aún no ha completado su radiografía financiera.";

      const chat = ai.chats.create({
        model: "gemini-3-flash-preview",
        config: {
          systemInstruction: `Eres el asistente inteligente de "MiPlata", una app de finanzas para auxiliares de enfermería en Colombia. 
          Tu tono es amable, empático, claro y sencillo. No uses jerga bancaria complicada. 
          Ayuda al usuario con dudas sobre ahorro, inversión (CDTs, fiducias), presupuesto y cómo mejorar su situación financiera.
          ${context}
          Responde siempre en español de Colombia, de forma cercana pero profesional.`,
        },
      });

      const result = await chat.sendMessageStream({ message: userMsg });
      
      let fullText = "";
      setMessages(prev => [...prev, { role: 'model', text: "" }]);

      for await (const chunk of result) {
        const chunkText = chunk.text || "";
        fullText += chunkText;
        setMessages(prev => {
          const newMsgs = [...prev];
          newMsgs[newMsgs.length - 1] = { role: 'model', text: fullText };
          return newMsgs;
        });
      }
    } catch (error) {
      console.error("Chat error:", error);
      setMessages(prev => [...prev, { role: 'model', text: "Lo siento, tuve un problema al procesar tu mensaje. ¿Podrías intentar de nuevo?" }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="max-w-[460px] mx-auto px-5 py-6 h-[calc(100vh-100px)] flex flex-col"
    >
      <div className="mb-4">
        <h2 className="text-[17px] font-bold">Asistente MiPlata</h2>
        <p className="text-[12px] text-[#6b6b6b]">Resuelve tus dudas financieras al instante</p>
      </div>

      <div 
        ref={scrollRef}
        className="flex-1 overflow-y-auto space-y-4 mb-4 pr-2 scrollbar-hide"
      >
        {messages.map((msg, i) => (
          <div 
            key={i} 
            className={cn(
              "flex",
              msg.role === 'user' ? "justify-end" : "justify-start"
            )}
          >
            <div 
              className={cn(
                "max-w-[85%] rounded-2xl p-3 text-[13px] leading-relaxed",
                msg.role === 'user' 
                  ? "bg-brand-400 text-white rounded-tr-none" 
                  : "bg-white border border-black/10 text-[#1a1a1a] rounded-tl-none"
              )}
            >
              {msg.text || <span className="animate-pulse">...</span>}
            </div>
          </div>
        ))}
      </div>

      <div className="relative">
        <input 
          type="text" 
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleSend()}
          placeholder="Escribe tu duda aquí..."
          className="w-full h-12 border border-black/15 rounded-2xl px-4 pr-12 text-sm bg-white outline-none focus:border-brand-400 transition-colors"
          disabled={isLoading}
        />
        <button 
          onClick={handleSend}
          disabled={isLoading || !input.trim()}
          className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 bg-brand-400 text-white rounded-xl flex items-center justify-center disabled:opacity-50 transition-opacity"
        >
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </motion.div>
  );
};

export default function App() {
  const [activePage, setActivePage] = useState('home');
  const [rxData, setRxData] = useState<any>(null);

  const handleRxComplete = (data: any) => {
    setRxData(data);
    setActivePage('ahorro');
  };

  return (
    <div className="min-h-screen pb-12">
      <Navbar activePage={activePage} onNavigate={setActivePage} />
      
      <main>
        <AnimatePresence mode="wait">
          {activePage === 'home' && (
            <LandingPage onStart={() => setActivePage('rx')} />
          )}
          {activePage === 'rx' && (
            <RadiografiaPage onComplete={handleRxComplete} />
          )}
          {activePage === 'ahorro' && (
            <AhorroPage rxData={rxData} />
          )}
          {activePage === 'invertir' && (
            <InvertirPage />
          )}
          {activePage === 'chat' && (
            <ChatPage rxData={rxData} />
          )}
        </AnimatePresence>
      </main>
    </div>
  );
}
