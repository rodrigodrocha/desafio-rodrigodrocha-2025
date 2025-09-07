class AbrigoAnimais {

  constructor(){
    this.iDicionario = 0
    this.iUsuario = 0
    this.j = 0
    this.SituacaoFinalDoAnimal = []
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
            const verificandoBrinquedos = this.verificaBrinquedos(listaBrinquedosPessoa1, listaBrinquedosPessoa2, brinquedosDicionario, nome)
            this.SituacaoFinalDoAnimal.push(verificandoBrinquedos)
          }
        }
    } //fim do else que os nomes dos animais estão todos corretos.
    console.log(this.SituacaoFinalDoAnimal.sort())
    return this.SituacaoFinalDoAnimal.sort()
  }

  //Método que mostra as lista de brinquedos do animal e os brinquedos que o usuário inseriu
  verificaBrinquedos(brinquedosPessoa1, brinquedosPessoa2, brinquedosDic, nome){
    let situacaoPessoa1 = this.aptaAdocao(brinquedosPessoa1, brinquedosDic)
    let situacaoPessoa2 = this.aptaAdocao(brinquedosPessoa2, brinquedosDic)
    console.log(nome)
    if (!situacaoPessoa1 && !situacaoPessoa2) {
      return nome + " - abrigo"
    } 
    if (situacaoPessoa1 && !situacaoPessoa2) {
      return nome + " - pessoa 1"
    } 
    if (!situacaoPessoa1 && situacaoPessoa2) {
      return nome + " - pessoa 2"
    } else {
      return nome + " - abrigo"
    }
  } // fim do método verifica brinquedos

  // método se a pessoa esta apta a adoção
  aptaAdocao(brinquedos, brinquedosDic){
    this.j = 0
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
          return true;
        }
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
