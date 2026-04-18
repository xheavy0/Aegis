const SAMPLE_RISKS = [
  {id:'R-001', name:'Unpatched external asset',        severity:'Critical', likelihood:4, impact:5, category:'Infrastructure',  nist:'PR.PS-02', owner:'archili', status:'Open'},
  {id:'R-002', name:'Stale privileged accounts',       severity:'High',     likelihood:5, impact:3, category:'Access Control',  nist:'PR.AA-05', owner:'dana',    status:'In Treatment'},
  {id:'R-003', name:'Missing DLP policy',              severity:'Medium',   likelihood:3, impact:3, category:'Data Protection', nist:'PR.DS-01', owner:'archili', status:'In Treatment'},
  {id:'R-004', name:'Untested BCP runbook',            severity:'High',     likelihood:4, impact:4, category:'Compliance',      nist:'RC.RP-01', owner:'lev',     status:'Open'},
  {id:'R-005', name:'Vendor lacks SOC 2 report',       severity:'Medium',   likelihood:2, impact:3, category:'Vendor',          nist:'GV.SC-01', owner:'mari',    status:'Open'},
  {id:'R-006', name:'Server room physical access',     severity:'Low',      likelihood:2, impact:2, category:'Physical',        nist:'PR.AA-06', owner:'admin',   status:'Accepted'},
];

const RiskRegister = ({onNav, onOpenMatrix}) => (
  <div>
    <div style={{marginBottom:24}}>
      <div style={{fontSize:24, fontWeight:700, letterSpacing:'-.4px'}}>Risk Register</div>
      <div style={{fontSize:13, color:'#4a6080', marginTop:4}}>Identify, assess, and track organizational risks</div>
    </div>

    <div style={{display:'grid', gridTemplateColumns:'1fr 1fr', gap:16, marginBottom:18}}>
      <div style={{
        background:'#0d1220', border:'1px solid #1e2d45', borderRadius:12, padding:20,
        position:'relative', overflow:'hidden', minHeight:180, cursor:'pointer',
      }} onClick={onOpenMatrix}>
        <div style={{position:'absolute', top:0, left:0, right:0, height:2, background:STAT_RIBBON.red}}/>
        <div style={{position:'absolute', top:16, right:16, fontSize:22, opacity:.4}}>⚠️</div>
        <div style={{fontSize:36, fontWeight:700, letterSpacing:'-1px', color:'#ef4444', textShadow:'0 0 20px #ef444440'}}>{SAMPLE_RISKS.length}</div>
        <div style={{fontSize:12, color:'#4a6080', marginTop:6}}>Risks</div>
        <div style={{fontSize:12, color:'#8fa3bf', marginTop:8}}>Create, import, export, and manage the full risk register</div>
      </div>
      <div style={{
        background:'#0d1220', border:'1px solid #1e2d45', borderRadius:12, padding:20,
        position:'relative', overflow:'hidden', minHeight:180, cursor:'pointer',
      }}>
        <div style={{position:'absolute', top:0, left:0, right:0, height:2, background:STAT_RIBBON.amber}}/>
        <div style={{position:'absolute', top:16, right:16, fontSize:22, opacity:.4}}>📌</div>
        <div style={{fontSize:36, fontWeight:700, letterSpacing:'-1px', color:'#f59e0b', textShadow:'0 0 20px #f59e0b40'}}>4</div>
        <div style={{fontSize:12, color:'#4a6080', marginTop:6}}>Gaps</div>
        <div style={{fontSize:12, color:'#8fa3bf', marginTop:8}}>Track control gaps, import CSVs, and export gap reports</div>
      </div>
    </div>

    <Card title="Risk Matrix" style={{marginBottom:18}}>
      <RiskMatrix risks={SAMPLE_RISKS}/>
    </Card>

    <Card style={{padding:0, overflow:'hidden'}}>
      <div style={{padding:'12px 16px', borderBottom:'1px solid #1e2d45', display:'flex', alignItems:'center', gap:8}}>
        <Button variant="primary" size="sm">+ Create Risk</Button>
        <Button size="sm">⬆ Import CSV</Button>
        <Button size="sm">📄 Export PDF</Button>
        <Button size="sm">📊 Export Excel</Button>
      </div>
      <table style={{width:'100%', borderCollapse:'collapse', fontSize:13}}>
        <thead>
          <tr>
            {['Risk','Category','Severity','L×I','Owner','Status','NIST'].map(h => (
              <th key={h} style={{
                textAlign:'left', fontSize:11, fontWeight:600, color:'#4a6080',
                textTransform:'uppercase', letterSpacing:'.07em',
                padding:'10px 14px', borderBottom:'1px solid #1e2d45',
              }}>{h}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {SAMPLE_RISKS.map(r => {
            const sevTone = {Critical:'red', High:'amber', Medium:'green', Low:'blue'}[r.severity];
            const stTone = {Open:'red','In Treatment':'amber', Accepted:'teal', Closed:'gray'}[r.status] || 'gray';
            return (
              <tr key={r.id} style={{borderBottom:'1px solid #1e2d45'}}>
                <td style={{padding:'11px 14px', fontWeight:500}}>{r.name}</td>
                <td style={{padding:'11px 14px', color:'#8fa3bf', fontSize:12}}>{r.category}</td>
                <td style={{padding:'11px 14px'}}><Badge tone={sevTone}>{r.severity}</Badge></td>
                <td style={{padding:'11px 14px', fontFamily:"'JetBrains Mono',monospace", fontSize:12, color:'#8fa3bf'}}>{r.likelihood}×{r.impact}</td>
                <td style={{padding:'11px 14px', color:'#8fa3bf', fontSize:12}}>{r.owner}</td>
                <td style={{padding:'11px 14px'}}><Badge tone={stTone}>{r.status}</Badge></td>
                <td style={{padding:'11px 14px'}}><Badge tone="blue" mono>{r.nist}</Badge></td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </Card>
  </div>
);

Object.assign(window, {RiskRegister});
