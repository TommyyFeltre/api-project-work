export default function IBANcreator() {
  const randomCinNum = Math.floor(Math.random() * (99 - 1) + 1).toString();
    const alfabeto = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const randomletter = alfabeto[Math.floor(Math.random() * alfabeto.length)];
    const ABI = 73825;
    const CAB = 60148;
    let randomNum = Math.floor(Math.random() * 10000000000).toString();

    for(let i = randomNum.length;i<=12;i++){
      const op = randomNum;
      randomNum = "0"+op;
    }

    return "IT"+randomCinNum+randomletter+ABI+CAB+randomNum;
}