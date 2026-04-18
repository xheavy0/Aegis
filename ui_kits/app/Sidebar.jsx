const SIDEBAR_SECTIONS = [
  {title:'Overview', items:[
    {id:'home',       label:'Home',         icon:'🏠'},
    {id:'reports',    label:'Reports',      icon:'📊'},
  ]},
  {title:'Continuous Monitoring', items:[
    {id:'frameworks', label:'Frameworks',   icon:'📐'},
    {id:'findings',   label:'Findings',     icon:'🔍', badge:{tone:'amber', count:7}},
    {id:'controls',   label:'Controls',     icon:'🛡️'},
    {id:'policies',   label:'Policies',     icon:'📄'},
  ]},
  {title:'Risk Management', items:[
    {id:'risks',      label:'Risks',        icon:'⚠️', badge:{tone:'red', count:23}},
  ]},
  {title:'Data', items:[
    {id:'plugins',    label:'Integrations', icon:'🔌'},
    {id:'evidence',   label:'Evidence',     icon:'📋'},
  ]},
  {title:'Management', items:[
    {id:'assets',     label:'Assets',       icon:'💻'},
    {id:'vendors',    label:'Vendors',      icon:'🤝'},
    {id:'audits',     label:'Audits',       icon:'📁'},
  ]},
];

const Sidebar = ({active, onNav, collapsed, onToggle}) => (
  <aside style={{
    width: collapsed ? 64 : 220,
    background:'#0d1220', borderRight:'1px solid #1e2d45',
    display:'flex', flexDirection:'column',
    position:'fixed', top:0, left:0, bottom:0, zIndex:50,
    overflow:'hidden', transition:'width .25s cubic-bezier(.4,0,.2,1)',
  }}>
    {/* Brand */}
    <div style={{
      display:'flex', alignItems:'center', gap:12,
      padding: collapsed ? '14px 0' : '20px 16px 16px',
      borderBottom:'1px solid #1e2d45', minHeight:64,
      justifyContent: collapsed ? 'center' : 'flex-start',
    }}>
      <div style={{
        width:34, height:34, borderRadius:8, flexShrink:0,
        background:'linear-gradient(135deg,#3b82f6,#06b6d4)',
        display:'flex', alignItems:'center', justifyContent:'center',
      }}>
        <ShieldLogo size={20}/>
      </div>
      {!collapsed && (
        <>
          <div style={{flex:1, overflow:'hidden'}}>
            <div style={{fontSize:17, fontWeight:700, letterSpacing:'-.4px'}}>Aegis</div>
            <div style={{fontSize:10, color:'#4a6080', letterSpacing:'.08em', textTransform:'uppercase', marginTop:1}}>GRC Platform</div>
          </div>
          <div onClick={onToggle} style={{
            width:28, height:28, borderRadius:6, background:'#1a2236',
            border:'1px solid #1e2d45', cursor:'pointer',
            display:'flex', alignItems:'center', justifyContent:'center',
            color:'#8fa3bf', fontSize:14,
          }}>◀</div>
        </>
      )}
    </div>

    {/* Sections */}
    <div style={{flex:1, overflowY:'auto', paddingBottom:10}}>
      {SIDEBAR_SECTIONS.map(sec => (
        <React.Fragment key={sec.title}>
          {!collapsed && <div style={{
            fontSize:10, fontWeight:600, color:'#4a6080',
            letterSpacing:'.1em', textTransform:'uppercase',
            padding:'14px 16px 6px', whiteSpace:'nowrap',
          }}>{sec.title}</div>}
          {sec.items.map(it => {
            const isActive = it.id === active;
            return (
              <div key={it.id} onClick={() => onNav(it.id)}
                   style={{
                     display:'flex', alignItems:'center',
                     gap: collapsed ? 0 : 12,
                     padding: collapsed ? '10px 0' : '9px 16px',
                     margin: collapsed ? '2px 6px' : '1px 8px',
                     borderRadius:8, cursor:'pointer',
                     color: isActive ? '#3b82f6' : '#8fa3bf',
                     background: isActive ? '#3b82f620' : 'transparent',
                     fontSize:13.5, fontWeight: isActive ? 500 : 400,
                     position:'relative', whiteSpace:'nowrap', overflow:'hidden',
                     justifyContent: collapsed ? 'center' : 'flex-start',
                     transition:'background .15s, color .15s',
                   }}>
                {isActive && <span style={{
                  position:'absolute', left:0, top:4, bottom:4, width:3,
                  background:'#3b82f6', borderRadius:'0 2px 2px 0',
                }}/>}
                <span style={{width:18, fontSize:16, textAlign:'center'}}>{it.icon}</span>
                {!collapsed && <span style={{flex:1}}>{it.label}</span>}
                {!collapsed && it.badge && (
                  <Badge tone={it.badge.tone} style={{fontSize:10, padding:'2px 7px'}}>{it.badge.count}</Badge>
                )}
              </div>
            );
          })}
        </React.Fragment>
      ))}
    </div>

    {/* Footer */}
    {!collapsed && (
      <div style={{padding:'12px 8px', borderTop:'1px solid #1e2d45'}}>
        <div style={{
          display:'flex', alignItems:'center', gap:10, padding:8, borderRadius:8, cursor:'pointer',
        }}>
          <div style={{
            width:30, height:30, borderRadius:'50%',
            background:'linear-gradient(135deg,#3b82f6,#8b5cf6)',
            display:'flex', alignItems:'center', justifyContent:'center',
            fontSize:12, fontWeight:600, color:'#fff',
          }}>AK</div>
          <div style={{overflow:'hidden', flex:1}}>
            <div style={{fontSize:13, fontWeight:500, whiteSpace:'nowrap'}}>Archili Kldiashvili</div>
            <div style={{fontSize:11, color:'#4a6080'}}>GRC Officer</div>
          </div>
        </div>
      </div>
    )}
  </aside>
);

Object.assign(window, {Sidebar});
