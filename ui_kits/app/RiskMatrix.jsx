const RISK_CELL_COLORS = {
  low:      {bg:'#3b82f633', bd:'#3b82f6'},
  medium:   {bg:'#10b98144', bd:'#10b981'},
  high:     {bg:'#f59e0b55', bd:'#f59e0b'},
  critical: {bg:'#ef444466', bd:'#ef4444'},
};
// default 5×5 rating matrix: rows = likelihood 1..5, cols = impact 1..5
const DEFAULT_RATINGS = [
  ['low','low','low','medium','medium'],
  ['low','low','medium','medium','high'],
  ['low','medium','medium','high','high'],
  ['medium','medium','high','high','critical'],
  ['medium','high','high','critical','critical'],
];
const LIKELIHOOD = ['Rare','Unlikely','Possible','Likely','Very Likely'];

const RiskMatrix = ({risks=[]}) => {
  const grid = DEFAULT_RATINGS.map(row => row.map(cell => ({bg:cell, marks:[]})));
  risks.forEach(r => {
    const li = (r.likelihood|0) - 1, ii = (r.impact|0) - 1;
    if (li>=0 && li<5 && ii>=0 && ii<5) grid[li][ii].marks.push(r);
  });
  const cells = [];
  for (let li=4; li>=0; li--) {
    for (let ii=0; ii<5; ii++) {
      const c = grid[li][ii];
      const col = RISK_CELL_COLORS[c.bg];
      cells.push(
        <div key={`${li}-${ii}`} style={{
          width:40, height:40, borderRadius:6,
          background:col.bg, border:`1px solid ${col.bd}`,
          display:'flex', alignItems:'center', justifyContent:'center',
        }}>
          {c.marks.length > 0 && (
            <div style={{width:10, height:10, borderRadius:'50%', background:'#fff', opacity:.8}}/>
          )}
        </div>
      );
    }
  }
  return (
    <div style={{display:'flex', gap:12, alignItems:'flex-start'}}>
      <div style={{display:'flex', flexDirection:'column', gap:4}}>
        {[4,3,2,1,0].map(i => (
          <div key={i} style={{
            fontSize:10, color:'#4a6080', height:40,
            display:'flex', alignItems:'center',
            writingMode:'vertical-rl', transform:'rotate(180deg)',
          }}>{LIKELIHOOD[i]}</div>
        ))}
      </div>
      <div>
        <div style={{display:'grid', gridTemplateColumns:'repeat(5,40px)', gap:4}}>{cells}</div>
        <div style={{display:'grid', gridTemplateColumns:'repeat(5,40px)', gap:4, marginTop:8,
                     fontSize:10, color:'#4a6080', textAlign:'center'}}>
          {[1,2,3,4,5].map(n => <div key={n}>{n}</div>)}
        </div>
        <div style={{fontSize:10, color:'#4a6080', textAlign:'center', marginTop:6}}>Impact</div>
      </div>
      <div style={{display:'flex', flexDirection:'column', gap:10, minWidth:180}}>
        <div style={{fontSize:11, color:'#4a6080', textTransform:'uppercase', letterSpacing:'.08em'}}>Severity Totals</div>
        {[
          {label:'Critical Risks', tone:'red',   n: risks.filter(r=>r.severity==='Critical').length},
          {label:'High Risks',     tone:'amber', n: risks.filter(r=>r.severity==='High').length},
          {label:'Medium Risks',   tone:'green', n: risks.filter(r=>r.severity==='Medium').length},
          {label:'Low Risks',      tone:'blue',  n: risks.filter(r=>r.severity==='Low').length},
        ].map(row => (
          <div key={row.label} style={{display:'flex', justifyContent:'space-between', gap:12}}>
            <span style={{fontSize:12, color:'#8fa3bf'}}>{row.label}</span>
            <Badge tone={row.tone}>{row.n}</Badge>
          </div>
        ))}
      </div>
    </div>
  );
};

Object.assign(window, {RiskMatrix});
