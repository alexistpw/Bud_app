// JavaScript - Budget App
class Expense
{
    constructor(year, month, day, type, descript, valor)
    {
        this.ano = year
        this.mes = month
        this.dia = day
        this.tipo = type
        this.descricao = descript
        this.valor = valor
    }

    validarDados()
    {
        for(let i in this)
        {
            // console.log(this[i]); // forma de verificar os atributos em forma de array
            if((this[i] == undefined) || (this[i] == "") || (this[i] == null)) return false;
            else return true;
        }
    }
}

class Bd
{   
    constructor()
    {
        let id = localStorage.getItem("id");
        if(id === null)
        {
            localStorage.setItem("id",0);
        }
    }
    geNextid() 
    {
        let nextId = localStorage.getItem("id");
        ++nextId;
        return nextId;
    }
    gravar(d)
    {
        let id = this.geNextid();
        d.id = id;
        localStorage.setItem(`despesa_${id}`, JSON.stringify(d)); // converte obj para string JSON
        localStorage.setItem("id",id);
    }
    retRegs()
    {
        let id = localStorage.getItem("id");
        let arReg = [];

        for(let i = 1; i <= id; i++)
        {
            let reg = localStorage.getItem(`despesa_${i}`);
            if(reg === null) continue; // se não houver registros com aquele id, "continue" salta para o próximo laço
            reg = JSON.parse(reg); // converte de string JSON para obj
            console.log(i, reg);
            arReg.push(reg);
        }
        // console.log(arReg);
        return arReg;
    }
    srchReg(reg)
    {
        let reg_filt = [];
        reg_filt = this.retRegs();
        if (reg.ano != "") reg_filt = reg_filt.filter(x => x.ano == reg.ano);
        if (reg.mes != "") reg_filt = reg_filt.filter(x => x.mes == reg.mes);
        if (reg.dia != "") reg_filt = reg_filt.filter(x => x.dia == reg.dia);
        if (reg.tipo != "") reg_filt = reg_filt.filter(x => x.tipo == reg.tipo);
        if (reg.descricao != "") reg_filt = reg_filt.filter(x => x.descricao == reg.descricao);
        if (reg.valor != "") reg_filt = reg_filt.filter(x => x.valor == reg.valor);
        return reg_filt;
    }
    removeReg(id)
    {
        localStorage.removeItem(`despesa_${id}`);
    }

}

let bd = new Bd();