// ตัวอย่างโค้ดที่ลูกค้าเอาไปใช้ทันทีหลังจากได้ API Key
async function useGutaiAPI(apiKey, amount){
  const res = await fetch('https://your-domain.com/gutai(1)++/execute', {
    method: 'POST',
    headers: { 'x-api-key': apiKey, 'Content-Type':'application/json' },
    body: JSON.stringify({ amount: amount, currency: 'SC' })
  });
  return await res.json();
}
