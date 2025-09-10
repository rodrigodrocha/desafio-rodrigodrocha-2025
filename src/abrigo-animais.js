class AbrigoAnimais {

  constructor(){
    this.iDicionario = 0
    this.iUsuario = 0
    this.j = 0
    this.SituacaoFinalDoAnimal = []
    this.contarPessoa1 = 0
    this.contarPessoa2 = 0
    this.loco = 0 
    this.locoPessoa1 
    this.locoPessoa2
    this.locoExiste = false
    this.animais = {
      rex : {
        especie : "cao",
        brinquedos : ["rato", 'bola']
      },
      mimi : {
        especie : "gato",
        brinquedos : ["bola", "laser"]
      },
      fofo : {
        especie : "gato",
        brinquedos : ["bola", "rato", "laser"]
      },
      zero : {
        especie : "gato", 
        brinquedos : ["rato", "bola"]
      },
      bola : {
        especie : "cao", 
        brinquedos : ["caixa", "novelo"]
      },
      bebe : {
        especie : "cao",
        brinquedos : ["laser", "rato", "bola"]
      },
      loco : {
        especie : "jabuti", 
        brinquedos : ["skate", "rato"]
      }
    }
  }

  encontraPessoas(brinquedosPessoa1, brinquedosPessoa2, ordemAnimais) {
    // verificar se o nome do animal fornecido existe na lista de animal do abrigo
    let listaBrinquedosPessoa1 = this.transformaLista(brinquedosPessoa1)
    let listaBrinquedosPessoa2 = this.transformaLista(brinquedosPessoa2)
    let listaOrdemAnimais = this.transformaLista(ordemAnimais)
    const verificandoAnimais = this.verificaAnimal(listaOrdemAnimais)
    if (!verificandoAnimais){
      console.log(" erro: 'Animal inválido'")
      return { erro: 'Animal inválido'  }
    }
    else{
      let brinquedoEDuplicado1 = this.eDuplicado(listaBrinquedosPessoa1) 
      let brinquedoEDuplicado2 = this.eDuplicado(listaBrinquedosPessoa2)
      if (brinquedoEDuplicado1 || brinquedoEDuplicado2) {
        console.log(" erro: 'Brinquedo inválido'")
        return { erro: 'Brinquedo inválido'  }
      } else {
          for (const nome of listaOrdemAnimais){
            const brinquedosDicionario = this.animais[nome]['brinquedos']
            // Verificando a jabuti que não quer ser adotada sozinha
            if (nome == "loco"){
              const [brinq1, brinq2] = brinquedosDicionario
              this.locoPessoa1 = this.aptaAdocao(listaBrinquedosPessoa1, 0, brinq1, brinq2, nome)
              this.locoPessoa2 = this.aptaAdocao(listaBrinquedosPessoa2, 0, brinq1, brinq2, nome)
              this.locoExiste = true
              continue
            }
            const verificandoBrinquedos = this.verificaBrinquedos(listaBrinquedosPessoa1, listaBrinquedosPessoa2, brinquedosDicionario, nome)
            this.SituacaoFinalDoAnimal.push(verificandoBrinquedos)
          }
        }
      } //fim do else que os nomes dos animais estão todos corretos.
    this.descobreSituacaoDoLoco(this.locoPessoa1, this.locoPessoa2)
    console.log(this.SituacaoFinalDoAnimal.sort())
    return this.SituacaoFinalDoAnimal.sort()
  }
  //Método que mostra as lista de brinquedos do animal e os brinquedos que o usuário inseriu
  verificaBrinquedos(brinquedo1, brinquedo2, brinquedosDic, nome){
    //verificando se o animal é o loco pois ele não se importa com a sequência dos brinquedos mas quer um amigo que vai junto com ele
    let situacaoPessoa1 = this.aptaAdocao(brinquedo1, brinquedosDic)
    let situacaoPessoa2 = this.aptaAdocao(brinquedo2, brinquedosDic)
    return this.descobreSituacaoFinalAnimal(situacaoPessoa1, situacaoPessoa2, nome)
  }
  // Descobrindo para onde o animal vai
  descobreSituacaoFinalAnimal(situacaoPessoa1, situacaoPessoa2, nome){ 
    if (!situacaoPessoa1 && !situacaoPessoa2) {
      return nome + " - abrigo"
    } 
    if (situacaoPessoa1 && !situacaoPessoa2) {
      this.contarPessoa1++
      this.descobreSituacaoDoLoco(this.locoPessoa1, this.locoPessoa2)
      if (this.contarPessoa1 < 4){
        return nome + " - pessoa 1"
      }
      else{
        return nome + " - abrigo"
      }
    } 
    if (!situacaoPessoa1 && situacaoPessoa2) {
      this.contarPessoa2++
      this.descobreSituacaoDoLoco(this.locoPessoa1, this.locoPessoa2)
      if (this.contarPessoa2 < 4){
        return nome + " - pessoa 2"
      }
      else{
        return nome + " - abrigo"
      }
    } else {
      return nome + " - abrigo"
    }
  } // fim do método Descobre situação final do animal
  descobreSituacaoDoLoco(pessoa1, pessoa2){
    if (this.locoExiste) {
      this.locoExiste = false
      if ((pessoa1 == 1 && pessoa2 == 1) || (pessoa1 == 0 && pessoa2 == 0)) {
        pessoa1 = -1
        pessoa2 = -1
        this.SituacaoFinalDoAnimal.push("loco - abrigo")
      }
      if ((pessoa1 == 1) && (this.contarPessoa1 > 0) && (this.contarPessoa1 < 4)  && (pessoa2 == 0)){
        pessoa1 = -1
        this.contarPessoa1++
        this.SituacaoFinalDoAnimal.push("loco - pessoa 1")
      }
      if ((pessoa1 == 1 && this.contarPessoa1 == 4) || (pessoa1 == 2 && this.contarPessoa2 == 3)) {
        pessoa1 = -1
        pessoa2 = -1
        this.SituacaoFinalDoAnimal.push("loco - abrigo")
      }
      if (pessoa2 == 1 && this.contarPessoa2 > 0 && this.contarPessoa2 < 4 && pessoa1 == 0) {
        pessoa2 = -1
        this.contarPessoa2++
        this.SituacaoFinalDoAnimal.push("loco - pessoa 2")
      }
    }
  }
  // método se a pessoa esta apta a adoção
  aptaAdocao(brinquedos, brinquedosDic, brinquedo1Loco, brinquedo2Loco, nome){
    this.j = 0
    if(nome != "loco"){
      for (const brinquedo of brinquedos) {
        if (brinquedo == brinquedosDic[this.j]) {
          this.j++
        }
      }
      if (this.j == brinquedosDic.length){
        return true
      }
      return false
    }
    else {
      for (const brinquedo of brinquedos) {
        if (brinquedo == brinquedo1Loco || brinquedo == brinquedo2Loco){
          this.loco++
        }
      }
      if (this.loco == 2){
        this.loco = 0
        return 1
      }
      return 0
    }
  }
  //método para vericar se o nome do animal inserido pelo usuário existe na lista de animal do abrigo
  verificaAnimal(animal) {
    const tamanhoDicionario = Object.keys(this.animais).length;
    //Verificando se tem nome duplicado de animal.
    const temNomeDuplicado = this.eDuplicado(animal)
    if (temNomeDuplicado){
      return false;
    }
    const tamanhoListaUsuarios = animal.length
      for (const nomeAnimal of animal){
        this.iDicionario = 0;
        for (const chave in this.animais){
          this.iDicionario++;
          if (nomeAnimal == chave){
            break;
          }
          if (tamanhoDicionario == this.iDicionario){
            this.j = 1;
          }
        }
        if (this.j == 1) {
          return false;
        }
        this.iUsuario++
        if (this.iUsuario == tamanhoListaUsuarios) {
        }
        return true;
      }
  }
  //verifica se tem dados duplicados. Exemplo brinquedo ou nome de animal
  eDuplicado(lista) {
    return (new Set(lista)).size < lista.length;
  }
  //transforma tudo em minusculo
  transformaLista(a){
    let lista = a.split(",")
    lista = lista.map(p => p.toLowerCase())
    return lista
  }
  
}

export { AbrigoAnimais };
