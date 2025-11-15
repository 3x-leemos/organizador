const DB_NAME = 'rotina_financas_db_v1';
let db;


export function getTasks(){
return new Promise((res,rej)=>{
const store = tx('tasks');
const req = store.getAll();
req.onsuccess = ()=>res(req.result.sort((a,b)=>b.created-a.created));
req.onerror = ()=>rej(req.error);
});
}


export function removeTask(id){
return new Promise((res,rej)=>{
const store = tx('tasks','readwrite');
const r = store.delete(Number(id));
r.onsuccess = ()=>res(); r.onerror = ()=>rej();
});
}


export function clearAllTasks(){
return new Promise((res,rej)=>{
const store = tx('tasks','readwrite');
const r = store.clear(); r.onsuccess = ()=>res(); r.onerror = ()=>rej();
});
}


// transações financeiras
export function addTxn(txn){
return new Promise((res,rej)=>{
const store = tx('txns','readwrite');
const r = store.add(txn); r.onsuccess = ()=>res(r.result); r.onerror = ()=>rej(r.error);
});
}
export function getTxns(){
return new Promise((res,rej)=>{
const store = tx('txns');
const req = store.getAll();
req.onsuccess = ()=>res(req.result.sort((a,b)=>b.created-a.created));
req.onerror = ()=>rej(req.error);
});
}
export function clearTxns(){
return new Promise((res,rej)=>{
const store = tx('txns','readwrite'); const r = store.clear(); r.onsuccess = ()=>res(); r.onerror = ()=>rej();
});
}


export async function getSummary(){
const txns = await getTxns();
const income = txns.filter(t=>t.type==='income').reduce((s, t)=> s + t.amount, 0);
const expense = txns.filter(t=>t.type==='expense').reduce((s, t)=> s + t.amount, 0);
return { income, expense, balance: income - expense };
}