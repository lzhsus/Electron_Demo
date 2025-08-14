export default ()=>{
    return new Promise(async (resolve,reject)=>{
        const data = {
            userAgent: navigator.userAgent,
            language: navigator.language,
            width: screen.width,
            height: screen.height,
            colorDepth: screen.colorDepth
        };
        const encoder = new TextEncoder();
        const hashBuffer = await crypto.subtle.digest('SHA-256', encoder.encode(JSON.stringify(data)));
        const hashArray = Array.from(new Uint8Array(hashBuffer));
        const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
        resolve(hashHex)
    })
}