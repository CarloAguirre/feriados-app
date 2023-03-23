export const feriadosFetch = async(url, setTime, setTitle, setFecha, setTipo, today, setData)=>{
    try {
        const res = await fetch(url);
        const {data} = await res.json()

        let nextFeriado = "";
        const setter = (feriado)=>{
            nextFeriado = feriado.date;
            setTitle(feriado.title)
            setFecha(feriado.date)
            setTipo(feriado.type)
            setTime(new Date(nextFeriado).getTime() - new Date(today).getTime())
            setData(data)
        }
        

        for (let feriado of data){
            if(Number(feriado.date.split('-')[1]) > Number(today.split('-')[1])){
                setter(feriado)
                return;
            }else if(Number(feriado.date.split('-')[1]) === Number(today.split('-')[1])){
                if(Number(feriado.date.split('-')[2]) > Number(today.split('-')[2])){
                    setter(feriado)
                    return;
                }
                if(Number(feriado.date.split('-')[2]) === Number(today.split('-')[2])){
                    nextFeriado = today
                    setter(feriado)
                }        
            }
        };
                       
    } catch (error) {
        console.log(error)
    }
}