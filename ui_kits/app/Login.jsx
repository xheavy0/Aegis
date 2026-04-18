const Login = ({onSubmit}) => {
  const [email, setEmail] = React.useState('admin@aegis.local');
  const [pw, setPw] = React.useState('••••••••');
  return (
    <div style={{
      position:'fixed', inset:0, background:'#080c14',
      display:'flex', alignItems:'center', justifyContent:'center',
    }}>
      <div style={{
        width:400, background:'#0d1220', border:'1px solid #1e2d45',
        borderRadius:16, padding:'40px 36px',
      }}>
        <div style={{display:'flex', alignItems:'center', gap:12, marginBottom:32}}>
          <div style={{
            width:40, height:40, borderRadius:10,
            background:'linear-gradient(135deg,#3b82f6,#06b6d4)',
            display:'flex', alignItems:'center', justifyContent:'center',
          }}>
            <ShieldLogo size={22}/>
          </div>
          <div>
            <div style={{fontSize:22, fontWeight:700, letterSpacing:'-.5px'}}>Aegis</div>
            <div style={{fontSize:12, color:'#4a6080', marginTop:2, letterSpacing:'.05em', textTransform:'uppercase'}}>GRC Platform</div>
          </div>
        </div>

        {[{lbl:'EMAIL', val:email, set:setEmail, type:'email'},
          {lbl:'PASSWORD', val:pw, set:setPw, type:'password'}].map(f => (
          <div key={f.lbl} style={{marginBottom:16}}>
            <label style={{display:'block', fontSize:12, fontWeight:600, color:'#8fa3bf',
                           marginBottom:6, letterSpacing:'.04em'}}>{f.lbl}</label>
            <input type={f.type} value={f.val} onChange={e => f.set(e.target.value)} style={{
              width:'100%', background:'#1a2236', border:'1px solid #253550',
              color:'#e8edf5', borderRadius:8, padding:'10px 14px',
              fontSize:14, fontFamily:"'Sora',sans-serif", boxSizing:'border-box',
            }}/>
          </div>
        ))}
        <button onClick={onSubmit} style={{
          width:'100%', background:'#3b82f6', color:'#fff', border:'none',
          borderRadius:8, padding:11, fontSize:14, fontWeight:600,
          fontFamily:"'Sora',sans-serif", cursor:'pointer', marginTop:8,
        }}>Sign In</button>
        <div style={{textAlign:'center', fontSize:11, color:'#4a6080', marginTop:20}}>Aegis GRC v1.0.0</div>
      </div>
    </div>
  );
};

Object.assign(window, {Login});
