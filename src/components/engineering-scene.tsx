export function EngineeringScene({type='conveying',compact=false}:{type?:string;compact?:boolean}) {
  const color=type==='water-treatment'?'#80c7bf':type==='gas-systems'?'#abc6d9':'#c6cbd0'
  return <div className={'engineering-scene '+(compact?'compact':'')} aria-hidden="true"><svg viewBox="0 0 720 540" fill="none">
    <defs><linearGradient id={'metal-'+type} x1="0" y1="0" x2="1" y2="1"><stop stopColor="#f2f4f5"/><stop offset=".35" stopColor={color}/><stop offset="1" stopColor="#414d59"/></linearGradient><pattern id={'grid-'+type} width="40" height="40" patternUnits="userSpaceOnUse"><path d="M40 0H0V40" stroke="white" strokeOpacity=".055"/></pattern></defs>
    <rect width="720" height="540" fill={'url(#grid-'+type+')'}/><ellipse cx="370" cy="450" rx="230" ry="35" fill="#000" opacity=".22"/>
    {type==='conveying'?<g transform="translate(58 80) rotate(-18 300 180)">
      <path d="M70 170L535 170L550 220L75 220Z" fill="#233443" stroke="#8a9aa7"/><path d="M90 217V286H128V220M476 216V286H514V220" stroke="#82929b" strokeWidth="12"/>
      <path d="M47 184H568" stroke={'url(#metal-'+type+')'} strokeWidth="24"/>
      {Array.from({length:10},(_,i)=><path key={i} d={`M${100+i*42} 133 C${65+i*42} 145 ${65+i*42} 222 ${100+i*42} 237 C${135+i*42} 218 ${135+i*42} 150 ${100+i*42} 133Z`} fill={'url(#metal-'+type+')'} stroke="#e0e5e8" strokeWidth="1.5"/>)}
      <path d="M47 184H575" stroke="#c0c9cf" strokeWidth="10"/><rect x="541" y="155" width="63" height="61" rx="8" fill="#d93924"/><path d="M553 160V211M564 160V211M575 160V211M586 160V211" stroke="#91281c" strokeWidth="3"/>
      <path d="M76 107H514M76 99V115M514 99V115" stroke="#8d9da9" strokeDasharray="4 4"/><path d="M120 81V119M470 84V119" stroke="#d93924"/>
    </g>:type==='gas-systems'?<g strokeLinecap="round" strokeLinejoin="round">
      {[210,330,450].map((x,i)=><g key={x}><rect x={x} y="190" width="65" height="220" rx="28" fill={'url(#metal-'+type+')'} stroke="#a7bbc8"/><path d={`M${x+32} 190V142H560V340`} stroke="#a5b8c4" strokeWidth="10"/><circle cx={x+32} cy="143" r="12" fill="#d93924" stroke="#17232d" strokeWidth="4"/><circle cx={x+32} cy="240" r="18" fill="#182f42" stroke="#e3ebef"/><path d={`M${x+32} 240l8 -9`} stroke="#d93924" strokeWidth="3"/><rect x={x+15} y="292" width="35" height="4" fill="#d93924"/></g>)}
      <path d="M135 130V390H172M550 340H610" stroke="#e1e8eb" strokeWidth="12"/><circle cx="560" cy="320" r="18" stroke="#d93924" strokeWidth="6"/>
    </g>:<g strokeLinecap="round">
      <ellipse cx="330" cy="186" rx="135" ry="48" fill="#b2d5cf"/><path d="M195 186V367C195 433 465 433 465 367V186" fill={'url(#metal-'+type+')'} stroke="#afdad1"/><ellipse cx="330" cy="186" rx="135" ry="48" stroke="#e9faf5" strokeWidth="3"/><path d="M220 233C280 272 392 272 441 233M220 280C280 319 392 319 441 280M220 329C280 368 392 368 441 329" stroke="#ebfffb" strokeOpacity=".4" strokeWidth="2"/><path d="M146 350H100V112H330V133M466 342H562V175H509" stroke="#7caaa8" strokeWidth="16"/><path d="M330 100V138M552 260H574" stroke="#d93924" strokeWidth="8"/><circle cx="100" cy="230" r="23" fill="#243945" stroke="#d93924" strokeWidth="6"/><path d="M330 286C310 317 300 330 300 347A30 30 0 00360 347C360 330 350 317 330 286Z" fill="#1d5559"/>
    </g>}
    <path d="M40 40H80M40 40V80M680 500H640M680 500V460" stroke="#d93924" strokeWidth="2"/>
  </svg><span className="scene-label">KUANKI / ENGINEERING CONCEPT</span></div>
}

