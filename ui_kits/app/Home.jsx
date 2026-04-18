const Home = ({onNav}) => {
  const today = new Date().toLocaleDateString('en-GB', {weekday:'long', year:'numeric', month:'long', day:'numeric'});
  return (
    <div style={{maxWidth:860, margin:'0 auto', padding:'48px 0'}}>
      {/* Welcome hero */}
      <div style={{textAlign:'center', marginBottom:48}}>
        <div style={{
          width:72, height:72, borderRadius:20, margin:'0 auto 20px',
          background:'linear-gradient(135deg,#3b82f6,#06b6d4)',
          display:'flex', alignItems:'center', justifyContent:'center',
        }}>
          <ShieldLogo size={38}/>
        </div>
        <div style={{fontSize:32, fontWeight:700, letterSpacing:'-.6px', marginBottom:8}}>
          Welcome back, Archili
        </div>
        <div style={{fontSize:15, color:'#4a6080', marginBottom:4}}>
          Aegis GRC Platform — {today}
        </div>
        <div style={{fontSize:13, color:'#4a6080'}}>GRC Officer · IT Security</div>
      </div>

      {/* Stat row */}
      <div style={{display:'grid', gridTemplateColumns:'repeat(4,1fr)', gap:16, marginBottom:32}}>
        <StatCard tone="blue"  icon="⚠️" num="23"  label="Active Risks"    onClick={() => onNav('risks')}/>
        <StatCard tone="red"   icon="🔍" num="7"   label="Open Findings"   onClick={() => onNav('findings')}/>
        <StatCard tone="green" icon="📋" num="142" label="Evidence Items"  onClick={() => onNav('evidence')}/>
        <StatCard tone="amber" icon="🔌" num="9"   label="Plugins"         onClick={() => onNav('plugins')}/>
      </div>

      {/* Quick actions + recent activity */}
      <div style={{display:'grid', gridTemplateColumns:'1fr 1fr', gap:16, marginBottom:24}}>
        <Card title="Quick Actions">
          <div style={{display:'flex', flexDirection:'column', gap:8}}>
            {[
              {emoji:'⚠️', bg:'#ef444415', t:'Register a Risk',     s:'Add new risk to the register'},
              {emoji:'🔍', bg:'#f59e0b15', t:'Register a Finding',  s:'Log a compliance finding'},
              {emoji:'📋', bg:'#06b6d415', t:'Collect Evidence',    s:'Manual or API-driven collection'},
              {emoji:'🔌', bg:'#3b82f615', t:'Connect a Plugin',    s:'AD, Okta, Tenable and more'},
              {emoji:'📊', bg:'#10b98115', t:'View Reports',        s:'Analytics & compliance score'},
            ].map((a,i) => (
              <div key={i} style={{
                display:'flex', alignItems:'center', gap:10,
                padding:'12px 14px', background:'transparent',
                border:'1px solid #1e2d45', borderRadius:8, cursor:'pointer',
              }}>
                <span style={{width:28, height:28, background:a.bg, borderRadius:6,
                              display:'flex', alignItems:'center', justifyContent:'center'}}>{a.emoji}</span>
                <div>
                  <div style={{fontSize:13, fontWeight:500}}>{a.t}</div>
                  <div style={{fontSize:11, color:'#4a6080'}}>{a.s}</div>
                </div>
              </div>
            ))}
          </div>
        </Card>

        <Card title="Recent Activity">
          {[
            {icon:'✅', a:'Resolved finding F-0147',   u:'archili', ts:'2026-04-18 09:12'},
            {icon:'📎', a:'Attached evidence to R-023',u:'dana',    ts:'2026-04-18 08:47'},
            {icon:'⚠️', a:'New risk: Stale SSO tokens',u:'archili', ts:'2026-04-17 16:32'},
            {icon:'🔌', a:'Connected Okta plugin',     u:'admin',   ts:'2026-04-17 11:05'},
          ].map((r,i) => (
            <div key={i} style={{
              display:'flex', alignItems:'center', gap:8,
              padding:'9px 0', borderBottom: i < 3 ? '1px solid #1e2d45' : 'none',
            }}>
              <span style={{fontSize:14}}>{r.icon}</span>
              <div style={{flex:1, minWidth:0}}>
                <div style={{fontSize:12, fontWeight:500}}>{r.a}</div>
                <div style={{fontSize:11, color:'#4a6080'}}>{r.ts} · {r.u}</div>
              </div>
            </div>
          ))}
          <div style={{height:1, background:'#1e2d45', margin:'14px 0'}}/>
          <div style={{fontSize:11, fontWeight:600, color:'#4a6080', textTransform:'uppercase',
                       letterSpacing:'.1em', marginBottom:10}}>Connected Frameworks</div>
          <div style={{display:'flex', gap:4, flexWrap:'wrap'}}>
            <Badge tone="blue">NIST CSF 2.0</Badge>
            <Badge tone="blue">ISO 27001</Badge>
            <Badge tone="blue">GDPR</Badge>
          </div>
        </Card>
      </div>
    </div>
  );
};

Object.assign(window, {Home});
