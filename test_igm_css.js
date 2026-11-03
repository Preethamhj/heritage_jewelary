async function run() {
  const res = await fetch('https://www.igmindia.com/assets/css/styles.css');
  const css = await res.text();
  
  // Find .reveal rules
  const matches = [...css.matchAll(/([^{}]*reveal[^{}]*\{[^}]+\})/g)].map(m => m[1]);
  console.log('Reveal rules count:', matches.length);
  matches.forEach(m => console.log('RULE:\n' + m));
}
run();

