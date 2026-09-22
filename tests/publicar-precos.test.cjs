// Executar: node --test tests/publicar-precos.test.cjs
// Exercita o código real do HTML com DOM/storage/API simulados, sem publicar preços.
const {test}=require('node:test');
const assert=require('node:assert/strict');
const {readFileSync}=require('node:fs');
const vm=require('node:vm');
const html=readFileSync(require('node:path').join(__dirname,'../index.html'),'utf8');
const source=html.slice(html.indexOf('function b64encodeUnicode('),html.indexOf('document.addEventListener("keydown",e=>{',html.indexOf('function b64encodeUnicode(')));
const response=(status,data={})=>({status,ok:status>=200&&status<300,json:async()=>data});
const get=()=>response(200,{sha:'sha-original'});
const TOKEN_FAKE='github_pat_abcdefghijklmnopqrstuvwxyz0123456789ABCDEF';
function setup(responses,opts={}){
  const button={disabled:false,textContent:'☁ Publicar para todos'};
  const storage=new Map([
    ['token','fake-token'],
    ['autor',opts.autor!==undefined?opts.autor:'José'],
    ['local','{"A":20}']
  ]);
  if(opts.semAutor) storage.delete('autor');
  if(opts.semToken) storage.delete('token');
  const calls=[],alerts=[],delays=[],renders=[];
  let clock=0;
  const prompts=opts.prompts?opts.prompts.slice():[];
  const ctx=vm.createContext({
    TextEncoder,btoa,Date:class extends Date {constructor(){super(1750000000000+clock++*1200);}},
    CAT:[{c:'A',v:10}],CAT_ORIG:{A:10},ppEdicao:{A:20},ppAbertura:{A:10},
    precosShared:{prices:{},meta:{}},precosSync:{estado:'ok',detalhe:''},
    GH_TOKEN_LS:'token',GH_AUTOR_LS:'autor',PRECOS_SHARED_LS:'cache',PRECOS_LS:'local',
    GH_OWNER:'owner',GH_REPO:'repo',GH_BRANCH:'main',GH_PATH:'precos.json',
    ppParse:Number,ppTemMudancas:()=>true,
    localStorage:{getItem:k=>storage.has(k)?storage.get(k):null,setItem:(k,v)=>storage.set(k,v),removeItem:k=>storage.delete(k)},
    document:{getElementById:id=>id==='btnPublicar'?button:null},
    confirm:()=>true,
    prompt:()=>{
      if(!prompts.length) throw Error('Unexpected prompt');
      return prompts.shift();
    },
    alert:m=>alerts.push(m),
    renderPpSync:()=>{},renderPrecos:()=>renders.push('precos'),render:()=>renders.push('app'),
    aplicarPrecos:()=>{ctx.CAT[0].v=ctx.precosShared.prices.A;},
    setTimeout:(fn,ms)=>{delays.push(ms); fn();},
    fetch:async(url,opts)=>{
      assert.equal(button.disabled,true);
      assert.equal(button.textContent,'☁ Publicando…');
      calls.push({url,...opts});
      assert.ok(responses.length,'Requisição inesperada');
      const next=responses.shift();
      if(next instanceof Error) throw next;
      return typeof next==='function'?next():next;
    }
  });
  vm.runInContext(source,ctx);
  return {ctx,button,storage,calls,alerts,delays,renders};
}
function restored(h){
  assert.equal(h.button.disabled,false);
  assert.equal(h.button.textContent,'☁ Publicar para todos');
}
function failed(h){
  restored(h);
  assert.equal(h.ctx.precosSync.estado,'erro-pub');
  assert.equal(h.storage.has('local'),true);
  assert.equal(h.storage.has('cache'),false);
  assert.equal(JSON.stringify(h.ctx.precosShared.prices),'{}');
}
function metaFromPut(call){
  return JSON.parse(Buffer.from(JSON.parse(call.body).content,'base64').toString('utf8'))._meta;
}

test('botão de publicação tem ID e handler',()=>{
  assert.match(html,/<button id="btnPublicar"[^>]*onclick="publicarPrecos\(\)"/);
});
test('ghMsgErro concatena message e errors; tolera JSON inválido',async()=>{
  const {ctx}=setup([]);
  assert.equal(await ctx.ghMsgErro(response(422,{message:'Validation',errors:['texto',{message:'detalhe'},{code:'invalid'}]})), 'Validation; texto; detalhe; {"code":"invalid"}');
  assert.equal(await ctx.ghMsgErro({json:async()=>{throw Error('not JSON');}}),'');
  assert.equal(await ctx.ghMsgErro(response(500,{})),'');
});
test('pareceSegredo e sanitizarAutor bloqueiam tokens no nome',()=>{
  const {ctx}=setup([]);
  assert.equal(ctx.pareceSegredo(TOKEN_FAKE),true);
  assert.equal(ctx.pareceSegredo('ghp_abcdefghijklmnopqrstuvwxyz0123'),true);
  assert.equal(ctx.pareceSegredo('Maria Silva'),false);
  assert.equal(ctx.sanitizarAutor('Maria Silva'),'Maria Silva');
  assert.equal(ctx.sanitizarAutor(TOKEN_FAKE),'');
  assert.equal(ctx.sanitizarAutor('Maria '+TOKEN_FAKE),'Maria');
  assert.equal(ctx.sanitizarAutor('  '), '');
});
test('sucesso mantém cache, limpa local e atualiza catálogo/renderização',async()=>{
  const h=setup([get(),response(200)]);
  await h.ctx.publicarPrecos();
  restored(h);
  assert.equal(h.ctx.precosSync.estado,'ok');
  assert.equal(h.ctx.CAT[0].v,20);
  assert.equal(h.ctx.ppAbertura.A,20);
  assert.equal(h.storage.has('local'),false);
  assert.equal(JSON.parse(h.storage.get('cache')).prices.A,20);
  assert.deepEqual(h.renders,['precos','app']);
  assert.deepEqual(h.delays,[]);
  assert.equal(metaFromPut(h.calls[1]).updatedBy,'José');
});
test('409 repete uma vez após 1200ms, com SHA fresco e meta vencedora',async()=>{
  const h=setup([get(),response(409,{message:'sha mismatch'}),response(200,{sha:'sha-novo'}),response(200)]);
  await h.ctx.publicarPrecos();
  restored(h);
  assert.deepEqual(h.delays,[1200]);
  assert.deepEqual(h.calls.map(c=>c.method||'GET'),['GET','PUT','GET','PUT']);
  for(const c of [h.calls[0],h.calls[2]]){
    assert.equal(c.cache,'no-store');
    assert.match(c.url,/precos\.json\?ref=main$/);
  }
  const bodies=[h.calls[1],h.calls[3]].map(c=>JSON.parse(c.body));
  assert.deepEqual(bodies.map(b=>b.sha),['sha-original','sha-novo']);
  const metas=bodies.map(b=>JSON.parse(Buffer.from(b.content,'base64').toString('utf8'))._meta);
  assert.notEqual(metas[0].updatedAt,metas[1].updatedAt);
  assert.equal(JSON.stringify(h.ctx.precosShared.meta),JSON.stringify(metas[1]));
  assert.deepEqual(JSON.parse(h.storage.get('cache')).meta,metas[1]);
});
test('GET 404 cria arquivo sem SHA e aceita PUT 201',async()=>{
  const h=setup([response(404),response(201)]);
  await h.ctx.publicarPrecos();
  restored(h);
  assert.equal('sha' in JSON.parse(h.calls[1].body),false);
  assert.equal(h.ctx.precosSync.estado,'ok');
});
test('clique duplo não gera nova requisição nem altera a edição',async()=>{
  let release;
  const h=setup([()=>new Promise(resolve=>{release=resolve;}),response(200)]);
  const first=h.ctx.publicarPrecos();
  h.ctx.ppEdicao.A='20,00';
  await h.ctx.publicarPrecos();
  assert.equal(h.calls.length,1);
  assert.equal(h.ctx.ppEdicao.A,'20,00');
  assert.equal(h.button.disabled,true);
  assert.equal(h.alerts[0],'Publicação em andamento — aguarde concluir.');
  release(get());
  await first;
  restored(h);
});
for(const status of [401,403]) for(const stage of ['GET','PUT']){
  test(`${stage} ${status} remove token e orienta novo acesso com motivo`,async()=>{
    const error=response(status,{message:'Denied by GitHub'});
    const h=setup(stage==='GET'?[error]:[get(),error]);
    await h.ctx.publicarPrecos();
    failed(h);
    assert.equal(h.storage.has('token'),false);
    assert.match(h.alerts[0],/Contents: Read and write/);
    assert.match(h.alerts[0],/Denied by GitHub/);
    assert.deepEqual(h.delays,[]);
  });
}
test('409 persistente: branch protegida',async()=>{
  const motivo='Cannot update protected branch';
  const h=setup([get(),response(409,{message:'Conflict',errors:[{message:'sha does not match'}]}),get(),response(409,{message:'Conflict',errors:[{message:motivo}]})]);
  await h.ctx.publicarPrecos();
  failed(h);
  assert.equal(h.calls.length,4);
  assert.deepEqual(h.delays,[1200]);
  assert.match(h.alerts[0],/Settings → Branches/);
  assert.ok(h.alerts[0].includes(motivo));
  assert.equal(h.storage.has('token'),true);
});
test('409 persistente: conflito concorrente',async()=>{
  const motivo='sha does not match';
  const h=setup([get(),response(409,{message:'Conflict'}),get(),response(409,{message:'Conflict',errors:[{message:motivo}]})]);
  await h.ctx.publicarPrecos();
  failed(h);
  assert.equal(h.calls.length,4);
  assert.deepEqual(h.delays,[1200]);
  assert.match(h.alerts[0],/🔄 Verificar/);
  assert.ok(h.alerts[0].includes(motivo));
  assert.equal(h.storage.has('token'),true);
});
test('409 secret scanning: sem retry e mensagem orienta ⚙ Acesso',async()=>{
  const h=setup([get(),response(409,{message:'Repository rule violations found',errors:['Secret detected in content']})]);
  await h.ctx.publicarPrecos();
  failed(h);
  assert.equal(h.calls.length,2); /* GET + PUT, sem 2ª tentativa */
  assert.deepEqual(h.delays,[]);
  assert.match(h.alerts[0],/segredo/);
  assert.match(h.alerts[0],/⚙ Acesso/);
  assert.match(h.alerts[0],/Secret detected in content/);
  assert.equal(h.storage.has('token'),true);
});
test('autor salvo com token é limpo e payload usa "app"',async()=>{
  /* lerAutorSalvo remove o token; prompt vazio → updatedBy "app" */
  const h=setup([get(),response(200)],{autor:TOKEN_FAKE,prompts:['']});
  await h.ctx.publicarPrecos();
  restored(h);
  assert.equal(h.storage.has('autor'),false); /* token removido do storage */
  assert.equal(metaFromPut(h.calls[1]).updatedBy,'app');
  assert.match(JSON.parse(h.calls[1].body).message,/preços compartilhada$/); /* sem (token) */
});
test('prompt com token no nome aborta antes do envio',async()=>{
  const h=setup([],{semAutor:true,prompts:[TOKEN_FAKE]});
  await h.ctx.publicarPrecos();
  restored(h);
  assert.equal(h.calls.length,0);
  assert.match(h.alerts[0],/token do GitHub/);
  assert.equal(h.ctx.precosSync.estado,'ok');
  assert.equal(h.storage.has('autor'),false);
});
test('outros erros incluem HTTP e motivo sem retry',async()=>{
  const h=setup([get(),response(422,{message:'Validation Failed',errors:['invalid content']})]);
  await h.ctx.publicarPrecos();
  failed(h);
  assert.match(h.alerts[0],/O GitHub devolveu o erro HTTP 422: Validation Failed; invalid content/);
  assert.deepEqual(h.delays,[]);
});
test('falha de rede restaura botão e preserva preços locais',async()=>{
  const h=setup([get(),new Error('Failed to fetch')]);
  await h.ctx.publicarPrecos();
  failed(h);
  assert.match(h.alerts[0],/Failed to fetch/);
});
test('erro não JSON ainda exibe status e restaura botão',async()=>{
  const h=setup([get(),{status:502,ok:false,json:async()=>{throw Error('HTML');}}]);
  await h.ctx.publicarPrecos();
  failed(h);
  assert.match(h.alerts[0],/HTTP 502: motivo não informado/);
});
test('cancelar não inicia envio nem desabilita botão',async()=>{
  const h=setup([]);
  h.ctx.confirm=()=>false;
  await h.ctx.publicarPrecos();
  restored(h);
  assert.equal(h.calls.length,0);
  assert.equal(h.ctx.precosSync.estado,'ok');
});
