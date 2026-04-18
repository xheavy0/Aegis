// Design-system primitives shared by all Aegis components.
// Shared to window at bottom so other <script type="text/babel"> files see them.

const Badge = ({children, tone='gray', dot=false, mono=false, style={}}) => {
  const tones = {
    red:   {bg:'#ef444418', fg:'#ef4444', bd:'#ef444430'},
    amber: {bg:'#f59e0b18', fg:'#f59e0b', bd:'#f59e0b30'},
    green: {bg:'#10b98118', fg:'#10b981', bd:'#10b98130'},
    blue:  {bg:'#3b82f618', fg:'#3b82f6', bd:'#3b82f630'},
    purple:{bg:'#8b5cf618', fg:'#8b5cf6', bd:'#8b5cf630'},
    teal:  {bg:'#06b6d418', fg:'#06b6d4', bd:'#06b6d430'},
    gray:  {bg:'#ffffff0a', fg:'#8fa3bf', bd:'#1e2d45'},
  };
  const t = tones[tone] || tones.gray;
  return (
    <span style={{
      display:'inline-flex', alignItems:'center', gap:4,
      padding:'3px 10px', borderRadius:5,
      fontSize:11, fontWeight:600, letterSpacing:'.02em',
      background:t.bg, color:t.fg, border:`1px solid ${t.bd}`,
      fontFamily: mono ? "'JetBrains Mono',monospace" : undefined,
      ...style,
    }}>
      {dot && <span style={{width:6,height:6,borderRadius:'50%',background:'currentColor'}}/>}
      {children}
    </span>
  );
};

const Button = ({variant='ghost', size='md', children, style={}, ...rest}) => {
  const base = {
    padding: size==='sm' ? '5px 11px' : '8px 16px',
    borderRadius: 8, border: 'none', cursor:'pointer',
    fontSize: size==='sm' ? 12 : 13, fontWeight:500,
    display:'inline-flex', alignItems:'center', gap:7,
    fontFamily:"'Sora',sans-serif", transition:'all .15s',
  };
  const variants = {
    primary: {background:'#3b82f6', color:'#fff'},
    ghost:   {background:'transparent', color:'#8fa3bf', border:'1px solid #1e2d45'},
    danger:  {background:'#ef444415', color:'#ef4444', border:'1px solid #ef444425'},
  };
  return <button style={{...base, ...variants[variant], ...style}} {...rest}>{children}</button>;
};

const Card = ({title, children, style={}, compact=false}) => (
  <div style={{
    background:'#0d1220', border:'1px solid #1e2d45', borderRadius:12,
    padding: compact ? 16 : 20, ...style,
  }}>
    {title && <div style={{
      fontSize:11, fontWeight:600, color:'#4a6080',
      textTransform:'uppercase', letterSpacing:'.1em', marginBottom:14,
    }}>{title}</div>}
    {children}
  </div>
);

const STAT_RIBBON = {
  blue:   'linear-gradient(90deg,#3b82f6,#06b6d4)',
  red:    'linear-gradient(90deg,#ef4444,#f97316)',
  green:  'linear-gradient(90deg,#10b981,#06b6d4)',
  amber:  'linear-gradient(90deg,#f59e0b,#f97316)',
  purple: 'linear-gradient(90deg,#8b5cf6,#ec4899)',
};
const STAT_GLOW = {
  blue:'#3b82f6', red:'#ef4444', green:'#10b981', amber:'#f59e0b', purple:'#8b5cf6',
};

const StatCard = ({tone='blue', icon, num, label, sub, onClick}) => (
  <div onClick={onClick} style={{
    background:'#0d1220', border:'1px solid #1e2d45', borderRadius:12, padding:20,
    position:'relative', overflow:'hidden',
    cursor: onClick ? 'pointer' : 'default', textAlign:'center',
  }}>
    <div style={{position:'absolute', top:0, left:0, right:0, height:2, background:STAT_RIBBON[tone]}}/>
    {icon && <div style={{fontSize:28, marginBottom:4}}>{icon}</div>}
    <div style={{
      fontSize:36, fontWeight:700, letterSpacing:'-1px', lineHeight:1,
      color: STAT_GLOW[tone], textShadow:`0 0 20px ${STAT_GLOW[tone]}40`,
    }}>{num}</div>
    <div style={{fontSize:12, color:'#4a6080', marginTop:6}}>{label}</div>
    {sub && <div style={{fontSize:11, color:'#8fa3bf', marginTop:8}}>{sub}</div>}
  </div>
);

const ShieldLogo = ({size=22, stroke='#fff'}) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={stroke}
       strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 2L3 7v5c0 5.25 3.75 10.16 9 11.34C17.25 22.16 21 17.25 21 12V7L12 2z"/>
  </svg>
);

Object.assign(window, {Badge, Button, Card, StatCard, ShieldLogo, STAT_GLOW, STAT_RIBBON});
