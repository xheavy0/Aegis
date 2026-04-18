const TITLES = {
  home:'Home', reports:'Reports & Analytics',
  frameworks:'Frameworks & Controls', findings:'Findings Register',
  controls:'Controls Library', policies:'Policy Management',
  risks:'Risk Register', plugins:'Integrations', evidence:'Evidence Management',
  assets:'Asset Inventory', vendors:'Vendor Risk', audits:'Audit Management',
};

const Topbar = ({page, auditor, onToggleAuditor}) => (
  <div style={{
    height:56, minHeight:56, flexShrink:0,
    background: auditor ? '#1a0a00' : '#0d1220',
    borderBottom: `1px solid ${auditor ? '#92400e' : '#1e2d45'}`,
    display:'flex', alignItems:'center', padding:'0 24px', gap:16,
  }}>
    <span style={{fontSize:16, fontWeight:600, color:'#e8edf5'}}>{TITLES[page] || page}</span>
    <div style={{width:1, height:20, background:'#1e2d45'}}/>
    <span style={{fontSize:13, color:'#4a6080'}}>Aegis / {TITLES[page] || page}</span>
    <div style={{marginLeft:'auto', display:'flex', alignItems:'center', gap:10}}>
      <div style={{width:8, height:8, borderRadius:'50%', background:'#10b981', boxShadow:'0 0 6px #10b981'}}/>
      <span style={{fontSize:12, color:'#4a6080'}}>All systems operational</span>
      <Button size="sm" onClick={onToggleAuditor}>
        {auditor ? '👁️ Exit Auditor' : '👁️ Auditor Mode'}
      </Button>
    </div>
  </div>
);

const AuditorBanner = ({onExit}) => (
  <div style={{
    background:'linear-gradient(90deg,#92400e,#b45309)',
    padding:'6px 24px', fontSize:12, fontWeight:600, letterSpacing:'.04em',
    color:'#fef3c7', display:'flex', alignItems:'center', gap:10, flexShrink:0,
  }}>
    <span>👁️</span>
    <span style={{background:'#fef3c7', color:'#92400e', padding:'2px 8px', borderRadius:4, fontSize:11}}>AUDITOR MODE</span>
    <span>You are viewing Aegis as an Auditor — read-only access with restricted data visibility</span>
    <button onClick={onExit} style={{
      marginLeft:'auto', background:'#92400e', color:'#fef3c7', border:'none',
      padding:'5px 11px', fontSize:12, borderRadius:8, cursor:'pointer',
      fontFamily:"'Sora',sans-serif",
    }}>Exit Auditor Mode</button>
  </div>
);

Object.assign(window, {Topbar, AuditorBanner});
